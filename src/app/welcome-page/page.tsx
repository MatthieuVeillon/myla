import {Button} from '@/components/ui/button';
import React from 'react';

interface Props {
    onClick: () => void;
}

const HomeComponent: React.FC<Props> = ({onClick}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-3xl" style={{color: '#4E6F63'}}>Hello 👋</h2>
                <h3 className="text-4xl font-bold" style={{color: '#4E6F63'}}>{"Moi c'est MYLA"}</h3>
            </div>
            <div className="text-center mt-10"></div>
            <div>
                <img src="welcome.png" alt="Image"/>
            </div>
            <div>
                <Button variant={"secondary"} className={"text-white mt-4 big-button"} onClick={onClick}
                        style={{fontSize: '18px', padding: '13px 20px'}}>➔ On fait connaissance ?</Button>
            </div>
        </div>
    );
}

export default HomeComponent;
