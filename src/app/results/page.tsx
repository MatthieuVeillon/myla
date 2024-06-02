"use client"

import {useRouter, useSearchParams} from 'next/navigation';

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Suspense} from "react";
import {useGlobalStore} from "@/state/store";

const ResultPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const feedback = useGlobalStore((state) => state.feedback);
    const response = searchParams.get('response')

    // Determine the image and feedback based on the response
    const needNewExercice = response === "image1" || response === "image2"


    console.log("feedback", feedback)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-5">
            <h1 className="text-3xl font-bold text-center">{feedback.summary}</h1>

            {feedback.comments.map(comment => (
                <p key={comment}>{comment}</p>
            ))}

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
            <ResultPage/>
        </Suspense>
    )
}
export default ResultPageSuspended;
