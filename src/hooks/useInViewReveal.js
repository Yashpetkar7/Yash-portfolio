import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useInViewReveal({ threshold = 0.2, rootMargin = '0px 0px -10% 0px', once = true } = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = elementRef.current;
    if (!node) {
      return;
    }

    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
          return;
        }

        if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [once, prefersReducedMotion, rootMargin, threshold]);

  return { elementRef, isVisible: prefersReducedMotion || isVisible, prefersReducedMotion };
}