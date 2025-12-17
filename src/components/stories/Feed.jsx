import '../../index.css';
import { useStoryService } from '../../hooks/useStoryService';
import { useEffect, useRef, useState } from 'react';
import StoryCard from './StoryCard';
import { where } from 'firebase/firestore';
import { useDetectScroll } from '../../hooks/useDetectScroll';

export default function Feed({ situation }) {
    const { loadFirstPage, loadNextPage } = useStoryService();
    const storiesRef = useRef([]);
    const [isLoadingStories, setIsLoadingStories] = useState(false);
    const { isAtEnd } = useDetectScroll();
    const [isAllLoaded, setIsAllLoaded] = useState(false);
    const [loadMoreClickCounter, setLoadMoreClickCounter] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function getStoriesFirstPage() {
            setIsLoadingStories(true);
            // console.log("situation: " + JSON.stringify(situation, null, 2))
            const result = await loadFirstPage([where("situationId", "==", situation.id)])
            if (!result) {
                setMessage("There was an error loading the page. Please try again later.");
                return;
            }

            if (result.length < 10) setIsAllLoaded(true);
            storiesRef.current = result;
            setIsLoadingStories(false);
        }

        setIsAllLoaded(false);
        getStoriesFirstPage();

    }, [situation]);

    useEffect(() => {
        // console.log("isAtEnd: " + isAtEnd)
        async function getStoriesNextPage() {
            setIsLoadingStories(true);
            const result = await loadNextPage([where("situationId", "==", situation.id)]);

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

        if (isAtEnd || loadMoreClickCounter > 0) {
            getStoriesNextPage();
        }
    }, [isAtEnd, loadMoreClickCounter]);

    function handleLoadMoreClick(isAllLoaded) {
        if (isAllLoaded) return;
        setLoadMoreClickCounter(prev => (prev + 1));
    }

    return (
        <div className='mt-6'>
            {storiesRef.current.length > 0 ?
                <div className='grid'>
                    {storiesRef.current.map(s =>
                        <div key={s.id}>
                            <StoryCard story={s} />
                            <hr className='mt-10 mb-4 border-t-2 border-gray-200' />
                        </div>
                    )}
                    <span
                        className={`text-center`}
                        onClick={() => handleLoadMoreClick(isAllLoaded)}
                    >
                        {isLoadingStories ? "Loading..." : (isAllLoaded ? "End of feed" : "Scroll to load more...")}<br/>{message}
                    </span>
                </div> :
                <div className='flex flex-col w-full text-center'>{isLoadingStories ? "Loading..." : "There are no stories yet."}<br/>{message}</div>
                
            }
        </div>
    );
}