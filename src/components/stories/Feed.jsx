import '../../index.css';
import { useStoryService } from '../../hooks/useStoryService';
import { useEffect, useState } from 'react';
import StoryCard from './StoryCard';
import { where } from 'firebase/firestore';

export default function Feed({ situation }) {
    const { loadByQuery, loading } = useStoryService();
    const [stories, setStories] = useState([]);

    useEffect(() => {
        async function getStoriesBySituationId() {
            const result = await loadByQuery([where("situationId", "==", situation.id)])
            setStories(result);
        }

        getStoriesBySituationId();
    }, [])

    return (
        <div className='flex flex-wrap my-8'>
            {loading ?
                <div className='text-center'>Loading...</div> :
                <div className='flex flex-col w-full'>
                    {stories.map(s =>
                        <div key={s.id}>
                            <StoryCard story={s}/>
                            <hr className='my-6 border-t-2 border-gray-200'/>
                        </div>
                    )}
                </div>
            }
        </div>
    );
}