import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { RevealItem } from '../components/ui/StaggerReveal';
import { SectionTransitionLine } from '../components/ui/SectionTransitionLine';
import { aboutContent, skillsData } from '../data/portfolioData';

export function AboutSkillsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  // Flatten all icons for the ticker
  const allIcons = skillsData.flatMap(skill => skill.icons);
  // Split into two halves for the two rows
  const midpoint = Math.ceil(allIcons.length / 2);
  const row1Icons = allIcons.slice(0, midpoint);
  const row2Icons = allIcons.slice(midpoint);

  // Helper to render duplicated track for seamless scroll
  const renderTrack = (icons, direction) => (
    <div className={`ticker-container ${direction}`}>
      <div className={`ticker-track ${direction}`}>
        {/* Render two sets of icons for infinite scroll illusion */}
        {[...icons, ...icons].map((icon, idx) => (
          <div key={`${icon.name}-${idx}`} className="flex flex-col items-center gap-3 shrink-0 py-4 px-6" style={{ width: '120px' }}>
            <div className="h-14 w-14 flex items-center justify-center bg-surface-container-low/50 rounded p-2 border border-outline-variant/20 hover:border-primary/50 transition-colors">
              <img
                src={icon.url}
                alt={icon.name}
                className="w-full h-full object-contain"
                onError={e => e.target.style.opacity = '0'}
              />
            </div>
            <span className="font-mono text-[9px] text-[#888] tracking-widest uppercase text-center w-full truncate">
              {icon.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="about-skills" className="relative bg-surface border-t border-outline-variant/20 block-section overflow-hidden">
      <SectionTransitionLine />
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          y: bgY,
          height: '130%',
          backgroundImage:
            'linear-gradient(#1f1f1f 1px, transparent 1px), linear-gradient(90deg, #1f1f1f 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Content (Full width now) */}
        <div className="w-full flex flex-col items-center">
          <RevealItem threshold={0.2} delay={60}>
            <SectionHeading
              eyebrow="01_PROFILE"
              title={aboutContent.heading}
              accent={aboutContent.accent}
            />
          </RevealItem>

          <RevealItem threshold={0.15} delay={80} className="mt-8 mb-12">
            <div className="border-l-4 border-primary pl-6 py-2 text-left">
              <p className="font-label text-base md:text-lg lg:text-xl text-[#ababab] leading-relaxed max-w-4xl">
                {aboutContent.description}
              </p>
            </div>
          </RevealItem>

          <RevealItem threshold={0.15} delay={100} className="w-full overflow-hidden text-left">
            <h3 className="font-mono text-[10px] text-primary tracking-widest uppercase mb-6 pl-2 border-l border-primary/30">MY TECH STACK</h3>
            <div className="flex flex-col gap-6">
              {renderTrack(row1Icons, 'left')}
              {renderTrack(row2Icons, 'right')}
            </div>
          </RevealItem>
        </div>
      </div>
    </section>
  );
}
