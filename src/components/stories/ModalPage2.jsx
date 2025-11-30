import '../../index.css';
import { Radio, RadioGroup, Field } from '@headlessui/react';

export default function ModalPage2({ isCurrent, story, setStory }) {
    if (!isCurrent) return null;

    // dont hardcode
    const ageRanges = ["13-17", "18-25", "26-30"];
    const genders = ["Lelaki", "Perempuan"];
    const locations = ["Selangor"];
    const sectors = ["Perkhidmatan Awam"];

    return (
        <div className=''>
            <RadioGroup className={"flex flex-wrap"}>
                {genders.map((gender) => (
                    <Field key={gender} className="flex items-center gap-2">
                        <Radio value={gender} className="group flex size-5 items-center justify-center rounded-full border bg-white data-checked:bg-blue-400">
                            <span className="invisible size-2 rounded-full bg-white group-data-checked:visible">{gender}</span>
                        </Radio>
                    </Field>
                ))}
            </RadioGroup>
        </div>
    );
}