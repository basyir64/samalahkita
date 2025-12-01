import '../../index.css';
import { Radio, RadioGroup, Field, Select } from '@headlessui/react';
import { useState } from 'react';

export default function ModalPage2({ isCurrent, story, setStory }) {
    if (!isCurrent) return null;

    const genders = [
        { id: 0, text: "Rahsia", value: "" },
        { id: 1, text: "Lelaki", value: "male" },
        { id: 2, text: "Perempuan", value: "female" },
    ];

    const ageRanges = [
        { id: 0, text: "Rahsia", value: "" },
        { id: 1, text: "13-17", value: "13-17" },
        { id: 2, text: "18-25", value: "18-25" },
        { id: 3, text: "26-30", value: "26-30" },
    ];

    const locations = [
        { id: 0, text: "Rahsia", value: "" },
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
        { id: 0, text: "Rahsia", value: "" },
        { id: 1, text: "Sektor Awam", value: "public" },
        { id: 2, text: "Sektor Swasta", value: "private" },
        { id: 3, text: "Pelajar", value: "student" },
        { id: 4, text: "Suri Rumah", value: "housewife" },
        { id: 5, text: "Penganggur", value: "unemployed" },
        { id: 6, text: "Pemilik Perniagaan", value: "business_owner" },
    ];

    const [selectedGender, setSelectedGender] = useState(genders[0]);
    const [selectedAge, setSelectedAge] = useState(ageRanges[0]);
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);
    const [selectedSector, setSelectedSector] = useState(sectors[0]);

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

    return (
        <div className='grid grid-col'>
            <div className='flex flex-col gap-1 mb-4'>
                <div>Jantina</div>
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
                <div>Umur</div>
                <select value={story.ageRange} onChange={(e) => handleAgeChange(e.target.value)} className={"my-select"}>
                    {ageRanges.map(range => (
                        <option key={range.id} className='my-option' value={range.value}>{range.text}</option>
                    ))}
                </select>
            </div>
            <div className='flex flex-col gap-1 mb-4'>
                <div>Lokasi</div>
                <select value={story.location} onChange={(e) => handleLocationChange(e.target.value)} className={"my-select"}>
                    {locations.map(location => (
                        <option key={location.id} className='my-option' value={location.value}>{location.text}</option>
                    ))}
                </select>
            </div>
            <div className='flex flex-col gap-1 mb-4'>
                <div>Pekerjaan</div>
                <select value={story.sector} onChange={(e) => handleSectorChange(e.target.value)} className={"my-select"}>
                    {sectors.map(sector => (
                        <option key={sector.id} className='my-option' value={sector.value}>{sector.text}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}