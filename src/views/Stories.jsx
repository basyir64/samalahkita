import { useState } from 'react';
import Feed from '../components/stories/Feed';
import '../index.css';
import { useParams } from "react-router";
import CreateStoryModal from '../components/stories/CreateStoryModal';
import { useTranslation } from 'react-i18next';
import Typewriter from '../components/custom-inputs/Typewriter';

export default function Stories() {
    const params = useParams();
    //get situation by param id from marquee
    const [situation, setSituation] = useState({ id: params.situationid, text: "semua adik beradik lain jantina" });
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation("views");

    return (
        <div className=''>
            <div className='grid grid-col justify-center mt-10'>
                <div className='text-center'>
                    <Typewriter text={situation.text} />
                    <span className='underline cursor-pointer' onClick={() => setIsOpen(true)}>{t('add_story_button')}</span>
                </div>
                <CreateStoryModal isOpen={isOpen} setIsOpen={setIsOpen} situation={situation} />
            </div>
            <Feed />
        </div>
    );
}

