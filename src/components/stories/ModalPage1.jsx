import { useEffect, useState } from 'react';
import '../../index.css';
import { Textarea } from '@headlessui/react';
import Marquee from '../marquee/Marquee';


export default function ModalPage1({ isCurrent, story, setStory, maxTextLength, maxOtherSituationsSize }) {
    if (!isCurrent) return null;

    const [text, setText] = useState("");
    const [currentLength, setCurrentLength] = useState(story.textLength);
    const [selectedSituations, setSelectedSituations] = useState([]);

    function handleTextChange(text) {
        setText(text);
        setCurrentLength(text.length);
        setStory(prev => ({
            ...prev,
            text: text,
            textLength: text.length
        }));
    }

    function handleSelectedSituationClick(selectedSituationId) {
        setStory(prev => {
            if (prev.otherSituations.some(s => s.id === selectedSituationId)) {
                return {
                    ...prev,
                    otherSituations: prev.otherSituations.filter(s => s.id !== selectedSituationId)
                }
            };
        })
    }

    return (
        <div className='grid grid-col'>
            <Textarea rows={5} spellCheck={false} className="border px-1" autoFocus={true} value={story.text}
                onChange={(e) => {
                    handleTextChange(e.target.value)
                }} />
            <div className={`mt-2 text-sm text-right ${currentLength > maxTextLength && `text-red-700`}`}>
                {currentLength}/{maxTextLength}
            </div>
            <div className='grid grid-col mt-8'>
                <div className="text-sm my-2 text-gray-600">
                    Pilih luahan dibawah untuk latar belakang, sejarah atau situasi anda yang lain jika berkaitan. Tinggalkan jika tiada.
                </div>
                <div className='my-2'>
                    {story.otherSituations.map(s => (
                        <div key={s.id} className='pill-small bg-[#f1efe3]' onClick={() => handleSelectedSituationClick(s.id)}>{s.name}</div>
                    ))}
                </div>
                <Marquee size={"small"} story={story} setStory={setStory} />
                <div className={`mt-2 text-sm text-right ${story.otherSituations.length > maxOtherSituationsSize && `text-red-700`}`}>
                    {story.otherSituations.length}/{maxOtherSituationsSize}
                </div>
            </div>
        </div>
    );
}

