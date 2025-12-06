import "../../index.css"
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useSituationService } from "../../hooks/useSituationService";
import Pill from "./Pill";

export default function OtherSituationsMarquee({ isOpen, size, story, setStory }) {
  const situationsRef = useRef([]);
  const { loadAll, loading } = useSituationService();
  const [selectedSituations, setSelectedSituations] = useState([]);
  const rows = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const shuffledRowsRef = useRef([]);

  useEffect(() => {
    async function getAllSituations() {
      const result = await loadAll();
      situationsRef.current = result;
      // situationsRef.current.forEach(s => {
      //   s.name = "fig7q36 9rct82yn-r7tb 2   x893bcrxn2"
      // });
      shuffledRowsRef.current = rows.map(() =>
        shuffle(situationsRef.current.map(s => s.id))
      );
    }
    if (isOpen) getAllSituations();
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
  //   console.log(JSON.stringify(situationsRef, null, 2));
  // }, [situationsRef])

  return (
    <div className={`${size === "small" ? "grid grid-col width-[100px]" : ""}`}>
      {loading ?
        <div className="text-center">Loading...</div> :
        rows.map((row, i) => (
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