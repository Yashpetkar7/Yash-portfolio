import { heroContent, footerContent } from '../../data/portfolioData';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'ABOUT', href: '#about-skills', id: 'about-skills' },
  { label: 'WORK', href: '#experience-projects', id: 'experience-projects' },
  { label: 'CONTACT', href: '#contact', id: 'contact' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Intersection Observer for highlighting active link
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxVisible = 0;
        let mostVisibleId = '';

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxVisible) {
            maxVisible = entry.intersectionRatio;
            mostVisibleId = entry.target.id;
          }
        });

        if (mostVisibleId) {
          setActiveSection(mostVisibleId);
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.7, 0.9], rootMargin: '-10% 0px -40% 0px' }
    );

    navLinks.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className={`fixed top-0 w-full flex justify-between items-center px-6 h-16 z-50 transition-colors duration-300 ${menuOpen ? 'bg-transparent border-transparent' : 'bg-surface/90 backdrop-blur-md border-b border-surface-container-high'}`}>
        {/* Left - Logo */}
        <div className="flex-1 flex justify-start">
          <a href="#hero" className="text-xl font-black text-primary tracking-tighter font-headline relative z-50 uppercase">
            {heroContent.fullName}
          </a>
        </div>

        {/* Center - Links (Desktop) */}
        <nav className="hidden md:flex flex-1 justify-center gap-10 items-center">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                className="font-label uppercase tracking-widest text-xs transition-colors duration-200"
                style={{ color: isActive ? '#b8fd4b' : 'rgba(255, 255, 255, 0.6)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#b8fd4b'}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right - Resume (Desktop) & Hamburger (Mobile) */}
        <div className="flex-1 flex justify-end items-center">
          <a
            href={footerContent.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex relative z-50"
            style={{
              border: '1px solid #b8fd4b',
              color: '#b8fd4b',
              padding: '4px 14px',
              fontFamily: 'Syne Mono, monospace',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#b8fd4b'; e.currentTarget.style.color = '#000'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#b8fd4b'; }}
          >
            RESUME &#x2197;
          </a>

          {/* Hamburger - mobile only */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 ml-auto relative z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span style={{ display: 'block', width: 22, height: 1.5, background: menuOpen ? '#b8fd4b' : '#ffffff', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(5px)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: '#ffffff', opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: menuOpen ? '#b8fd4b' : '#ffffff', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-5px)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile menu fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center pointer-events-auto"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-12 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-headline font-black text-4xl sm:text-5xl tracking-widest text-[#ababab] hover:text-primary transition-colors duration-300 uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            <a
              href={footerContent.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-16 text-primary border border-primary px-8 py-4 font-mono text-sm tracking-widest uppercase"
              onClick={() => setMenuOpen(false)}
            >
              RESUME &#x2197;
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
