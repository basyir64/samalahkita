import '../../index.css';
import { Description, Dialog, DialogPanel, DialogTitle, Textarea } from '@headlessui/react'
import { useState } from 'react';
import ModalPage1 from './ModalPage1';
import ModalPage2 from './ModalPage2';

export default function CreateStoryModal({ isOpen, setIsOpen, situation }) {
    if (!open) return null;
    const descriptions = [
        <>
            1/3: Taip cerita ringkas anda yang berkaitan dengan luahan ini.
            <br /> Latar belakang, sejarah atau situasi lain boleh dipilih kemudian
            ...phone/emel sanitise...
        </>,
        <>
            2/3:
        </>,
        <>
            3/3:
        </>
    ]
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(
        [
            { id: 1, desc: 0},
            { id: 2, desc: 1},
            { id: 3, desc: 2}
        ]);
    const [otherSituations, setOtherSituations] = useState([]);
    const [story, setStory] = useState(
        {
            //id
            text: "",
            ageRange: "",
            gender: "",
            location: "",
            sector: "",
            otherSituations: otherSituations
        });

    function handleClickNext(currentPage) {
        setCurrentPage(++currentPage);
    }

    function handleClickBack(currentPage) {
        setCurrentPage(--currentPage);
    }

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="pill-modal">
                    <DialogTitle className="font-bold">Cerita Baru</DialogTitle>
                    <Description className="text-sm mb-4">{descriptions[pages.find(page => page.id === currentPage).desc]}</Description>
                    <ModalPage1 isCurrent={currentPage === 1} story={story} setStory={setStory} />
                    <ModalPage2 isCurrent={currentPage === 2} story={story} setStory={setStory} />
                    <div className="flex justify-between gap-4 mt-10">
                        <span className='underline cursor-pointer' onClick={() => setIsOpen(false)}>Batal</span>
                        <div className='flex gap-4'>
                            {currentPage !== 1 && <span className='underline cursor-pointer' onClick={() => handleClickBack(currentPage)} >Kembali</span>}
                            {currentPage === pages[pages.length - 1].id ?
                                <span className='underline cursor-pointer'>Hantar</span> :
                                <span className='underline cursor-pointer' onClick={() => handleClickNext(currentPage)}>Seterusnya</span>}
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}