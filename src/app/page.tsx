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

    const capture = useCallback(async () => {
        // @ts-ignore
        const imageSrc = webcamRef?.current?.getScreenshot();
        setCourseImages(imageSrc);

        const requestBody = {
            courseImages: imageSrc,
            theme: 'Harry Potter', //todo replace theme with the actual theme
        };


        router.push('/universe-chooser');
    }, [webcamRef, setImgSrc, router]);

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
