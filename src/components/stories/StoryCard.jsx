import '../../index.css';
import { useUserOptions } from '../../hooks/useUserOptions';
import { useMediaService } from '../../hooks/useMediaService';
import { useStoryService } from '../../hooks/useStoryService';
import useDateFormatter from '../../hooks/useDateFormatter';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import Typewriter from '../custom-inputs/Typewriter';
import { useTranslation } from 'react-i18next';

export default function StoryCard({ story, setStory, isPreview, situation }) {

    const { getTranslatedGenderText, getTranslatedSectorText, getLocationText } = useUserOptions();
    const { updateViews } = useStoryService();
    const { STICKERS_BASE_URL, SYSTEM_ICON_BASE_URL, loadAllProfileUrls } = useMediaService();
    const gender = getTranslatedGenderText(story.gender);
    const sector = `${story.sector ? getTranslatedSectorText(story.sector) : ""}`;
    const ageRange = story.ageRange ? story.ageRange + " tahun" : "";
    const location = story.location ? getLocationText(story.location) : "";
    const { t } = useTranslation();

    const [isProfileBoxOpen, setIsProfileBoxOpen] = useState(false);
    const [profileUrls, setProfileUrls] = useState([]);
    const [selectedProfileUrl, setSelectedProfileUrl] = useState(story.profile ? `${STICKERS_BASE_URL}/${story.profile}` : `${STICKERS_BASE_URL}/watery_eye_cat.webp`);

    function arrangeHeaderItems(gender, sector, ageRange, location) {
        if (!sector && !location && !ageRange) return <div className='flex text-sm'>{gender}</div>
        else if (!sector && !location) return <div>
            <div className='flex text-sm'>{gender}</div>
            <div className='flex text-xs'>{ageRange}</div>
        </div>
        else if (!sector) return <div>
            <div className='flex text-sm'>{gender}</div>
            <div className='flex text-sm'>{location}</div>
            <div className='flex text-xs'>{ageRange}</div>
        </div>
        else return <div className=''>
            <div className='flex text-sm'>{gender}</div>
            <div className='flex text-sm'>{sector}</div>
            <div className='flex text-sm'>{location}</div>
            <div className='flex text-xs'>{ageRange}</div>
        </div>
    }

    useEffect(() => {
        async function getAllProfileUrls() {
            const urls = await loadAllProfileUrls();
            setProfileUrls(urls);
        }

        if (isProfileBoxOpen) getAllProfileUrls();
    }, [isProfileBoxOpen]);

    function handleSelectProfileClick(url) {
        setSelectedProfileUrl(url);
        const profile = url.split("admin/")[1];
        setStory(prev => ({
            ...prev,
            profile: profile
        }))
    }

    // useEffect(() => {
    //     console.log(JSON.stringify(story, null, 2))
    // }, [story])

    function addViewedStory(storyId) {
        const viewed = JSON.parse(localStorage.getItem("viewedStories") || "[]");
        if (!viewed.includes(storyId)) {
            viewed.push(storyId);
            localStorage.setItem("viewedStories", JSON.stringify(viewed));
        }
    }

    function hasViewedStory(storyId) {
        const viewed = JSON.parse(localStorage.getItem("viewedStories") || "[]");
        return viewed.includes(storyId);
    }

    useEffect(() => {
        async function updateStoryViews(story) {
            if (hasViewedStory(story.id)) return;

            addViewedStory(story.id)
            const isSuccess = await updateViews(story);
            if (!isSuccess) {
                console.log("error updating")
                return;
            }
        }

        if (!isPreview) {
            updateStoryViews(story);
        }
    }, [isPreview])

    const { formattedDate, formattedTime } = useDateFormatter(story.createdAt);

    const scrollRef = useRef(null);
    function handleWheel(e) {
        if (!scrollRef.current) return;

        // Prevent vertical scrolling
        // e.preventDefault();

        // Scroll horizontally instead
        scrollRef.current.scrollLeft += e.deltaY;
    };

    // random situation feed mode only
    const navigate = useNavigate();
    function handleSwitchSituation(situationId) {
        navigate(`/stories/situation/${situationId}`);
        window.location.reload();
    }

    const [otherSituationsOpen, setOtherSituationsOpen] = useState(false);

    return (
        <div className={`grid grid-cols-1 w-full mt-2 dark:bg-black dark:text-gray-300`}>
            <div className='flex justify-between'>
                <div className='flex gap-2 shrink-0'>
                    {isPreview ?
                        <div><img className='w-24 cursor-pointer' src={selectedProfileUrl} onClick={() => setIsProfileBoxOpen(!isProfileBoxOpen)} /></div> :
                        <div><img className='w-24' src={`${STICKERS_BASE_URL}/${story.profile}`} /></div>
                    }
                    {arrangeHeaderItems(gender, sector, ageRange, location)}
                </div>
                {!isPreview &&
                    <div className='flex flex-col text-right'>
                        <div className='text-gray-500 text-sm'>{formattedDate}</div>
                        <div className='text-gray-500 text-sm'>{formattedTime}</div>
                        <div className='flex gap-1 justify-end'>
                            <img className='w-[12px]' src={`${SYSTEM_ICON_BASE_URL}/eye2-svgrepo-com.svg`} />
                            <div className='text-gray-500 text-xs'>{story.views}</div>
                        </div>
                    </div>}
            </div>
            {isPreview &&
                <div className='relative'>
                    {isProfileBoxOpen && <div className='mt-2'>
                        <span className='text-sm text-gray-500'>{t("icon_panel_ind")}</span>
                        <div
                            ref={scrollRef}
                            onWheel={(e) => handleWheel(e)}
                            className='flex py-4 w-full gap-2 overflow-x-auto absolute bg-white/10 backdrop-blur-md border border-white shadow-[0px_0px_5px_rgba(0,0,0,0.3)]'>
                            {profileUrls.map((url, i) => (
                                <img key={i} className='w-24 cursor-pointer' src={url} onClick={() => handleSelectProfileClick(url)} />
                            ))}
                        </div>
                    </div>}
                </div>

            }
            <div className={isPreview ? "max-h-[40vh] overflow-y-auto px-1" : ""}>
                {situation &&
                    <div className='flex gap-2 text-gray-500 text-sm mt-2 animate-slide cursor-pointer' onClick={() => handleSwitchSituation(situation.id)}>
                        <img className='w-[18px]' src={`${SYSTEM_ICON_BASE_URL}/double-quotes-svgrepo-com.svg`} />
                        <div className='pill-small-non-interactive'><Typewriter text={situation.name} /></div>
                    </div>
                }
                <div className='my-4 whitespace-normal break-words'>{story.text}</div>
                {isPreview ?
                    story.hasOtherSituations &&
                    <div className='mt-6'>
                        <div className='text-sm text-gray-500'>{isPreview && "Situasi lain"}</div>
                        <div className=''>
                            {story.otherSituations.map((s, i) => (
                                <div key={i} className='text-xs tracking-[0.1em]'>
                                    {s.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    : (story.otherSituations && <div onClick={() => setOtherSituationsOpen(!otherSituationsOpen)} className='mt-6 cursor-pointer'>
                        <div className='flex'>
                            <div className='text-sm text-gray-500'>Situasi lain</div>
                            {otherSituationsOpen ?
                                <img className='w-[18px]' src={`${SYSTEM_ICON_BASE_URL}/arrow-down-svgrepo-com.svg`} />
                                : <img className='w-[18px]' src={`${SYSTEM_ICON_BASE_URL}/arrow-right-svgrepo-com.svg`} />
                            }
                        </div>
                        {otherSituationsOpen && <div className=''>
                            {story.otherSituations.map((s, i) => (
                                <div key={i} className='text-xs tracking-[0.1em]'>
                                    {s}
                                </div>
                            ))}
                        </div>}
                    </div>)
                }
                {isPreview ?
                    (story.hasAdvice && <div className='mt-4'>
                        <div className='text-sm text-gray-500'>Nasihat</div>
                        <div className='text-sm whitespace-normal break-words'>{story.adviceText}</div>
                    </div>) :
                    (story.adviceText && <div className='mt-4'>
                        {/* <img className='w-[20px]' src={`${SYSTEM_ICON_BASE_URL}/hand-heart-svgrepo-com.svg`} /> */}
                        <div className='text-sm text-gray-500'>Nasihat</div>
                        <div className='text-sm whitespace-normal break-words'>{story.adviceText}</div>
                    </div>)
                }
            </div>
        </div>
    );
}