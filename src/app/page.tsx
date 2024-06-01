"use client"

import {useCallback, useRef, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import Webcam from 'react-webcam';
import {useGlobalStore} from "@/state/store";


const WebcamCapture = () => {
    const webcamRef = useRef(null);
    const searchParams = useSearchParams()
    const [imgSrc, setImgSrc] = useState(null);
    const setCourseImages = useGlobalStore((state) => state.setCourseImages);
    const debug = searchParams.get('debug')
    const router = useRouter();

    console.log("debug", debug)
    const capture = useCallback(() => {
        // @ts-ignore
        const imageSrc = webcamRef?.current?.getScreenshot();

        // const img = new Image();
        // img.src = imageSrc;
        // img.onload = () => {
        //     const canvas = document.createElement('canvas');
        //     const ctx = canvas.getContext('2d');
        //     const scaleFactor = 0.5;
        //
        //     canvas.width = img.width * scaleFactor;
        //     canvas.height = img.height * scaleFactor;
        //
        //     // @ts-ignore
        //     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        //
        //
        //     const resizedImageSrc = canvas.toDataURL('image/jpeg');
            setCourseImages(debug ? IMAGE_1 : imageSrc);
            console.log("imageSrc", imageSrc)
            router.push('/universe-chooser');
    }, [webcamRef, setCourseImages, router]);

    const videoConstraints = {
        facingMode: {exact: "environment"}
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

const IMAGE_1 = "data:image/jpeg;base64,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"
