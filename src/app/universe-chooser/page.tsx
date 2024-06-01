"use client"
import {useRouter} from 'next/navigation';

import Image from 'next/image';
import {Button} from "@/components/ui/button";
const UniversePicker = () => {
    const router = useRouter();

    const chooseUniverse = (universe: string) => {
        // Here you can save the chosen universe to a state or to a database
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
