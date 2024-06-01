import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import OpenAI from 'openai';

const openai = new OpenAI({
    organization:'org-67y2ddY7XSDse9uR2e5A7jFj',
    apiKey:"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"
});

const encodeImage = async (imagePath: string): Promise<string> => {
    const imageBuffer = await fs.readFile(imagePath);
    return imageBuffer.toString('base64');
};

const processImages = async (imagePaths: string[]): Promise<string[]> => {
    const imageTexts: string[] = [];

    for (const imagePath of imagePaths) {
        const base64Image = await encodeImage(imagePath);

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
                                url: `data:image/jpeg;base64,${base64Image}`,
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

const generateExercise = async (imageTexts: string[], universePrompt: string): Promise<string> => {
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
                    ...imageTexts.map((imageText) => ({
                        type: 'text',
                        text: imageText,
                    })),
                ]),
            },
        ],
    });

    return completion.choices[0].message?.content ?? '';
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { imagePaths, universePrompt } = req.body;

        try {
            const imageTexts = await processImages(imagePaths);
            const exercise = await generateExercise(imageTexts, universePrompt);
            res.status(200).json({ exercise });
        } catch (error) {
            res.status(500).json({ error: 'Error processing images or generating exercise' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
