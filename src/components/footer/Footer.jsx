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
                <div className='flex text-left text-sm text-gray-500 mb-4'>
                    {t("wish")}
                </div>
                <div className='flex text-left text-sm gap-4'>
                    <img className='max-w-20 max-h-20 mt-1' src={`${SYSTEM_ICON_BASE_URL}/me2.jpeg`} />
                    {t("project_bg")}
                </div>
                <div className='flex justify-start text-sm mt-4'>
                        {t("contact")}
                        <span className='ml-2 cursor-pointer underline'>
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
                    <a href="/privacy-notice"><span className='mr-1 cursor-pointer underline'>{t('privacy')}</span></a>
                    <a href="/disclaimer"><span className='mr-1 cursor-pointer underline'>{t('disclaimer')}</span></a>
                </div>
                <div>
                    <div className='flex justify-start text-sm mt-2'>
                        v0.1
                    </div>
                    <div className='text-sm'>
                        <div className='underline cursor-pointer'>{t("history")}</div>
                    </div>
                </div>
                <div className='mt-4 text-xs'>
                    {t("media_disclaimer")}
                </div>
                <div className='mt-2 text-xs'>
                    samalahkita <br/> 2025
                </div>
            </div>
        </div>
    );
}