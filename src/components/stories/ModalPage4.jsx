import '../../index.css';
import StoryCardShare from './StoryCardShare';

export default function ModalPage4({ isCurrent, situationName, story}) {
    
    return (
        <div className={`${isCurrent ? "block" : "hidden"} grid grid-col`}>
            <StoryCardShare story={story} situationName={situationName} isPreview={true} />
        </div>
    );
}