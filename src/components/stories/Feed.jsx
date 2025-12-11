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

    useEffect(() => {
        async function getStoriesFirstPage() {
            setIsLoadingStories(true);
            const result = await loadFirstPage([where("situationId", "==", situation.id)])
            storiesRef.current = result;
            setIsLoadingStories(false);
        }

        getStoriesFirstPage();
    }, [])

    useEffect(() => {
        console.log("isAtEnd: " + isAtEnd)
        async function getStoriesNextPage() {
            setIsLoadingStories(true);
            const result = await loadNextPage([where("situationId", "==", situation.id)]);
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

    function handleLoadMoreClick(isAllLoaded, loadMoreClickCounter) {
        if (isAllLoaded) return;
        setLoadMoreClickCounter(++loadMoreClickCounter)
    }

    return (
        <div className='flex flex-wrap my-4'>
            {storiesRef.current.length > 0 ?
                <div className='flex flex-col w-full'>
                    {storiesRef.current.map(s =>
                        <div key={s.id}>
                            <StoryCard story={s} />
                            <hr className='my-6 border-t-2 border-gray-200' />
                        </div>
                    )}
                    <span
                        className={`text-center ${!isAllLoaded && " cursor-pointer underline"}`}
                        onClick={() => handleLoadMoreClick(isAllLoaded, loadMoreClickCounter)}
                    >
                        {isLoadingStories ? "Loading..." : (isAllLoaded ? "End of feed" : "Load more")}
                    </span>
                </div> :
                <div className='flex flex-col w-full text-center'>{isLoadingStories ? "Loading..." : "There are no stories yet."}</div>
            }
        </div>
    );
}