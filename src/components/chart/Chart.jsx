import '../../index.css'
import useDateFormatter from '../../hooks/useDateFormatter';
import { useSituationService } from '../../hooks/useSituationService';
import { useStoryService } from '../../hooks/useStoryService';
import { useState, useEffect } from 'react';
import { orderBy, limit } from 'firebase/firestore';

export default function Chart() {
    const now = new Date();
    const { formattedDate, formattedTime } = useDateFormatter(now);

    const { countAllSituations, loadByQuery } = useSituationService();
    const { countAllStories, sumAllViews } = useStoryService();
    const [isCountAllLoading, setIsAllCountLoading] = useState(true);
    const [isRankingLoading, setIsRankingLoading] = useState(true);
    const [counts, setCounts] = useState({ situation: "-", story: "-", view: "-" });
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        async function getAllSituationCount() {
            const result = await countAllSituations();
            if (!result) {
                setIsAllCountLoading(false);
                return;
            }
            setCounts(prev => (
                { ...prev, situation: result }
            ));
        }

        async function getAllStoryCount() {
            const result = await countAllStories();
            if (!result) {
                setIsAllCountLoading(false);
                return;
            }
            setCounts(prev => (
                { ...prev, story: result }
            ));
        }

        async function getSumOfStoryViews() {
            const result = await sumAllViews();
            if (!result) {
                setIsAllCountLoading(false);
                return;
            }
            setCounts(prev => (
                { ...prev, views: result }
            ));
        }

        async function getSituationRanking() {
            const result = await loadByQuery([orderBy("storiesCount", "desc"), limit(10)])
            if (!result) {
                setIsRankingLoading(false);
                return;
            }
            // console.log(JSON.stringify(result, null, 2))
            setRanking(result);
            setIsRankingLoading(false);
        }

        getAllSituationCount();
        getAllStoryCount();
        getSumOfStoryViews();
        setTimeout(() => {
            setIsAllCountLoading(false);
        }, 3000)
        
        getSituationRanking();
    }, []);

    return (
        <div className='mt-12 grid grid-col justify-center text-center'>
            <div className='text-gray-500 tracking-[0.1em]'>Carta Setakat {formattedTime}, {formattedDate} </div>
            {isCountAllLoading ?
                <div className='my-2'>Loading...</div> :
                <div className='flex justify-center mt-4 gap-4'>
                    <div>
                        <div className='text-3xl font-bold'>{counts.situation}</div>
                        <div className=''>Situasi</div>
                    </div>
                    <div>
                        <div className='text-3xl font-bold'>{counts.story}</div>
                        <div className=''>Cerita</div>
                    </div>
                    <div>
                        <div className='text-3xl font-bold'>{counts.views}</div>
                        <div className=''>Bacaan</div>
                    </div>
                </div>
                }
            <div className='mt-6'>
                {isRankingLoading ?
                    <div>Loading...</div> :
                    ranking.map((situation, i) => (
                        <div className='flex justify-between gap-4'>
                            <div className='flex my-1'>
                                <div className='text-gray-500 mx-4'>#{i + 1} </div>
                                <div>{situation.name}</div>
                            </div>
                            <div className='flex my-1'>
                                d
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}