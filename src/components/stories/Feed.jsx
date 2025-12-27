import '../../index.css';
import { useStoryService } from '../../hooks/useStoryService';
import { useEffect, useRef, useState } from 'react';
import StoryCard from './StoryCard';
import { where } from 'firebase/firestore';
import { useDetectScroll } from '../../hooks/useDetectScroll';
import { useTranslation } from 'react-i18next';

export default function Feed({ situation, setSituation, allSituationsContextRef }) {
    const { loadFirstPage, loadNextPage } = useStoryService();
    const storiesRef = useRef([]);
    const [isLoadingStories, setIsLoadingStories] = useState(false);
    const { isAtEnd } = useDetectScroll();
    const [isAllLoaded, setIsAllLoaded] = useState(false);
    const [message, setMessage] = useState("");
    const {t} = useTranslation();

    useEffect(() => {
        async function getStoriesFirstPage() {
            setIsAllLoaded(false);
            setIsLoadingStories(true);
            // console.log("situation: " + JSON.stringify(situation, null, 2))
            const result = await loadFirstPage(situation ? [where("situationId", "==", situation.id)] : []);
            // console.log("first page: " + JSON.stringify(result, null, 2))
            if (!result) {
                setMessage("There was an error loading the page. Please try again later.");
                return;
            }

            if (result.length < 10) {
                setIsAllLoaded(true);
            }
            storiesRef.current = result;
            setIsLoadingStories(false);
        }

        getStoriesFirstPage();
        return () => {storiesRef.current = []}
    }, [situation]);

    useEffect(() => {
        // console.log("isAtEnd: " + isAtEnd)
        async function getStoriesNextPage() {
            // console.log("isAllLoaded: " + isAllLoaded)
            setIsLoadingStories(true);
            const result = await loadNextPage(situation ? [where("situationId", "==", situation.id)] : []);
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
    }, [isAtEnd, isAllLoaded]);

    return (
        <div className='mt-6 dark:text-gray-300'>
            {storiesRef.current.length > 0 ?
                <div className='grid'>
                    {storiesRef.current.map((s, i) =>
                        <div key={i + s.id}>
                            <StoryCard story={s} situation={allSituationsContextRef?.current.find(sit => (sit.id === s.situationId))} setSituation={setSituation} />
                            <hr className='mt-10 mb-4 border-t-2 border-gray-200 dark:border-gray-800' />
                        </div>
                    )}
                    <span
                        className={`text-center`}
                    >
                        {isLoadingStories ? "Loading..." : (isAllLoaded ? t("end_ind") : t("scroll_for_more_ind"))}<br/>{message}
                    </span>
                </div> :
                <div className='flex flex-col w-full text-center'>{isLoadingStories ? "Loading..." : t("no_stories_ind")}<br/>{message}</div>
                
            }
        </div>
    );
}