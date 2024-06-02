"use client"
import React, {useCallback, useRef, useState} from 'react';
import Webcam from 'react-webcam';
import {useRouter} from 'next/navigation';
import {useGlobalStore} from '@/state/store';
import {Button} from "@/components/ui/button";
import Image from 'next/image';

const MobilePage = () => {
    const name = "Léo"
    const webcamRef = useRef<any>(null); // Adjust type as needed
    const [showCamera, setShowCamera] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null); // Adjust type as needed
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const setCourseImages = useGlobalStore((state) => state.setCourseImages);
    const router = useRouter();

    const handleButtonClick = () => {
        setShowCamera(true);
    };

    const videoConstraints = {
        facingMode: {exact: "environment"}
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
        <div className="relative flex flex-col h-screen justify-between bg-cover bg-center">
            {showCamera ? (
                <>
                    <div className="flex flex-col items-center justify-center flex-grow">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            className="w-full max-w-md rounded-md overflow-hidden"
                        />
                        <div className="flex justify-between mt-4">
                            <Button onClick={capture} className="px-4 py-2 bg-blue-500 text-white rounded-md">Prend une
                                photo
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* Top left corner content */}
                    <div className="relative flex items-center space-x-2">
                        {/* Round image profil */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                        </svg>

                        <span className="text-lg font-semibold" style={{color: '#4E6F63'}}>Bonjour {name}, </span>
                    </div>

                    {/* Centered content */}
                    <div className="relative flex flex-col justify-center items-center ">
                        <Image src="/hello.png" alt="hello" width={200} height={200}/>
                    </div>

                    {/* Bottom centered content */}
                    <div className="relative flex flex-col justify-center items-center">
                        <h3 className="relative flex flex-col justify-center items-center "
                            style={{color: '#4E6F63'}}>{"ON S'Y MET ?"}</h3>
                        <h1 className="relative flex flex-col justify-center items-center flex-grow text-2xl font-bold"
                            style={{color: '#4E6F63'}}>Prends une photo</h1>
                        <h3 className="relative flex flex-col justify-center items-center flex-grow text-lg"
                            style={{color: '#4E6F63'}}>de ton cours</h3>
                    </div>

                    {/* Bottom centered icon button */}
                    <div className="relative flex justify-center" style={{color: '#4E6F63'}}>
                        <button onClick={handleButtonClick}
                                className="flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-md backdrop-blur-lg backdrop-brightness-50">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-12">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"/>
                            </svg>
                        </button>
                    </div>

                    <div
                        className="flex flex-col w-full justify-center items-center text-secondary font-semibold gap-2">
                        <span>ou choisissez des cours deja préparés</span>
                        <Button variant="secondary" className="text-white min-w-60" size="lg">Multiples et diviseurs</Button>
                        <Button variant="secondary" className="text-white min-w-60" size="lg">Image et antécédents</Button>

                    </div>
                </>
            )}
        </div>
    );
};

export default MobilePage;
