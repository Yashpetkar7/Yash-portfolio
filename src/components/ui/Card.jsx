export function Card({ children, className = '' }) {
  return <article className={`card-elevated rounded-lg p-5 ${className}`}>{children}</article>;
}
