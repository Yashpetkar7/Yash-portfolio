import { useRef } from 'react';
import { Card } from '../components/ui/Card';
import { FeaturedProjectCard } from '../components/ui/FeaturedProjectCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { StaggerContainer, RevealItem } from '../components/ui/StaggerReveal';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { experienceData, projectsData, educationData } from '../data/portfolioData';
import { SectionTransitionLine } from '../components/ui/SectionTransitionLine';

function TiltCard({ children, style = {} }) {
  const ref = useRef(null);
  const glareRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleMove = (e) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;
    
    ref.current.style.transform = `perspective(1000px) rotateY(${xPct * 12}deg) rotateX(${-yPct * 12}deg) scale(1.02)`;
    
    if (glareRef.current) {
      glareRef.current.style.opacity = '1';
      glareRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08) 0%, transparent 60%)`;
    }
  };
  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
    if (glareRef.current) glareRef.current.style.opacity = '0';
  };
  
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      className="rounded-2xl"
      style={{ transition:'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)', position: 'relative', overflow: 'hidden', ...style }}>
      <div ref={glareRef} className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500" style={{ opacity: 0 }} />
      {children}
    </div>
  );
}

export function ExperienceProjectsSection() {
  return (
    <section id="experience-projects" className="relative bg-surface-container-low border-t border-outline-variant/20 terminal-grid">
      <SectionTransitionLine />
      <div className="max-w-7xl mx-auto">
        <RevealItem className="mb-12" threshold={0.2}>
          <SectionHeading
            eyebrow="Career History"
            title="EXPERIENCE"
          />
        </RevealItem>

        <div className="flex flex-col gap-16 xl:gap-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Experience Section */}
            <div>
              <h3 className="font-mono text-xs text-primary uppercase tracking-widest mb-6">Work</h3>
              <StaggerContainer className="grid gap-4">
                {experienceData.map((exp, index) => (
                  <RevealItem key={exp.title} className="h-full" threshold={0.12} delay={40 + index * 70}>
                    <Card className="h-full p-5 interactive-card">
                      <div className="flex items-start gap-4">
                        {exp.logo && (
                          <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center p-2 shrink-0 border border-outline-variant/30">
                            <img src={exp.logo} alt={exp.company} className="max-w-full max-h-full object-contain" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-mono text-[10px] text-on-surface-variant mb-1">
                            {exp.year} — {exp.endYear}
                          </p>
                          <h4 className="font-headline text-lg sm:text-xl font-bold text-on-surface uppercase leading-tight">{exp.title}</h4>
                          <p className="font-mono text-xs text-primary mt-1">{exp.company}</p>
                          <p className="font-mono text-[10px] text-on-surface-variant mt-3 leading-relaxed">{exp.description}</p>
                        </div>
                      </div>
                    </Card>
                  </RevealItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Education Section */}
            <div>
              <h3 className="font-mono text-xs text-primary uppercase tracking-widest mb-6">Education</h3>
              <StaggerContainer className="grid gap-4">
                {educationData.map((edu, index) => (
                  <RevealItem key={edu.title} className="h-full" threshold={0.12} delay={100 + index * 70}>
                    <Card className="h-full p-5 interactive-card">
                      <div className="flex items-start gap-4">
                        {edu.logo && (
                          <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center p-2 shrink-0 border border-outline-variant/30">
                            <img src={edu.logo} alt={edu.company} className="max-w-full max-h-full object-contain" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-mono text-[10px] text-on-surface-variant mb-1">
                            {edu.year} — {edu.endYear}
                          </p>
                          <h4 className="font-headline text-lg sm:text-xl font-bold text-on-surface uppercase leading-tight">{edu.title}</h4>
                          <p className="font-mono text-xs text-primary mt-1">{edu.company}</p>
                          <p className="font-mono text-[10px] text-on-surface-variant mt-3 leading-relaxed">{edu.description}</p>
                        </div>
                      </div>
                    </Card>
                  </RevealItem>
                ))}
              </StaggerContainer>
            </div>
          </div>

          <hr className="border-t-2 border-outline-variant/10" />

          <RevealItem threshold={0.2}>
            <div className="mb-12">
              <SectionHeading
                eyebrow="Selected Work"
                title="PROJECTS"
              />
            </div>

            <RevealItem threshold={0.12} delay={30}>
              <FeaturedProjectCard />
            </RevealItem>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 items-stretch">
              {projectsData.map((project, index) => (
                <RevealItem key={project.id} className="h-full" threshold={0.12} delay={60 + index * 80}>
                  <TiltCard style={{ height: '100%' }}>
                    <Card className="h-full border border-outline-variant/20 flex flex-col p-8 group interactive-card">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <h4 className="font-headline text-xl lg:text-2xl font-bold text-on-surface group-hover:text-primary">{project.name}</h4>
                        <div className="flex items-center gap-2 shrink-0 border border-outline-variant/20 rounded-full px-3 py-1 bg-surface">
                          <span className="w-2 h-2 rounded-full" style={{ background: project.status === 'ACTIVE' ? '#b8fd4b' : '#888' }} />
                          <span className="font-mono text-[9px] text-on-surface-variant tracking-widest">{project.status}</span>
                        </div>
                      </div>
                      <p className="text-[13px] md:text-sm text-on-surface-variant leading-relaxed mb-6 flex-1">{project.description}</p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto pt-4 border-t border-outline-variant/10">
                        <div className="flex flex-wrap gap-2 group/tech">
                          {project.tech.map((tech, i) => (
                            <span key={tech} className="text-[9px] font-mono tracking-wider bg-surface border border-outline-variant/20 px-2.5 py-1 text-on-surface transition-all duration-300 group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:-translate-y-1" style={{ transitionDelay: `${i * 50}ms` }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                        {project.github ? (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="interactive-button shrink-0 font-mono text-[10px] sm:text-xs text-primary border border-primary px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-primary hover:text-black transition-colors uppercase font-bold tracking-widest flex items-center justify-center gap-2 w-full sm:w-auto">
                            <span>VIEW CODE</span> &#x2197;
                          </a>
                        ) : (
                          <div className="shrink-0 font-mono text-[10px] sm:text-xs text-on-surface-variant/70 border border-white/10 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 uppercase font-bold tracking-widest flex items-center justify-center gap-2 w-full sm:w-auto">
                            PRIVATE REPO
                          </div>
                        )}
                      </div>
                    </Card>
                  </TiltCard>
                </RevealItem>
              ))}
            </StaggerContainer>
          </RevealItem>
        </div>
      </div>
    </section>
  );
}