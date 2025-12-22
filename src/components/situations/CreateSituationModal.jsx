import '../../index.css';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSituationService } from '../../hooks/useSituationService';
import { serverTimestamp } from 'firebase/firestore';
import containsPersonalInfo from '../../hooks/useDetectPersonalInfo';

export default function CreateSituationModal({ isOpen, setIsOpen, setStory, existingSituations }) {

    const { t } = useTranslation("components");
    const [text, setText] = useState("");
    const { save } = useSituationService();
    const [message, setMessage] = useState("");
    const [textLength, setTextLength] = useState(0);
    const maxTextLength = 100;
    const [situation, setSituation] = useState({ createdAt: serverTimestamp(), storiesCount: 0, totalViews: 0 });
    const [isLoadingSave, setIsLoadingSave] = useState(false);

    function handleTextChange(text) {
        if (containsPersonalInfo(text)) {
            setMessage(t("no_links_ind"))
            return;
        } else {
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
            return;
        } else {
            setIsLoadingSave(true);
            const result = await save(situation);
            if (!result) {
                return;
            }
            setMessage("Saved: " + situation.name);
            setIsLoadingSave(false);
        }
    }

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-60">
            <div className="fixed inset-0 bg-black/10 backdrop-blur-md" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="pill-modal">
                    <DialogTitle className="mb-4">{t("new_situation_title")}
                    </DialogTitle>
                    {/* <Description className="text-sm mb-4 text-gray-500">Add your text below</Description> */}
                    <div className=''>
                        {/* <img className="w-[20px]" src={`${SYSTEM_ICON_BASE_URL}/hashtag-svgrepo-com.svg`} /> */}
                        <input
                            type="text"
                            autoFocus={true}
                            className='border rounded-[5px] w-full p-2'
                            value={text}
                            spellCheck={false}
                            onChange={(e) => handleTextChange(e.target.value)} />
                        <div className='mt-2 flex justify-between gap-2'>
                            <div className='text-sm text-red-700'>{message}</div>
                            <div className={`text-sm ${textLength > maxTextLength && `text-red-700`}`}>
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
                    <div className="flex justify-between gap-4 mt-10">
                        <button className='underline cursor-pointer' onClick={() => setIsOpen(false)}>{t('close_button')}</button>
                        <div className='flex gap-2'>
                            <button
                                disabled={textLength > maxTextLength || isLoadingSave || message}
                                className={`underline ${textLength > maxTextLength || isLoadingSave || message ? `cursor-not-allowed text-gray-500` : ` cursor-pointer`}`}
                                onClick={() => handleSaveClick(situation)}>{t("add_button")}</button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}