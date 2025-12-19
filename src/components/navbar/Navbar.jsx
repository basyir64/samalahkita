import { useDetectScroll } from '../../hooks/useDetectScroll';
import '../../index.css'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Navbar() {

    const { t, i18n } = useTranslation("components");
    
    const { isScrollingUp } = useDetectScroll();
    const langs = ["bm", "eng"];
    const [currentNextLang, setCurrentNextLang] = useState(langs[0])

    function handleChangeLangClick(currentNextLang) {
        i18n.changeLanguage(currentNextLang);
        const newNextLang = langs.find(lang => lang !== currentNextLang);
        setCurrentNextLang(newNextLang);
    }

    return (
        <nav className={`px-8 py-4 flex justify-between sticky top-0 z-50 bg-white/10 backdrop-blur-md transition-transform duration-300 ${isScrollingUp ? "translate-y-0" : "-translate-y-full"}`}>
            <span className='text-3xl font-bold'>{t('title')}</span>
            <span className='flex gap-4 mt-2'>
                <span><button onClick={() => handleChangeLangClick(currentNextLang)} >{currentNextLang}</button></span>
                <span>malam</span>
            </span>
        </nav>
    );
}