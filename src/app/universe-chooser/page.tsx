"use client"
import {useRouter} from 'next/navigation';

import Image from 'next/image';
const UniversePicker = () => {
    const router = useRouter();

    const chooseUniverse = (universe: string) => {
        // Here you can save the chosen universe to a state or to a database
        router.push('/exercice-from-ia?universe=' + universe);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold text-center mb-4">
                Choose your universe
            </h1>
            <div className="flex flex-wrap justify-center gap-3">
                <Image
                    src="/harry-potter-image.png" // replace with your image path
                    alt="Harry Potter"
                    width={200}
                    height={100}
                    className=" w-1/2 cursor-pointer"
                    onClick={() => chooseUniverse('harry-potter')}
                />
                <Image
                    src="/one-piece.png" // replace with your image path
                    alt="One Piece"
                    width={200}
                    height={100}
                    className=" w-1/2 cursor-pointer"
                    onClick={() => chooseUniverse('one-piece')}
                />
            </div>
        </div>
    );
};

export default UniversePicker;
