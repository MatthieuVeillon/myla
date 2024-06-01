"use client"

import {useState, useCallback, useRef} from 'react';
import { useRouter } from 'next/navigation';
import Webcam from 'react-webcam';


const WebcamCapture = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const router = useRouter();

    const capture = useCallback(() => {
        // @ts-ignore
        const imageSrc = webcamRef?.current?.getScreenshot();
        setImgSrc(imageSrc);
        router.push('/universe-chooser');
    }, [webcamRef, setImgSrc, router]);

    console.log("imgSrc",imgSrc)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full max-w-md"
            />
            <button onClick={capture} className="mt-4 p-2 bg-blue-500 text-white rounded">
                Capture photo
            </button>
        </div>
    );
};

export default WebcamCapture;
