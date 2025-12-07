import { useState, useEffect } from 'react';
import '../../index.css';
import { Textarea } from '@headlessui/react';
import OtherSituationsMarquee from '../marquee/OtherSituationsMarquee';
import { useTranslation } from 'react-i18next';
import MyCheckbox from '../custom-inputs/MyCheckbox';
import MyTooltip from '../custom-inputs/MyTooltip';

export default function ModalPage2({ isOpen, isCurrent, story, setStory, maxTextLength, maxAdviceTextLength, maxOtherSituationsSize }) {

    // Don't conditionally render useState, useEffect, etc hooks like this. 
    // Will cause 'contact React team' error and resets all props / unexpected behaviour
    // if (!isCurrent) return null;

    const { t } = useTranslation("components");
    const [text, setText] = useState(story?.text || "");
    const [currentLength, setCurrentLength] = useState(story?.textLength || 0);
    const [hasAdvice, setHasAdvice] = useState(story?.hasAdvice || false);
    const [adviceText, setAdviceText] = useState(story?.adviceText || "");
    const [currentAdviceLength, setCurrentAdviceLength] = useState(story?.adviceTextLength || 0);
    const [isOtherSituationsTooltipOpen, setIsOtherSituationsTooltipOpen] = useState(false);
    const [isAdviceTooltipOpen, setIsAdviceTooltipOpen] = useState(false)

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
        <div className={`${isCurrent ? "block" : "hidden"} grid grid-col`}>
            <div className='grid grid-col'>
                <Textarea autoFocus={isCurrent} rows={5} spellCheck={false} className="border rounded-[5px] px-1" value={text}
                    onChange={(e) => {
                        handleTextChange(e.target.value)
                    }} />
                <div className={`mt-2 text-sm text-right ${currentLength > maxTextLength && `text-red-700`}`}>
                    {currentLength}/{maxTextLength}
                </div>
            </div>
            <div className='grid grid-col'>
                <div className='flex mt-6 gap-2'>
                    <span className="text-sm text-gray-500">
                        {isOtherSituationsTooltipOpen ? t('other_situations_instruction_tooltip') : t('other_situations_instruction')}
                    </span>
                    <MyTooltip isOpen={isOtherSituationsTooltipOpen} setIsOpen={setIsOtherSituationsTooltipOpen} />
                </div>
                <div className='my-2'>
                    {story.otherSituations.map(s => (
                        <div key={s.id} className='pill-small bg-[#f1efe3]' onClick={() => handleSelectedSituationClick(s.id)}>{s.name}</div>
                    ))}
                </div>
                <OtherSituationsMarquee isOpen={isOpen} isCurrent={isCurrent} size={"small"} story={story} setStory={setStory} />
                <div className={`mt-2 text-sm text-right ${story.otherSituations.length > maxOtherSituationsSize && `text-red-700`}`}>
                    {story.otherSituations.length}/{maxOtherSituationsSize}
                </div>
                <div className='flex gap-2'>
                    <MyCheckbox text={isAdviceTooltipOpen ? t('advice_checkbox_tooltip') : t('advice_checkbox')} onClick={handleHasAdviceChecboxClick} value={hasAdvice} />
                    <MyTooltip isOpen={isAdviceTooltipOpen} setIsOpen={setIsAdviceTooltipOpen} className={"mt-[8px]"} />
                </div>
                {hasAdvice &&
                    <div className='grid grid-col'>
                        <Textarea rows={2} spellCheck={false} className="mt-4 border rounded-[5px] px-1" value={adviceText}
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

