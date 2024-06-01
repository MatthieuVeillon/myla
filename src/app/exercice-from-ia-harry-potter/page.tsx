"use client"

import {useCallback, useRef, useState} from 'react';
import {useRouter} from 'next/navigation';

import {Button} from "@/components/ui/button";
import Image from "next/image";
import MathsComponent from "@/components/ui/mathsComponent";

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
                Exercice : Les Héros de Harry Potter
            </h1>

            <div className="text-justify mt-4">
                <MathsComponent>
                    {"Imagine que les héros de l'univers de Harry Potter ont besoin de toi pour résoudre des problèmes mathématiques \\[e^{i\\pi} + 1 = 10^{-2} \\times \\frac{1}{2} \\times (5 \\times 10^6) \\] afin de sauver le monde magique ! Chaque fraction représente une partie de la puissance magique nécessaire pour vaincre les forces du mal. Aide-les en résolvant ces fractions !\n"}
                </MathsComponent>
            </div>

            <Image
                src="/harry-potter-image.png" // replace with your image path
                alt="Harry Potter"
                width={300}
                height={150}
            />
            <h3 className="text-center mt-4 font-bold">
                Partie 1 : Simplification de fractions
            </h3>
            <p className="text-justify mt-4">
                Simplifie les fractions suivantes pour aider Hermione à optimiser ses sorts :
            </p>


            <Image
                src="/exercice-partie1.png" // replace with your image path
                alt="Harry Potter"
                width={70}
                height={150}
            />

            <Button onClick={uploadSolution} className="mt-4 p-2 bg-blue-500 text-white rounded">
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
