import TextSpan from "./TextSpan";
import "../../index.css"
import ScrollRow from "./ScrollRow";

function shuffle(arr) {
  const a = [...arr];     // copy so original not mutated
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function AnimatedScroll({ stuffs }) {

    const spans = stuffs.map(stuff =>
        <TextSpan key={stuff.id} text={stuff.name} />
    );

    return (
        <>
            <ScrollRow spans={shuffle(spans)} />
            <ScrollRow spans={shuffle(spans)} />
            <ScrollRow spans={shuffle(spans)} />
        </>
    )
}