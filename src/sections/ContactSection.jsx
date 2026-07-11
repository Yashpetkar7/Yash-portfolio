import { contactContent, socialLinks, footerContent } from '../data/portfolioData';
import { RevealItem } from '../components/ui/StaggerReveal';
import { SectionTransitionLine } from '../components/ui/SectionTransitionLine';
import Magnetic from '../components/ui/Magnetic';

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
      <span aria-hidden="true" className="index-watermark">04</span>
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
            className="lg:col-span-12 flex flex-col justify-center max-w-3xl mx-auto text-center"
            threshold={0.2}
          >
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary mb-6">
              // NEXT_MOVE
            </p>
            <h2 className="font-headline text-6xl md:text-8xl font-black text-on-surface tracking-tighter mb-6 leading-[0.95] [text-wrap:balance]">
              {contactContent.title}{' '}
              <span className="text-primary">{contactContent.accent}</span>
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-12 mx-auto max-w-xl">
              {contactContent.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Magnetic strength={0.25}>
                <a
                  href={`mailto:${contactContent.email}`}
                  className="interactive-button group inline-flex items-center justify-center gap-3 rounded-full bg-primary text-black font-label text-sm font-bold tracking-widest uppercase px-10 py-5 hover:bg-primary-dim"
                >
                  <span className="material-symbols-outlined text-xl">mail</span>
                  {contactContent.email}
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={`tel:${contactContent.phone}`}
                  className="interactive-button group inline-flex items-center justify-center gap-3 rounded-full border border-outline-variant/50 text-on-surface font-label text-sm font-bold tracking-widest uppercase px-10 py-5 hover:border-primary hover:text-primary"
                >
                  <span className="material-symbols-outlined text-xl">call</span>
                  {contactContent.phone}
                </a>
              </Magnetic>
            </div>

            <p className="mt-10 font-mono text-[11px] tracking-[0.2em] uppercase text-on-surface-variant/60">
              {contactContent.location}
            </p>
          </RevealItem>


        </div>

        {/* Signature watermark */}
        <div aria-hidden="true" className="mt-28 -mb-6 flex justify-center overflow-hidden">
          <span className="outline-name">YASH PETKAR</span>
        </div>

        {/* Bottom Footer Line */}
        <div className="mt-8 pt-8 border-t border-outline-variant/20 flex flex-col items-center gap-6 font-mono text-[11px] text-[#888]">
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
