import '../../index.css';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react';
import ModalPage1 from './ModalPage1';
import ModalPage2 from './ModalPage2';
import { useTranslation } from 'react-i18next'; 
import ModalPage3 from './ModalPage3';

export default function CreateStoryModal({ isOpen, setIsOpen, situation }) {
    if (!open) return null;

    const { t } = useTranslation("components");
    const instructions = [
        <>
            {t('story_text_instruction')}
            {/* ...phone/emel sanitise... */}
        </>,
        <>
            {t('user_info_instruction')}
        </>,
        <>
            {t('send_confirm_instruction')}
        </>,
        <>
            {t('send_confirm_instruction')}
        </>
    ]
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(
        [
            { id: 1, instruction: 0 },
            { id: 2, instruction: 1 },
            { id: 3, instruction: 2 },
            { id: 4, instruction: 3 },
        ]);
    const [story, setStory] = useState(
        {
            //id
            text: "",
            ageRange: "",
            gender: "",
            location: "",
            sector: "",
            otherSituations: [],
            textLength: 0,
            isTermsOfUseChecked: false
        });
    const maxTextLength = 200;
    const maxOtherSituationsSize = 3;
    function isNextDisabled(currentPage) {
        if (currentPage === 1) {
            if (!story.textLength || story.textLength > maxTextLength || story.otherSituations.length > maxOtherSituationsSize) return true;
        } else if (currentPage === 2) {
            if ((!story.gender && !story.ageRange && !story.location && !story.sector) || !story.isTermsOfUseChecked) return true;
        }
        return false;
    }

    function handleClickNext(currentPage) {
        setCurrentPage(++currentPage);
    }

    function handleClickBack(currentPage) {
        setCurrentPage(--currentPage);
    }

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="pill-modal">
                    <DialogTitle className="">{situation.text}</DialogTitle>
                    <Description className="text-sm mb-4 text-gray-600">{instructions[pages.find(page => page.id === currentPage).instruction]}</Description>
                    <ModalPage1 isCurrent={currentPage === 1} story={story} setStory={setStory} maxTextLength={maxTextLength} maxOtherSituationsSize={maxOtherSituationsSize}/>
                    <ModalPage2 isCurrent={currentPage === 2} story={story} setStory={setStory} />
                    <ModalPage3 isCurrent={currentPage === 3} story={story} setStory={setStory} />
                    <div className="flex justify-between gap-4 mt-10">
                        <button className='underline cursor-pointer' onClick={() => setIsOpen(false)}>{t('cancel_button')}</button>
                        <div className='flex gap-4'>
                            {currentPage !== 1 && <button className='underline cursor-pointer' onClick={() => handleClickBack(currentPage)} >{t('back_button')}</button>}
                            {currentPage === pages[pages.length - 1].id ?
                                <button className='underline cursor-pointer'>Hantar</button> :
                                <button disabled={isNextDisabled(currentPage)} className={`underline ${isNextDisabled(currentPage) ? ` cursor-not-allowed text-gray-400` : ` cursor-pointer`}`} onClick={() => handleClickNext(currentPage)}>{t('next_button')}</button>}
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}