"use client"

import {useRouter, useSearchParams} from 'next/navigation';
import {Suspense} from "react";
import {useGlobalStore} from "@/state/store";
import {Button} from "@/components/ui/button";

const ResultPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const feedback = useGlobalStore((state) => state.feedback);
    const response = searchParams.get('response')

    // Determine the image and feedback based on the response
    const needNewExercice = response === "image1" || response === "image2"

    feedback.comments = [
        "Llorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Llorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Llorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Llorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Llorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    ]

    console.log("feedback", feedback)
    return (
        <div className=" items-center justify-center min-h-screen py-2 space-y-5">
            <h1 className="text-sm font-bold text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
            </h1>

            <h3 className="text-xs font-bold text mb-4">
                Partie n°1
            </h3>

            <div className="flex items-center">
                <img src="feedback.png" alt="feedback" className="w-1/5 block mx-auto"/>

                <p className="text-xs text-justify">
                    {feedback.comments[0]}
                </p>
            </div>

            {feedback.comments.slice(1).map((comment, index) =>
                index === 3 ? (
                    <>
                        <h3 className="text-xs font-bold text mb-4">
                            Partie n°{index + 2}
                        </h3>
                        <div className="flex items-center">
                            <p key={index} className="text-xs text-justify">
                                {comment}
                            </p>
                            <img src="feedbackbis.png" alt="feedback" className="w-1/5 block ml-4"/>
                        </div>
                    </>
                ) : (
                    <>
                        <h3 className="text-xs font-bold text mb-4">
                            Partie n°{index + 2}
                        </h3>
                        <p key={index} className="text-xs text-justify">
                            {comment}
                        </p>
                    </>
                )
            )}


            <div className="bottom-0 left-0 right-0 mb-4 flex justify-center">
                {needNewExercice ? (
                    <Button
                        variant={"secondary"}
                        className={"text-white"}
                        onClick={() => router.push('/new-exercice')}
                    >
                        Faire un nouvel exercice
                    </Button>
                ) : (
                    <Button
                        variant={"secondary"}
                        className={"text-white"}
                        onClick={() => router.push('/new-skill')}
                    >
                        Scan un nouveau devoir
                    </Button>
                )}
            </div>

        </div>
    );
};


const ResultPageSuspended = () => {
    return (
        <Suspense>
            <ResultPage/>
        </Suspense>
    )
}
export default ResultPageSuspended;
