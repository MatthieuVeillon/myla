"use client"

import {Button} from '@/components/ui/button';
import React from 'react';
import {useRouter} from "next/navigation";


const HomeComponent = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-between max-h-screen">
            <div className="text-center">
                <h2 className="text-3xl" style={{color: '#4E6F63'}}>Hello 👋</h2>
                <h3 className="text-4xl font-bold" style={{color: '#4E6F63'}}>{"Moi c'est MYLA"}</h3>
            </div>
            <div className="w-3/4 max-w-full mx-auto mt-10">
                <img src="welcome.png" alt="Image" className="w-full h-auto block"/>
            </div>
            <div>
                <Button variant={"secondary"} className={"text-white mt-4"} onClick={() => router.push('/take-photo-lessons')} style={{fontSize: '18px', padding: '5px 10px'}}>➔ On fait connaissance ?</Button>
            </div>
        </div>
    );
}

export default HomeComponent;
