import { useEffect, useState, useRef } from "react";

export function useDetectScroll() {
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isAtDivEnd, setIsAtDivEnd] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastY, setLastY] = useState(0);
  const divRef = useRef(null);
  const hasMounted = useRef(false);

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

      // Ignore first scroll (navigation / restore)
      if (!hasMounted.current) {
        hasMounted.current = true;
        setLastY(currentY);
        return;
      }

      if (currentY < lastY) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }

      setLastY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return {
    isAtEnd,
    divRef,
    isAtDivEnd,
    isScrollingUp,
    setIsScrollingUp
  };
}
