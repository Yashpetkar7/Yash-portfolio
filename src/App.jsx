import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SmoothScroll from './components/ui/SmoothScroll';
import MagneticCursor from './components/ui/MagneticCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import { MainLayout } from './components/layout/MainLayout';

import SplashScreen from './components/SplashScreen';
import { HeroSection } from './sections/HeroSection';
import { AboutSkillsSection } from './sections/AboutSkillsSection';
import { ExperienceProjectsSection } from './sections/ExperienceProjectsSection';
import { ContactSection } from './sections/ContactSection';
import BackToTop from './components/ui/BackToTop';

export default function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splashPlayed');
  });

  useEffect(() => {
    if (!showSplash) return;
    const timer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem('splashPlayed', 'true');
    }, 3200);

    return () => clearTimeout(timer);
  }, [showSplash]);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [showSplash]);
  return (
    <>
      <SmoothScroll />
      <MagneticCursor />
      <ScrollProgress />
      <MainLayout>
        <HeroSection />
        <AboutSkillsSection />
        <ExperienceProjectsSection />
        <ContactSection />

      </MainLayout>

      <BackToTop />

      <AnimatePresence mode="wait">
        {showSplash ? <SplashScreen key="portfolio-splash" /> : null}
      </AnimatePresence>
    </>
  );
}
