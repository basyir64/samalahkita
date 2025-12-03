import '../../index.css';
import { Radio, RadioGroup, Field, Checkbox } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ModalPage2({ isCurrent, story, setStory }) {
    if (!isCurrent) return null;

    const { t } = useTranslation("components");

    const genders = [
        { id: 0, text: <>{t('secret_user_input')}</>, value: "" },
        { id: 1, text: <>{t('male_user_input')}</>, value: "male" },
        { id: 2, text: <>{t('female_user_input')}</>, value: "female" },
    ];

    const ageRanges = [
        { id: 0, text: <>{t('secret_user_input')}</>, value: "" },
        { id: 1, text: "13-17", value: "13-17" },
        { id: 2, text: "18-25", value: "18-25" },
        { id: 3, text: "26-30", value: "26-30" },
    ];

    const locations = [
        { id: 0, text: <>{t('secret_user_input')}</>, value: "" },
        { id: 1, text: "Johor", value: "johor" },
        { id: 2, text: "Kedah", value: "kedah" },
        { id: 3, text: "Kelantan", value: "kelantan" },
        { id: 4, text: "Melaka", value: "melaka" },
        { id: 5, text: "Negeri Sembilan", value: "negeri_sembilan" },
        { id: 6, text: "Pahang", value: "pahang" },
        { id: 7, text: "Penang", value: "penang" },
        { id: 8, text: "Perak", value: "perak" },
        { id: 9, text: "Perlis", value: "perlis" },
        { id: 10, text: "Sabah", value: "sabah" },
        { id: 11, text: "Sarawak", value: "sarawak" },
        { id: 12, text: "Selangor", value: "selangor" },
        { id: 13, text: "Terengganu", value: "terengganu" },
        { id: 14, text: "Kuala Lumpur", value: "kuala_lumpur" },
        { id: 15, text: "Putrajaya", value: "putrajaya" },
        { id: 16, text: "Labuan", value: "labuan" },
    ];


    const sectors = [
        { id: 0, text: <>{t('secret_user_input')}</>, value: "" },
        { id: 1, text: <>{t('public_sector_user_input')}</>, value: "public" },
        { id: 2, text: <>{t('private_sector_user_input')}</>, value: "private" },
        { id: 3, text: <>{t('student_user_input')}</>, value: "student" },
        { id: 4, text: <>{t('housewife_user_input')}</>, value: "housewife" },
        { id: 5, text: <>{t('freelance_user_input')}</>, value: "freelance" },
        { id: 6, text: <>{t('rider_user_input')}</>, value: "rider" },
        { id: 7, text: <>{t('agent_user_input')}</>, value: "agent" },
        { id: 8, text: <>{t('business_owner_user_input')}</>, value: "business_owner" },
        { id: 9, text: <>{t('unemployed_user_input')}</>, value: "unemployed" },

    ];

    const [selectedGender, setSelectedGender] = useState(genders[0]);
    const [selectedAge, setSelectedAge] = useState(ageRanges[0]);
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);
    const [selectedSector, setSelectedSector] = useState(sectors[0]);
    const [isTermsOfUseChecked, setIsTermsOfUseChecked] = useState(false);

    function handleGenderChange(selectedGender) {
        setSelectedGender(selectedGender);
        setStory(prev => ({
            ...prev,
            gender: selectedGender
        }))
    }

    function handleAgeChange(selectedAge) {
        setSelectedAge(selectedAge);
        setStory(prev => ({
            ...prev,
            ageRange: selectedAge
        }))
    }

    function handleLocationChange(selectedLocation) {
        setSelectedLocation(selectedLocation);
        setStory(prev => ({
            ...prev,
            location: selectedLocation
        }))
    }

    function handleSectorChange(selectedSector) {
        setSelectedSector(selectedSector);
        setStory(prev => ({
            ...prev,
            sector: selectedSector
        }))
    }

    function handleTermsOfUseCheckboxChange(isTermsOfUseChecked) {
        setIsTermsOfUseChecked(!isTermsOfUseChecked);
        setStory(prev => ({
            ...prev,
            isTermsOfUseChecked: !isTermsOfUseChecked
        }))
    }

    // useEffect(() => {
    //     console.log(JSON.stringify(story, null, 2))
    // }, [story])

    return (
        <div className='grid grid-col'>
            <div className='flex flex-col gap-1 mb-4'>
                <div>{t('gender_field')}</div>
                <RadioGroup value={story.gender} onChange={handleGenderChange} className={"flex flex-wrap gap-2"}>
                    {genders.map((gender) => (
                        <Field key={gender.id}>
                            <Radio value={gender.value} className="my-radio">
                                <span>{gender.text}</span>
                            </Radio>
                        </Field>
                    ))}
                </RadioGroup>
            </div>
            <div className='flex flex-col gap-1 mb-4'>
                <div>{t('age_field')}</div>
                <select value={story.ageRange} onChange={(e) => handleAgeChange(e.target.value)} className={"my-select"}>
                    {ageRanges.map(range => (
                        <option key={range.id} className='my-option' value={range.value}>{range.text}</option>
                    ))}
                </select>
            </div>
            <div className='flex flex-col gap-1 mb-4'>
                <div>{t('location_field')}</div>
                <select value={story.location} onChange={(e) => handleLocationChange(e.target.value)} className={"my-select"}>
                    {locations.map(location => (
                        <option key={location.id} className='my-option' value={location.value}>{location.text}</option>
                    ))}
                </select>
            </div>
            <div className='flex flex-col gap-1 mb-4'>
                <div>{t('occupation_field')}</div>
                <select value={story.sector} onChange={(e) => handleSectorChange(e.target.value)} className={"my-select"}>
                    {sectors.map(sector => (
                        <option key={sector.id} className='my-option' value={sector.value}>{sector.text}</option>
                    ))}
                </select>
            </div>
            <div className='flex flex-col gap-1 mt-10 '>
                <div className={'flex gap-2 cursor-pointer'}
                onClick={() => handleTermsOfUseCheckboxChange(isTermsOfUseChecked)}>
                    <span className={`my-checkbox ${isTermsOfUseChecked ? "bg-[#f1efe3]" : "bg-white"}`}></span>
                    <span className='text-sm'>Dengan menekan Hantar, </span>
                </div>
            </div>
        </div>
    );
}