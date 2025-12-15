import { useState, useEffect, useRef } from 'react';
import '../../index.css';
import { useSituationService } from '../../hooks/useSituationService';
import CreateSituationModal from '../situations/CreateSituationModal';
import { useTranslation } from 'react-i18next';
import { useUserOptions } from '../../hooks/useUserOptions';
import { useDetectScroll } from '../../hooks/useDetectScroll';

export default function HomeSearchBar() {
    // will scale later, after beta test
    const { t } = useTranslation("components");
    const { homeSearchPlaceholders } = useUserOptions();
    const { loadAll } = useSituationService();
    const [keyword, setKeyword] = useState("");
    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
    const [isSituationModalOpen, setIsSituationModalOpen] = useState(false);
    const [situation, setSituation] = useState({ name: "", nameLength: 0, type: 1 });
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [isLoadingSearchResult, setIsLoadingSearchResult] = useState(false);
    const [isAllLoaded, setIsAllLoaded] = useState(false);
    const [allSituations, setAllSituations] = useState([]);

    async function handleKeywordChange(keyword, isAllLoaded) {
        setKeyword(keyword);
        if (!isAllLoaded) {
            setIsLoadingSearchResult(true)
            const result = await loadAll();
            setAllSituations(result);
            setIsLoadingSearchResult(false);
            setIsAllLoaded(true);
        }
    }

    useEffect(() => {
        const rotatePlaceholder = setInterval(() => {
            setPlaceholderIndex(prev => (prev + 1) % homeSearchPlaceholders.length);
        }, 2000);

        return () => clearInterval(rotatePlaceholder);
    }, []);

    // useEffect(() => {
    //     console.log(JSON.stringify(allSituations, null, 2))
    // }, [allSituations])

    return (
        <div>
            <div className="relative">
                <input
                    className="pill-searchbar"
                    type="text"
                    autoFocus={isSearchBarFocused}
                    onFocus={() => setIsSearchBarFocused(true)}
                    onBlur={() => setIsSearchBarFocused(false)}
                    value={keyword}
                    onChange={(e) => handleKeywordChange(e.target.value, isAllLoaded)}
                    placeholder={`Cari ${homeSearchPlaceholders[placeholderIndex].text}`}
                />
                {isSearchBarFocused && (
                    <div className="pill-searchresult">
                        {
                            isLoadingSearchResult ?
                                <div className='pill-searchresult-item'>Loading...</div> :
                                (
                                    keyword &&
                                    allSituations.filter(s => (
                                        s.name.toLowerCase().includes(keyword.toLowerCase())
                                    )).map(s => (
                                        <div key={s.id} className='pill-searchresult-item'>{s.name}</div>
                                    ))
                                )
                        }
                        <div className='pill-searchresult-item underline' onPointerDown={(e) => {
                            e.preventDefault(); // prevents blur from hiding search result
                            setIsSituationModalOpen(true);
                        }}>Add new</div>
                    </div>
                )}
            </div>
            <CreateSituationModal isOpen={isSituationModalOpen} setIsOpen={setIsSituationModalOpen} situation={situation} setSituation={setSituation} />
        </div>
    );
}