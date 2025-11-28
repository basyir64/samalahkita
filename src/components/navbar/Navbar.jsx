import '../../index.css'
import { useTranslation } from 'react-i18next';

export default function Navbar() {

    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className='my-4 mx-8 flex justify-between'>
            <span>{t('title')}</span>
            <span className='flex gap-4'>
                <button onClick={() => changeLanguage("en")} >ENG</button>
                <button onClick={() => changeLanguage("ms")} >BM</button>
                <span>about</span>
            </span>
        </nav>
    );
}