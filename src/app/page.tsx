import { Suspense } from 'react';
import HomeComponent from "@/app/welcome-page/page";
import {router} from "next/client"; // Import your loading spinner or any other fallback UI component

const WebcamCaptureSuspended = () => {
    return (
        <Suspense >
            <HomeComponent />
        </Suspense>
    );
};

export default WebcamCaptureSuspended;
