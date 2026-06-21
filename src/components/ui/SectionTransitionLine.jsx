import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function SectionTransitionLine() {
  const lineRef = useRef(null);
  const [hasFlashed, setHasFlashed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFlashed) {
            setHasFlashed(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px 0px' }
    );

    if (lineRef.current) {
      observer.observe(lineRef.current);
    }

    return () => observer.disconnect();
  }, [hasFlashed]);

  return (
    <motion.div
      ref={lineRef}
      initial={{ backgroundColor: 'rgba(184,253,75,0.08)' }}
      animate={
        hasFlashed
          ? {
              backgroundColor: [
                'rgba(184,253,75,0.08)',
                'rgba(184,253,75,0.6)',
                'rgba(184,253,75,0.08)',
              ],
            }
          : {}
      }
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="absolute top-0 left-0 w-full h-[1px] pointer-events-none z-20"
    />
  );
}
