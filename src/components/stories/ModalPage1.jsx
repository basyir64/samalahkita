import '../../index.css';
import { Radio, RadioGroup, Field } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MySelect from '../custom-inputs/MySelect';
import { useUserOptions } from '../../hooks/useUserOptions';

export default function ModalPage1({ isCurrent, story, setStory }) {

    const { t } = useTranslation("components");
    const {genders, ageRanges, locations, sectors} = useUserOptions();
    const [selectedGender, setSelectedGender] = useState(story?.gender);
    const [selectedAge, setSelectedAge] = useState(story?.ageRange || ageRanges[0]);
    const [selectedLocation, setSelectedLocation] = useState(story?.location || locations[0]);
    const [selectedSector, setSelectedSector] = useState(story?.sector || sectors[0]);
    const [isTermsOfUseChecked, setIsTermsOfUseChecked] = useState(story?.isTermsOfUseChecked || false);

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
        <div className={`${isCurrent ? "block" : "hidden"} grid grid-col mt-2`}>
            <div className='flex flex-col gap-1 mb-4'>
                <div>{t('gender_field')}</div>
                <RadioGroup value={selectedGender} onChange={handleGenderChange} className={"flex flex-wrap gap-2"}>
                    {genders.map((gender) => (
                        <Field key={gender.id}>
                            <Radio value={gender.value} className="my-radio">
                                <span>{gender.text}</span>
                            </Radio>
                        </Field>
                    ))}
                </RadioGroup>
            </div>
            <MySelect label={t('age_field')} options={ageRanges} value={selectedAge} onChange={handleAgeChange}/>
            <MySelect label={t('location_field')} options={locations} value={selectedLocation} onChange={handleLocationChange}/>
            <MySelect label={t('occupation_field')} options={sectors} value={selectedSector} onChange={handleSectorChange}/>
            {/* <div className='mt-8'>
                <MyCheckbox text={"Dengan menekan Hantar"} onClick={handleTermsOfUseCheckboxChange} value={isTermsOfUseChecked}/>
            </div> */}
        </div>
    );
}