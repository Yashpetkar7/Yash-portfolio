export function Card({ children, className = '' }) {
  return <article className={`bg-surface border border-outline-variant/20 p-5 ${className}`}>{children}</article>;
}
