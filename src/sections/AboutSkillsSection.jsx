import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { RevealItem } from '../components/ui/StaggerReveal';
import { SectionTransitionLine } from '../components/ui/SectionTransitionLine';
import { aboutContent, skillsData, statsData } from '../data/portfolioData';

export function AboutSkillsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  const totalTech = skillsData.reduce((sum, skill) => sum + skill.icons.length, 0);

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

          <RevealItem threshold={0.15} delay={80} className="mt-8 mb-14">
            <div className="border-l-4 border-primary pl-6 py-2 text-left">
              <p className="font-label text-base md:text-lg lg:text-xl text-[#ababab] leading-relaxed max-w-4xl">
                {aboutContent.description}
              </p>
            </div>
          </RevealItem>

          {/* Big-numbers band — hairline mosaic */}
          <RevealItem threshold={0.2} delay={90} className="w-full mb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-outline-variant/30 border border-outline-variant/30">
              {statsData.map((stat) => (
                <div key={stat.label} className="bg-surface py-8 md:py-10 px-4 text-center">
                  <div className="font-headline font-bold text-3xl md:text-5xl tracking-tighter text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-3 font-mono text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </RevealItem>

          <RevealItem threshold={0.15} delay={100} className="w-full text-left">
            <div className="flex items-baseline justify-between mb-6 pl-2 border-l border-primary/30">
              <h3 className="font-mono text-[10px] text-primary tracking-widest uppercase">MY TECH STACK</h3>
              <span className="font-mono text-[10px] text-on-surface-variant/50 tracking-widest uppercase">{totalTech} TOOLS · 4 DOMAINS</span>
            </div>

            {/* Category grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {skillsData.map((skill, idx) => (
                <div
                  key={skill.label}
                  className="interactive-card card-elevated rounded-lg p-5 md:p-6"
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <h4 className="font-headline font-bold text-lg md:text-xl text-on-surface tracking-tight">
                      {skill.label}
                    </h4>
                    <span className="font-mono text-[10px] text-primary/60 tracking-widest">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="font-label text-sm text-on-surface-variant mb-4">{skill.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.icons.map((icon) => (
                      <span
                        key={icon.name}
                        className="flex items-center gap-1.5 border border-outline-variant/30 bg-surface px-2.5 py-1.5 font-mono text-[10px] tracking-wider uppercase text-on-surface-variant hover:border-primary/50 hover:text-on-surface transition-colors"
                      >
                        {/* Label stays if the icon fails, so no chip is ever blank */}
                        <img
                          src={icon.url}
                          alt=""
                          width={14}
                          height={14}
                          loading="lazy"
                          className="object-contain shrink-0"
                          onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }}
                        />
                        {icon.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </RevealItem>
        </div>
      </div>
    </section>
  );
}
