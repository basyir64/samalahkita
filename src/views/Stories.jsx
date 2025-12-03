import { useState } from 'react';
import Feed from '../components/stories/Feed';
import '../index.css';
import { useParams } from "react-router";
import CreateStoryModal from '../components/stories/CreateStoryModal';
import { useTranslation } from 'react-i18next';

export default function Stories() {
    const params = useParams();
    //get situation by param id from marquee
    const [situation, setSituation] = useState({ id: params.situationid, text: "semua adik beradik lain jantina" });
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation("views");

    return (
        <div className=''>
            <div className='grid grid-col justify-center my-20'>
                <div className='text-center'>
                    <div>
                        {situation.text}
                    </div>
                    {/* <div className='pill-button' onClick={() => setOpen(true)}>
                        + Cerita Baru
                    </div> */}
                    <span className='underline cursor-pointer' onClick={() => setIsOpen(true)}>{t('add_story_button')}</span>
                </div>
                <CreateStoryModal isOpen={isOpen} setIsOpen={setIsOpen} situation={situation} />
            </div>
            <Feed />
        </div>
    );
}

// Function to append text to the paragraph and update the stack with typewriter effect
function appendToTextWithTypewriter(text) {
    var container = document.getElementById('text');
    container.style.textAlign = "center"

    // Split the text into sentences and push each sentence to the stack
    var sentences = text.split('.');
    sentences.forEach(function (sentence) {
        if (sentence.trim() !== '') {
            sentenceStack.push(sentence + '.');
        }
    });

    // Display text with typewriter effect
    displayTextWithTypewriter(container, text);

    // Scroll to the bottom after appending the text
    container.scrollTop = container.scrollHeight;

    //console.log(sentenceStack.entrF4C430ies);
}

// Function to display text with typewriter effect
function displayTextWithTypewriter(container, text) {
    var characters = text.split('');
    characters.forEach(function (char, index) {
        setTimeout(function () {
            container.innerHTML += char;
            // Scroll to the bottom on each character added
            container.scrollTop = container.scrollHeight;
        }, index * 50); // Adjust the typing speed as needed
    });
}
