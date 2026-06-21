import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

export default function ScrambleText({ text, trigger = true, delay = 0, className = '', style = {} }) {
  const [display, setDisplay] = useState(text);
  const iteration = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    const timeout = setTimeout(() => {
      iteration.current = 0;
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setDisplay(
          text.split('').map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration.current) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join('')
        );
        iteration.current += 0.5;
        if (iteration.current >= text.length) clearInterval(intervalRef.current);
      }, 40);
    }, delay);
    return () => { clearTimeout(timeout); clearInterval(intervalRef.current); };
  }, [trigger, text, delay]);

  return <span className={className} style={style}>{display}</span>;
}
