
import OpenAI from 'openai';

const openai = new OpenAI({
    organization: process.env.OPENAI_ORGANIZATION_ID,
    apiKey: process.env.OPENAI_API_KEY,
});




import fs from 'fs';
import path from 'path';
import {Question} from "@/types";

// const processImageAndText = async (imagePath: string, inputText: string): Promise<string> => {
//     // Lire l'image du disque
//     const imageBuffer = fs.readFileSync(path.resolve(imagePath));

//     // Convertir l'image en une chaîne Base64
//     const base64Image = imageBuffer.toString('base64');

//     const completion = await openai.chat.completions.create({
//         model: 'gpt-4o',
//         messages: [
//             {
//                 role: 'user',
//                 content: JSON.stringify([
//                     {
//                         type: 'text',
//                         text: inputText,
//                     },
//                     {
//                         type: 'image',
//                         data: base64Image,
//                     },
//                 ]),
//             },
//         ],
//     });

//     const outputText = completion.choices[0].message?.content ?? '';
//     return outputText;
// };










// const processImages = async (courseImages: string[]): Promise<string[]> => {
//     const imageTexts: string[] = [];

//     for (const courseImage of courseImages) {
//         // const base64Image = await encodeImage(imagePath);

//         const completion = await openai.chat.completions.create({
//             model: 'gpt-4o',
//             messages: [
//                 {
//                     role: 'user',
//                     content: JSON.stringify([
//                         {
//                             type: 'text',
//                             text: "Analyser et interpréter visuellement les concepts abordés dans le cours tout en gardant à l'esprit qu'il s'agit de source d'inspiration pour la création d'exercice.",
//                         },
//                         {
//                             type: 'image_url',
//                             image_url: {
//                                 url: `${courseImage}`,
//                             },
//                         },
//                     ]),
//                 },
//             ],
//         });

//         const imageText = completion.choices[0].message?.content ?? '';
//         imageTexts.push(imageText);
//     }

//     return imageTexts;
// };


// const analyzeExercice = async (courseImages: string[], question: string): Promise<string> => {
//     const completion = await openai.chat.completions.create({
//         model: 'gpt-4o',
//         messages: [
//             {
//                 role: 'user',
//                 content: JSON.stringify([
//                     {
//                         type: 'question',
//                         text: question,
//                     },
//                     {
//                         type: 'text',
//                         text: 'Answer Images:',
//                     },
//                     ...courseImages.map((imageText) => ({
//                         type: 'text',
//                         text: imageText,
//                     })),
//                     {
//                         type: 'text',
//                         text: 'Créer un exercice basé sur les images et les concepts abordés dans le cours.',
//                     },
//                 ]),
//             },
//         ],
//     });

//     return completion.choices[0].message?.content ?? '';
// };


const processImageAndText = async (imageBase64: string, inputText: string): Promise<string> => {
    // Convertir l'image en une chaîne Base64
    const base64Image = imageBase64;

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'user',
                content: JSON.stringify([
                    {
                        type: "image_url",
                        image_url:
                        {
                            url: base64Image,
                            detail: "low"
                        }
                    },
                    {
                        type: 'text',
                        text: inputText,
                    }
                ]),
            },
        ],
    });

    const outputText = completion.choices[0].message?.content ?? '';
    return outputText;
};


export async function POST(req: Request) {
    console.log("letsgo")
    const body = await req.json()
    const { questions, solutions } = body
    console.log(questions)
    console.log("\n\n\n\n")
    console.log(solutions)
    console.log("\n\n\n\n")

    try {
        let prompt = fs.readFileSync(path.resolve("scripts/prompts/promptB.txt")).toString();
        const exo = (questions as Question[]).map(({title, description}) =>`${title}: ${description}`).join("\n")

        prompt = prompt.replace('ICI_EXERCICE', exo)
        console.log(prompt)
        const feedbackExercice = await processImageAndText(solutions[0], prompt).catch(console.error);
        console.log(feedbackExercice)
        return Response.json(feedbackExercice)
    } catch (error) {
        return new Response(` Error processing images or generating exercise: ${error}`, {
            status: 500,
        })
    }
}
