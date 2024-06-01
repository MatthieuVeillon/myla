"use client"

import { useRouter } from 'next/navigation';

import Image from 'next/image';

const ImagePicker = () => {
    const router = useRouter();

    const chooseImage = (imageName: string) => {
        router.push(`/results?response=${imageName}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold text-center mb-4">Choisis ta solution</h1>
            <div className="flex flex-col justify-center gap-4">
                <Image
                    src="/image1.png" // replace with your image path
                    alt="Image 1"
                    width={150}
                    height={150}
                    className="w-full cursor-pointer"
                    onClick={() => chooseImage('image1')}
                />
                {/*<Image*/}
                {/*    src="/image2.png" // replace with your image path*/}
                {/*    alt="Image 2"*/}
                {/*    width={150}*/}
                {/*    height={150}*/}
                {/*    className="w-full cursor-pointer"*/}
                {/*    onClick={() => chooseImage('image2')}*/}
                {/*/>*/}
                <Image
                    src="/image3.png" // replace with your image path
                    alt="Image 3"
                    width={150}
                    height={150}
                    className="w-full cursor-pointer"
                    onClick={() => chooseImage('image3')}
                />
            </div>
        </div>
    );
};

export default ImagePicker;
