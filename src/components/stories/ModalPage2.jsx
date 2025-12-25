import { useState, useEffect, useRef } from 'react';
import '../../index.css';
import { Textarea } from '@headlessui/react';
import OtherSituationsMarquee from '../marquee/OtherSituationsMarquee';
import { useTranslation } from 'react-i18next';
import MyCheckbox from '../custom-inputs/MyCheckbox';
import containsPersonalInfo from '../../hooks/useDetectPersonalInfo';

export default function ModalPage2({ isOpen, isCurrent, story, setStory, maxTextLength, maxAdviceTextLength, maxOtherSituationsSize, situationsRef }) {

    // Don't conditionally render useState, useEffect, etc hooks like this. 
    // Will cause 'contact React team' error and resets all props / unexpected behaviour
    // if (!isCurrent) return null;

    const { t } = useTranslation("components");
    const [text, setText] = useState(story?.text || "");
    const [currentLength, setCurrentLength] = useState(story?.textLength || 0);
    const [hasAdvice, setHasAdvice] = useState(story?.hasAdvice || false);
    const [adviceText, setAdviceText] = useState(story?.adviceText || "");
    const [currentAdviceLength, setCurrentAdviceLength] = useState(story?.adviceTextLength || 0);
    const [storyTextValidationMessage, setStoryTextValidationMessage] = useState("");
    const [adviceTextValidationMessage, setAdviceTextValidationMessage] = useState("");

    function handleTextChange(text) {
        if (containsPersonalInfo(text)) {
            setStoryTextValidationMessage(t('no_links_ind'));
            return;
        } else {
            setStoryTextValidationMessage("");
            setText(text);
            setCurrentLength(text.length);
            setStory(prev => ({
                ...prev,
                text: text,
                textLength: text.length
            }));
        }
    }

    function handleHasAdviceChecboxClick(hasAdvice) {
        setHasAdvice(!hasAdvice);
        setStory(prev => ({
            ...prev,
            hasAdvice: !hasAdvice
        }));
    }

    function handleAdviceTextChange(adviceText) {
        if (containsPersonalInfo(adviceText)) {
            setAdviceTextValidationMessage(t('no_links_ind'));
            return;
        } else {
            setAdviceTextValidationMessage("");
            setAdviceText(adviceText);
            setCurrentAdviceLength(adviceText.length);
            setStory(prev => ({
                ...prev,
                adviceText: adviceText,
                adviceTextLength: adviceText.length
            }));
        }
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

    // Story and advice TextArea grows/shrinks with content
    const textAreaRef = useRef(null);
    useEffect(() => {
        if (!textAreaRef.current) return;
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }, [text]);

    const adviceTextAreaRef = useRef(null);
    useEffect(() => {
        if (!adviceTextAreaRef.current) return;
        adviceTextAreaRef.current.style.height = "auto";
        adviceTextAreaRef.current.style.height = `${adviceTextAreaRef.current.scrollHeight}px`;
    }, [adviceText]);

    const [hasOtherSituations, setHasOtherSituations] = useState(story?.hasOtherSituations || false);

    function handleHasOtherSituationsChecboxClick(hasOtherSituations) {
        setHasOtherSituations(!hasOtherSituations);
        setStory(prev => ({
            ...prev,
            hasOtherSituations: !hasOtherSituations
        }));
    }

    useEffect(() => {
        if (isCurrent) textAreaRef?.current.focus();
    }, [isCurrent])

    return (
        <div className={`${isCurrent ? "block" : "hidden"} grid grid-col max-h-[50vh] overflow-y-auto px-1 py-1`}>
            <div className='grid grid-col'>
                <Textarea
                    ref={textAreaRef}
                    autoFocus={true}
                    rows={2}
                    spellCheck={false}
                    className="min-h-10 resize-none overflow-hidden border p-2"
                    value={text}
                    onChange={(e) => {
                        handleTextChange(e.target.value)
                    }} />

                <div className={`mt-2 text-sm flex justify-between`}>
                    <div className='text-red-400'>{storyTextValidationMessage}</div>
                    <div className={`${currentLength > maxTextLength && `text-red-400`}`}>{currentLength}/{maxTextLength}</div>
                </div>
            </div>
            <div className='grid'>
                <div className='flex gap-2 mt-2'>
                    <MyCheckbox text={t("other_situation_checkbox")} onClick={() => handleHasOtherSituationsChecboxClick(hasOtherSituations)} value={hasOtherSituations} />
                    {/* <MyTooltip isOpen={isAdviceTooltipOpen} setIsOpen={setIsAdviceTooltipOpen} className={"mt-[8px]"} /> */}
                </div>
                {hasOtherSituations && <div>
                    <div className='flex mt-1 gap-2'>
                        <span className="text-sm text-gray-500">
                            {t('other_situations_instruction')}
                        </span>
                        {/* <MyTooltip isOpen={isOtherSituationsTooltipOpen} setIsOpen={setIsOtherSituationsTooltipOpen} /> */}
                    </div>
                    <div className='my-2'>
                        {story.otherSituations.map((s, i) => (
                            <div key={i} className='pill-small bg-[#f1efe3] dark:bg-gray-800' onClick={() => handleSelectedSituationClick(s.id)}>{s.name}</div>
                        ))}
                    </div>
                    <OtherSituationsMarquee isCurrent={isCurrent} size={"small"} story={story} setStory={setStory} situationsRef={situationsRef} />
                    <div className={`mt-2 text-sm text-right ${story.otherSituations.length > maxOtherSituationsSize && `text-red-400`}`}>
                        {story.otherSituations.length}/{maxOtherSituationsSize}
                    </div>
                </div>}
                <div className='flex gap-2 mt-2'>
                    <MyCheckbox text={t('advice_checkbox')} onClick={handleHasAdviceChecboxClick} value={hasAdvice} />
                </div>
                {hasAdvice &&
                    <div className='grid grid-col'>
                        <div className='text-sm text-gray-500 mt-1'>{t("advice_instruction")}</div>
                        <Textarea
                            ref={adviceTextAreaRef}
                            rows={1}
                            spellCheck={false}
                            className="min-h-10 resize-none overflow-hidden mt-4 border px-1"
                            value={adviceText}
                            onChange={(e) => {
                                handleAdviceTextChange(e.target.value)
                            }} />
                        <div className={`mt-2 text-sm flex justify-between`}>
                            <div className='text-red-400'>{adviceTextValidationMessage}</div>
                            <div className={`${currentAdviceLength > maxAdviceTextLength && `text-red-400`}`}>{currentAdviceLength}/{maxAdviceTextLength}</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

