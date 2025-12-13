import '../../index.css'
import useDateFormatter from '../../hooks/useDateFormatter';
import { useSituationService } from '../../hooks/useSituationService';
import { useStoryService } from '../../hooks/useStoryService';
import { useState, useEffect } from 'react';
import { orderBy, limit } from 'firebase/firestore';
import { useMediaService } from '../../hooks/useMediaService';

export default function Chart() {
    const now = new Date();
    const { formattedDate, formattedTime } = useDateFormatter(now);
    const {SYSTEM_ICON_BASE_URL} = useMediaService();
    const { countAllSituations, loadByQuery } = useSituationService();
    const { countAllStories, sumAllViews } = useStoryService();
    const [isCountAllLoading, setIsAllCountLoading] = useState(true);
    const [isRankingLoading, setIsRankingLoading] = useState(true);
    const [counts, setCounts] = useState({ situation: "-", story: "-", views: "-" });
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
            <div className='text-gray-500 tracking-[0.1em]'>Setakat {formattedTime}, {formattedDate} </div>
            {isCountAllLoading ?
                <div className='my-2'>Loading...</div> :
                <div className='flex justify-center mt-2 gap-4'>
                    <div className='flex'>
                        <div className='text-4xl'>{counts.situation}</div>
                        <div className='flex items-end mb-1 ml-1'>
                            <img className='w-[20px] mb-[1px]' src={`${SYSTEM_ICON_BASE_URL}/double-quotes-svgrepo-com.svg`}/>
                            <div className='text-sm text-gray-500'>Situasi</div>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='text-4xl'>{counts.story}</div>
                        <div className='flex items-end mb-1'>
                            <img className='w-[18px] mb-[1px]' src={`${SYSTEM_ICON_BASE_URL}/quill-pen-svgrepo-com.svg`}/>
                            <div className='text-sm text-gray-500'>Cerita</div>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='text-4xl'>{counts.views}</div>
                        <div className='flex items-end mb-1'>
                            <img className='w-[18px] mb-[1px] ml-1' src={`${SYSTEM_ICON_BASE_URL}/eye-svgrepo-com.svg`}/>
                            <div className='text-sm text-gray-500'>Bacaan</div>
                        </div>
                    </div>
                    
                </div>
                }
            <div className='mt-12'>
                <div className='text-gray-500 tracking-[0.1em] mb-2'>Carta Situasi </div>
                {isRankingLoading ?
                    <div>Loading...</div> :
                    ranking.map((situation, i) => (
                        <div key={situation.id} className='flex justify-between gap-6'>
                            <div className='flex my-1'>
                                <div className='text-gray-500 mx-4'>#{i + 1} </div>
                                <div>{situation.name}</div>
                            </div>
                            <div className='flex gap-2'>
                                <div>
                                    <div className='flex my-1'>
                                        <img className='w-[18px]' src={`${SYSTEM_ICON_BASE_URL}/quill-pen-svgrepo-com.svg`}/>
                                        <div className='text-sm text-gray-500'>{situation.storiesCount}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex my-1'>
                                        <img className='w-[17px] mb-1' src={`${SYSTEM_ICON_BASE_URL}/eye-svgrepo-com.svg`}/>
                                        <div className='text-sm text-gray-500 ml-1'>{situation.totalViews}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}