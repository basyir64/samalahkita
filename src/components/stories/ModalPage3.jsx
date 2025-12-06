import '../../index.css';

export default function ModalPage3({ isCurrent, story, setStory }) {

    return (
        <div className={`${isCurrent ? "block" : "hidden"} grid grid-col`}>
            {JSON.stringify(story, null, 2)}
            <div className='pill-card'>
                <div className='grid grid-col'>
                    <div className='flex'>{story.sector}, {story.gender}, {story.ageRange} years old</div>
                    <div className='flex'>{story.location}</div>
                </div>
            </div>
        </div>
    );
}