"use client"

import {useState, useCallback, useRef, Suspense} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import Webcam from 'react-webcam';

import {Button} from "@/components/ui/button";
import Image from "next/image";
import {
    AnalyzeExerciseFromBackToFrontPayload,
    AnalyzeExerciseFromFrontToBackPayload,
    CreateExerciseFromFrontToBackPayload
} from "@/types";
import {useGlobalStore} from "@/state/store";
import axios from "axios";
import MathsComponent from "@/components/ui/mathsComponent";

type Response = {
    data: AnalyzeExerciseFromBackToFrontPayload
}

const ExerciseFromIA = () => {
    const webcamRef = useRef(null);
    const searchParams = useSearchParams()
    const exercise = useGlobalStore((state) => state.exercise);
    const setFeedback = useGlobalStore((state) => state.setFeedback);
    const router = useRouter();
    const debug = searchParams.get('debug')

    const capture = useCallback(async () => {
        // @ts-ignore
        const solutionImgSrc = webcamRef?.current?.getScreenshot();

        const requestBody: AnalyzeExerciseFromFrontToBackPayload = {
            solutions: [debug ? base64Solution : solutionImgSrc],
            questions: exercise.questions,
        };

        const response = await axios.post<CreateExerciseFromFrontToBackPayload, Response>('api/analyze-exercise', requestBody);

        //@ts-ignore
        setFeedback(JSON.parse(response.data))

        router.push('/results');
    }, [webcamRef, router]);


    const videoConstraints = {
        facingMode: {exact: "environment"}
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold text-center mb-4">
                {exercise.title}
            </h1>


            {exercise.questions.map((question, index) => (
                <div key={index}>
                    <h3 className="text-center mt-4 font-bold">
                        {question.title}
                    </h3>
                    <p className="text-justify mt-4">
                        <MathsComponent>
                        {question.description}
                            </MathsComponent>
                    </p>
                </div>
            ))}

            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full max-w-md"
                videoConstraints={videoConstraints}
            />

            <Button onClick={capture} className="mt-4 p-2 bg-blue-500 text-white rounded">
                Upload solution
            </Button>
        </div>
    );
};

const ExerciseFromIASuspended = () => {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <ExerciseFromIA/>
        </Suspense>
    )
}
export default ExerciseFromIASuspended;


const base64Solution = "data:image/jpeg;base64,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"
