import { featuredProjectData } from '../../data/portfolioData';

export function FeaturedProjectCard() {
  const { name, badge, description, tech, metrics, architecture, github } = featuredProjectData;

  return (
    <article className="relative p-[2px] overflow-hidden mb-8 md:mb-10 bg-gradient-to-r from-primary via-primary-dim to-primary-container bg-[length:220%_100%] animate-gradient-primary">
      <div className="absolute top-0 left-0 z-20 bg-primary text-on-primary font-mono text-[10px] sm:text-xs font-bold tracking-[0.18em] px-4 py-2">
        {badge}
      </div>

      <div className="bg-surface border border-outline-variant/30 p-5 md:p-8 lg:p-10 h-full">
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface uppercase leading-tight">
              {name}
            </h4>
            <p className="mt-4 text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-4xl">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tech.map((stackItem) => (
              <span
                key={stackItem}
                className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase bg-surface-container-high border border-outline-variant/30 px-2.5 py-1 text-primary"
              >
                {stackItem}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {metrics.map((metric) => (
              <div
                key={metric}
                className="status-box border-primary/20 bg-surface-container-low flex items-center justify-center text-center px-3 py-4"
              >
                <span className="font-mono text-[10px] sm:text-xs text-on-surface tracking-wide uppercase">{metric}</span>
              </div>
            ))}
          </div>

          <div className="border border-outline-variant/25 bg-surface-container-low px-4 py-3">
            <p className="font-mono text-[11px] sm:text-xs text-primary tracking-wide break-words">
              {architecture}
            </p>
          </div>

          <div className="pt-1">
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-button inline-flex items-center justify-center gap-2 font-mono text-[10px] sm:text-xs text-primary border border-primary px-4 py-3 hover:bg-primary hover:text-black transition-colors uppercase font-bold tracking-widest"
              >
                <span>VIEW CODE</span> &#x2197;
              </a>
            ) : (
              <div className="inline-flex items-center justify-center gap-2 font-mono text-[10px] sm:text-xs text-on-surface-variant/70 border border-white/10 rounded-full px-4 py-3 uppercase font-bold tracking-widest">
                PRIVATE REPO
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
