import { useEffect, useState } from 'react';
import Feed from '../components/stories/Feed';
import '../index.css';
import { useParams } from "react-router";
import CreateStoryModal from '../components/stories/CreateStoryModal';
import { useTranslation } from 'react-i18next';
import Typewriter from '../components/custom-inputs/Typewriter';
import { useSituationService } from '../hooks/useSituationService';
import { useDetectScroll } from '../hooks/useDetectScroll';

export default function Stories() {
    const params = useParams();
    const situationid = params.situationid;
    const { loadById, loading } = useSituationService();
    const [situation, setSituation] = useState({})
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation("views");
    const { isScrollingUp } = useDetectScroll();

    useEffect(() => {
        async function getSituationById() {
            if (loading && !situationid) return;
            const result = await loadById(situationid);
            setSituation(result);
        }

        getSituationById();
    }, [situationid]);

    return (
        <div>
            {loading ?
                <div className='grid grid-col justify-center mt-10'>Loading...</div> :
                <div>
                    <div className={`sticky ${isScrollingUp ? "top-14" : "top-2"} z-40 py-4 grid grid-col justify-center`}>
                            <div className='pill-feed-title'>
                               <Typewriter text={situation.name} />
                            </div>
                        </div>
                    <div className='grid grid-col justify-center mt-2'>
                        <div className='text-center'>
                            <div className='flex justify-center'>
                                <CreateStoryModal isOpen={isOpen} setIsOpen={setIsOpen} situation={situation} />
                            </div>
                            <span className='underline cursor-pointer' onClick={() => setIsOpen(true)}>{t('add_story_button')}</span>
                        </div>
                        <Feed situation={situation} />
                    </div>
                </div>
            }
        </div>
    );
}

