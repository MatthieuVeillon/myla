"use client"

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {Button} from "@/components/ui/button";

const HarryPotterExercise = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const router = useRouter();

    const capture = useCallback(() => {
        // @ts-ignore
        const imageSrc = webcamRef?.current?.getScreenshot();
        setImgSrc(imageSrc);
        router.push('/response-chooser');
    }, [webcamRef, setImgSrc, router]);

    const uploadSolution = () => {
        router.push('/response-chooser');
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold text-center mb-4">
                Harry Potter Probability Exercise
            </h1>

            <p className="text-justify mt-4">
                {DESCRIPTION}
            </p>
            <p className="text-center mt-4 font-bold">
                Final question to solve...
            </p>
            <img
                src="/harry-potter-image.png" // replace with your image path
                alt="Harry Potter"
                className="w-full max-w-md"
            />
            <p className="text-center mt-4">
                Please solve the exercise on paper and upload a picture of the solution.
            </p>
            {/*<Webcam*/}
            {/*    audio={false}*/}
            {/*    ref={webcamRef}*/}
            {/*    screenshotFormat="image/jpeg"*/}
            {/*    className="w-full max-w-md mt-4"*/}
            {/*/>*/}
            <Button onClick={uploadSolution} className="mt-4 p-2 bg-blue-500 text-white rounded">
                Upload solution
            </Button>
        </div>
    );
};

export default HarryPotterExercise;


const DESCRIPTION = "Imagine que tu es à Poudlard, l'école de sorcellerie de Harry Potter. "  +
    "Dans ta main, tu as un sac de Bertie Bott's Every Flavour Beans, les fameux bonbons aux mille et une saveurs. " +
    "Dans ce sac, il y a 10 bonbons : 3 sont au goût de citrouille, 4 au goût de pomme et 3 au goût de chaussettes sales.  " +
    "Si tu fermes les yeux et que tu prends un bonbon au hasard, quelle est la probabilité que tu prennes un bonbon au goût de citrouille ? Et quelle est la probabilité que tu prennes un bonbon au goût de chaussettes sales ?  Rappelle-toi, la probabilité se calcule en divisant le nombre de résultats favorables par le nombre total de résultats. Dans ce cas, le nombre total de résultats est le nombre total de bonbons. Bonne chance !"
