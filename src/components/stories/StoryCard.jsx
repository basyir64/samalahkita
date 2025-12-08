import '../../index.css';
import { useUserOptions } from '../../hooks/useUserOptions';
import { useMediaService } from '../../hooks/useMediaService';
import { useEffect, useState } from 'react';

export default function StoryCard({ story, setStory, isPreview }) {

    const { getTranslatedGenderText, getTranslatedSectorText, getLocationText } = useUserOptions();
    const { STICKERS_BASE_URL, PROFILES_BASE_URL, loadAllStickerUrls, loadAllProfileUrls } = useMediaService();
    const sectorAndGender = [
        `${story.gender ? getTranslatedGenderText(story.gender) : ""}`,
        `${story.sector ? getTranslatedSectorText(story.sector) : ""}`]
        .filter(s => s !== "")
        .join(", ");
    const ageRange = story.ageRange ? story.ageRange + " tahun" : "";
    const location = story.location ? getLocationText(story.location) : "";
    const date = new Date().toLocaleDateString("en-GB");
    const [isStickerBoxOpen, setIsStickerBoxOpen] = useState(false);
    const [stickerUrls, setStickerUrls] = useState([]);
    const [selectedStickerUrl, setSelectedStickerUrl] = useState(story.sticker ? `${STICKERS_BASE_URL}/${story.sticker}` : "");

    const [isProfileBoxOpen, setIsProfileBoxOpen] = useState(false);
    const [profileUrls, setProfileUrls] = useState([]);
    const [selectedProfileUrl, setSelectedProfileUrl] = useState(story.profile ? `${PROFILES_BASE_URL}/${story.profile}` : `${STICKERS_BASE_URL}/watery_eye_cat.webp`);

    function arrangeHeaderItems(sectorAndGender, ageRange, location) {
        if (!sectorAndGender && !location) return <div className='flex text-xs'>{ageRange}</div>
        else if (!sectorAndGender) return <div>
            <div className='flex text-sm'>{location}</div>
            <div className='flex text-xs'>{ageRange}</div>
        </div>
        else return <div>
            <div className='flex text-sm'>{sectorAndGender}</div>
            <div className='flex text-sm'>{location}</div>
            <div className='flex text-xs'>{ageRange}</div>
        </div>
    }

    useEffect(() => {
        async function getAllStickerUrls() {
            const urls = await loadAllStickerUrls();
            setStickerUrls(urls);
        }
        async function getAllProfileUrls() {
            const urls = await loadAllProfileUrls();
            setProfileUrls(urls);
        }

        if (isStickerBoxOpen) getAllStickerUrls();
        if (isProfileBoxOpen) getAllProfileUrls();
    }, [isStickerBoxOpen, isProfileBoxOpen]);


    function handleSelectStickerClick(url) {
        setSelectedStickerUrl(url);
        const sticker = url.split("admin/")[1];
        setStory(prev => ({
            ...prev,
            sticker: sticker
        }))
    }

    function handleSelectProfileClick(url) {
        setSelectedProfileUrl(url);
        const profile = url.split("profiles/")[1];
        setStory(prev => ({
            ...prev,
            profile: profile
        }))
    }

    return (
        <div className={`grid grid-col`}>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    {isPreview ?
                        <div><img className='w-15 cursor-pointer' src={selectedProfileUrl} onClick={() => setIsProfileBoxOpen(!isProfileBoxOpen)} /></div> :
                        <div><img className='w-20' src={`${PROFILES_BASE_URL}/${story.sticker}`} /></div>
                    }
                    {arrangeHeaderItems(sectorAndGender, ageRange, location)}
                </div>
                {/* <span className='text-gray-500 text-sm'>{story.createdAt.toDate()}</span> */}
            </div>
            {/* {story.createdAt.toDate()} */}
            {isPreview &&
                <div className='flex flex-wrap'>
                    {isProfileBoxOpen && <div className='mt-2'>
                        <span className='text-sm text-gray-500'>Pilih ikon profile. Tekan semula untuk tutup.</span>
                        <div className='flex flex-wrap w-full max-h-30 gap-2 overflow-y-auto'>
                            {profileUrls.map((url, i) => (
                                <img key={i} className='w-16 cursor-pointer' src={url} onClick={() => handleSelectProfileClick(url)} />
                            ))}
                        </div>
                    </div>}
                </div>}
            <div className='my-4'>{story.text}</div>
            {isPreview ?
                (selectedStickerUrl ?
                    <div>
                        <img
                            onClick={() => setIsStickerBoxOpen(!isStickerBoxOpen)}
                            className='w-25 cursor-pointer' src={`${STICKERS_BASE_URL}/${story.sticker}`} />
                    </div> :
                    <div
                        onClick={() => setIsStickerBoxOpen(!isStickerBoxOpen)}
                        className='border border-dashed rounded-[25px] p-1 cursor-pointer hover:bg-[#f1efe3] w-max text-xs text-gray-500'>
                        Sticker
                    </div>) :
                <div><img className='w-40' src={`${STICKERS_BASE_URL}/${story.sticker}`} /></div>
            }
            {isPreview &&
                <div className='flex flex-wrap'>
                    {isStickerBoxOpen &&
                        <div className='mt-2'>
                            <span className='text-sm text-gray-500'>Tekan semula sticker untuk tutup.</span>
                            <div className='flex flex-wrap w-full max-h-30 gap-2 overflow-y-auto'>
                                {stickerUrls.map((url, i) => (
                                    <img key={i} className='w-16 cursor-pointer' src={url} onClick={() => handleSelectStickerClick(url)} />
                                ))}
                            </div>
                        </div>}
                </div>}
            {story.otherSituations.length > 0 &&
                <div className='mt-6'>
                    <div className='text-sm text-gray-500'>Situasi lain</div>
                    <div className='flex flex-wrap gap-2'>
                        {story.otherSituations.map((s, i) => (
                            <div key={i} className='pill-small-non-interactive'>
                                {s.name ? s.name : s}
                            </div>
                        ))}
                    </div>
                </div>}
            {isPreview ?
                (story.hasAdvice && <div className='mt-4'>
                    <div className='text-sm text-gray-500'>Nasihat</div>
                    <div className='text-sm'>{story.adviceText}</div>
                </div>) :
                (story.adviceText && <div className='mt-4'>
                    <div className='text-sm text-gray-500'>Nasihat</div>
                    <div className='text-sm'>{story.adviceText}</div>
                </div>)
            }
        </div>
    );
}