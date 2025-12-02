import '../../index.css';

export default function ModalPage3({ isCurrent, story, setStory }) {
    if (!isCurrent) return null;
    
    return (
        <div className='grid grid-col'>
            {JSON.stringify(story, null, 2)}
        </div>
    );
}