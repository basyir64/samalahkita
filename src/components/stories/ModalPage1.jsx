import { useState } from 'react';
import '../../index.css';
import { Textarea } from '@headlessui/react';
import Marquee from '../marquee/Marquee';
import { useTranslation } from 'react-i18next';
import MyCheckbox from '../custom/MyCheckbox';

export default function ModalPage1({ isCurrent, story, setStory, maxTextLength, maxAdviceTextLength, maxOtherSituationsSize }) {
    if (!isCurrent) return null;

    const { t } = useTranslation("components");
    const [text, setText] = useState(story?.text || "");
    const [currentLength, setCurrentLength] = useState(story?.textLength || 0);
    const [hasAdvice, setHasAdvice] = useState(story?.hasAdvice || false);
    const [adviceText, setAdviceText] = useState(story?.adviceText || "");
    const [currentAdviceLength, setCurrentAdviceLength] = useState(story?.adviceTextLength || 0);


    function handleTextChange(text) {
        setText(text);
        setCurrentLength(text.length);
        setStory(prev => ({
            ...prev,
            text: text,
            textLength: text.length
        }));
    }

    function handleHasAdviceChecboxClick(hasAdvice) {
        setHasAdvice(!hasAdvice);
        setStory(prev => ({
            ...prev,
            hasAdvice: !hasAdvice
        }));
    }

    function handleAdviceTextChange(adviceText) {
        setAdviceText(adviceText);
        setCurrentAdviceLength(adviceText.length);
        setStory(prev => ({
            ...prev,
            adviceText: adviceText,
            adviceTextLength: adviceText.length
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
            <div className='grid grid-col'>
                <Textarea rows={5} spellCheck={false} className="border px-1" autoFocus={true} value={text}
                    onChange={(e) => {
                        handleTextChange(e.target.value)
                    }} />
                <div className={`mt-2 text-sm text-right ${currentLength > maxTextLength && `text-red-700`}`}>
                    {currentLength}/{maxTextLength}
                </div>
            </div>
            <div className='grid grid-col'>
                <div className="text-sm my-2 text-gray-600">
                    {t('other_situations_instruction')}
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
                <MyCheckbox text={"Saya ada nasihat untuk orang lain"} onClick={handleHasAdviceChecboxClick} value={hasAdvice} />
                {hasAdvice &&
                    <div className='grid grid-col'>
                        <Textarea rows={2} spellCheck={false} className="mt-4 border px-1" value={adviceText}
                            onChange={(e) => {
                                handleAdviceTextChange(e.target.value)
                            }} />
                        <div className={`mt-2 text-sm text-right ${currentAdviceLength > maxAdviceTextLength && `text-red-700`}`}>
                            {currentAdviceLength}/{maxAdviceTextLength}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

