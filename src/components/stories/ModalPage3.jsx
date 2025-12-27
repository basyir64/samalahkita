import '../../index.css';
import StoryCard from './StoryCard';
import { useTranslation } from 'react-i18next';
import { useMediaService } from '../../hooks/useMediaService';
import { Link } from 'react-router';

export default function ModalPage3({ isCurrent, story, setStory }) {
    const {t} = useTranslation();
    const {SYSTEM_ICON_BASE_URL} = useMediaService();
    return (
        <div className={`${isCurrent ? "block" : "hidden"} grid grid-col`}>
            <StoryCard story={story} isPreview={true} setStory={setStory}/>
            <div className='flex gap-2'>
                <div className='flex items-center shrink-0'>
                    <img className='w-6' src={`${SYSTEM_ICON_BASE_URL}/shield-check-svgrepo-com.svg`} />
                </div>
                <div className='mt-4 text-xs text-gray-500 dark:text-gray-300'>
                    {t("disclaimer_ack")} <Link to={`/disclaimer`} className='cursor-pointer underline'>{t("disclaimer")}</Link> & <Link to={`/privacy-notice`} className='cursor-pointer underline'>{t("privacy")}</Link>. {t("anonymous_reminder")}
                </div>
            </div>
        </div>
    );
}