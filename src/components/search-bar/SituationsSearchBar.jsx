import '../../index.css';
import { useState, useEffect, useRef } from 'react';
import { useUserOptions } from '../../hooks/useUserOptions';

export default function SituationsSearchBar({ size, allSituations, keyword, setKeyword, handleResultClick }) {

    const { homeSearchPlaceholders } = useUserOptions();
    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    async function handleKeywordChange(keyword) {
        setKeyword(keyword);
    }

    useEffect(() => {
        const rotatePlaceholder = setInterval(() => {
            setPlaceholderIndex(prev => (prev + 1) % homeSearchPlaceholders.length);
        }, 2000);

        return () => clearInterval(rotatePlaceholder);
    }, []);

    return (
        <div className="relative">
            <div className='flex flex-wrap gap-2'>
                <input
                    className={`pill-searchbar ${size === 'sm' ? "px-[10px] py-[5px] text-sm" : "px-[20px] py-[10px]"}`}
                    type="text"
                    autoFocus={isSearchBarFocused}
                    onFocus={() => setIsSearchBarFocused(true)}
                    onBlur={() => setIsSearchBarFocused(false)}
                    value={keyword}
                    onChange={(e) => handleKeywordChange(e.target.value)}
                    placeholder={`Cari ${homeSearchPlaceholders[placeholderIndex].text}`}
                />
            </div>
            {isSearchBarFocused && (
                <div className={`pill-searchresult ${size === 'sm' ? 'text-sm' : ''}`}>
                    {
                        keyword &&
                        allSituations.filter(s => (
                            s.name.toLowerCase().includes(keyword.toLowerCase())
                        )).map(s => (
                            <div
                                key={s.id}
                                onPointerDown={(e) => {
                                    e.preventDefault();
                                    handleResultClick(s.id)
                                }}
                                className={`pill-searchresult-item ${size === 'sm' ? 'text-sm' : ''}`}>
                                {s.name}
                            </div>
                        ))
                    }
                    <div className='pill-searchresult-item underline' onPointerDown={(e) => {
                        e.preventDefault(); // prevents blur from hiding search result
                        handleResultClick(null);
                    }}>Add new</div>
                </div>
            )}
        </div>
    );
}