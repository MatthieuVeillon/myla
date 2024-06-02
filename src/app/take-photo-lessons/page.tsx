"use client"
import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import {useRouter} from 'next/navigation';
import { useGlobalStore } from '@/state/store';

interface MobilePageProps {
    name: string;
}

const MobilePage: React.FC<MobilePageProps> = ({ name }) => {
    const webcamRef = useRef<any>(null); // Adjust type as needed
    const [showCamera, setShowCamera] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null); // Adjust type as needed
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const setCourseImages = useGlobalStore((state) => state.setCourseImages);
    const router = useRouter();

    const handleButtonClick = () => {
        setShowCamera(true);
    };

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setCourseImages(imageSrc);
            console.log("imageSrc", imageSrc);
            router.push('/universe-chooser');
        }
    }, [webcamRef, setCourseImages, router]);

    return (
        <div className="relative flex flex-col h-screen justify-between bg-cover bg-center p-4">
            {showCamera ? (
                <>
                    <div className="flex flex-col items-center justify-center flex-grow">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full max-w-md rounded-md overflow-hidden"
                        />
                        <div className="flex justify-between mt-4">
                            <button onClick={capture} className="px-4 py-2 bg-blue-500 text-white rounded-md">Prend une photo</button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* Your existing non-camera UI */}
                </>
            )}
        </div>
    );
};

export default MobilePage;
