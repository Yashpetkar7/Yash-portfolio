import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SmoothScroll from './components/ui/SmoothScroll';
import MagneticCursor from './components/ui/MagneticCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import { MainLayout } from './components/layout/MainLayout';

import IntroOverlay from './components/IntroOverlay';
import Terminal from './components/ui/Terminal';
import { HeroSection } from './sections/HeroSection';
import { AboutSkillsSection } from './sections/AboutSkillsSection';
import { ExperienceProjectsSection } from './sections/ExperienceProjectsSection';
import { LabPortalSection } from './sections/LabPortalSection';
import { ContactSection } from './sections/ContactSection';
import BackToTop from './components/ui/BackToTop';

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('splashPlayed');
  });

  const dismissIntro = useCallback(() => {
    setShowIntro(false);
    sessionStorage.setItem('splashPlayed', 'true');
  }, []);

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);
  return (
    <>
      <SmoothScroll />
      <MagneticCursor />
      <ScrollProgress />
      <MainLayout>
        {/* Hero intro animations fire the moment the overlay lifts */}
        <HeroSection introActive={!showIntro} />
        <AboutSkillsSection />
        <ExperienceProjectsSection />
        <LabPortalSection />
        <ContactSection />

      </MainLayout>

      <BackToTop />
      <Terminal />

      <AnimatePresence mode="wait">
        {showIntro ? <IntroOverlay key="portfolio-intro" onDone={dismissIntro} /> : null}
      </AnimatePresence>
    </>
  );
}
