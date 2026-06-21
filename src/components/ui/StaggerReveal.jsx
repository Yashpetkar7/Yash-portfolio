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

  const variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
        visible: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
      }
    : {
        hidden: { opacity: 0, y: distance, scale: 0.96, rotateX: 12 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transition: {
            duration: 0.8,
            type: 'spring',
            bounce: 0.25,
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
      style={{ willChange: 'transform, opacity', transformOrigin: 'top center' }}
    >
      {children}
    </motion.div>
  );
}
