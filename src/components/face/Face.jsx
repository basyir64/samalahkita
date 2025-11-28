import '../../index.css';
import { useTranslation } from 'react-i18next';

export default function Face() {
    const { t } = useTranslation("views");
    return (
        <div className='my-2'>
            <div className='my-8 flex justify-center'>{t('title')}</div>
            <div className='flex justify-center gap-4'>
                <span><input className='border-1' type="text"/></span>
                <span>add</span>
            </div>
        </div>
    )
}