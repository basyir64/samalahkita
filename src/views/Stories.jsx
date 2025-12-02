import { useState } from 'react';
import Feed from '../components/stories/Feed';
import '../index.css';
import { useParams } from "react-router";
import CreateStoryModal from '../components/stories/CreateStoryModal';
import { useTranslation } from 'react-i18next';

export default function Stories() {
    const params = useParams();
    //get situation by param id from marquee
    const situation = { id: params.situationid, text: "ehvwfoiu23g 984cq72341032" };
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation("views");

    return (
        <div className=''>
            <div className='grid grid-col justify-center my-20'>
                <div className='text-center'>
                    <div>
                        {situation.id} : {situation.text}
                    </div>
                    {/* <div className='pill-button' onClick={() => setOpen(true)}>
                        + Cerita Baru
                    </div> */}
                    <span className='underline cursor-pointer' onClick={() => setIsOpen(true)}>{t('add_story_button')}</span>
                </div>
                <CreateStoryModal isOpen={isOpen} setIsOpen={setIsOpen} situation={situation} />
            </div>
            <Feed />
        </div>
    );
}