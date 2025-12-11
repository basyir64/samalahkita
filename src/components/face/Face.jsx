import '../../index.css';
import { useTranslation } from 'react-i18next';
import { useMediaService } from '../../hooks/useMediaService';
import HomeSearchBar from '../custom-inputs/HomeSearchBar';
import { Link } from 'react-router';

export default function Face() {
    const { SYSTEM_ICON_BASE_URL } = useMediaService();
    const { t } = useTranslation("components");
    return (
        <div className='my-2 grid grid-col justify-center'>
            <div className='flex justify-center text-3xl font-bold mt-10 mb-4'>
                {t('title')}
            </div>
            <div className='flex justify-center gap-4'>
                <HomeSearchBar />
                {/* <span>add</span> add button inside result */}
            </div>
            <div className='mt-10 flex flex-col text-center'>
                <span className=''> {t('intro1')}
                    <br /> {t('intro2')} </span>
                <span className='mt-6 underline cursor-pointer'>{t('privacy')}</span>
                <span className=''>{t('contact')}</span>
                <div className='mt-8 flex justify-center gap-8'>
                    <Link className='flex items-center' to="https://www.instagram.com/samalahkita.my?igsh=dXQ0Z3ppc2wzMjE3&utm_source=qr">
                        <img className='mt-4 w-5' src={`${SYSTEM_ICON_BASE_URL}/instagram-svgrepo-com.svg`} />
                        <span className='mt-3 ml-1'>@samalahkita.my</span>
                    </Link>
                    <Link className='flex items-center'>
                        <img className='mt-4 w-[18px]' src={`${SYSTEM_ICON_BASE_URL}/email-svgrepo-com.svg`} />
                        <span className='mt-3 ml-1'>samalahkita@gmail.com</span>
                    </Link>
                </div>
                <span className='mt-2 text-gray-500'>Thank You For Being Here, Anonymous!</span>
            </div>
        </div>
    )
}