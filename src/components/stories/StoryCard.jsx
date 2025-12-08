import '../../index.css';
import { useUserOptions } from '../../hooks/useUserOptions';
import { useMediaService } from '../../hooks/useMediaService';
import { useEffect, useState } from 'react';

export default function StoryCard({ story, setStory, isPreview }) {

    const { getTranslatedGenderText, getTranslatedSectorText, getLocationText } = useUserOptions();
    const { BASE_URL, loadAllStickerUrls } = useMediaService();
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
    const [selectedStickerUrl, setSelectedStickerUrl] = useState(story.sticker ? `${BASE_URL}/${story.sticker}` :`${BASE_URL}/watery_eye_cat.webp`);

    function arrangeHeaderItems(sectorAndGender, ageRange, location) {
        if (!sectorAndGender && !location) return <div className='flex text-sm'>{ageRange}</div>
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
            console.log(urls)
        }

        if (isStickerBoxOpen) getAllStickerUrls();
    }, [isStickerBoxOpen]);

    function handleStickerClick(url) {
        setSelectedStickerUrl(url);
        const sticker = url.split("admin/")[1];
        setStory(prev => ({
            ...prev,
            sticker: sticker
        }))
    }

    return (
        <div className={`grid grid-col`}>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    {isPreview ?
                        <div><img className='w-20 cursor-pointer' src={selectedStickerUrl} onClick={() => setIsStickerBoxOpen(!isStickerBoxOpen)} /></div> :
                        <div><img className='w-20' src={`${BASE_URL}/${story.sticker}`} /></div>
                    }
                    {arrangeHeaderItems(sectorAndGender, ageRange, location)}
                </div>
                {/* <span className='text-gray-500 text-sm'>{story.createdAt.toDate()}</span> */}
            </div>
            {/* {story.createdAt.toDate()} */}
            <div className='my-4'>{story.text}</div>
            {isPreview &&
                <div className='flex flex-wrap'>
                    {isStickerBoxOpen && <div className='mt-2'>
                        <span className='text-sm text-gray-500'>Tekan semula ikon untuk tutup.</span>
                        <div className='flex flex-wrap w-full border max-h-30 p-1 gap-2 overflow-y-auto'>
                            {stickerUrls.map((url, i) => (
                                <img key={i} className='w-16 cursor-pointer' src={url} onClick={() => handleStickerClick(url)} />
                            ))}
                        </div>
                    </div>}
                </div>}
            {story.otherSituations.length > 0 &&
                <div className='mt-4'>
                    <div className='text-sm text-gray-500'>Situasi lain</div>
                    {story.otherSituations.map((s, i) => (
                        <div key={i} className='pill-small-non-interactive'>
                            {s.name ? s.name : s}
                        </div>
                    ))}
                </div>}
            {story.adviceText &&
                <div className='mt-4'>
                    <div className='text-sm text-gray-500'>Nasihat</div>
                    <div>{story.adviceText}</div>
                </div>}
        </div>
    );
}