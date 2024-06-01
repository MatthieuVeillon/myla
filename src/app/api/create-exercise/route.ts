import OpenAI from 'openai';

const openai = new OpenAI({
    organization: process.env.OPENAI_ORGANIZATION_ID,
    apiKey: process.env.OPENAI_API_KEY,
});


// const encodeImage = async (imagePath: string): Promise<string> => {
//     const imageBuffer = await fs.readFile(imagePath);
//     return imageBuffer.toString('base64');
// };

const processImages = async (courseImages: string[]): Promise<string[]> => {
    const imageTexts: string[] = [];

    for (const courseImage of courseImages) {
        // const base64Image = await encodeImage(imagePath);

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: JSON.stringify([
                        {
                            type: 'text',
                            text: "Analyser et interpréter visuellement les concepts abordés dans le cours tout en gardant à l'esprit qu'il s'agit de source d'inspiration pour la création d'exercice.",
                        },
                        {
                            type: 'image_url',
                            image_url: {
                                url: `${courseImage}`,
                            },
                        },
                    ]),
                },
            ],
        });

        const imageText = completion.choices[0].message?.content ?? '';
        imageTexts.push(imageText);
    }

    return imageTexts;
};

const generateExercise = async (courseImages: string[], universePrompt: string): Promise<string> => {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'user',
                content: JSON.stringify([
                    {
                        type: 'text',
                        text: universePrompt,
                    },
                    {
                        type: 'text',
                        text: 'Créer un exercice basé sur les images et les concepts abordés dans le cours.',
                    },
                    {
                        type: 'text',
                        text: 'Images:',
                    },
                    ...courseImages.map((imageText) => ({
                        type: 'text',
                        text: imageText,
                    })),
                ]),
            },
        ],
    });

    return completion.choices[0].message?.content ?? '';
};

export async function POST(req: Request) {
    const body = await req.json()
    const { courseImages, theme } = body
    try {
        const imageTexts = await processImages(courseImages);
        const exercise = await generateExercise(imageTexts, theme);

        return Response.json({exercise})

    } catch (error) {
        return new Response(` Error processing images or generating exercise: ${error}`, {
            status: 500,
        })
    }
}
