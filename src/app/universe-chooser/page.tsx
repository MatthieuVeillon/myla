"use client"
import {useRouter} from 'next/navigation';

import Image from 'next/image';
import {Button} from "@/components/ui/button";
import {useGlobalStore} from "@/state/store";
import axios from "axios";
import {CreateExerciseFromBackToFrontPayload, CreateExerciseFromFrontToBackPayload} from "@/types";
const UniversePicker = () => {
    const router = useRouter();
    const courseImages = useGlobalStore((state) => state.courseImages);

    const chooseUniverse = async (universe: string) => {
        const requestBody = {
            courseImages,
            theme: 'Harry Potter', //todo replace theme with the actual theme
        };
        // Send the image to the backend
        try {
            const response = await axios.post<CreateExerciseFromFrontToBackPayload,CreateExerciseFromBackToFrontPayload >('api/create-exercise', requestBody);
            console.log(response);
        } catch (error) {
            console.error(error);
        }

        router.push('/exercice-from-ia-' + universe);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold text-center mb-4">
                Choisir ton univers préféré
            </h1>
            <div className="flex flex-wrap justify-center gap-5">
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

                <Button disabled> Ajoute ton propre univers (à venir demain)</Button>
            </div>
        </div>
    );
};

export default UniversePicker;
