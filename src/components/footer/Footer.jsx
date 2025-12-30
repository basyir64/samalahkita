import '../../index.css';
import { useMediaService } from '../../hooks/useMediaService';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    const { SYSTEM_ICON_BASE_URL } = useMediaService();
    return (
        <div className='mt-10'>
            <hr className='border-t-2 border-black dark:border-gray-300' />
            <div className='p-8 dark:text-gray-300 mx-auto max-w-5xl'>
                {/* <div className='flex text-left text-sm text-gray-500 mb-4'>
                    {t("wish")}
                </div> */}
                <div className='flex text-left text-sm gap-4'>
                    <img className='max-w-20 max-h-20 mt-1' src={`${SYSTEM_ICON_BASE_URL}/me2.jpeg`} />
                    Hanya seketul developer kelahiran Perak trying his best. Coding agents dah mula takeover software engineering jobs, so saya buat website ni for my learning and career growth purposes. Just in case. Ideas and collabs are welcome anytime!! #HobbyProject #OpenSource
                </div>
                <div className='flex justify-start text-sm mt-4'>
                        {t("contact")}
                        <span className='ml-2'>
                            <Link >basyirzainuddin@gmail.com</Link>
                        </span>
                </div>
                <div className='flex justify-start gap-4 text-sm'>
                    <Link className='flex items-center' to={"https://github.com/basyir64/samalahkita"}>
                        <img className='w-[18px]' src={`${SYSTEM_ICON_BASE_URL}/github-svgrepo-com.svg`} />
                        <span className='ml-1'>GitHub</span>
                    </Link>
                    <Link className='flex items-center' to="https://www.instagram.com/samalahkita.my?igsh=dXQ0Z3ppc2wzMjE3&utm_source=qr">
                        <img className='w-[17px]' src={`${SYSTEM_ICON_BASE_URL}/instagram-svgrepo-com.svg`} />
                        <span className='ml-1'>@samalahkita.my</span>
                    </Link>
                </div>
                <div className='flex justify-start gap-2 mt-4 text-sm'>
                    <Link to={`/privacy-notice`}><span className='mr-1 cursor-pointer underline'>{t('privacy')}</span></Link>
                    <Link to={`/disclaimer`}><span className='mr-1 cursor-pointer underline'>{t('disclaimer')}</span></Link>
                </div>
                {/* <div>
                    <div className='flex justify-start text-sm mt-2'>
                        v0.1.0-beta.1
                    </div>
                    <div className='text-sm'>
                        <div className='underline cursor-pointer'>{t("history")}</div>
                    </div>
                </div> */}
                <div className='mt-4 text-xs'>
                    {t("media_disclaimer")}
                </div>
                <div className='mt-2 text-xs'>
                    samalahkita <br/> v0.1.0-beta.7 released 30 Dec 2025 <br/> Copyright (c) 2026 Mohamad Basyir bin Zainuddin <br/> MIT License
                </div>
            </div>
        </div>
    );
}