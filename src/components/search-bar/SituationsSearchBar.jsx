import '../../index.css';
import { useState, useEffect } from 'react';
import { useUserOptions } from '../../hooks/useUserOptions';
import { useTranslation } from 'react-i18next';
import { useMediaService } from '../../hooks/useMediaService';

export default function SituationsSearchBar({ size, allSituations, keyword, setKeyword, handleResultClick, isLoadingSearchResult }) {

    const { homeSearchPlaceholders } = useUserOptions();
    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const { t } = useTranslation();
    const { SYSTEM_ICON_BASE_URL } = useMediaService();

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
        <div className="relative flex-1">
            <input
                className={`pill-searchbar w-full ${size === 'sm' ? "px-[10px] py-[5px] text-sm" : "px-[20px] py-[10px]"}`}
                type="text"
                autoFocus={isSearchBarFocused}
                onFocus={() => setIsSearchBarFocused(true)}
                onBlur={() => setIsSearchBarFocused(false)}
                value={keyword}
                onChange={(e) => handleKeywordChange(e.target.value)}
                placeholder={`Cari ${homeSearchPlaceholders[placeholderIndex].text}`}
            />
            {isSearchBarFocused && (
                <div className={`pill-searchresult ${size === 'sm' ? 'text-sm' : 'px-[5px] py-[5px]'}`}>
                    {
                        keyword &&
                        (isLoadingSearchResult ?
                            <div className='p-2 text-left'>Loading...</div> :
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
                            )))
                    }
                    <div className='flex pill-searchresult-item underline text-left gap-1' onPointerDown={(e) => {
                        e.preventDefault(); // prevents blur from hiding search result
                        handleResultClick(null);
                    }}><img className='w-[20px]' src={`${SYSTEM_ICON_BASE_URL}/add-svgrepo-com.svg`} />{t("new_button")}
                    </div>
                </div>
            )}
        </div>
    );
}