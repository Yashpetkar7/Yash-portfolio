import { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

// Wraps a control so it leans toward the cursor with spring physics.
// Mouse-only by nature: touch devices never fire mousemove on hover.
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 280, damping: 18, mass: 0.5 });
  const y = useSpring(0, { stiffness: 280, damping: 18, mass: 0.5 });

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
