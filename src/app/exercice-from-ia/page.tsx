"use client"

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
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

type Response = {
    data: AnalyzeExerciseFromBackToFrontPayload
}

const HarryPotterExercise = () => {
    const webcamRef = useRef(null);
    const exercise = useGlobalStore((state) => state.exercise);
    const router = useRouter();

    const capture = useCallback(async () => {
        // @ts-ignore
        const solutionImgSrc = webcamRef?.current?.getScreenshot();

        const requestBody : AnalyzeExerciseFromFrontToBackPayload = {
            solutions: [solutionImgSrc],
            questions: exercise.questions,
            courseTextFromAI: exercise.courseTextFromAI,
        };
        const response = await axios.post<CreateExerciseFromFrontToBackPayload, Response>('api/create-exercise', requestBody);
        console.log(response.data);


        // router.push('/response-chooser');
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
                        {question.description}
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

export default HarryPotterExercise;


const DESCRIPTION = "Imagine que tu es à Poudlard, l'école de sorcellerie de Harry Potter. " +
    "Dans ta main, tu as un sac de Bertie Bott's Every Flavour Beans, les fameux bonbons aux mille et une saveurs. " +
    "Dans ce sac, il y a 10 bonbons : 3 sont au goût de citrouille, 4 au goût de pomme et 3 au goût de chaussettes sales.  " +
    "Si tu fermes les yeux et que tu prends un bonbon au hasard, quelle est la probabilité que tu prennes un bonbon au goût de citrouille ? Et quelle est la probabilité que tu prennes un bonbon au goût de chaussettes sales ?  Rappelle-toi, la probabilité se calcule en divisant le nombre de résultats favorables par le nombre total de résultats. Dans ce cas, le nombre total de résultats est le nombre total de bonbons. Bonne chance !"
