import '../../index.css';

export default function ModalPage3({ isCurrent, story, setStory }) {
    if (!isCurrent) return null;
    
    return (
        <div className='text-wrap'>
            {JSON.stringify(story, null, 2)}
            {/* {story.text} */}
        </div>
    );
}