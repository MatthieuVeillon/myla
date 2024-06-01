import OpenAI from 'openai';

const openai = new OpenAI({
    organization: process.env.OPENAI_ORGANIZATION_ID,
    apiKey: process.env.OPENAI_API_KEY,
});


// const encodeImage = async (imagePath: string): Promise<string> => {
//     const imageBuffer = await fs.readFile(imagePath);
//     return imageBuffer.toString('base64');
// };

const processImages = async (courseImages: string[]): Promise<string> => {
    const messagesPrompt: any = {
        role: 'user',
        content: JSON.stringify([
            {
                type: 'text',
                text: `Je te fournis un ensemble d'images correspondant à un cours de collège. Ta tâche consiste à analyser ces images et à en extraire les notions essentielles que les élèves doivent assimiler. Voici ce que j'attends de toi :

                Identification des notions principales : Pour l'ensemble des images, identifie les notions principales abordées. Décris chacune de ces notions en une phrase claire.
                
                Détail des notions : Pour chaque notion principale, donne une description détaillée qui explique :
                
                La définition de la notion.
                Son importance dans le contexte du cours.
                Des exemples concrets ou des applications pratiques.
                Points clés à retenir : Liste les points clés associés à chaque notion. Ces points clés doivent être formulés de manière à pouvoir être transformés en questions de révision ou d'évaluation.
                
                Organisation des notions : Organise les notions de manière logique et cohérente, en suivant l'ordre de présentation du cours dans les images.
                
                Voici un exemple pour t'aider à comprendre ce que j'attends :
                
                Notion principale : Le cycle de l'eau
                Description détaillée :
                Définition : Le cycle de l'eau décrit le mouvement continu de l'eau sur, au-dessus et sous la surface de la Terre.
                Importance : Comprendre le cycle de l'eau est essentiel pour saisir les processus météorologiques et climatiques.
                Exemples : Evaporation des océans, formation des nuages, précipitations sous forme de pluie ou de neige.
                Points clés :
                Evaporation : transformation de l'eau liquide en vapeur d'eau.
                Condensation : formation de gouttelettes d'eau à partir de la vapeur.
                Précipitation : retour de l'eau à la surface sous forme de pluie, neige, etc.
                Assure-toi que chaque notion soit suffisamment détaillée pour permettre la génération de questions ultérieures. Ne génère pas de question.
                `,
            },
        ]),
    };

    for (const courseImage of courseImages) {
        messagesPrompt.push(
        {
            type: 'image_url',
            image_url: {
                url: `${courseImage}`,
            },
        })
    }

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: messagesPrompt,
    });

    const result = completion.choices[0].message?.content ?? '';

    console.log("----- notions -----")
    console.log(result)

    return result;
};

const generateExercise = async (notions: string, universePrompt: string): Promise<string> => {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'user',
                content: JSON.stringify([
                    {
                        type: 'text',
                        text: `Je suis un élève au collège et je veux travailler ma leçon. Voici un résumé des notions que je dois assimiler (entre les triples backticks) \`\`\`${notions}
                        \`\`\`
                        J’adore le ${universePrompt}. Il est essentiel que tu utilise cette information afin d’élaborer des questions dans l’univers de cette passion.
                        Génère un énoncé et un ensemble de questions afin de s’assurer que j’ai bien compris ces notions. Ne donne pas la réponse attendue.
                        
                        Voici un exemple de résultat pour un élève de troisième, s'intéressant à l'athlétisme et souhaitant travailler sur les notions de temps, vitesse et distance :
                        \`\`\`json
                        {
                         "questions": [
                           {
                             "title": "Calcul d'une vitesse moyenne",
                             "description": "Bertrand participe au marathon de Paris. Il a battu son record personnel en mettant 3h30 pour parcourir les 42195m de la course. Calcule sa vitesse moyenne en km/h afin qu'il puisse l'indiquer sur Instagram.",
                             "hint": "Utilise la formule vitesse = distance / temps"
                           },
                           {
                             "title": "Calcul d'une temps",
                             "description": "Lucas doit se rendre à son entrainement d'athlétisme pour 14h. Il habite à 2km de la salle, et marche à une vitesse de 6 km/h. A quelle heure doit-il partir au plus tard pour arriver à son entrainement ?",
                             "hint": "Utilise la formule temps = distance / vitesse"
                           },
                           {
                             "title": "Calcul d'une distance",
                             "description": "Arthur s'entraine au lancer de poids. Son projectile vole à une vitesse moyene de 20km/h pendant 3 secondes. Quelle distance a-t'il parcouru en mètres ?",
                             "hint": "Utilise la formule distance = vitesse x temps"
                           },
                         ]
                        }
                        \`\`\`
                        
                        Formate les résultats sous la forme d’un JSON.
                        Un objet JSON "Question" contient les clés suivantes :
                        - "title" : un titre court décrivant la question
                        - "description" : la question, explicite, et contenant toutes les informations nécessaires pour répondre (mais qui ne contient pas de réponse)
                        - "hint" : un indice pour m’aider à répondre à la question si j’en ai besoin
                        Génère de 3 à 5 questions, en répondant uniquement avec le JSON.
                        `
                    }
                ]),
            },
        ],
    });

    const result = completion.choices[0].message?.content ?? '';

    console.log("----- exercise -----")
    console.log(result)

    return result;
};
export const maxDuration = 60;
export async function POST(req: Request) {
    const body = await req.json()
    const { courseImages, theme } = body
    try {
        const notions = await processImages(courseImages);
        const exercise = await generateExercise(notions, theme);

        return Response.json({exercise})

    } catch (error) {
        return new Response(` Error processing images or generating exercise: ${error}`, {
            status: 500,
        })
    }
}
