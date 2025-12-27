import '../../index.css';
import { useTranslation } from 'react-i18next';
import { useMediaService } from '../../hooks/useMediaService';
import HomeSearchBar from '../custom-inputs/HomeSearchBar';
import { Link } from 'react-router';
import { useInView } from '../../hooks/useInView';
import { useOutletContext } from 'react-router';
import { useEffect } from 'react';

export default function Face() {
    const { SYSTEM_ICON_BASE_URL } = useMediaService();
    const { t } = useTranslation("components");
    const { ref, inView } = useInView({ threshold: 0.25 });
    const { setIsFaceTitleVisible } = useOutletContext();

    useEffect(() => {
        if (inView) setIsFaceTitleVisible(true);
        else setIsFaceTitleVisible(false);
    }, [inView]);

    return (
        <div className='my-2 grid grid-col justify-center text-center dark:text-gray-300'>
            <div ref={ref} className='flex justify-center text-3xl font-bold mt-4 mb-2 dark:text-gray-300'>
                {t('title')}
            </div>

            <div className='mt-1 flex justify-center gap-4 mt-4'>
                <HomeSearchBar />
            </div>
            <div className='mt-6 flex justify-center gap-4'>
                <Link className='flex items-center' to="https://www.instagram.com/samalahkita.my?igsh=dXQ0Z3ppc2wzMjE3&utm_source=qr">
                    <img className=' w-[14px]' src={`${SYSTEM_ICON_BASE_URL}/instagram-svgrepo-com.svg`} />
                    <span className='ml-1 dark:text-gray-300'>samalahkita.my</span>
                </Link>
            </div>
            <div className='mt-4 tracking-[0.1em] text-gray-500 text-sm'>{t('intro1')} {t('intro2')}</div>
            <div className='mt-6 text-center'>
                <div className='grid grid-cols-1 justify-center'>
                    <span className=''>
                        <Link to="/privacy-notice"><span className='mr-1 cursor-pointer underline'>{t('privacy')}</span></Link>
                    </span>
                    <span className=''>
                        <Link to="/disclaimer"><span className='mr-1 cursor-pointer underline'>{t('disclaimer')}</span></Link>
                    </span>
                </div>
            </div>
            {/* <span className='mt-2'>Thank You For Being Here, Anonymous!</span> */}
        </div>
    )
}