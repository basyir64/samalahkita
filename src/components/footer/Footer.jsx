import '../../index.css';
import { useMediaService } from '../../hooks/useMediaService';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    const { SYSTEM_ICON_BASE_URL } = useMediaService();
    return (
        <div className='p-4 dark:text-white'>
            <hr className='mt-10 mb-4 border-t-2 border-black dark:border-white' />
            <div className='flex text-center text-sm mt-2'>
                {t("project_bg")}
            </div>
            <div className='flex justify-center text-sm mt-2'>
                    Contact: 
                    <span className='ml-2 cursor-pointer underline'>
                        <Link >basyirzainuddin@gmail.com</Link>
                    </span>
            </div>
            <div className='flex justify-center gap-4 text-sm'>
                <Link className='flex items-center' to={"https://github.com/basyir64/samalahkita"}>
                    <img className='w-[18px]' src={`${SYSTEM_ICON_BASE_URL}/github-svgrepo-com.svg`} />
                    <span className='ml-1'>GitHub</span>
                </Link>
                <Link className='flex items-center' to="https://www.instagram.com/samalahkita.my?igsh=dXQ0Z3ppc2wzMjE3&utm_source=qr">
                    <img className='w-[17px]' src={`${SYSTEM_ICON_BASE_URL}/instagram-svgrepo-com.svg`} />
                    <span className='ml-1'>@samalahkita.my</span>
                </Link>
            </div>
            <div className='flex justify-center gap-2 mt-4 text-sm'>
                <Link to="/privacy-notice"><span className='mr-1 cursor-pointer underline'>{t('privacy')}</span></Link>
                <Link to="/privacy-notice"><span className='mr-1 cursor-pointer underline'>{t('disclaimer')}</span></Link>
            </div>
            <div className='flex justify-center text-sm mt-2'>
                v0.1 
            </div>
            <div className='flex justify-center text-sm underline cursor-pointer'>
                View Release History
            </div>
        </div>
    );
}