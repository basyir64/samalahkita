import { useEffect, useState } from 'react';
import Feed from '../components/stories/Feed';
import '../index.css';
import { useParams } from "react-router";
import CreateStoryModal from '../components/stories/CreateStoryModal';
import { useTranslation } from 'react-i18next';
import Typewriter from '../components/custom-inputs/Typewriter';
import { useSituationService } from '../hooks/useSituationService';
import { useDetectScroll } from '../hooks/useDetectScroll';
import { useMediaService } from '../hooks/useMediaService';

export default function Stories() {
    const params = useParams();
    const situationid = params.situationid;
    const { loadById } = useSituationService();
    const [situation, setSituation] = useState({})
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation("views");
    const { isScrollingUp } = useDetectScroll();
    const [isSituationLoading, setIsSituationLoading] = useState(true)
    const {SYSTEM_ICON_BASE_URL} = useMediaService();

    useEffect(() => {
        async function getSituationById() {
            if (!situationid) return;
            const result = await loadById(situationid);
            setSituation(result);
            setIsSituationLoading(false);
        }

        getSituationById();
    }, [situationid]);
 
    return (
        <div>
            {isSituationLoading ?
                <div className='grid grid-col justify-center mt-10'>Loading...</div> :
                <div>
                    <div className={`sticky ${isScrollingUp ? "top-14" : "top-2"} z-40 py-4 flex gap-3 justify-center`}>
                        <div className='pill-feed-title'>
                            <Typewriter text={situation.name} />
                        </div>
                        <div className='pill-feed-addstory' onClick={() => setIsOpen(true)}>
                            <img src={`${SYSTEM_ICON_BASE_URL}/add-svgrepo-com.svg`} className='w-[20px]' /> 
                        </div>
                    </div>
                    <div className='grid grid-col justify-center '>
                        <div className='text-center'>
                            <div className='flex justify-center'>
                                <CreateStoryModal isOpen={isOpen} setIsOpen={setIsOpen} situation={situation} />
                            </div>
                        </div>
                        <Feed situation={situation} />
                    </div>
                </div>
            }
        </div>
    );
}

