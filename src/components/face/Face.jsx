import '../../index.css';
import { useTranslation } from 'react-i18next';

export default function Face() {
    const { t } = useTranslation("views");
    return (
        <div className='my-2'>
            <div className='my-8 flex justify-center'>
                <span className='text-3xl font-bold'>{t('title')}</span>
            </div>
            <div className='flex justify-center gap-4'>
                <span><input className='border-1' type="text" /></span>
                {/* <span>add</span> add button inside result */}
            </div>
            <div className='my-10 grid grid-col justify-center gap-4'>
                <span className='text-center'> {t('intro')} </span>
                <span>luahan user tak perlu tulis panjang2 sbb boleh pilih situations</span>
            </div>
        </div>
    )
}