import { SectionHeading } from '../components/ui/SectionHeading';
import { RevealItem } from '../components/ui/StaggerReveal';
import { useInViewReveal } from '../hooks/useInViewReveal';

const LAB_URL = 'https://yash-portfolio-lab.vercel.app/';

export function LabPortalSection() {
  // Only mount the live iframe once the section scrolls into view
  const { elementRef, isVisible } = useInViewReveal({ threshold: 0.1, rootMargin: '200px 0px', once: true });
  const canEmbed =
    typeof window !== 'undefined' &&
    window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;

  return (
    <section ref={elementRef} id="lab-portal" className="relative overflow-hidden">
      <span aria-hidden="true" className="index-watermark">03</span>
      <div className="max-w-7xl mx-auto">
        <RevealItem threshold={0.2}>
          <SectionHeading
            eyebrow="02_EXPERIMENTS"
            title="ENTER THE"
            accent="LAB"
            description="A second portfolio. 3D, experimental, loud. Same person, different volume."
          />
        </RevealItem>

        <RevealItem threshold={0.15} delay={120}>
          <a
            href={LAB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block mt-12 card-elevated rounded-lg overflow-hidden interactive-card"
            aria-label="Open the 3D Lab portfolio in a new tab"
          >
            {/* Live viewport (desktop) or stylized fallback (touch) */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              {canEmbed && isVisible ? (
                <iframe
                  src={LAB_URL}
                  title="Live preview of the Lab portfolio"
                  loading="lazy"
                  tabIndex={-1}
                  aria-hidden="true"
                  scrolling="no"
                  className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none border-0 bg-[#060a14]"
                />
              ) : (
                <div className="absolute inset-0 bg-[#060a14] flex items-center justify-center">
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: 'linear-gradient(to right, rgba(56,189,248,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.15) 1px, transparent 1px)',
                    backgroundSize: '36px 36px',
                  }} />
                  <span className="relative font-headline font-black text-6xl md:text-8xl tracking-tighter text-[#38bdf8]">
                    LAB ↗
                  </span>
                </div>
              )}

              {/* Dark veil that lifts on hover */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

              {/* LIVE badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-[#38bdf8] bg-black/60 backdrop-blur px-3 py-1.5 border border-[#38bdf8]/30">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#38bdf8]" />
                </span>
                LIVE — YASH-PORTFOLIO-LAB.VERCEL.APP
              </div>

              {/* Enter CTA */}
              <div className="absolute bottom-4 right-4 font-mono text-xs tracking-[0.2em] uppercase text-black bg-primary px-4 py-2 opacity-90 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                ENTER THE LAB ↗
              </div>

              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary pointer-events-none" />
            </div>

            {/* Meta strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-6 py-4 border-t border-outline-variant/30 font-mono text-[11px] tracking-widest uppercase text-on-surface-variant">
              <span>NEXT.JS · THREE.JS · R3F · GSAP · LENIS</span>
              <span className="text-primary">SYS.STATUS: OPERATIONAL</span>
            </div>
          </a>
        </RevealItem>
      </div>
    </section>
  );
}
