import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Floating return-to-top control. The ring around it fills with scroll depth,
 * mirroring the header busbar, so it reads as a charge level rather than a
 * generic button. Appears only once there is meaningful scroll to undo.
 */
export default function ScrollToTopButton({ theme }) {
  const isDark = theme === 'dark';
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = null;
    const measure = () => {
      frame = null;
      const doc = document.documentElement;
      const travel = doc.scrollHeight - doc.clientHeight;
      const pct = travel > 0 ? Math.min(1, doc.scrollTop / travel) : 0;
      setProgress(pct);
      // A viewport-proportional threshold made this useless on shorter pages:
      // at 900px tall the button only appeared in the last ~50px of travel.
      setVisible(doc.scrollTop > 400);
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const r = 21;
  const circumference = 2 * Math.PI * r;

  return (
    <button
      type="button"
      aria-label="Повернутися нагору"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300 cursor-pointer ${
        isDark
          ? 'border-slate-700 bg-slate-900/85 text-amber-400 hover:border-amber-400/70'
          : 'border-slate-300 bg-white/90 text-amber-700 hover:border-amber-400 shadow-lg'
      } ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'}`}
    >
      {/* Charge ring */}
      <svg viewBox="0 0 48 48" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke={isDark ? 'rgba(148,163,184,0.2)' : 'rgba(100,116,139,0.18)'}
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          style={{ transition: 'stroke-dashoffset 120ms linear' }}
        />
      </svg>
      <ArrowUp className="w-5 h-5 relative" />
    </button>
  );
}
