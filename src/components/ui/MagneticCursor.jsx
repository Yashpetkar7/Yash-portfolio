import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export default function MagneticCursor() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isCoarsePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const cursorDot = useRef(null);
  const cursorRing = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || isCoarsePointer) return;

    const dot = cursorDot.current;
    const r = cursorRing.current;
    if (!dot || !r) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.15);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.15);
      r.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      rafId.current = requestAnimationFrame(animate);
    };

    const onEnterMagnetic = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      // Expand and invert
      r.style.transform = `translate(${cx}px, ${cy}px) scale(3.5)`;
      r.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s, border-color 0.2s';
      r.style.backgroundColor = '#fff';
      r.style.borderColor = 'transparent';
      dot.style.opacity = '0';
    };

    const onLeaveMagnetic = () => {
      r.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s, border-color 0.2s';
      r.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(1)`;
      r.style.backgroundColor = 'transparent';
      r.style.borderColor = 'rgba(184, 253, 75, 0.5)';
      dot.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove);
    rafId.current = requestAnimationFrame(animate);

    const attachedElements = new Set();
    const attachEvents = () => {
      const magnetics = document.querySelectorAll('a, button, [data-magnetic], .interactive-card, .interactive-input, .interactive-button');
      magnetics.forEach(el => {
        if (!attachedElements.has(el)) {
          el.addEventListener('mouseenter', onEnterMagnetic);
          el.addEventListener('mouseleave', onLeaveMagnetic);
          attachedElements.add(el);
        }
      });
    };

    attachEvents();
    
    // Re-attach observer for lazy elements with a slight debounce or just childList
    const observer = new MutationObserver(() => attachEvents());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
      attachedElements.forEach(el => {
        el.removeEventListener('mouseenter', onEnterMagnetic);
        el.removeEventListener('mouseleave', onLeaveMagnetic);
      });
    };
  }, [isCoarsePointer, prefersReducedMotion]);

  if (prefersReducedMotion || isCoarsePointer) return null;

  return (
    <>
      <div
        ref={cursorDot}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-primary pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: 'transform, opacity' }}
      />
      <div
        ref={cursorRing}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/50 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-colors duration-300"
        style={{ willChange: 'transform, background-color, border-color' }}
      />
    </>
  );
}
