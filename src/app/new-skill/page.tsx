import React, {FC} from 'react';
import {Button} from "@/components/ui/button";

interface NewSkillPageProps {
}

const NewSkillPage: FC<NewSkillPageProps> = ({}) => {
    return (
        <div className='flex flex-col gap-10'>
            <h1 className="text-2xl font-semibold mb-20 mt-5">Proposition de nouvel exercice</h1>
            <Button size="lg" className="text-xl"> Probabilité avancée</Button>
            <Button size="lg" className="text-xl"> Pythagore</Button>
        </div>
    );
};

export default NewSkillPage;
