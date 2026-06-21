import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[999] group"
          aria-label="Back to top"
        >
          <div className="relative p-4 md:p-5 bg-surface border border-primary/30 group-hover:border-primary transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40 group-hover:border-primary transition-colors" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40 group-hover:border-primary transition-colors" />

            {/* Icon - Hand Point Up */}
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-primary group-hover:-translate-y-1 transition-transform duration-300"
            >
              <path d="M10 18H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5" className="opacity-20" />
              <path d="M12 13V3m0 0L9 6m3-3l3 3" />
              <path d="M9 20h6" />
              <path d="M10 17h4v4a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-4z" />
            </svg>
            
            {/* Scanline Effect */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/40 opacity-0 group-hover:opacity-100 group-hover:animate-scanline" />
          </div>
          
          {/* External text hint on hover */}
          <motion.span 
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-surface-container border border-outline-variant/30 px-3 py-1 font-mono text-[10px] text-primary tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
            initial={{ x: 10 }}
            whileHover={{ x: 0 }}
          >
            SYSTEM_UP
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
