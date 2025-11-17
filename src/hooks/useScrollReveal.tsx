import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

export const useScrollReveal = (threshold = 0.1) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return { ref, isVisible };
};

export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrollPosition = window.pageYOffset;
        const elementTop = rect.top + scrollPosition;
        const offset = (scrollPosition - elementTop) * speed;
        setOffset(offset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref: elementRef, offset };
};
