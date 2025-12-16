import '../../index.css';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState, useEffect } from 'react';
import ModalPage2 from './ModalPage2';
import ModalPage1 from './ModalPage1';
import { useTranslation } from 'react-i18next';
import ModalPage3 from './ModalPage3';
import { useStoryService } from '../../hooks/useStoryService';
import { useUserOptions } from '../../hooks/useUserOptions';
import { serverTimestamp } from 'firebase/firestore';
import { useMediaService } from '../../hooks/useMediaService';
import ModalPage4 from './ModalPage4';
import MyTooltip from '../custom-inputs/MyTooltip';

export default function CreateStoryModal({ isOpen, setIsOpen, situation, situationsRef }) {

    const { genders } = useUserOptions();
    const { t } = useTranslation("components");
    const [isInstructionTooltipOpen, setIsInstructionTooltipOpen] = useState(false);

    const instructions = [
        <>
            <span className="text-sm text-gray-500">
                {isInstructionTooltipOpen ? t('user_info_instruction_tooltip') : t('user_info_instruction')}
            </span>
            <MyTooltip isOpen={isInstructionTooltipOpen} setIsOpen={setIsInstructionTooltipOpen} />
        </>,
        <>
            {t('story_text_instruction')}
            {/* ...phone/emel sanitise... */}
        </>,
        <>
            {t('send_confirm_instruction')}
        </>,
        <>
            Muat turun dan kongsi cerita anda di media sosial. Pilih perincian yang anda mahu sembunyikan di bawah.
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
            text: "",
            textLength: 0,
            hasAdvice: false,
            adviceText: "",
            adviceTextLength: 0,
            otherSituations: [],
            ageRange: "",
            gender: genders[0].value,
            location: "",
            sector: "",
            isTermsOfUseChecked: false,
            profile: `watery_eye_cat.webp`,
            createdAt: null,
        });
    const maxTextLength = 200;
    const maxAdviceTextLength = 100;
    const maxOtherSituationsSize = 3;

    function isNextDisabled(currentPage) {
        if (currentPage === 1) {
            // if ((!story.ageRange && !story.location && !story.sector))
            //     return true;
        } else if (currentPage === 2) {
            if (!story.textLength || story.textLength > maxTextLength ||
                (story.hasAdvice && (story.adviceTextLength > maxAdviceTextLength || !story.adviceText)) ||
                story.otherSituations.length > maxOtherSituationsSize)
                return true;
        }
        return false;
    }

    function handleClickNext() {
        setCurrentPage(prev => (prev + 1));
    }

    function handleClickBack() {
        setCurrentPage(prev => (prev - 1));
    }

    const [storySave, setStorySave] = useState({});
    const { save } = useStoryService();
    const [isSaveSuccess, setIsSaveSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [isSaveLoading, setIsSaveLoading] = useState(false);

    useEffect(() => {
        setStorySave({
            createdAt: serverTimestamp(),
            views: 0,
            text: story.text,
            situationId: situation.id,
            gender: story.gender,
            ...(story.ageRange && { ageRange: story.ageRange }),
            ...(story.location && { location: story.location }),
            ...(story.sector && { sector: story.sector }),
            ...(story.otherSituations.length > 0 && { otherSituations: story.otherSituations.map(s => s.name) }),
            ...(story.hasAdvice && { adviceText: story.adviceText }),
            ...(story.profile && { profile: story.profile }),
        });
    }, [story])

    async function handleSaveClick(storySave) {
        setIsSaveLoading(true);
        const result = await save(storySave);
        if (result) {
            setIsSaveSuccess(true);
            setMessage("Saved");
        } else {
            setMessage("Error");
        }
        setIsSaveLoading(false);
    }

    const { SYSTEM_ICON_BASE_URL } = useMediaService();

    return (
        <div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/10 backdrop-blur-md" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="pill-modal">
                        <DialogTitle className="">
                            <div className='flex justify-between'>
                                {
                                    currentPage === 4 ?
                                        <div>
                                            <Description className="text-sm text-gray-500 mb-4">
                                                {instructions[pages.find(page => page.id === currentPage).instruction]}
                                            </Description>
                                        </div>
                                        : <div>
                                            <img className='w-[36px]' src={`${SYSTEM_ICON_BASE_URL}/double-quotes-svgrepo-com.svg`} />
                                            {situation.name}
                                            <Description className="text-sm text-gray-500 mb-4">
                                                {instructions[pages.find(page => page.id === currentPage).instruction]}
                                            </Description>
                                        </div>
                                }
                            </div>
                        </DialogTitle>

                        {/* <div>
                            {situation.name}
                            <Description className="text-sm mb-4 text-gray-500">
                                {instructions[pages.find(page => page.id === currentPage).instruction]}
                            </Description>
                        </div> */}

                        {/* {JSON.stringify(story, null, 2)} */}
                        <ModalPage1 isCurrent={currentPage === 1} story={story} setStory={setStory} />
                        <ModalPage2
                            isCurrent={currentPage === 2}
                            isOpen={isOpen}
                            story={story}
                            setStory={setStory}
                            maxTextLength={maxTextLength}
                            maxAdviceTextLength={maxAdviceTextLength}
                            maxOtherSituationsSize={maxOtherSituationsSize}
                            situationsRef={situationsRef} />
                        <ModalPage3 isCurrent={currentPage === 3} story={story} setStory={setStory} />
                        <ModalPage4 isCurrent={currentPage === 4} situationName={situation.name} story={story} setStory={setStory} />
                        <div className='text-right mt-10 mb-2'>{message}</div>
                        <div className="flex justify-between gap-4">
                            <button className='underline cursor-pointer' onClick={() => setIsOpen(false)}>{t('close_button')}</button>
                            <div className='flex gap-4'>
                                {currentPage !== 1 && <button className='underline cursor-pointer' onClick={() => handleClickBack(currentPage)} >{t('back_button')}</button>}
                                {currentPage === 3 ?
                                    <button
                                        disabled={isSaveLoading}
                                        className={`underline ${isSaveLoading ? `cursor-not-allowed text-gray-500` : ` cursor-pointer`}`}
                                        onClick={() => isSaveSuccess ? setCurrentPage(4) : handleSaveClick(storySave)}>
                                        {isSaveLoading ? "Loading..." : (isSaveSuccess ? "Share" : "Save")}
                                    </button> :
                                    <button
                                        disabled={isNextDisabled(currentPage)}
                                        className={`underline ${isNextDisabled(currentPage) ? ` cursor-not-allowed text-gray-500` : ` cursor-pointer`}`} onClick={() => handleClickNext()}>
                                        {t('next_button')}
                                    </button>}
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}