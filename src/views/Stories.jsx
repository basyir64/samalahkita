import { useEffect, useState } from 'react';
import Feed from '../components/stories/Feed';
import '../index.css';
import { useParams } from "react-router";
import CreateStoryModal from '../components/stories/CreateStoryModal';
import { useTranslation } from 'react-i18next';
import Typewriter from '../components/custom-inputs/Typewriter';
import { useSituationService } from '../hooks/useSituationService';
import { where } from 'firebase/firestore';

export default function Stories() {
    const params = useParams();
    const situationid = params.situationid;
    const { loadById, loading } = useSituationService();
    const [situation, setSituation] = useState({})
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation("views");

    useEffect(() => {   
        async function getSituationById() {
            if (loading && !situationid) return;
            const result = await loadById(situationid);
            setSituation(result);
        }   

        getSituationById();
    }, [situationid]);

    return (
        <div className=''>
            <div className='grid grid-col justify-center mt-10'>
                <div className='text-center'>
                    {loading ? <>Loading...</> :
                        <div>
                            <Typewriter text={situation.name} />
                            <CreateStoryModal isOpen={isOpen} setIsOpen={setIsOpen} situation={situation} />
                        </div>
                    }
                    <span className='underline cursor-pointer' onClick={() => setIsOpen(true)}>{t('add_story_button')}</span>
                </div>
            </div>
            <Feed />
        </div>
    );
}

