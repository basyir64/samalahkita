import '../../index.css';
import { Description, Dialog, DialogPanel, DialogTitle, Textarea } from '@headlessui/react'
import { useState } from 'react';
import ModalPage1 from './ModalPage1';
import ModalPage2 from './ModalPage2';

export default function CreateStoryModal({ isOpen, setIsOpen, situation }) {
    if (!open) return null;
    const instructions = [
        <>
            Ceritakan luahan anda. Pastikan ia ringkas — situasi lain boleh ditambah dibawah.
            {/* ...phone/emel sanitise... */}
        </>,
        <>
            Isi sekurang-kurangnya 1 maklumat diri anda.
        </>,
        <>
            Hampir sedia untuk dihantar.
        </>,
        <>
            Salin dan simpan nombor kad cerita anda untuk rujukan.
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
            textLength: 0
        });
    const maxTextLength = 200;
    const maxOtherSituationsSize = 3;
    function isNextDisabled(currentPage) {
        if (currentPage === 1) {
            if (!story.textLength || story.textLength > maxTextLength || story.otherSituations.length > maxOtherSituationsSize) return true;
        } else if (currentPage === 2) {
            if (!story.gender && !story.ageRange && !story.location && !story.sector) return true;
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
                    <div className="flex justify-between gap-4 mt-10">
                        <button className='underline cursor-pointer' onClick={() => setIsOpen(false)}>Batal</button>
                        <div className='flex gap-4'>
                            {currentPage !== 1 && <button className='underline cursor-pointer' onClick={() => handleClickBack(currentPage)} >Kembali</button>}
                            {currentPage === pages[pages.length - 1].id ?
                                <button className='underline cursor-pointer'>Hantar</button> :
                                <button disabled={isNextDisabled(currentPage)} className={`underline ${isNextDisabled(currentPage) ? ` cursor-not-allowed text-gray-400` : ` cursor-pointer`}`} onClick={() => handleClickNext(currentPage)}>Seterusnya</button>}
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}