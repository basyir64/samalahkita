import {useDetectScroll} from '../../hooks/useDetectScroll';
import '../../index.css'
import { useTranslation } from 'react-i18next';

export default function Navbar() {

    const { t, i18n } = useTranslation("components");
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    const {isScrollingUp} = useDetectScroll();

    return (
        <nav className={`px-8 py-4 flex justify-between sticky top-0 z-50 bg-white/10 backdrop-blur-md transition-transform duration-300 ${isScrollingUp ? "translate-y-0" : "-translate-y-full"}`}>
            <span className='text-3xl font-bold'>{t('title')}</span>
            <span className='flex gap-4'>
                <span><button onClick={() => changeLanguage("en")} >ENG</button></span>
                <span><button onClick={() => changeLanguage("ms")} >BM</button></span>
                <span>About</span>
            </span>
        </nav>
    );
}