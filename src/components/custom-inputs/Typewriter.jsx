import '../../index.css'
import { useState, useEffect, useRef } from 'react';

export default function Typewriter({ text, className = "", as: Component = "div" }) {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (ref.current) {
      const el = ref.current;
      setAnimate(el.scrollWidth <= el.clientWidth);
    }
  }, [text]);

  return (
    <div
      key={text}
      ref={ref}
      className={`
        text-center 
        w-full
        sm:w-max
        whitespace-normal
        sm:whitespace-nowrap
        break-words
        md:animate-typewriter
        overflow-hidden
        ${className}`}

      style={{
        "--steps": 100,
        "--duration": `1s`,
      }}
    >
      {text}
    </div>
  );
}