import { useEffect, useState } from 'react';
import '../../index.css';
import { Textarea } from '@headlessui/react';
import Marquee from '../marquee/Marquee';


export default function ModalPage1({ isCurrent, story, setStory, max }) {
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

    return (
        <div className='grid grid-col'>
            <Textarea rows={5} spellCheck={false} className="border px-1" autoFocus={true} value={story.text}
                onChange={(e) => {
                    handleTextChange(e.target.value)
                }} />
            <div className={`mt-2 text-sm text-right ${currentLength > max && `text-red-700`}`}>
                {currentLength}/{max}
            </div>
            <div className='grid grid-col mt-8'>
                <div className="text-sm my-2 text-gray-600">
                    Pilih luahan dibawah untuk latar belakang, sejarah atau situasi anda yang lain jika berkaitan. Tinggalkan jika tiada.
                </div>
                <div className='my-2'>
                    {story.otherSituations.map(s => (
                        <div className='pill-small'>{s}</div>
                    ))}
                </div>
                <Marquee size={"small"} story={story} setStory={setStory} />
                <div className={`mt-2 text-sm text-right ${currentLength > max && `text-red-700`}`}>
                    {currentLength}/{5}
                </div>
            </div>
        </div>
    );
}

