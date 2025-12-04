import "../../index.css"
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useAllSituations } from "../../services/situationsService";

export default function Marquee({ size, story, setStory }) {

  const situationsRef = useRef([
    {
      "id": 1,
      "name": "Kucing meninggal",
      "level": "2",
      "category": "main"
    },
    {
      "id": 2,
      "name": "Dikutuk di tempat kerja",
      "level": "2",
      "category": "main"
    },
    {
      "id": 3,
      "name": "Kewangan teruk dan tidak bersemangat untuk bekerja",
      "level": "2",
      "category": "main"
    },
    {
      "id": 4,
      "name": "Saya ada adik beradik yang kesemuanya berlainan jantina dari saya",
      "level": "2",
      "category": "main"
    },
    {
      "id": 5,
      "name": "Kejiranan rasa tak selamat",
      "level": "2",
      "category": "main"
    }
  ]).current;
  // situationsRef.forEach(s => {
  //   s.name = "fig7q36 9rct82yn-r7tb 2   x893bcrxn2"
  // });

  const [selectedSituations, setSelectedSituations] = useState([]);

  function handleSituationsChange(selectedSituationId) {
    const situation = situationsRef.find(s => s.id === selectedSituationId);
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

  const rows = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const shuffledRowsRef = useRef(rows.map(() =>
    shuffle(situationsRef.map(s => s.id))
  )).current;

  useEffect(() => {
    setSelectedSituations(story?.otherSituations);
  }, [story?.otherSituations])

  const { situations, loading } = useAllSituations();

  useEffect(() => {
    console.log(JSON.stringify(situations, null, 2));
  }, [situations])

  return (
    <div className={`${size === "small" ? "grid grid-col width-[100px]" : ""}`}>
      {rows.map((row, i) => (
        <div key={row.id} className="relative flex overflow-hidden">
          <span className="whitespace-nowrap animate-scroll">
            {shuffledRowsRef[i].map(id => {
              const s = situationsRef.find(x => x.id === id);
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
            {shuffledRowsRef[i].map(id => {
              const s = situationsRef.find(x => x.id === id);
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

function Pill({ size, id, name, isSelected, onClick }) {
  return size === "small" ? (
    <span
      onClick={onClick}
      className={`pill-small ${isSelected ? "bg-[#f1efe3]" : "bg-white"}`}
    >
      {name}
    </span>
  ) : (
    <Link to={`/stories/situation/${id}`}>
      <span className="pill">{name}</span>
    </Link>
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