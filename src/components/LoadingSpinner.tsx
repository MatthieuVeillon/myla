import React, {FC} from 'react';
import {Loader2} from "lucide-react";

interface LoadingSpinnerProps {
    isAnalyzed?: boolean;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({isAnalyzed}) => {
    const text = isAnalyzed ? "Tes héros regardent avec attention ta solution, merci d'être patient avec eux ! " : "Ca prend un peu de temps pour contacter tes héros, promis on essaye d'améliorer ca :)\"";

    return (
        <div className="min-h-screen w-full flex justify-center items-center flex-col gap-8">
            <Loader2 className="mr-2 h-20 w-20 animate-spin text-secondary"/>
            <span className="text-secondary text-xl"> {text}</span>
        </div>
    );
};

export default LoadingSpinner;
