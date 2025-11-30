import '../../index.css';
import { Textarea } from '@headlessui/react';

export default function ModalPage1({ isCurrent, story, setStory }) {
    if (!isCurrent) return null;

    function handleTextChange(text) {
        setStory(prev => ({
            ...prev,
            text: text
        }));
    }

    return (
        <div>
            <Textarea name="story-text" className="border" autoFocus={true} value={story.text} onChange={(e) => handleTextChange(e.target.value)}/>
        </div>
    );
}

