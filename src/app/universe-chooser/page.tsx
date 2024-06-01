"use client"
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import {Button} from "@/components/ui/button";
import {useGlobalStore} from "@/state/store";
import axios from "axios";
import {Base64, CreateExerciseFromBackToFrontPayload, CreateExerciseFromFrontToBackPayload} from "@/types";
import {useState} from "react";

type Response = {
    data: CreateExerciseFromBackToFrontPayload
}

const UniversePicker = () => {
    const router = useRouter();
    const courseImages = useGlobalStore((state) => state.courseImages);
    const [isLoading, setIsLoading] = useState(false);
    const [exercise, setExercise ] = useState<CreateExerciseFromBackToFrontPayload | null>(null);

    console.log("courseImages", courseImages)
    const chooseUniverse = async (universe: string) => {
        const requestBody = {
            courseImages,
            theme: 'Harry Potter', //todo replace theme with the actual theme
        };
        // Send the image to the backend
        try {
            setIsLoading(true)
            // const response = await axios.post<CreateExerciseFromFrontToBackPayload, Response>('api/create-exercise', requestBody);
            // console.log(response.data);
            setExercise(EXERCICE.data)
            setIsLoading(false)
        } catch (error) {
            console.error(error);
        }
 //       router.push('/exercice-from-ia-' + universe);
    };
    console.log("exercise", exercise)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold text-center mb-4">
                Choisir ton univers préféré
            </h1>
            <div className="flex flex-wrap justify-center gap-5">
                {isLoading ? <div className="w-full bg-slate-500">Loading</div> : <>
                    <Image
                        src="/harry-potter-image.png" // replace with your image path
                        alt="Harry Potter"
                        width={300}
                        height={150}
                        className="cursor-pointer"
                        onClick={() => chooseUniverse('harry-potter')}
                    />
                    <Image
                        src="/marvel.png" // replace with your image path
                        alt="Marvel"
                        width={300}
                        height={100}
                        className="cursor-pointer"
                        onClick={() => chooseUniverse('marvel')}
                    />
                </>}
                <Button disabled> Ajoute ton propre univers (à venir demain)</Button>
            </div>
        </div>
    );
};

export default UniversePicker;


// title: string
// image?: Base64
// questions: Question[]
// courseTextFromAI: string

const EXERCICE: Response = {
    data:{
        title: "Harry Potter Probability Exercise",
        courseTextFromAI: "Harry Potter Probability Exercise",
        questions: [
            {
                title : "Partie 1 : trouver la probabilité de base des cartes rouges",
                description : "de tirer une carte rouge d'un jeu de cartes standard",
                image: "rouge",
                hint : "concentrez-vous sur les cartes rouges",
            },
            {
                title : "Partie 2 : trouver la probabilité de base des cartes noires",
                description : "de tirer une carte noires d'un jeu de cartes standard",
                image: "noir",
                hint : "concentrez-vous sur les cartes noires",
            },
        ],
    }
}
