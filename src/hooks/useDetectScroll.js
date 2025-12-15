import { useEffect, useState, useRef } from "react";

export function useDetectScroll() {
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isAtDivEnd, setIsAtDivEnd] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastY, setLastY] = useState(0);
  const divRef = useRef(null);

  useEffect(() => {
    // Detect if scroll is at the bottom of the page
    const handleScroll = () => {
      const atEnd = window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;

      setIsAtEnd(atEnd);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect scrollling up or down the page
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < lastY) {
        // scrolling UP
        setIsScrollingUp(true);
      } else {
        // scrolling DOWN
        setIsScrollingUp(false);
      }

      setLastY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return {
    isAtEnd,
    divRef,
    isAtDivEnd,
    isScrollingUp
  };
}
