import '../../index.css';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSituationService } from '../../hooks/useSituationService';

export default function CreateSituationModal({ isOpen, setIsOpen, situation, setSituation }) {

    const { t } = useTranslation("components");
    const [text, setText] = useState("");
    const { save, allSituations, loadAll } = useSituationService();
    const [isSaveSuccess, setIsSaveSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [textLength, setTextLength] = useState(0);
    const maxTextLength = 100;

    function handleTextChange(text) {
        setText(text);
        setTextLength(text.length);
        setSituation(prev => ({
            ...prev,
            name: text,
            nameLength: text.length
        }));
    }

    async function handleSaveClick(situation) {
        const ref = await save(situation);
        if (ref?.id) {
            setIsSaveSuccess(true);
            // navigate(`/stories/situation/${ref.id}`);
            loadAll;
            setMessage("Saved: " + situation.name);
        } else {
            setMessage("Error");
        }
    }

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/10 backdrop-blur-md" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="pill-modal">
                    <DialogTitle className="">Create New</DialogTitle>
                    <Description className="text-sm mb-4 text-gray-500">Add your text below</Description>
                    <div>
                        <input
                            type="text"
                            autoFocus={true}
                            className='border rounded-[5px] w-full p-2'
                            value={situation?.name}
                            spellCheck={false}
                            onChange={(e) => handleTextChange(e.target.value)} />
                        <div className={`mt-2 text-sm text-right ${textLength > maxTextLength && `text-red-700`}`}>
                            {textLength}/{maxTextLength}
                        </div>
                        <span>{message}</span>
                    </div>
                    <div className="flex justify-between gap-4 mt-10">
                        <button className='underline cursor-pointer' onClick={() => setIsOpen(false)}>{t('close_button')}</button>
                        <button
                            disabled={textLength > maxTextLength}
                            className={`underline ${textLength > maxTextLength ? ` cursor-not-allowed text-gray-500` : ` cursor-pointer`}`}
                            onClick={() => handleSaveClick(situation)}>Save</button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}