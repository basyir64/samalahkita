import { useEffect, useState, useRef } from 'react';
import Feed from '../components/stories/Feed';
import '../index.css';
import { useParams } from "react-router";
import CreateStoryModal from '../components/stories/CreateStoryModal';
import { useTranslation } from 'react-i18next';
import Typewriter from '../components/custom-inputs/Typewriter';
import { useSituationService } from '../hooks/useSituationService';
import { useDetectScroll } from '../hooks/useDetectScroll';
import { useMediaService } from '../hooks/useMediaService';
import { Link } from 'react-router';

export default function Stories() {
    const params = useParams();
    const situationid = params.situationid;
    const { loadAll } = useSituationService();
    const [situation, setSituation] = useState({})
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation("views");
    const { isScrollingUp } = useDetectScroll();
    const { SYSTEM_ICON_BASE_URL } = useMediaService();
    const situationsRef = useRef([]);
    const [isSituationsLoading, setIsSituationsLoading] = useState(true);

    // Fetch all situations only once on this page and pass it down 
    // to Stories -> CreateStoryModal -> ModalPage2 -> OtherSituationsMarquee via ref
    useEffect(() => {
        async function getAllSituations() {
            console.log("fetching...");
            const result = await loadAll();
            if (!result) return;
            situationsRef.current = result;
            const situationMatch = result.find(s => (s.id === situationid));
            setSituation(situationMatch);
            // setTimeout(() => { setIsSituationsLoading(false) }, 3000)
            setIsSituationsLoading(false);
        }

        getAllSituations();
    }, []);

    function handleGetRandomSituationClick(currentSituation) {
        let randomSituation = getRandomSituation();
        while (randomSituation.id === currentSituation.id) {
            randomSituation = getRandomSituation();
        }
        setSituation(randomSituation);
    }

    function getRandomSituation() {
        return situationsRef.current[Math.floor(Math.random() * situationsRef.current.length)];
    }

    return (
        <div className='grid'>
            {isSituationsLoading ?
                <div className='text-center'>Loading...</div> :
                <div className='mx-auto px-6 max-w-3xl'>
                    <div className={`sticky ${isScrollingUp ? "top-14" : "top-2"} z-40 py-4 flex gap-3 justify-center`}>
                        <div key={situation.name} className='pill-feed-title'>
                            <Typewriter text={situation.name} />
                        </div>
                    </div>
                    <div className=''>
                        <div className='text-center'>
                            <div className='flex justify-center'>
                                <CreateStoryModal isOpen={isOpen} setIsOpen={setIsOpen} situation={situation} situationsRef={situationsRef} />
                            </div>
                        </div>
                        <Feed situation={situation} />
                    </div>
                    <div className={`sticky bottom-4 z-40 mt-8 flex gap-3 justify-center transition-transform duration-300 ${isScrollingUp ? "translate-y-0" : "translate-y-30"}`}>
                        <div className='pill-feed-addstory gap-2' onClick={() => setIsOpen(true)}>
                            <img src={`${SYSTEM_ICON_BASE_URL}/quill-pen-svgrepo-com.svg`} className='w-[24px]' />
                            Cerita Baru
                        </div>
                        <Link to="/">
                            <div className='pill-feed-addstory'>
                                <img src={`${SYSTEM_ICON_BASE_URL}/home-svgrepo-com.svg`} className='w-[24px]' /> 
                            </div>
                        </Link>
                        <div className='pill-feed-addstory' onClick={() => handleGetRandomSituationClick(situation)}>
                            <img src={`${SYSTEM_ICON_BASE_URL}/double-quotes-svgrepo-com.svg`} className='w-[24px]' /> 
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

