import { useDetectScroll } from '../../hooks/useDetectScroll';
import '../../index.css'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useTheme } from '../../theme-context';
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
            <span className='flex gap-4 mt-1 ml-4'>
                <div className='flex gap-1 cursor-pointer dark:text-white' onClick={() => handleChangeLangClick(currentNextLang)} >
                    <img className='w-[16px]' src={`${SYSTEM_ICON_BASE_URL}/lang-svgrepo-com.svg`}/>
                    <span className='flex items-center text-sm'>{currentNextLang}</span>
                </div>
                <div className='flex gap-1 cursor-pointer dark:text-white' onClick={toggle}>
                    <img className='w-[17px]' src={`${SYSTEM_ICON_BASE_URL}/dark-svgrepo-com.svg`}/>
                    <span className='flex items-center text-sm'>{isDark ? 'siang' : 'malam'}</span>
                </div>
            </span>
        </nav>
    );
}