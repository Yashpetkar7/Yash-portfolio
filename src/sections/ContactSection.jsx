import { contactContent, socialLinks, footerContent } from '../data/portfolioData';
import { RevealItem } from '../components/ui/StaggerReveal';
import { SectionTransitionLine } from '../components/ui/SectionTransitionLine';

function getSocialIconSrc(icon) {
  if (icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('data:') || icon.startsWith('/')) {
    return icon;
  }
  const baseIcon = icon.split('/')[0];
  const color = icon.split('/')[1];
  return color ? `https://cdn.simpleicons.org/${baseIcon}/${color}` : `https://cdn.simpleicons.org/${baseIcon}`;
}

export function ContactSection() {
  return (
    <section id="contact" className="relative bg-surface border-t border-outline-variant/20 overflow-hidden text-left">
      <SectionTransitionLine />
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#1f1f1f 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Side - Contact Info (Full width now) */}
          <RevealItem
            className="lg:col-span-12 flex flex-col justify-center max-w-2xl mx-auto text-center"
            threshold={0.2}
          >
            <h2 className="font-headline text-5xl md:text-7xl font-black text-on-surface tracking-tight mb-4 leading-none">
              {contactContent.title} <br className="hidden md:block"/>
              <span className="text-primary">{contactContent.accent}</span>
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-10 mx-auto">
              {contactContent.description}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
              <a
                href={`tel:${contactContent.phone}`}
                className="interactive-input group flex items-center justify-center gap-4 p-5 border border-outline-variant/20 hover:border-primary/50 bg-surface-container-low/30 min-w-[280px]"
              >
                <span className="material-symbols-outlined text-primary text-2xl">call</span>
                <span className="font-mono text-lg text-on-surface group-hover:text-primary">
                  {contactContent.phone}
                </span>
              </a>
              <a
                href={`mailto:${contactContent.email}`}
                className="interactive-input group flex items-center justify-center gap-4 p-5 border border-outline-variant/20 hover:border-primary/50 bg-surface-container-low/30 min-w-[280px]"
              >
                <span className="material-symbols-outlined text-primary text-2xl">mail</span>
                <span className="font-mono text-lg text-on-surface group-hover:text-primary break-all">
                  {contactContent.email}
                </span>
              </a>
            </div>
          </RevealItem>


        </div>

        {/* Bottom Footer Line */}
        <div className="mt-24 pt-8 border-t border-outline-variant/20 flex flex-col items-center gap-6 font-mono text-[11px] text-[#888]">
          <p>{footerContent.copyright}</p>
          
          {/* Social Icons Row */}
          <div className="flex gap-[20px] flex-wrap justify-center items-center pointer-events-auto">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300" title={social.label}>
                <img src={getSocialIconSrc(social.icon)} alt={social.label} width={22} height={22} style={{ objectFit: 'contain' }} />
              </a>
            ))}
          </div>

          <p>Built with React · Tailwind · Framer Motion · Three.js</p>
        </div>
      </div>
    </section>
  );
}
