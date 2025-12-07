import { useState, useEffect } from 'react';
import '../../index.css';
import { useSituationService } from '../../hooks/useSituationService';
import CreateSituationModal from '../situations/CreateSituationModal';
import { useTranslation } from 'react-i18next';

export default function HomeSearchBar() {
    // will scale later, after beta test
    const { t } = useTranslation("components");
    const { loadAll, loading } = useSituationService();
    const [keyword, setKeyword] = useState("");
    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
    const [isSituationModalOpen, setIsSituationModalOpen] = useState(false);
    const [situation, setSituation] = useState({ name: "", nameLength: 0, type: 1 });

    function handleKeywordChange(keyword) {
        setKeyword(keyword);
        // querySituations([where("type", "==", 1)])
    }

    const [allSituations, setAllSituation] = useState([]);

    useEffect(() => {
        async function getAllSituations() {
            const result = await loadAll();
            setAllSituation(result);
        }
        getAllSituations();
    }, [])

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
                    onChange={(e) => handleKeywordChange(e.target.value)}
                />
                {isSearchBarFocused && (
                    <div className="pill-searchresult">
                        {
                            loading ?
                                <div className='pill-searchresult-item'>Loading...</div> :
                                (
                                    keyword &&
                                    allSituations.filter(s => (
                                        s.name.toLowerCase().includes(keyword.toLowerCase())
                                    )).map(s => (
                                        <div key={s.id} className='pill-searchresult-item'>{s.name}</div>
                                    ))
                                    // allSituations.map(s => (
                                    //     <div key={s.id} className='pill-searchresult-item'>{s.name}</div>
                                    // ))
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