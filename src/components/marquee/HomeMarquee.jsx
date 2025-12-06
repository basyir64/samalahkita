import "../../index.css"
import { Link } from "react-router";
import { useSituationService } from "../../hooks/useSituationService";
import Pill from "./Pill";
import { useState, useEffect } from "react";

export default function HomeMarquee({ size, story, setStory }) {
    const { loadAll, loading } = useSituationService();
    const rows = [{ id: 1 }, { id: 2 }, { id: 3 }];
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
            {loading ?
                <div className="text-center">Loading...</div> :
                rows.map(row => {
                    const shuffledIds = shuffle(allSituations.map(situation => situation.id));
                    return <div key={row.id} className="relative flex overflow-hidden">
                        <div className="whitespace-nowrap animate-scroll">
                            {
                                shuffledIds.map(shuffledId => {
                                    const situation = allSituations.find(s => s.id == shuffledId);
                                    return <Pill
                                        key={shuffledId}
                                        size={size}
                                        id={shuffledId}
                                        name={situation.name}
                                    />
                                })
                            }
                        </div>
                        <div className="whitespace-nowrap animate-scroll">
                            {
                                shuffledIds.map(shuffledId => {
                                    const situation = allSituations.find(s => s.id == shuffledId);
                                    return <Pill
                                        key={shuffledId}
                                        size={size}
                                        id={shuffledId}
                                        name={situation.name}
                                    />
                                })
                            }
                        </div>
                    </div>
                })}
        </div>
    );
}

function shuffle(arr) {
    const a = [...arr];     // copy so original not mutated
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}