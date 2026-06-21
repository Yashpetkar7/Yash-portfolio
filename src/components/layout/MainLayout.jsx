import { Navbar } from './Navbar';

export function MainLayout({ children }) {
  return (
    <div className="w-full min-h-screen bg-surface">
      {/* Base gradient */}
      <div style={{
        position:'fixed', inset:0, zIndex:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(184,253,75,0.06) 0%, transparent 60%)',
      }} />

      {/* Dot grid */}
      <div style={{
        position:'fixed', inset:0, zIndex:0, pointerEvents:'none', opacity:0.35,
        backgroundImage:'radial-gradient(circle, #333 1px, transparent 1px)',
        backgroundSize:'28px 28px',
      }} />

      {/* Grain texture */}
      <div style={{
        position:'fixed', inset:0, zIndex:1, pointerEvents:'none', opacity:0.04,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat:'repeat',
        backgroundSize:'200px 200px',
      }} />

      {/* Vignette */}
      <div style={{
        position:'fixed', inset:0, zIndex:1, pointerEvents:'none',
        background:'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
      }} />

      <Navbar />

      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
