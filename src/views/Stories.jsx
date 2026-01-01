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
import { useSearchParams, useOutletContext } from 'react-router';
import SituationsSearchBar from '../components/search-bar/SituationsSearchBar';
import { useNavigate } from 'react-router';
import HomeSearchBar from '../components/custom-inputs/HomeSearchBar';

export default function Stories() {
    const params = useParams();
    const situationid = params.situationid;
    const [searchParams] = useSearchParams();
    const { loadAll } = useSituationService();
    const [situation, setSituation] = useState({})
    const [isOpen, setIsOpen] = useState(searchParams.get('modal') === 'true');
    const { t } = useTranslation("views");
    const { setIsScrollingUp } = useDetectScroll();
    const { SYSTEM_ICON_BASE_URL } = useMediaService();
    const { allSituationsContextRef } = useOutletContext();
    const [isSituationsLoading, setIsSituationsLoading] = useState(true);
    const { setIsFaceTitleVisible } = useOutletContext();
    const [isSingleFeedMode, setIsSingleFeedMode] = useState(true);
    const { navigate } = useNavigate();

    useEffect(() => {
        async function getAllSituations() {
            // console.log("fetching situations from stories...");
            const result = await loadAll();
            if (!result) return;
            allSituationsContextRef.current = result;
            const situationMatch = result.find(s => (s.id === situationid));
            setSituation(situationMatch);
            setIsSituationsLoading(false);
        }

        // this is just a fallback. from local tests, it seems the context ref should always be available from anywhere in the page (fetched from Layout) even by copying and pasting the link
        if (allSituationsContextRef.current.length === 0) getAllSituations();
        else {
            const situationMatch = allSituationsContextRef.current.find(s => (s.id === situationid));
            setSituation(situationMatch);
            setIsSituationsLoading(false);
        }

        if (searchParams.get('singleFeedMode') === 'false') {
            setIsSingleFeedMode(false);
            setSituation(null);
        }
        setIsFaceTitleVisible(false);
        setIsScrollingUp(true);
    }, []);

    function handleFeedModeClick(currentSituation) {
        // random stories feed mode : one situation feed mode
        setIsSingleFeedMode(currentSituation ? false : true);
        setSituation(currentSituation ? null : allSituationsContextRef.current.find(s => (s.id === situationid)));
    }

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div className='grid'>
            {isSituationsLoading ?
                <div className='text-center'>Loading...</div> :
                <div className='mx-auto px-6 max-w-3xl'>
                    {situation && <div className={`sticky top-14 z-40 py-4 flex gap-3 justify-center`}>
                        <div key={situation.name} className='pill-feed-title'>
                            <Typewriter text={situation.name} />
                        </div>
                    </div>}
                    <div className='flex justify-center tracking-[0.1em] text-sm text-gray-500'>
                        {isSingleFeedMode ? t("feed_title1") : t("feed_title2")}
                    </div>
                    <div className='mb-4'>
                        {situation && <div className='text-center'>
                            <div className='flex justify-center'>
                                <CreateStoryModal isOpen={isOpen} setIsOpen={setIsOpen} situation={situation} situationsRef={allSituationsContextRef} />
                            </div>
                        </div>}
                        <Feed situation={situation} setSituation={setSituation} allSituationsContextRef={situation ? null : allSituationsContextRef} />
                    </div>
                    <div className={`sticky bottom-4 z-40 transition-opacity duration-300 ${"opacity-100"}`}>
                        {isSearchOpen &&
                            <div className='mb-3 flex justify-center'>
                                <div className=''>
                                    <HomeSearchBar isResultOnTop={true} />
                                </div>
                            </div>
                        }
                        <div className='flex gap-3 justify-center '>
                            {situation && <div className={`pill-feed-addstory py-[10px] gap-2 ${"cursor-pointer"}`} onClick={() => setIsOpen(true)}>
                                <img src={`${SYSTEM_ICON_BASE_URL}/quill-pen-svgrepo-com.svg`} className='w-[22px]' />
                                {t("new_story_button")}
                            </div>}
                            <div
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className={
                                    `inline-flex
                                    text-[#030000] py-[12px] px-[15px]
                                    rounded-[25px] hover:bg-[#f1efe3] backdrop-blur-md
                                    duration-500 shadow-[0px_0px_5px_rgba(0,0,0,0.3)]
                                     dark:text-gray-300 dark:shadow-white dark:border-black dark:hover:bg-gray-800 cursor-pointer
                                    ${isSearchOpen ? "bg-[#f1efe3] dark:bg-gray-800" : "bg-white/10 dark:bg-black/10"}`
                                }>
                                <img src={`${SYSTEM_ICON_BASE_URL}/search-svgrepo-com.svg`} className='w-[20px]' />
                            </div>
                            <div
                                className={
                                    `inline-flex
                                    text-[#030000] py-[12px] px-[15px]
                                    rounded-[25px] hover:bg-[#f1efe3] backdrop-blur-md
                                    duration-500 shadow-[0px_0px_5px_rgba(0,0,0,0.3)]
                                     dark:text-gray-300 dark:shadow-white dark:border-black dark:hover:bg-gray-800 cursor-pointer ${isSingleFeedMode ? "bg-[#f1efe3] dark:bg-gray-800" : "bg-white/10 dark:bg-black/10"}`
                                } onClick={() => handleFeedModeClick(situation)}>
                                <img src={`${SYSTEM_ICON_BASE_URL}/double-quotes-svgrepo-com.svg`} className='w-[20px]' />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

