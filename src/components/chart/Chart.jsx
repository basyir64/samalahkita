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
            <div className='text-gray-500 tracking-[0.1em]'>Setakat {formattedTime}, {formattedDate} </div>
            {isCountAllLoading ?
                <div className='my-2'>Loading...</div> :
                <div className='flex justify-center mt-2 gap-8'>
                    <div className=''>
                        <div className='text-4xl'>{counts.situation}</div>
                        <div className='flex items-end mb-1 ml-1'>
                            <img className='w-[20px] mb-[1px]' src={`${SYSTEM_ICON_BASE_URL}/double-quotes-svgrepo-com.svg`} />
                            <div className='text-sm text-gray-500'>Situasi</div>
                        </div>
                    </div>
                    <div className=''>
                        <div className='text-4xl'>{counts.story}</div>
                        <div className='flex items-end mb-1'>
                            <img className='w-[18px] mb-[1px]' src={`${SYSTEM_ICON_BASE_URL}/quill-pen-svgrepo-com.svg`} />
                            <div className='text-sm text-gray-500'>Cerita</div>
                        </div>
                    </div>
                    <div className=''>
                        <div className='text-4xl'>{counts.views}</div>
                        <div className='flex items-end mb-1'>
                            <img className='w-[18px] mb-[1px] ml-1' src={`${SYSTEM_ICON_BASE_URL}/eye-svgrepo-com.svg`} />
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
                        <div key={situation.id} className='flex gap-4 mb-4'>
                            <div className='flex'>
                                <div className='text-gray-500'>#{i + 1} </div>
                            </div>
                            <div className='grid grid-rows-2 text-left'>
                                <div>{situation.name}</div>
                                <div className='flex rounded-[25px] w-max px-2 border border-[#f1efe3] gap-2'>
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
                    ))}
            </div>

            <div className='mt-12'>
                <div className='text-gray-500 tracking-[0.1em]'> 10+ 'Sticker' Rawak Sebagai Gambar Profil Cerita</div>
                <div className='text-gray-500 tracking-[0.1em]'> DM IG @samalahkita.my untuk derma koleksi anda dan <br />  nama anda akan ditulis di bawah sebagai tanda terima kasih {"<3"} </div>
                <div className='flex justify-center'>
                    <div className='relative mt-8 mb-60 w-40'>
                        {
                            profileUrls.length > 0 &&
                            profileUrls.map((url, i) => {
                                const order =
                                    (i - activeIndex + profileUrls.length) % profileUrls.length;

                                const offsetX = order * 30;
                                const zIndex = profileUrls.length - order;
                                const scale = order === 0 ? 1.2 : 1 - order * 0.05; // front bigger
                                const opacity = order === 0 ? 1 : Math.max(0.6, 1 - order * 0.15);
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
        </div>
    );
}