import '../../index.css';
import StoryCard from './StoryCard';

export default function ModalPage3({ isCurrent, story, setStory }) {
    
    return (
        <div className={`${isCurrent ? "block" : "hidden"} grid grid-col`}>
            <StoryCard story={story} isPreview={true} setStory={setStory}/>
        </div>
    );
}