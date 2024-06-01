"use client"

import {useRouter, useSearchParams} from 'next/navigation';

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Suspense} from "react";

const ResultPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const response = searchParams.get('response')

    // Determine the image and feedback based on the response
    let imageSrc, feedback;
    switch (response) {
        case 'image1':
            imageSrc = '/result-image1.png'; // replace with your image path
            feedback = 'Vous avez fait une erreur de lecture sur l\'énoncé du point 3. Refait le point 3. Tu t\'es trompé dans le point 4. Redécompose la fraction.'; // replace with your feedback
            break;
        // case 'image2':
        //     imageSrc = '/result-image2.png'; // replace with your image path
        //     feedback = 'Feedback for image 2...'; // replace with your feedback
        //     break;
        case 'image3':
            imageSrc = '/result-image3.png'; // replace with your image path
            feedback = 'Ton travail sur la simplification des fractions est excellent ! Tu as utilisé les bonnes méthodes pour simplifier chaque fraction correctement.'; // replace with your feedback
            break;
        default:
            imageSrc = '/path/to/default-image.jpg'; // replace with your image path
            feedback = 'Default feedback...'; // replace with your feedback
    }

    const needNewExercice = response === "image1" || response === "image2"

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-5">
            {/*<Image*/}
            {/*    src={imageSrc}*/}
            {/*    alt="Result"*/}
            {/*    width={300}*/}
            {/*    height={300}*/}
            {/*    className="w-full sm:w-1/2"*/}
            {/*/>*/}
            <p className="text-center mt-4 text-2xl">
                {feedback}
            </p>

            {needNewExercice ?
                <Button onClick={() => router.push('/new-exercice')}> Faire un nouvel exercice </Button> :
                <Button onClick={() => router.push('/new-skill')}>Scan un nouveau devoir</Button>}
        </div>
    );
};


const ResultPageSuspended = () => {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <ResultPage />
        </Suspense>
    )
}
export default ResultPageSuspended;
