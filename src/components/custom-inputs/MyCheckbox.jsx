import '../../index.css';
import { useMediaService } from '../../hooks/useMediaService';

export default function MyCheckbox({ text, onClick, value }) {
    const { SYSTEM_ICON_BASE_URL } = useMediaService();
    return (
        <div className='flex flex-col gap-1 mt-2 '>
            <div className={'flex gap-2 cursor-pointer'}
                onClick={() => onClick(value)}>
                <div className={`my-checkbox`}>
                    {value && <img className='w-[20px]' src={`${SYSTEM_ICON_BASE_URL}/check-svgrepo-com.svg`} />}
                </div>
                <span className='text-sm'>{text}</span>
            </div>
        </div>
    );
}