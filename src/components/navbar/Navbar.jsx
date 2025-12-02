import '../../index.css'
import { useTranslation } from 'react-i18next';

export default function Navbar() {

    const { t, i18n } = useTranslation("components");
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className='my-4 mx-8 flex justify-between'>
            <span className='text-3xl font-bold'>{t('title')}</span>
            <span className='flex gap-4'>
                <span><button onClick={() => changeLanguage("en")} >ENG</button></span>
                <span><button onClick={() => changeLanguage("ms")} >BM</button></span>
                <span>About</span>
            </span>
        </nav>
    );
}