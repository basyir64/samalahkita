import '../../index.css';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSituationService } from '../../hooks/useSituationService';
import { serverTimestamp } from 'firebase/firestore';
import containsPersonalInfo from '../../hooks/useDetectPersonalInfo';
import { useMediaService } from '../../hooks/useMediaService';
import { useNavigate } from 'react-router';

export default function CreateSituationModal({ isOpen, setIsOpen, setStory, existingSituations }) {

    const { t } = useTranslation("components");
    const [text, setText] = useState("");
    const { save } = useSituationService();
    const [message, setMessage] = useState("");
    const [textLength, setTextLength] = useState(0);
    const maxTextLength = 100;
    const [situation, setSituation] = useState({ createdAt: serverTimestamp(), storiesCount: 0, totalViews: 0, onDisplay: false });
    const [isLoadingSave, setIsLoadingSave] = useState(false);
    const [isSaveSuccess, setIsSaveSuccess] = useState(false);
    const { SYSTEM_ICON_BASE_URL } = useMediaService();
    const navigate = useNavigate();
    const [hasPersonalInfo, setHasPersonalInfo] = useState(false);
    const situationInputRef = useRef(null);

    function handleTextChange(text) {
        if (containsPersonalInfo(text)) {
            setHasPersonalInfo(true);
            setMessage(t("no_links_ind"))
            return;
        } else {
            setHasPersonalInfo(false);
            setMessage("")
            setText(text);
            setTextLength(text.length);
            setSituation(prev => ({
                ...prev,
                //temporary. eventually will get firestore id. need id here to allow de-select at ModalPage2.handleSelectedSituationClick()
                ...(setStory && { id: text }),
                name: text,
                nameLength: text.length
            }));
        }
    }

    // for both Add (other situations marquee) and Save (homepage)
    async function handleSaveClick(situation) {
        // Check if exists in situations context ref
        if (existingSituations.some(s => (s.name === situation.name))) {
            setMessage(t("already_exists_ind"))
            return;
        }

        if (setStory) {
            setStory(prev => ({
                ...prev,
                otherSituations: [...prev.otherSituations, situation]
            }));
            setIsOpen(false);
            setText("");
            return;
        } else {
            setIsLoadingSave(true);
            const docId = await save(situation);
            if (!docId) {
                setMessage(t("add_failed_ind"));
                setIsLoadingSave(false);
                return;
            }
            setSituation(prev => ({ ...prev, id: docId }))
            setIsLoadingSave(false);
            setIsSaveSuccess(true);
        }
    }

    function handleNewStoryClick(situation) {
        navigate(`stories/situation/${situation.id}?modal=true`);
        window.location.reload();
    }

    useEffect(() => {
        if (isOpen && situationInputRef?.current) situationInputRef.current.focus();
    }, [isOpen])

    function handleStartOverClick() {
        setSituation({ createdAt: serverTimestamp(), storiesCount: 0, totalViews: 0, onDisplay: false });
        setIsSaveSuccess(false);
        setText("");
    }

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-60">
            <div className="fixed inset-0 bg-black/10 backdrop-blur-md" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="pill-modal">
                    <DialogTitle className="mb-2">{t("new_situation_title")}
                    </DialogTitle>
                    {isSaveSuccess ?
                        <div>
                            <div className='flex gap-1 justify-center'>
                                {/* <img className='w-[20px]' src={`${SYSTEM_ICON_BASE_URL}/double-quotes-svgrepo-com.svg`} /> */}
                                <div className='pill'>
                                    {situation.name}
                                </div>
                            </div>
                            <div className='flex gap-2 justify-center'>

                                <img className='w-[24px]' src={`${SYSTEM_ICON_BASE_URL}/check-svgrepo-com.svg`} />
                                {t("add_ok_ind")}
                            </div>
                        </div>
                        : <div>
                            <div className=''>
                                <input
                                    ref={situationInputRef}
                                    autoFocus={true}
                                    type="text"
                                    className='border rounded-[5px] w-full p-2'
                                    value={text}
                                    spellCheck={false}
                                    onChange={(e) => handleTextChange(e.target.value)} />
                                <div className='mt-2 flex justify-between gap-2'>
                                    <div className='text-sm text-red-400'>{message}</div>
                                    <div className={`text-sm ${textLength > maxTextLength && `text-red-400`}`}>
                                        {textLength}/{maxTextLength}
                                    </div>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <div className='text-gray-500'>{t("rule_title")}</div>
                                {t("rule1")}<br />
                                {t("rule2")} <br />
                                {t("rule3")}
                            </div>
                        </div>}
                    <div className="flex justify-between gap-4 mt-10">
                        <div className='flex gap-2'>
                            <button className='underline cursor-pointer' onClick={() => setIsOpen(false)}>{t('close_button')}</button>
                            {isSaveSuccess && <button className='underline cursor-pointer' onClick={() => handleStartOverClick()}>{t('start_over_button')}</button>}
                        </div>
                        <div className='flex gap-2'>
                            {isSaveSuccess ?
                                <button className='underline cursor-pointer' onClick={() => handleNewStoryClick(situation)}>
                                    {t("new_story_button")}
                                </button>
                                : <button
                                    disabled={!textLength || textLength > maxTextLength || isLoadingSave || hasPersonalInfo}
                                    className={`underline ${!textLength || textLength > maxTextLength || isLoadingSave || hasPersonalInfo ? `cursor-not-allowed text-gray-500` : ` cursor-pointer`}`}
                                    onClick={() => handleSaveClick(situation)}>{t("add_button")}
                                </button>}
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}