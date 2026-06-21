import { useCallback, useMemo, useState } from 'react';

const WEBGL_PREFERENCE_KEY = 'portfolio-webgl-enabled';

function getCanUseWebGL() {
  if (typeof window === 'undefined') {
    return false;
  }

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const saveDataEnabled = typeof navigator !== 'undefined' && navigator.connection?.saveData;
  const lowMemory = typeof navigator !== 'undefined' && 'deviceMemory' in navigator && navigator.deviceMemory <= 4;
  const lowConcurrency = typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 6;

  return !(isMobile || isCoarsePointer || saveDataEnabled || lowMemory || lowConcurrency);
}

function getStoredPreference() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem(WEBGL_PREFERENCE_KEY) === '1';
}

export function useWebGLPreference() {
  const canUseWebGL = useMemo(() => getCanUseWebGL(), []);
  const [isEnabled, setIsEnabled] = useState(() => canUseWebGL && getStoredPreference());

  const setEnabled = useCallback(
    (nextValue) => {
      setIsEnabled((prevValue) => {
        const resolvedValue = typeof nextValue === 'function' ? nextValue(prevValue) : nextValue;
        const nextEnabled = Boolean(resolvedValue) && canUseWebGL;

        if (typeof window !== 'undefined') {
          if (nextEnabled) {
            window.localStorage.setItem(WEBGL_PREFERENCE_KEY, '1');
          } else {
            window.localStorage.removeItem(WEBGL_PREFERENCE_KEY);
          }
        }

        return nextEnabled;
      });
    },
    [canUseWebGL],
  );

  const toggleEnabled = useCallback(() => {
    setEnabled((prevValue) => !prevValue);
  }, [setEnabled]);

  return {
    canUseWebGL,
    isEnabled,
    setEnabled,
    toggleEnabled,
  };
}