import { motion } from 'framer-motion';
import { useInViewReveal } from '../../hooks/useInViewReveal';

export function StaggerContainer({
  children,
  className = '',
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  stagger = 0.08,
  delayChildren = 0,
}) {
  const { elementRef, isVisible, prefersReducedMotion } = useInViewReveal({ threshold, rootMargin, once: true });

  const variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      };

  return (
    <motion.div ref={elementRef} className={className} variants={variants} initial="hidden" animate={isVisible ? 'visible' : 'hidden'}>
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = '',
  distance = 32,
  delay = 0,
  threshold = 0.2,
  rootMargin = '0px 0px -10% 0px',
}) {
  const { elementRef, isVisible, prefersReducedMotion } = useInViewReveal({ threshold, rootMargin, once: true });

  // Apple-style reveal: rise + de-blur with a long ease-out — no flips, no bounce
  const variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0, filter: 'blur(0px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      }
    : {
        hidden: { opacity: 0, y: distance, filter: 'blur(10px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay: delay / 1000,
          },
        },
      };

  return (
    <motion.div
      ref={elementRef}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      style={{ willChange: 'transform, opacity, filter' }}
    >
      {children}
    </motion.div>
  );
}
