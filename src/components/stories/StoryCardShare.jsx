import '../../index.css';
import { useUserOptions } from '../../hooks/useUserOptions';
import { useMediaService } from '../../hooks/useMediaService';
import { useEffect, useState } from 'react';
import { Radio, RadioGroup, Field } from '@headlessui/react';
import * as htmlToImage from 'html-to-image';
import { useTranslation } from 'react-i18next';

export default function StoryCardShare({ story, situationName }) {

    const {t} = useTranslation();
    const { getTranslatedGenderText, getTranslatedSectorText, getLocationText } = useUserOptions();
    const { STICKERS_BASE_URL, SYSTEM_ICON_BASE_URL, CONCEALER_BASE_URL } = useMediaService();
    const [eyes, setEyes] = useState(
        {
            isSituationHidden: false,
            isInfoItemHidden: false,
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

    function handleConcealerChange(selectedConcealer) {
        setSelectedConcealer(selectedConcealer);
    }

    // INFO ITEMS
    const [gender, setGender] = useState(<></>);
    const [sector, setSector] = useState(<></>);
    const [ageRange, setAgeRange] = useState(<></>);
    const [location, setLocation] = useState(<></>);

    const [selectedConcealer, setSelectedConcealer] = useState(concealers[0].name);
    const [currentSituationName, setCurrentSituationName] = useState(situationName);
    const [currentInfoItems, setCurrentInfoItems] = useState(<></>);
    const [currentText, setCurrentText] = useState("");
    const [currentOtherSituations, setCurrentOtherSituations] = useState([]);
    const [currentAdviceText, setCurrentAdviceText] = useState("");

    function arrangeInfoItems(gender, sector, ageRange, location) {
        if (!sector && !location && !ageRange) return <div className='flex text-sm'>{gender}</div>
        else if (!sector && !location ) return <div>
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
        setCurrentText(story.text);
        setCurrentOtherSituations(story.otherSituations);
        setCurrentAdviceText(story.adviceText);

        const gender = getTranslatedGenderText(story.gender);
        const sector = `${story.sector ? getTranslatedSectorText(story.sector) : ""}`;
        const ageRange = story.ageRange ? story.ageRange + " tahun" : "";
        const location = story.location ? getLocationText(story.location) : "";

        setGender(gender)
        setSector(sector);
        setAgeRange(ageRange);
        setLocation(location);
    }, [story])

    useEffect(() => {
        setCurrentInfoItems(arrangeInfoItems(gender, sector, ageRange, location));
    }, [gender, sector, ageRange, location])

    const [storyItemsConcealOptions, setStoryItemsConcealOptions] = useState([
        { isHidden: false, iconName: "double-quotes-svgrepo-com.svg", name: "isSituationHidden" },
        { isHidden: false, iconName: "contacts-svgrepo-com.svg", name: "isInfoItemHidden" },
        { isHidden: false, iconName: "quill-pen-svgrepo-com.svg", name: "isTextHidden" },
        { isHidden: false, iconName: "hashtag-svgrepo-com.svg", name: "isOtherHidden" },
        { isHidden: false, iconName: "hand-heart-svgrepo-com.svg", name: "isAdviceHidden" },
    ]);

    useEffect(() => {

        // SITUATION
        if (eyes.isSituationHidden) {
            let concealedSituationName = [];
            for (let i = 0; i < 12; i++) {
                concealedSituationName.push(<img className='w-[24px]' src={`${CONCEALER_BASE_URL}/${selectedConcealer}`} />)
            }
            setCurrentSituationName(<div className='flex flex-wrap'>{...concealedSituationName}</div>)
        } else {
            setCurrentSituationName(situationName);
        }

        // INFO ITEM
        if (eyes.isInfoItemHidden) {
            let concealedText = [];
            for (let i = 0; i < 4; i++) {
                concealedText.push(<img className='w-[24px]' src={`${CONCEALER_BASE_URL}/${selectedConcealer}`} />)
            }
            setCurrentInfoItems(<div>
                <div className='flex h-max'>{...concealedText}</div>
                <div className='flex h-max'>{...concealedText}</div>
            </div>);
        } else {
            setCurrentInfoItems(arrangeInfoItems(gender, sector, ageRange, location));
        }

        // TEXT
        if (eyes.isTextHidden) {
            let concealedText = [];
            for (let i = 0; i < 10; i++) {
                concealedText.push(<img className='w-[24px]' src={`${CONCEALER_BASE_URL}/${selectedConcealer}`} />)
            }
            setCurrentText(<div className='flex flex-wrap'>{...concealedText}</div>);
        } else {
            setCurrentText(story.text);
        }

        //OTHER SITUATIONS
        if (eyes.isOtherHidden) {
            let concealedText = [];
            for (let i = 0; i < 10; i++) {
                concealedText.push(
                    <div>
                        <img className='w-[24px]' src={`${CONCEALER_BASE_URL}/${selectedConcealer}`} />
                    </div>
                )
            }
            setCurrentOtherSituations(<div className='flex flex-wrap'>{...concealedText}</div>);
        } else {
            setCurrentOtherSituations(story.otherSituations);
        }

        // ADVICE
        if (eyes.isAdviceHidden) {
            let concealedText = [];
            for (let i = 0; i < 10; i++) {
                concealedText.push(<img className='w-[24px]' src={`${CONCEALER_BASE_URL}/${selectedConcealer}`} />)
            }
            setCurrentAdviceText(<div className='flex flex-wrap'>{...concealedText}</div>);
        } else {
            setCurrentAdviceText(story.adviceText);
        }

        // console.log(JSON.stringify(story, null, 2))

        setStoryItemsConcealOptions(prev => ([
            { ...prev[0], isHidden: eyes.isSituationHidden },
            { ...prev[1], isHidden: eyes.isInfoItemHidden },
            { ...prev[2], isHidden: eyes.isTextHidden },
            { ...prev[3], isHidden: eyes.isOtherHidden },
            { ...prev[4], isHidden: eyes.isAdviceHidden },
        ]));

    }, [eyes, selectedConcealer]);

    function handleDownloadClick() {
        htmlToImage
            .toPng(document.getElementById('story-download'), { backgroundColor: '#ffffff', pixelRatio: 4 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'my-image-name.png';
                link.href = dataUrl;
                link.click();
            });
    }

    return (

        <div className='flex items-stretch gap-2'>
            <div className='dark:bg-black dark:text-gray-300'>
                <div className='mb-2 flex flex-wrap gap-2'>
                    <div className='text-gray-500 text-sm mt-1'>Ganti:</div>
                    {storyItemsConcealOptions.map((storyItem, i) => {
                        if (storyItem.name === "isOtherHidden" && !story.hasOtherSituations) {
                            return;
                        } else if (storyItem.name === "isAdviceHidden" && !story.hasAdvice) {
                            return;
                        }
                        return (<div
                            key={i}
                            className={`my-multi-select ${storyItem.isHidden ? "bg-[#f1efe3] dark:bg-gray-800" : ""}`}
                            onClick={() => handleEyeClick(storyItem.name, !storyItem.isHidden)}>
                            <img className='w-[20px]' src={`${SYSTEM_ICON_BASE_URL}/${storyItem.iconName}`} />
                        </div>)
                    }
                    )}
                </div>
                <div className='mt-4 mb-4 flex gap-2'>
                    <div className='text-gray-500 text-sm mt-[2px]'>dengan:</div>
                    <RadioGroup value={selectedConcealer} onChange={handleConcealerChange} className={"flex flex-wrap gap-4"}>
                        {concealers.map(c =>
                            <Field key={c.id} >
                                <Radio
                                    value={c.name}
                                    className={"cursor-pointer"}>
                                    <img className='w-[26px]' src={`${CONCEALER_BASE_URL}/${c.name}`} />
                                </Radio>
                            </Field>)}
                    </RadioGroup>
                </div>
                <div className='max-h-[40vh] overflow-y-auto px-1 dark:bg-black'>
                    <div id="story-download" className='grid grid-cols-1 px-2 py-2'>
                        <div className={`pill-card-story`}>
                            <div className='flex justify-between mb-2'>
                                <img className='w-[36px]' src={`${SYSTEM_ICON_BASE_URL}/double-quotes-svgrepo-com.svg`} />
                                <div className='text-center'>
                                    <div className='text-gray-400  text-sm'>samalahkita</div>
                                    <div className='text-gray-400 text-[10px]'>-Diari Sejagat-</div>
                                </div>
                            </div>
                            <div className='mb-4'>
                                {currentSituationName}
                            </div>
                            <div className='flex justify-between'>
                                <div className='flex gap-2'>
                                    <div className=''>
                                        <img className='w-24' src={`${STICKERS_BASE_URL}/${story.profile}`} />
                                    </div>
                                    {currentInfoItems}
                                </div>
                            </div>
                            <div className='grid grid-cols-1 my-4'>{currentText}</div>
                            {story.hasOtherSituations && (currentOtherSituations?.length > 0 ?
                                <div className=''>
                                    <div className='text-sm text-gray-500 mt-8'>Situasi lain</div>
                                    <div className=''>
                                        {/* real value */}
                                        {currentOtherSituations.map((s, i) => (
                                            <div key={i} className='text-xs tracking-[0.1em]'>
                                                {s.name}
                                            </div>
                                        ))}
                                    </div>
                                </div> :
                                <div>
                                    {story.hasOtherSituations && <div className='text-sm text-gray-500 mt-8'>Situasi lain</div>}
                                    <div className='flex flex-wrap gap-2'>
                                        {/* the concealer (emoji) */}
                                        {currentOtherSituations}
                                    </div>
                                </div>)
                            }
                            {story.hasAdvice &&
                                <div className='mt-4'>
                                    <div className='text-sm text-gray-500'>Nasihat</div>
                                    <div className='text-sm'>{currentAdviceText}</div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mt-2 cursor-pointer gap-1' onClick={() => handleDownloadClick()}>
                    <img className='w-[20px]' src={`${SYSTEM_ICON_BASE_URL}/download-svgrepo-com.svg`} />
                    {t("download_button")}
                </div>
            </div>
        </div>

    );
}