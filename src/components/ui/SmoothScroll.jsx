import { useEffect } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export default function SmoothScroll() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let frameId = null;
    let lenis = null;
    let isMounted = true;

    const setupLenis = async () => {
      const { default: Lenis } = await import('lenis');
      if (!isMounted) {
        return;
      }

      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.95,
      });

      const raf = (time) => {
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      };

      frameId = requestAnimationFrame(raf);
    };

    setupLenis();

    return () => {
      isMounted = false;
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      if (lenis) {
        lenis.destroy();
      }
    };
  }, [prefersReducedMotion]);

  return null;
}
