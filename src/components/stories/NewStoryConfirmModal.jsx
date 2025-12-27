import '../../index.css';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function NewStoryConfirmModal({ isOpen, setIsOpen, handleConfirm }) {

    const { t } = useTranslation("components");

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-60">
            <div className="fixed inset-0 bg-black/10 backdrop-blur-md" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="pill-modal">
                    <DialogTitle className="text-lg">{t("new_story_confirm")}
                    </DialogTitle>
                    <div className="flex justify-end gap-4 mt-10">
                        <button
                            className={`underline cursor-pointer`}
                            onClick={() => setIsOpen(false)}>
                            {t("cancel")}
                        </button>
                        <button
                            className={`underline cursor-pointer`}
                            onClick={() => handleConfirm()}>
                            {t("confirm")}
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}