import { motion } from 'framer-motion';
import { heroContent } from '../data/portfolioData';

export default function SplashScreen() {
  const text = heroContent.fullName.toUpperCase().split('');

  return (
    <motion.div
      key="splash"
      className="fixed inset-0 z-[1000] pointer-events-none flex flex-col items-center justify-center bg-transparent"
      initial={{ y: 0 }}
      animate={{ y: '-100vh' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 3.2 }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        {/* Top Text Layer */}
        <div className="flex space-x-[2px] md:space-x-1 mb-4">
          {text.map((char, i) => (
            <motion.span
              key={i}
              className={`font-mono text-sm sm:text-base md:text-xl lg:text-2xl text-primary font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase ${char === ' ' ? 'mr-4' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05, delay: 0.8 + (i * 0.05) }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
        
        {/* The Line - Draws from center outward */}
        <motion.div
          className="h-[1px] bg-primary w-[80%] max-w-4xl"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1, opacity: [1, 1, 0] }}
          transition={{
            scaleX: { duration: 0.6, delay: 0.2, ease: 'easeInOut' },
            opacity: { duration: 0.3, delay: 3.2 }
          }}
          style={{ originX: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
