import '../../index.css';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState, useEffect } from 'react';
import ModalPage2 from './ModalPage2';
import ModalPage1 from './ModalPage1';
import { useTranslation } from 'react-i18next';
import ModalPage3 from './ModalPage3';
import { useStoryService } from '../../hooks/useStoryService';
import { useSituationService } from '../../hooks/useSituationService';
import { useUserOptions } from '../../hooks/useUserOptions';
import { serverTimestamp } from 'firebase/firestore';
import { useMediaService } from '../../hooks/useMediaService';
import ModalPage4 from './ModalPage4';
import MyTooltip from '../custom-inputs/MyTooltip';
import { useNavigate } from 'react-router';
import NewStoryConfirmModal from './NewStoryConfirmModal';

export default function CreateStoryModal({ isOpen, setIsOpen, situation, situationsRef }) {

    const { genders } = useUserOptions();
    const { t } = useTranslation("components");
    const [isInstructionTooltipOpen, setIsInstructionTooltipOpen] = useState(false);
    const navigate = useNavigate();


    const instructions = [
        <>
            <span className="text-sm text-gray-500 mr-1">
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
            {t('story_share_instruction')}
        </>
    ]
    const [currentPage, setCurrentPage] = useState(1);
    const pages = [
        { id: 1, instruction: 0 },
        { id: 2, instruction: 1 },
        { id: 3, instruction: 2 },
        { id: 4, instruction: 3 },
    ];
    const [story, setStory] = useState(
        {
            situationId: situation.id,
            text: "",
            textLength: 0,
            hasAdvice: false,
            adviceText: "",
            adviceTextLength: 0,
            hasOtherSituations: false,
            otherSituations: [],
            ageRange: "",
            gender: genders[0].value,
            location: "",
            sector: "",
            isTermsOfUseChecked: false,
            profile: `watery_eye_cat.webp`,
            createdAt: null,
        });
    const maxTextLength = 300;
    const maxAdviceTextLength = 100;
    const maxOtherSituationsSize = 3;

    function isNextDisabled(currentPage) {
        if (currentPage === 1) {
            // if ((!story.ageRange && !story.location && !story.sector))
            //     return true;
        } else if (currentPage === 2) {
            if (!story.textLength || story.textLength > maxTextLength ||
                (story.hasAdvice && (story.adviceTextLength > maxAdviceTextLength || !story.adviceText)) ||
                (story.hasOtherSituations && (story.otherSituations.length > maxOtherSituationsSize || !story.otherSituations.length)))
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

    const [isSaveAttempted, setIsSaveAttempted] = useState(false);

    async function handleSaveClick(storySave) {
        setIsSaveLoading(true);
        setIsSaveAttempted(true);
        const result = await save(storySave);
        if (result) {
            setIsSaveSuccess(true);
            setCurrentPage(4);
            setMessage(t('posted_ind'));
        } else {
            setMessage(t('post_failed_ind'));
        }
        setIsSaveLoading(false);
        saveNewSituations(storySave);
    }

    const { saveMultiple } = useSituationService();

    async function saveNewSituations(storySave) {
        let newSituationNames = [];
        storySave.otherSituations?.forEach(situationName => {
            const exists = situationsRef.current.some(s => (s.name === situationName));
            if (!exists) newSituationNames.push(situationName);
        });
        if (newSituationNames.length > 0) {
            // might need to log errors in a dedicated log file. just in case.
            await saveMultiple(newSituationNames);
        }
    }

    const { SYSTEM_ICON_BASE_URL } = useMediaService();

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    function handleNewStoryConfirm() {
        setIsConfirmModalOpen(false);
        setCurrentPage(1);
        setIsSaveSuccess(false);
        setIsSaveAttempted(false);
        setMessage("");
    }    

    function handleModalOnClose() {
        setIsOpen(false);
        navigate("?")
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={() => handleModalOnClose()} className="relative z-50">
                <div className="fixed inset-0 bg-black/10 backdrop-blur-md" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-2">
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
                                            <Description className="text-sm text-gray-500 mb-1">
                                                {instructions[pages.find(page => page.id === currentPage).instruction]}
                                            </Description>
                                        </div>
                                }
                            </div>
                        </DialogTitle>
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
                        <ModalPage4
                            isCurrent={currentPage === 4}
                            situationName={situationsRef.current.find(s => (s.id === story.situationId)).name}
                            story={story}
                            setStory={setStory}
                        />
                        <div className="flex justify-between gap-4 mt-2">
                            <button className='underline cursor-pointer' onClick={() => setIsOpen(false)}>{t('close_button')}</button>
                            <div className='flex gap-4'>
                                {(currentPage === 1 || currentPage === 4) ? null : <button className='underline cursor-pointer' onClick={() => handleClickBack(currentPage)} >{t('back_button')}</button>}
                                {currentPage === 3 ?
                                    (isSaveAttempted ?
                                        (!isSaveSuccess &&
                                            <div className='text-sm text-right'>
                                                {message}<br />
                                                <button
                                                    disabled={isSaveLoading}
                                                    className={`underline ${isSaveLoading ? `cursor-not-allowed text-gray-500` : ` cursor-pointer`}`}
                                                    onClick={() => handleSaveClick(storySave)}>
                                                    {t('try_again_button')}</button></div>)
                                        : <button
                                            disabled={isSaveLoading}
                                            className={`underline ${isSaveLoading ? `cursor-not-allowed text-gray-500` : ` cursor-pointer`}`}
                                            onClick={() => handleSaveClick(storySave)}>
                                            {isSaveLoading ? "Loading..." : t('post_button')}
                                        </button>)
                                    : (currentPage === 4 ?
                                        (message &&
                                            <div className='flex justify-end mt-2 mb-2 gap-1'>
                                                {isSaveSuccess && <img className='w-[20px]' src={`${SYSTEM_ICON_BASE_URL}/check-svgrepo-com.svg`} />}
                                                {message}
                                                {/* <button
                                                    onClick={() => setIsConfirmModalOpen(true)}
                                                    className={`underline ml-4 cursor-pointer text-right`}
                                                >{t('new_button')}</button>
                                                <NewStoryConfirmModal isOpen={isConfirmModalOpen} setIsOpen={setIsConfirmModalOpen} handleConfirm={handleNewStoryConfirm}/> */}
                                            </div>
                                            // null
                                            )
                                        : <button
                                            disabled={isNextDisabled(currentPage)}
                                            className={`underline ${isNextDisabled(currentPage) ? ` cursor-not-allowed text-gray-500` : ` cursor-pointer`}`} onClick={() => handleClickNext()}>
                                            {t('next_button')}
                                        </button>)
                                }
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}