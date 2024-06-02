import React, {FC} from 'react';
import {Loader2} from "lucide-react";

interface LoadingSpinnerProps {
    isAnalyzed?: boolean;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({isAnalyzed}) => {
    return (
        <div className="min-h-screen w-full flex justify-center items-center flex-col gap-8">
            <Loader2 className="mr-2 h-20 w-20 animate-spin text-secondary"/>
            <span className="text-secondary text-xl"> {"Ca prend un peu de temps pour contacter tes héros, promis on essaye d'améliorer ca :)"}</span>
        </div>
    );
};

export default LoadingSpinner;
