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
    // const [situation, setSituation] = useState({ name: "", nameLength: 0, type: 1 });
    const [isLoadingSearchResult, setIsLoadingSearchResult] = useState(false);
    const [isAllLoaded, setIsAllLoaded] = useState(false);
    const [allSituations, setAllSituations] = useState([]);

    // fix
    // Fetch all situations only once (after user typed in search keyword, or when the create situation modal is open)
    useEffect(() => {
        let isKeywordIn = false;
        async function handleKeywordChange() {
            if (!isAllLoaded && !isKeywordIn) {
                isKeywordIn = true;
                console.log("fetching...")
                setIsLoadingSearchResult(true)
                setTimeout(async () => {
                    const result = await loadAll();
                    setAllSituations(result);
                    setIsLoadingSearchResult(false);
                    setIsAllLoaded(true);
                }, 3000);
            }
        }

        if (keyword.length > 0 || isSituationModalOpen) {
            handleKeywordChange()
        }
    }, [keyword, isSituationModalOpen])

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
            <SituationsSearchBar
                allSituations={allSituations}
                keyword={keyword}
                setKeyword={setKeyword}
                handleResultClick={handleResultClick}
                isLoadingSearchResult={isLoadingSearchResult} />
            <CreateSituationModal
                isOpen={isSituationModalOpen}
                setIsOpen={setIsSituationModalOpen}
                existingSituations={allSituations} />
        </div>
    );
}