import { useState, useEffect, useRef } from 'react';
import '../../index.css';
import { useSituationService } from '../../hooks/useSituationService';
import CreateSituationModal from '../situations/CreateSituationModal';
import { useTranslation } from 'react-i18next';
import SituationsSearchBar from '../search-bar/SituationsSearchBar';
import { useNavigate } from 'react-router';

export default function HomeSearchBar() {
    // will scale later, after beta test
    const { t } = useTranslation("components");
    const { loadAll } = useSituationService();
    const [keyword, setKeyword] = useState("");
    const [isSituationModalOpen, setIsSituationModalOpen] = useState(false);
    const [situation, setSituation] = useState({ name: "", nameLength: 0, type: 1 });
    const [isLoadingSearchResult, setIsLoadingSearchResult] = useState(false);
    const [isAllLoaded, setIsAllLoaded] = useState(false);
    const [allSituations, setAllSituations] = useState([]);

    // Fetch all situations only once (after user typed in search keyword for the first time)
    useEffect(() => {
        async function handleKeywordChange(keyword) {
            setKeyword(keyword);
            if (!isAllLoaded) {
                setIsLoadingSearchResult(true)
                const result = await loadAll();
                setAllSituations(result);
                setIsLoadingSearchResult(false);
                setIsAllLoaded(true);
            }
        }

        if (keyword.length > 0) handleKeywordChange(keyword)
    }, [keyword])

    // useEffect(() => {
    //     console.log(JSON.stringify(allSituations, null, 2))
    // }, [allSituations])

    const navigate = useNavigate();

    function handleResultClick(situationId) {
        if (!situationId) {
            setIsSituationModalOpen(true);
            return;
        }
        navigate(`/stories/situation/${situationId}`);
    }

    return (
        <div>
            <SituationsSearchBar allSituations={allSituations} keyword={keyword} setKeyword={setKeyword} handleResultClick={handleResultClick} />
            <CreateSituationModal isOpen={isSituationModalOpen} setIsOpen={setIsSituationModalOpen} />
        </div>
    );
}