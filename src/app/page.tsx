"use client"

import {useState, useCallback, useRef} from 'react';
import { useRouter } from 'next/navigation';
import Webcam from 'react-webcam';
import {useGlobalStore} from "@/state/store";


const WebcamCapture = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const setCourseImages = useGlobalStore((state) => state.setCourseImages);
    const router = useRouter();

     const capture = useCallback(() => {
        // Capture the screenshot from the webcam
        // @ts-ignore
        const imageSrc = webcamRef?.current?.getScreenshot();
        if (!imageSrc) return;

        // Create an off-screen canvas for resizing the image
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const scaleFactor = 0.5;

            canvas.width = img.width * scaleFactor;
            canvas.height = img.height * scaleFactor;
            // @ts-ignore
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const resizedImageSrc = canvas.toDataURL('image/jpeg');
            setCourseImages(resizedImageSrc);

            const requestBody = {
                courseImages: resizedImageSrc,
                theme: 'Harry Potter', // TODO: replace theme with the actual theme
            };

            router.push('/universe-chooser');
        };
    }, [webcamRef, setCourseImages, router]);

    const videoConstraints = {
        facingMode: { exact: "environment" }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full max-w-md"
                videoConstraints={videoConstraints}
            />
            <button onClick={capture} className="mt-4 p-2 bg-blue-500 text-white rounded">
                Capture photo
            </button>
        </div>
    );
};

export default WebcamCapture;
