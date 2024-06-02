"use client"

import {useGlobalStore} from "@/state/store";

const ResultPage = () => {
    const feedback = useGlobalStore((state) => state.feedback);
    return (
        <div className=" items-center justify-center min-h-screen py-2 space-y-5">
            <h1 className="text font-bold text-justify">
                {feedback.summary}
            </h1>

            <h3 className="text font-bold text mb-4">
                Partie n°1
            </h3>

            <div className="flex items-center">
                <img src="feedback.png" alt="feedback" className="w-1/5 block mx-auto"/>
                <p className="text-sm text-justify">
                    {feedback.comments[0]}
                </p>
            </div>

            {feedback.comments.slice(1).map((comment, index) =>
                index === 3 ? (
                    <>
                        <h3 className="font-bold text mb-4">
                            Partie n°{index + 2}
                        </h3>
                        <div className="flex items-center">
                            <p key={index} className="text-sm text-justify">
                                {comment}
                            </p>
                            <img src="feedbackbis.png" alt="feedback" className="w-1/5 block ml-4"/>
                        </div>
                    </>
                ) : (
                    <>
                        <h3 className="font-bold text mb-4">
                            Partie n°{index + 2}
                        </h3>
                        <p key={index} className="text-sm text-justify">
                            {comment}
                        </p>
                    </>
                )
            )}
        </div>
    );
};

export default ResultPage;
