import '../../index.css';
import { useUserOptions } from '../../hooks/useUserOptions';
import StoryCard from './StoryCard';

export default function ModalPage3({ isCurrent, story, setStory }) {
    const { getTranslatedGenderText, getTranslatedSectorText, getLocationText } = useUserOptions();


    const sectorAndGender = [
        // "[icon]",
        `${story.gender ? getTranslatedGenderText(story.gender) : ""}`,
        `${story.sector ? getTranslatedSectorText(story.sector) : ""}`]
        .filter(s => s !== "")
        .join(", ");

    const ageRange = story.ageRange ? story.ageRange + " tahun" : "";
    const location = story.location ? getLocationText(story.location) : "";
    const date = new Date().toLocaleDateString("en-GB");

    function arrangeHeaderItems(sectorAndGender, ageRange, location) {
        if (!sectorAndGender && !location) return <div className='flex text-sm'>{ageRange}</div>
        else if (!sectorAndGender) return <div>
            <div className='flex text-sm'>{location}</div>
            <div className='flex text-xs'>{ageRange}</div>
        </div>
        else return <div>
            <div className='flex text-sm'>{sectorAndGender}</div>
            <div className='flex text-sm'>{location}</div>
            <div className='flex text-xs'>{ageRange}</div>
        </div>
    }

    return (
        <div className={`${isCurrent ? "block" : "hidden"} grid grid-col`}>
            {/* {JSON.stringify(story, null, 2)}
            <hr />
            {JSON.stringify(storySave, null, 2)}
            <hr /> */}
            <StoryCard story={story} />
        </div>
    );
}