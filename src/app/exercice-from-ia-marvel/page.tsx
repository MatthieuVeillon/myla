"use client"

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Webcam from 'react-webcam';

import {Button} from "@/components/ui/button";
import Image from "next/image";

//### Exercice : Les fractions avec les super-héros Marvel
//
// Bienvenue dans l'univers des fractions avec vos héros préférés de Marvel ! Pour réussir cet exercice, utilisez les règles de simplification, de réduction, d'addition et de multiplication des fractions.
//
// #### Partie 1 : Simplification de fractions
//
// Iron Man a besoin de simplifier certaines fractions pour calibrer son réacteur arc. Aidez-le en simplifiant les fractions suivantes :
//
// 1. \( \frac{18}{24} \)
//
// 2. \( \frac{45}{60} \)
//
// 3. \( \frac{14}{49} \)
//
// 4. \( \frac{32}{80} \)
//
// #### Partie 2 : Réduction au même dénominateur
//
//
// Spider-Man doit comparer la force de ses toiles entre deux bâtiments. Réduisez les fractions suivantes au même dénominateur :
////
// 1. \( \frac{3}{4} \) et \( \frac{2}{5} \)
//
// 2. \( \frac{7}{9} \) et \( \frac{4}{6} \)
//
// #### Partie 3 : Addition et soustraction de fractions
//
// Captain America et Black Widow partagent des ressources. Aidez-les à additionner ou soustraire les fractions suivantes :
//
//
// 1. \( \frac{5}{6} + \frac{2}{9} \)
//
// 2. \( \frac{7}{8} - \frac{3}{10} \)
//
// #### Partie 4 : Multiplication de fractions
//
// Hulk utilise sa force pour multiplier les charges. Multipliez les fractions suivantes :
//
// 1. \( \frac{4}{7} \times \frac{3}{5} \)
//
// 2. \( \frac{6}{8} \times \frac{2}{3} \)


const MarvelExercise = () => {
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
                Exercice : Les fractions avec les super-héros Marvel
            </h1>

            <p className="text-justify mt-4">
                {"Bienvenue dans l'univers des fractions avec vos héros préférés de Marvel ! Pour réussir cet exercice, utilisez les règles de simplification, de réduction, d'addition et de multiplication des fractions."}
            </p>

            <Image
                src="/exercice-marvel.png" // replace with your image path
                alt="Harry Potter"
                width={300}
                height={150}
            />
            <h3 className="text-center mt-4 font-bold">
                Partie 1 : Simplification de fractions
            </h3>
            <p className="text-justify mt-4">
                Iron Man a besoin de simplifier certaines fractions pour calibrer son réacteur arc. Aidez-le en
                simplifiant les fractions suivantes :
            </p>


            <Image
                src="/exercice-partie1.png" // replace with your image path
                alt="Harry Potter"
                width={70}
                height={150}
            />

            {/*<h3 className="text-center mt-4 font-bold">*/}
            {/*    Partie 2 : Réduction au même dénominateur*/}
            {/*</h3>*/}
            {/*<p className="text-justify mt-4">*/}
            {/*    Spider-Man doit comparer la force de ses toiles entre deux bâtiments. Réduisez les fractions suivantes*/}
            {/*    au même dénominateur :*/}
            {/*</p>*/}

            {/*<Image*/}
            {/*    src="/exercice-partie2.png" // replace with your image path*/}
            {/*    alt="Harry Potter"*/}
            {/*    width={100}*/}
            {/*    height={50}*/}
            {/*/>*/}

            {/*<h3 className="text-center mt-4 font-bold">*/}
            {/*    Partie 3 : Addition et soustraction de fractions*/}
            {/*</h3>*/}
            {/*<p className="text-justify mt-4">*/}
            {/*    Captain America et Black Widow partagent des ressources. Aidez-les à additionner ou soustraire les fractions suivantes :*/}
            {/*</p>*/}

            {/*<Image*/}
            {/*    src="/exercice-partie3.png" // replace with your image path*/}
            {/*    alt="Harry Potter"*/}
            {/*    width={100}*/}
            {/*    height={50}*/}
            {/*/>*/}

            {/*<h3 className="text-center mt-4 font-bold">*/}
            {/*    Partie 4 : Multiplication de fractions*/}
            {/*</h3>*/}
            {/*<p className="text-justify mt-4">*/}
            {/*    Hulk utilise sa force pour multiplier les charges. Multipliez les fractions suivantes :*/}
            {/*</p>*/}

            {/*<Image*/}
            {/*    src="/exercice-partie4.png" // replace with your image path*/}
            {/*    alt="Harry Potter"*/}
            {/*    width={100}*/}
            {/*    height={50}*/}
            {/*/>*/}


            <Button onClick={uploadSolution} className="mt-4 p-2 bg-blue-500 text-white rounded">
                Upload ta solution
            </Button>
        </div>
    );
};

export default MarvelExercise;

