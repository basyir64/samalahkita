import '../../index.css';
import { useTranslation } from 'react-i18next';
import Typewriter from '../custom-inputs/Typewriter';
import HomeSearchBar from '../custom-inputs/HomeSearchBar';

export default function Face() {
    const { t } = useTranslation("components");
    return (
        <div className='my-2 grid grid-col justify-center'>
            <div className='flex justify-center text-3xl font-bold mt-10 mb-4'>
                {/* <Typewriter text={t('title')} className='mt-10 mb-4 text-3xl font-bold text-center'/> */}
                {t('title')}
            </div>
            <div className='flex justify-center gap-4'>
                <HomeSearchBar/>
                {/* <span>add</span> add button inside result */}
            </div>
            <div className='my-10 grid grid-col justify-center gap-4'>
                <span className='text-center'> {t('intro')} </span>
                <span className='text-center'>guide guide guide</span>
            </div>
        </div>
    )
}