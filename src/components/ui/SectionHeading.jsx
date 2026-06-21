export function SectionHeading({ eyebrow, title, accent, description, className = '' }) {
  return (
    <div className={className}>
      {eyebrow && (
        <span className="font-mono text-primary text-xs tracking-widest uppercase block mb-4">{eyebrow}</span>
      )}
      <h2 className="font-headline text-4xl sm:text-5xl lg:text-7xl font-black text-on-surface tracking-tighter leading-[0.9]">
        {title}
        {accent ? (
          <>
            <br />
            <span className="text-primary">{accent}</span>
          </>
        ) : null}
      </h2>
      {description && <p className="mt-4 text-base md:text-lg text-on-surface-variant font-label max-w-2xl">{description}</p>}
    </div>
  );
}
