import '../../index.css';
import { useUserOptions } from '../../hooks/useUserOptions';
import { useMediaService } from '../../hooks/useMediaService';

export default function StoryCard({ pill = "", story }) {

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

    const { loadUrlByFilename } = useMediaService();

    return (
        <div className={`${pill}`} >
            <div className='grid grid-col'>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        {/* <div><img className='w-20' src={loadUrlByFilename("fat_sad_cat.webp")}/></div> */}
                        {arrangeHeaderItems(sectorAndGender, ageRange, location)}
                    </div>
                    <span className='text-gray-500 text-sm'>{date}</span>
                </div>
                <div className='my-4'>{story.text}</div>
                <div className='flex flex-wrap'>
                    {/* <img className='w-32' src={loadUrlByFilename("sad_at_party.webp")} />
                    <img className='w-32' src={loadUrlByFilename("tuff_baby.png")} /> */}
                </div>
                {story.otherSituations.length > 0 && <div className='mt-4'>
                    <div className='text-sm text-gray-500'>Situasi lain</div>
                    {story.otherSituations.map((s, i) => (
                        <div key={i} className='pill-small-non-interactive'>
                            {s.name ? s.name : s}
                        </div>
                    ))}
                </div>}
                {story.adviceText && <div className='mt-4'>
                    <div className='text-sm text-gray-500'>Nasihat</div>
                    <div>{story.adviceText}</div>
                </div>}
            </div>
        </div >
    );
}