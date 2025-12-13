import '../../index.css';
import { useUserOptions } from '../../hooks/useUserOptions';
import { useMediaService } from '../../hooks/useMediaService';
import { useStoryService } from '../../hooks/useStoryService';
import useDateFormatter from '../../hooks/useDateFormatter';
import { useEffect, useState, useRef } from 'react';
import { Radio, RadioGroup, Field } from '@headlessui/react';

export default function StoryCardShare({ story, situationName, isPreview }) {

    const { getTranslatedGenderText, getTranslatedSectorText, getLocationText } = useUserOptions();
    const { updateViews } = useStoryService();
    const { STICKERS_BASE_URL, loadAllProfileUrls, SYSTEM_ICON_BASE_URL, CONCEALER_BASE_URL } = useMediaService();
    const sectorAndGender = [
        `${story.gender ? getTranslatedGenderText(story.gender) : ""}`,
        `${story.sector ? getTranslatedSectorText(story.sector) : ""}`]
        .filter(s => s !== "")
        .join(", ");
    const ageRange = story.ageRange ? story.ageRange + " tahun" : "";
    const location = story.location ? getLocationText(story.location) : "";

    const [isProfileBoxOpen, setIsProfileBoxOpen] = useState(false);
    const [profileUrls, setProfileUrls] = useState([]);

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
        async function getAllProfileUrls() {
            const urls = await loadAllProfileUrls();
            setProfileUrls(urls);
        }

        if (isProfileBoxOpen) getAllProfileUrls();
    }, [isProfileBoxOpen]);

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
    const [eyes, setEyes] = useState(
        {
            isSituationHidden: false,
            isAgeHidden: false,
            isTextHidden: false,
            isOtherHidden: false,
            isAdviceHidden: false,
        }
    );

    function handleEyeClick(key, value) {
        setEyes(prev => (
            { ...prev, [key]: value }
        ))
    }

    const concealers = [
        { id: 1, name: "shushing-face.png" },
        { id: 2, name: "face-in-clouds.png" },
        { id: 3, name: "see-no-evil-monkey.png" },
        { id: 4, name: "slightly-smiling-face.png" },
        { id: 5, name: "zipper-mouth-face.png" },
    ];
    const [selectedConcealer, setSelectedConcealer] = useState(concealers[0].name);

    function handleConcealerChange(selectedConcealer) {
        setSelectedConcealer(selectedConcealer);
    }

    return (
        <div className='flex items-stretch gap-2'>
            {/* <div>
                <div
                    onClick={() => handleEyeClick("isAgeHidden", !eyes.isAgeHidden)}
                    className='flex items-start flex-shrink-0'>
                    {
                        eyes.isAgeHidden ?
                            <img className='w-[20px] cursor-pointer' src={`${SYSTEM_ICON_BASE_URL}/hide-svgrepo-com.svg`} />
                            : <img className='w-[20px] cursor-pointer' src={`${SYSTEM_ICON_BASE_URL}/show-svgrepo-com.svg`} />
                    }
                </div>
                <div
                    className='flex items-start mt-5 flex-shrink-0'
                    onClick={() => handleEyeClick("isTextHidden", !eyes.isTextHidden)}>
                    {
                        eyes.isTextHidden ?
                            <img className='w-[20px] cursor-pointer' src={`${SYSTEM_ICON_BASE_URL}/hide-svgrepo-com.svg`} />
                            : <img className='w-[20px] cursor-pointer' src={`${SYSTEM_ICON_BASE_URL}/show-svgrepo-com.svg`} />
                    }
                </div>
                <div
                    className='flex items-start mt-6 flex-shrink-0'
                    onClick={() => handleEyeClick("isOtherHidden", !eyes.isOtherHidden)}>
                    {
                        eyes.isOtherHidden ?
                            <img className='w-[20px] cursor-pointer' src={`${SYSTEM_ICON_BASE_URL}/hide-svgrepo-com.svg`} />
                            : <img className='w-[20px] cursor-pointer' src={`${SYSTEM_ICON_BASE_URL}/show-svgrepo-com.svg`} />
                    }
                </div>
                <div
                    className='flex items-start mt-4 flex-shrink-0'
                    onClick={() => handleEyeClick("isAdviceHidden", !eyes.isAdviceHidden)}
                >
                    {
                        eyes.isAdviceHidden ?
                            <img className='w-[20px] cursor-pointer' src={`${SYSTEM_ICON_BASE_URL}/hide-svgrepo-com.svg`} />
                            : <img className='w-[20px] cursor-pointer' src={`${SYSTEM_ICON_BASE_URL}/show-svgrepo-com.svg`} />
                    }
                </div>
                
            </div> */}
            <div>
                <div className='mb-2 flex flex-wrap gap-2'>
                    <div className='text-gray-500 text-sm mt-1'>Ganti:</div>
                    <div
                        className={`my-multi-select ${eyes.isSituationHidden ? "bg-[#f1efe3]" : ""}`}
                        onClick={() => handleEyeClick("isSituationHidden", !eyes.isSituationHidden)}>
                        <img className='w-[20px]' src={`${SYSTEM_ICON_BASE_URL}/double-quotes-svgrepo-com.svg`} />
                    </div>
                    <div
                        className={`my-multi-select ${eyes.isAgeHidden ? "bg-[#f1efe3]" : ""}`}
                        onClick={() => handleEyeClick("isAgeHidden", !eyes.isAgeHidden)}>
                        <img className='w-[20px]' src={`${SYSTEM_ICON_BASE_URL}/contacts-svgrepo-com.svg`} />
                    </div>
                    <div
                        className={`my-multi-select ${eyes.isTextHidden ? "bg-[#f1efe3]" : ""}`}
                        onClick={() => handleEyeClick("isTextHidden", !eyes.isTextHidden)}>
                        <img className='w-[20px]' src={`${SYSTEM_ICON_BASE_URL}/quill-pen-svgrepo-com.svg`} />
                    </div>
                    <div
                        className={`my-multi-select ${eyes.isOtherHidden ? "bg-[#f1efe3]" : ""}`}
                        onClick={() => handleEyeClick("isOtherHidden", !eyes.isOtherHidden)}>
                        <img className='w-[20px]' src={`${SYSTEM_ICON_BASE_URL}/hashtag-svgrepo-com.svg`} />
                    </div>
                    <div
                        className={`my-multi-select ${eyes.isAdviceHidden ? "bg-[#f1efe3]" : ""}`}
                        onClick={() => handleEyeClick("isAdviceHidden", !eyes.isAdviceHidden)}>
                        <img className='w-[20px]' src={`${SYSTEM_ICON_BASE_URL}/hand-heart-svgrepo-com.svg`} />
                    </div>
                </div>
                <div className='mt-4 mb-4 flex gap-2'>
                    <div className='text-gray-500 text-sm mt-[2px]'>dengan:</div>
                    <RadioGroup value={selectedConcealer} onChange={handleConcealerChange} className={"flex flex-wrap gap-4"}>
                        {concealers.map(c =>
                            <Field key={c.id} >
                                <Radio 
                                value={c.name} 
                                className={"cursor-pointer"}>
                                    <img className='w-[24px]' src={`${CONCEALER_BASE_URL}/${c.name}`} />
                                </Radio>
                            </Field>)}
                    </RadioGroup>
                </div>
                <div className={`pill-card-story`}>
                    <div className='mb-4'>
                        {/* <img className='w-[36px]' src={`${SYSTEM_ICON_BASE_URL}/double-quotes-svgrepo-com.svg`} /> */}
                        {situationName}
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex gap-2'>
                            <div className=''>
                                <img className='w-24' src={`${STICKERS_BASE_URL}/${story.profile}`} />
                            </div>
                            {arrangeHeaderItems(sectorAndGender, ageRange, location)}
                        </div>
                    </div>
                    <div className='my-4'>{story.text}</div>
                    <div className='text-sm text-gray-500'>Situasi lain</div>
                    {
                        story.otherSituations?.length > 0 &&
                        <div className='flex flex-wrap gap-2'>
                            {story.otherSituations.map((s, i) => (
                                <div key={i} className='pill-small-non-interactive'>
                                    {isPreview ? s.name : s}
                                </div>
                            ))}
                        </div>
                    }
                    {story.hasAdvice &&
                        <div className='mt-4'>
                            <div className='text-sm text-gray-500'>Nasihat</div>
                            <div className='text-sm'>{story.adviceText}</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}