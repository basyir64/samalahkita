import "../../index.css";
import Pill from "./Pill";

function shuffle(arr) {
  const a = [...arr];     // copy so original not mutated
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Row({ stuffs }) {
     const pills = stuffs.map(stuff =>
        <Pill key={stuff.id} id={stuff.id} text={stuff.name} />
    );
    return (
        <div className="relative flex overflow-hidden">
            <span className="whitespace-nowrap animate-scroll">
                {shuffle(pills)}
            </span>
            <span className="whitespace-nowrap animate-scroll2">
                {shuffle(pills)}
            </span>
        </div>
    );
}