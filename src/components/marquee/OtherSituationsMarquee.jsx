import "../../index.css"
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useSituationService } from "../../hooks/useSituationService";
import Pill from "./Pill";
import SituationsSearchBar from "../search-bar/SituationsSearchBar";

export default function OtherSituationsMarquee({ isOpen, size, story, setStory, situationsRef }) {
  const { loadAll } = useSituationService();
  const [selectedSituations, setSelectedSituations] = useState([]);
  const rows = [{ id: 1 }, { id: 2 }];
  const shuffledRowsRef = useRef([]);
  const [isSituationsLoading, setIsSituationsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  // Fetch all situations only once (triggered after user opens the CreateStoryModal for the first time)
  useEffect(() => {
    async function getAllSituations() {
      // console.log("fetching...");
      const result = await loadAll();
      situationsRef.current = result;
      shuffledRowsRef.current = rows.map(() =>
        shuffle(situationsRef.current.map(s => s.id))
      );
      setIsSituationsLoading(false);
      
    }

    if (isOpen && situationsRef.current.length === 0) getAllSituations();
    else {
      shuffledRowsRef.current = rows.map(() =>
        shuffle(situationsRef.current.map(s => s.id))
      );
      setIsSituationsLoading(false);
    }
  }, [isOpen])

  function handleSituationsChange(selectedSituationId) {
    const situation = situationsRef.current.find(s => s.id === selectedSituationId);
    setStory(prev => {
      if (prev.otherSituations.some(s => s.id === selectedSituationId)) {
        return {
          ...prev,
          otherSituations: prev.otherSituations.filter(s => s.id !== selectedSituationId)
        }
      };
      return {
        ...prev,
        otherSituations: [...prev.otherSituations, situation],
      };
    });
  }

  useEffect(() => {
    setSelectedSituations(story?.otherSituations);
  }, [story?.otherSituations])

  // useEffect(() => {
  //   console.log(JSON.stringify(situationsRef.current, null, 2));
  // }, [situationsRef.current])

  return (
    <div>
      {isSituationsLoading ?
        <div className="text-center">Loading...</div> :
        <div className="grid grid-col">
          {rows.map((row, i) => (
            <div key={row.id} className="relative flex overflow-hidden">
              <span className="whitespace-nowrap animate-scroll">
                {shuffledRowsRef.current[i].map(id => {
                  const s = situationsRef.current.find(x => x.id === id);
                  return (
                    <Pill
                      key={`r${i}-p${id}`}
                      size={size}
                      id={id}
                      name={s.name}
                      isSelected={selectedSituations?.some(s => s.id == id)}
                      onClick={() => handleSituationsChange(id)}
                    />
                  );
                })}
              </span>
              <span className="whitespace-nowrap animate-scroll">
                {shuffledRowsRef.current[i].map(id => {
                  const s = situationsRef.current.find(x => x.id === id);
                  return (
                    <Pill
                      key={`r${i}-p2-${id}`}
                      size={size}
                      id={id}
                      name={s.name}
                      isSelected={selectedSituations?.some(s => s.id == id)}
                      onClick={() => handleSituationsChange(id)}
                    />
                  );
                })}
              </span>
            </div>
          ))}
          <div className="grid gird-col mt-6">
            <SituationsSearchBar allSituations={situationsRef.current} keyword={keyword} setKeyword={setKeyword} handleResultClick={handleSituationsChange} />
          </div>
        </div>
      }
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