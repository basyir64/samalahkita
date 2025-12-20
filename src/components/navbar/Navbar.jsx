import { useDetectScroll } from '../../hooks/useDetectScroll';
import '../../index.css'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useMediaService } from '../../hooks/useMediaService';

export default function Navbar() {

    const { t, i18n } = useTranslation("components");
    const { isDark, toggle } = useTheme();
    const { isScrollingUp } = useDetectScroll();
    const langs = ["bm", "eng"];
    const [currentNextLang, setCurrentNextLang] = useState(langs[0]);
    const { SYSTEM_ICON_BASE_URL } = useMediaService();

    function handleChangeLangClick(currentNextLang) {
        i18n.changeLanguage(currentNextLang);
        const newNextLang = langs.find(lang => lang !== currentNextLang);
        setCurrentNextLang(newNextLang);
    }

    return (
        <nav className={`px-8 py-4 flex justify-between sticky top-0 z-50 bg-white/10 dark:bg-black/10 backdrop-blur-md transition-transform duration-300 ${isScrollingUp ? "translate-y-0" : "-translate-y-full"}`}>
            <span className='text-3xl font-bold dark:text-white'>{t('title')}</span>
            <span className='flex gap-4 mt-2'>
                <button className='cursor-pointer dark:text-white' onClick={() => handleChangeLangClick(currentNextLang)} >
                    {/* <img className='w-[20px]' src={`${SYSTEM_ICON_BASE_URL}/lang-svgrepo-com.svg`}/> */}
                    {currentNextLang}
                </button>
                <button className='cursor-pointer dark:text-white' onClick={toggle}>
                    {isDark ? 'siang' : 'malam'}
                </button>
            </span>
        </nav>
    );
}