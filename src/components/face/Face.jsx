import '../../index.css';
import { useTranslation } from 'react-i18next';
import Typewriter from '../custom/Typewriter';
import MySearchbar from '../custom/MySearchbar';

export default function Face() {
    const { t } = useTranslation("components");
    return (
        <div className='my-2 grid grid-col justify-center'>
            <div className='flex justify-center text-3xl font-bold mt-10 mb-4'>
                {/* <Typewriter text={t('title')} className='mt-10 mb-4 text-3xl font-bold text-center'/> */}
                {t('title')}
            </div>
            <div className='flex justify-center gap-4'>
                <MySearchbar/>
                {/* <span>add</span> add button inside result */}
            </div>
            <div className='my-10 grid grid-col justify-center gap-4'>
                <span className='text-center'> {t('intro')} </span>
                <span>luahan user tak perlu tulis panjang2 sbb boleh pilih situations</span>
            </div>
        </div>
    )
}