import { useState } from 'react';
import '../../index.css';
import CreateSituationModal from '../situations/CreateSituationModal';
import { useTranslation } from 'react-i18next';
import SituationsSearchBar from '../search-bar/SituationsSearchBar';
import { useNavigate, useOutletContext } from 'react-router';

export default function HomeSearchBar() {
    // will scale later, after beta test
    const { t } = useTranslation("components");
    const [keyword, setKeyword] = useState("");
    const [isSituationModalOpen, setIsSituationModalOpen] = useState(false);
    // const [situation, setSituation] = useState({ name: "", nameLength: 0, type: 1 });
    const [isLoadingSearchResult, setIsLoadingSearchResult] = useState(false);
    const { allSituationsContextRef } = useOutletContext();
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
                allSituations={allSituationsContextRef.current}
                keyword={keyword}
                setKeyword={setKeyword}
                handleResultClick={handleResultClick}
                isLoadingSearchResult={isLoadingSearchResult} />
            <CreateSituationModal
                isOpen={isSituationModalOpen}
                setIsOpen={setIsSituationModalOpen}
                existingSituations={allSituationsContextRef.current} />
        </div>
    );
}