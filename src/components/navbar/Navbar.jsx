import '../../index.css'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useTheme } from '../../theme-context';
import { useMediaService } from '../../hooks/useMediaService';
import { Link } from 'react-router';

export default function Navbar({ isFaceTitleVisible }) {

    const { t, i18n } = useTranslation("components");
    const { isDark, toggle } = useTheme();
    const langs = ["bm", "eng"];
    const [currentNextLang, setCurrentNextLang] = useState(langs[1]);
    const { SYSTEM_ICON_BASE_URL } = useMediaService();

    function handleChangeLangClick(currentNextLang) {
        i18n.changeLanguage(currentNextLang);
        const newNextLang = langs.find(lang => lang !== currentNextLang);
        setCurrentNextLang(newNextLang); ""
    }

    return (
        <div className='sticky top-0 z-50'>
            <div className='flex justify-center bg-[#272727ff] py-2 text-[#fff703ff] text-xs gap-4'>
                <span>v0.1.0-beta.3 pre-release</span>
                {/* <Link className='cursor-pointer underline'>{t("bug_report")}</Link> */}
            </div>
            <nav className={`px-6 py-4 flex justify-between  bg-white/10 dark:bg-black/10 backdrop-blur-md transition-transform duration-300 translate-y-0`}>
                <span className={`text-3xl font-bold dark:text-gray-300 transition-opacity duration-500
                ${isFaceTitleVisible ? "opacity-0" : "opacity-100"}`}>{t('title')}</span>
                <span className='flex gap-4 mt-1 ml-4'>
                    {!isFaceTitleVisible && <Link className='flex cursor-pointer dark:text-gray-300' to="">
                        <img className='w-[20px]' src={`${SYSTEM_ICON_BASE_URL}/home-svgrepo-com.svg`} />
                    </Link>}
                    <div className='flex gap-1 cursor-pointer dark:text-gray-300' onClick={() => handleChangeLangClick(currentNextLang)} >
                        <img className='w-[20px]' src={`${SYSTEM_ICON_BASE_URL}/lang-svgrepo-com.svg`} />
                        {/* <span className='flex items-center text-sm'>{currentNextLang}</span> */}
                    </div>
                    <div className='flex gap-1 cursor-pointer dark:text-gray-300' onClick={toggle}>
                        <img className='w-[21px]' src={`${SYSTEM_ICON_BASE_URL}/dark-svgrepo-com.svg`} />
                        {/* <span className='flex items-center text-sm'>{isDark ? t('lightTheme') : t('darkTheme')}</span> */}
                    </div>
                </span>
            </nav>
        </div>
    );
}