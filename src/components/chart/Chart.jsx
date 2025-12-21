import '../../index.css'
import useDateFormatter from '../../hooks/useDateFormatter';
import { useSituationService } from '../../hooks/useSituationService';
import { useStoryService } from '../../hooks/useStoryService';
import { useState, useEffect } from 'react';
import { orderBy, limit } from 'firebase/firestore';
import { useMediaService } from '../../hooks/useMediaService';
import { Link } from 'react-router';

export default function Chart() {
    const now = new Date();
    const { formattedDate, formattedTime } = useDateFormatter(now);
    const { SYSTEM_ICON_BASE_URL, loadAllProfileUrls } = useMediaService();
    const { countAllSituations, loadByQuery } = useSituationService();
    const { countAllStories, sumAllViews } = useStoryService();
    const [isCountAllLoading, setIsAllCountLoading] = useState(true);
    const [isRankingLoading, setIsRankingLoading] = useState(true);
    const [counts, setCounts] = useState({ situation: "-", story: "-", views: "-" });
    const [ranking, setRanking] = useState([]);
    const [profileUrls, setProfileUrls] = useState([]);

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

        async function getAllProfileUrls() {
            const urls = await loadAllProfileUrls();
            setProfileUrls(urls);
        }



        getAllSituationCount();
        getAllStoryCount();
        getSumOfStoryViews();
        setIsAllCountLoading(false);

        getSituationRanking();
        getAllProfileUrls();
    }, []);

    useEffect(() => {
        if (profileUrls.length === 0) return;
        const interval = setInterval(() => {
            setActiveIndex(i => (i + 1) % profileUrls.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [profileUrls.length]);

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className='mt-12 grid justify-center text-center'>
            <div className='mt-4 dark:text-white'>
                <div className='tracking-[0.1em]'> Lebih Dari 10 'Sticker' Cerminan Emosi.</div>
                <div className='text-gray-500 tracking-[0.1em]'> Bantuan diperlukan!!! DM IG @samalahkita.my untuk derma, dan
                    <br />  koleksi + nama anda akan dipaparkan di bawah sebagai tanda terima kasih {"<3"} </div>
                <div className='text-gray-500 tracking-[0.1em]'>(Mood: Sedih, Keliru, Risau, Kecewa, Sunyi, Pasrah, atau Bosan)</div>
                <div className='flex justify-center'>
                    <div className='relative mt-8 mb-50 w-40'>
                        {
                            profileUrls.length > 0 &&
                            profileUrls.map((url, i) => {
                                const order =
                                    (i - activeIndex + profileUrls.length) % profileUrls.length;

                                const offsetX = order * 10;
                                const zIndex = profileUrls.length - order;
                                const scale = order === 0 ? 1.2 : 1 - order * 0.05; // front bigger
                                return (
                                    <img
                                        key={i}
                                        className={`w-30 absolute inset-0 transition-all duration-500 ease-in-out bg-cover bg-center h-max`}
                                        style={{
                                            transform: `translateX(${offsetX}px) scale(${scale})`,
                                            zIndex,

                                        }}
                                        src={url}
                                    />)
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='text-gray-500 tracking-[0.1em]'>Setakat {formattedTime}, {formattedDate} </div>
            {isCountAllLoading ?
                <div className='my-2 dark:text-white'>Loading...</div> :
                <div className='flex justify-center mt-2 gap-8 dark:text-white'>
                    <div className=''>
                        <div className='text-4xl'>{counts.situation}</div>
                        <div className='flex rounded-[25px] w-max px-2 border'>
                            <img className='w-[18px]' src={`${SYSTEM_ICON_BASE_URL}/double-quotes-svgrepo-com.svg`} />
                            <div className='text-sm'>Situasi</div>
                        </div>
                    </div>
                    <div className=''>
                        <div className='text-4xl'>{counts.story}</div>
                        <div className='flex rounded-[25px] w-max px-2 border'>
                            <img className='w-[18px] mb-[1px]' src={`${SYSTEM_ICON_BASE_URL}/quill-pen-svgrepo-com.svg`} />
                            <div className='text-sm'>Cerita</div>
                        </div>
                    </div>
                    <div className=''>
                        <div className='text-4xl'>{counts.views}</div>
                        <div className='flex rounded-[25px] w-max px-2 border'>
                            <img className='w-[18px] mb-[1px] ml-1' src={`${SYSTEM_ICON_BASE_URL}/eye-svgrepo-com.svg`} />
                            <div className='text-sm'>Bacaan</div>
                        </div>
                    </div>
                </div>
            }
            <div className='mt-12 dark:text-white'>
                <div className='tracking-[0.1em] mb-2'>Carta Situasi </div>
                {isRankingLoading ?
                    <div>Loading...</div> :
                    ranking.map((situation, i) => (
                        <Link key={situation.id} to={`/stories/situation/${situation.id}`}>
                            <div className='flex gap-4 mb-4'>
                                <div className='flex'>
                                    <div className='mt-2 text-2xl text-gray-500'>#{i + 1} </div>
                                </div>
                                <div className='grid text-left'>
                                    <div>{situation.name}</div>
                                    <div className='flex rounded-[25px] w-max px-2 border gap-4'>
                                        <div className='flex '>
                                            <img className='w-[18px]' src={`${SYSTEM_ICON_BASE_URL}/quill-pen-svgrepo-com.svg`} />
                                            <div className='text-gray-500 ml-1'>{situation.storiesCount}</div>
                                        </div>
                                        <div className='flex'>
                                            <img className='w-[18px]' src={`${SYSTEM_ICON_BASE_URL}/eye-svgrepo-com.svg`} />
                                            <div className='text-gray-500 ml-1'>{situation.totalViews}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}