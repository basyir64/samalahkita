import '../../index.css';
import { useStoryService } from '../../hooks/useStoryService';
import { useEffect, useRef, useState } from 'react';
import StoryCard from './StoryCard';
import { where, orderBy } from 'firebase/firestore';
import { useDetectScroll } from '../../hooks/useDetectScroll';
import { useTranslation } from 'react-i18next';
import { useMediaService } from '../../hooks/useMediaService';

export default function Feed({ situation, setSituation, allSituationsContextRef, isSingleFeedMode }) {
    const { loadFirstPage, loadNextPage } = useStoryService();
    const storiesRef = useRef([]);
    const [isLoadingStories, setIsLoadingStories] = useState(false);
    const { isAtEnd } = useDetectScroll();
    const [isAllLoaded, setIsAllLoaded] = useState(false);
    const [message, setMessage] = useState("");
    const { t } = useTranslation();
    const [isSortDateDesc, setIsSortDateDesc] = useState(true);
    const { SYSTEM_ICON_BASE_URL } = useMediaService()

    useEffect(() => {
        async function getStoriesFirstPage() {
            setIsAllLoaded(false);
            setIsLoadingStories(true);
            // console.log("fetching stories")

            const result = await loadFirstPage([
                (situation && where("situationId", "==", situation.id)),
                orderBy("createdAt", isSortDateDesc ? "desc" : "asc")]);

            // console.log("first page: " + JSON.stringify(result, null, 2))
            if (!result) {
                setMessage("There was an error loading the page. Please try again later.");
                return;
            }

            if (result.length < 5) {
                setIsAllLoaded(true);
            }
            storiesRef.current = result;
            setIsLoadingStories(false);
        }

        getStoriesFirstPage();
        return () => { storiesRef.current = [] }
    }, [situation, isSortDateDesc]);

    function handleDateSortClick() {
        storiesRef.current = [];
        setIsSortDateDesc(prev => (!prev));
    }

    useEffect(() => {
        // console.log("isAtEnd: " + isAtEnd)
        async function getStoriesNextPage() {
            // console.log("isAllLoaded: " + isAllLoaded)
            setIsLoadingStories(true);

            const result = await loadNextPage([
                (situation && where("situationId", "==", situation.id)),
                orderBy("createdAt", isSortDateDesc ? "desc" : "asc")]);

            // console.log("next page: " + JSON.stringify(result, null, 2))
            if (!result) {
                setMessage("There was an error loading more stories. Please try again later.");
                return;
            }
            if (result.length === 0) {
                setIsAllLoaded(true);
                setIsLoadingStories(false);
                return;
            }
            storiesRef.current.push(...result);
            setIsLoadingStories(false);
        }

        if (isAtEnd && !isAllLoaded && storiesRef.current.length != 0) {
            // console.log("executing next")
            // console.log("isAllLoaded: " + isAllLoaded)
            getStoriesNextPage();
        }
    }, [isAtEnd, isAllLoaded, isSortDateDesc]);

    return (
        <div className='mt-2 dark:text-gray-300'>
            <div className='flex justify-between'>
                <div className='text-gray-500'>{isSingleFeedMode ? t("feed_title1") : t("feed_title2")}</div>
                <div className='flex gap-1 cursor-pointer underline' onClick={() => handleDateSortClick()}>
                    <img src={`${SYSTEM_ICON_BASE_URL}/${isSortDateDesc ? "down-svgrepo-com.svg" : "up-svgrepo-com.svg"}`} className='w-[22px]' />
                    {t("date")}
                </div>
            </div>
            {storiesRef.current.length > 0 ?
                <div className='grid mt-4'>
                    {storiesRef.current.map((s, i) =>
                        <div key={i + s.id}>
                            <StoryCard story={s} situation={allSituationsContextRef?.current.find(sit => (sit.id === s.situationId))} setSituation={setSituation} />
                            <hr className='mt-10 mb-4 border-t-2 border-gray-200 dark:border-gray-800' />
                        </div>
                    )}
                    <span
                        className={`text-center`}
                    >
                        {isLoadingStories ? "Loading..." : (isAllLoaded ? t("end_ind") : t("scroll_for_more_ind"))}<br />{message}
                    </span>
                </div> :
                <div className='flex flex-col w-full text-center text-gray-500 mt-10'>{isLoadingStories ? "Loading..." : t("no_stories_ind")}<br />{message}</div>

            }
        </div>
    );
}