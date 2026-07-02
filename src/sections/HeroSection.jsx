import { lazy, Suspense, useCallback } from 'react';
import ScrambleText from '../components/ui/ScrambleText';
import { RevealItem } from '../components/ui/StaggerReveal';
import { useInViewReveal } from '../hooks/useInViewReveal';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useTypewriter } from '../hooks/useTypewriter';
import { heroContent, socialLinks } from '../data/portfolioData';

const LazyHeroCanvas = lazy(() =>
  import('../components/three/HeroCanvas').then((module) => ({ default: module.HeroCanvas })),
);

function getSocialIconSrc(icon) {
  if (icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('data:') || icon.startsWith('/')) {
    return icon;
  }
  // Strip any trailing color like /fff
  const baseIcon = icon.split('/')[0];
  return `https://cdn.simpleicons.org/${baseIcon}`;
}

export function HeroSection({ introActive = true }) {
  const displayText = useTypewriter(heroContent.subtitle, 18);
  const prefersReducedMotion = usePrefersReducedMotion();
  const canUseWebGL = typeof window !== 'undefined' && !window.matchMedia('(max-width: 768px)').matches;
  const { elementRef: heroLoadRef, isVisible: isHeroVisible } = useInViewReveal({ threshold: 0.05, rootMargin: '200px 0px', once: true });
  const { elementRef: heroActiveRef, isVisible: isHeroActive } = useInViewReveal({ threshold: 0.08, rootMargin: '80px 0px', once: false });
  const shouldRender3D = isHeroVisible && !prefersReducedMotion && canUseWebGL;

  const setHeroRefs = useCallback((node) => {
    heroLoadRef.current = node;
    heroActiveRef.current = node;
  }, [heroActiveRef, heroLoadRef]);

  return (
    <section ref={setHeroRefs} id="hero" className="relative min-h-[85vh] flex items-center px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`hero-grid-fallback absolute inset-0 transition-opacity duration-500 ${shouldRender3D ? 'opacity-30' : 'opacity-100'}`} />
        <div className={`absolute inset-0 transition-opacity duration-500 ${shouldRender3D ? 'opacity-100' : 'opacity-0'}`}>
          {shouldRender3D ? (
            <Suspense fallback={null}>
              <LazyHeroCanvas isActive={isHeroActive} />
            </Suspense>
          ) : null}
        </div>
        <div className="hero-grid-glow absolute inset-0" />
      </div>

      <div className="hero-legibility-veil absolute inset-0 z-[1] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pb-12 md:pb-20 mt-12">
        
        {/* Left Side - Text */}
        <RevealItem
          className="flex-1 w-full order-2 lg:order-1"
          threshold={0.25}
          delay={80}
        >
          <h1 className="hero-title-container text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[8rem] font-black font-headline tracking-tighter text-on-surface leading-[0.85] max-w-full overflow-visible">
            <div className="kinetic-text"><ScrambleText text={heroContent.firstName} trigger={introActive} delay={200} style={{ display: 'block' }} /></div>
            <div className="kinetic-text"><ScrambleText text={heroContent.lastName} trigger={introActive} delay={450} style={{ display: 'block' }} /></div>
          </h1>

          <p className="mt-6 md:mt-8 max-w-xl font-mono text-base md:text-lg text-on-surface-variant min-h-[48px]">
            {displayText}
            <span className="animate-blink">|</span>
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8 md:mt-12 mb-10">
            <a href="#experience-projects" className="btn-primary interactive-button">VIEW_WORK</a>
            <a href="#contact" className="btn-secondary interactive-button">CONTACT</a>
          </div>

          <div className="flex gap-4 flex-wrap pointer-events-auto justify-center lg:justify-start border-t border-outline-variant/20 pt-8 w-full max-w-lg mt-8">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300" title={social.label}>
                <img src={getSocialIconSrc(social.icon)} alt={social.label} width={22} height={22} style={{ objectFit: 'contain' }} />
              </a>
            ))}
          </div>
        </RevealItem>

        {/* Right Side - Photo Card */}
        <RevealItem
          className="w-full max-w-[320px] sm:max-w-[380px] lg:w-[400px] shrink-0 order-1 lg:order-2 mb-10 lg:mb-0"
          threshold={0.25}
          delay={140}
        >
          <div style={{ position: 'relative', width: '100%', maxWidth: '340px', margin: '0 auto' }}>
            <div className="group interactive-card" style={{ border: '1px solid rgba(184,253,75,0.2)', background: '#131313', padding: '16px', position: 'relative', overflow: 'hidden' }}>
              <img
                src="/images/profile.jpg"
                alt={heroContent.fullName}
                className="w-full block filter grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary opacity-0 mix-blend-overlay group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/80 opacity-0 group-hover:opacity-100 group-hover:animate-scanline pointer-events-none shadow-[0_0_8px_rgba(184,253,75,0.8)]" />
              <div style={{ position:'absolute', top:4, left:4, width:16, height:16, borderTop:'2px solid #b8fd4b', borderLeft:'2px solid #b8fd4b' }} />
              <div style={{ position:'absolute', top:4, right:4, width:16, height:16, borderTop:'2px solid #b8fd4b', borderRight:'2px solid #b8fd4b' }} />
              <div style={{ position:'absolute', bottom:4, left:4, width:16, height:16, borderBottom:'2px solid #b8fd4b', borderLeft:'2px solid #b8fd4b' }} />
              <div style={{ position:'absolute', bottom:4, right:4, width:16, height:16, borderBottom:'2px solid #b8fd4b', borderRight:'2px solid #b8fd4b' }} />
            </div>
          </div>
        </RevealItem>
      </div>
    </section>
  );
}
