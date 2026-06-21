import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrolled / total : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 2,
      zIndex: 99997, background: 'transparent',
    }}>
      <div ref={barRef} style={{
        height: '100%', background: 'linear-gradient(90deg, #b8fd4b, #aaee3d)',
        transformOrigin: 'left', transform: 'scaleX(0)',
        transition: 'transform 0.1s linear',
      }} />
    </div>
  );
}
