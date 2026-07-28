import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Gently oscillates a value around a baseline so telemetry readouts feel live.
 * Frozen at the baseline when the user asks for reduced motion.
 */
export default function useLiveValue(base, spread = 0.2, intervalMs = 2600) {
  const [value, setValue] = useState(base);
  const baseRef = useRef(base);
  baseRef.current = base;

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const id = setInterval(() => {
      setValue(baseRef.current + (Math.random() - 0.5) * 2 * spread);
    }, intervalMs);
    return () => clearInterval(id);
  }, [spread, intervalMs]);

  return value;
}
