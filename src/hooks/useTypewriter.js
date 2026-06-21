import { useEffect, useState } from 'react';

export function useTypewriter(text, speed = 50) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      index += 1;
      setDisplayText(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [speed, text]);

  return displayText;
}
