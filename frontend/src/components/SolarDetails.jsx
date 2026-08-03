import React from 'react';

/* ==========================================================================
   Fine-detail primitives shared across every page: section framing, dividers,
   engineering registration marks and eyebrow labels. Each one is theme-aware
   through the CSS in index.css rather than branching on `theme` here.
   ========================================================================== */

/**
 * Ambient backdrop for a page section: directional sky wash, tactile grain and
 * an optional pair of flares/beams. Sits behind content at z-0, so the section
 * needs `relative overflow-hidden` and its content a `relative z-10`.
 */
export function SectionAmbience({ flares = true, beams = true, variant = 'a' }) {
  const layouts = {
    a: {
      flare: ['-top-32 left-[8%]', 'bottom-[-60px] right-[6%]'],
      beam: ['-top-44 left-[26%]', '-top-36 right-[22%]']
    },
    b: {
      flare: ['-top-28 right-[10%]', 'bottom-[4%] left-[6%]'],
      beam: ['-top-40 right-[30%]', '-top-32 left-[16%]']
    },
    c: {
      flare: ['top-[10%] left-[42%]', '-bottom-24 right-[16%]'],
      beam: ['-top-44 left-[8%]', '-top-36 right-[12%]']
    }
  };
  const l = layouts[variant] ?? layouts.a;

  return (
    <>
      <span className="sky-wash" aria-hidden="true" />
      <span className="grain-layer" aria-hidden="true" />
      {flares && (
        <>
          <div className={`solar-flare w-[220px] sm:w-[400px] h-[220px] sm:h-[400px] ${l.flare[0]}`} aria-hidden="true" />
          <div
            className={`solar-flare w-[180px] sm:w-[300px] h-[180px] sm:h-[300px] ${l.flare[1]}`}
            style={{ animationDelay: '2.8s' }}
            aria-hidden="true"
          />
        </>
      )}
      {beams && (
        <>
          <div className={`solar-beam hidden sm:block w-[110px] h-[600px] ${l.beam[0]}`} aria-hidden="true" />
          <div
            className={`solar-beam hidden lg:block w-[70px] h-[500px] ${l.beam[1]}`}
            style={{ animationDelay: '4.4s' }}
            aria-hidden="true"
          />
        </>
      )}
    </>
  );
}

/** Engineering crop marks on the four corners of a feature panel. */
export function RegistrationMarks() {
  return (
    <span aria-hidden="true">
      <span className="reg-mark top-3 left-3 border-t border-l" />
      <span className="reg-mark top-3 right-3 border-t border-r" />
      <span className="reg-mark bottom-3 left-3 border-b border-l" />
      <span className="reg-mark bottom-3 right-3 border-b border-r" />
    </span>
  );
}

/** Busbar rule between major sections, with a node on the conductor. */
export function BusbarDivider({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center py-2 ${className}`} aria-hidden="true">
      <div className="busbar-divider" />
      <span className="absolute flex items-center justify-center">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]" />
      </span>
    </div>
  );
}

/** Small monospace eyebrow above a section heading. */
export function Eyebrow({ children, theme, icon: Icon, className = '' }) {
  const isDark = theme === 'dark';
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] sm:text-xs font-bold telemetry-label ${
        isDark
          ? 'bg-amber-500/12 border-amber-400/40 text-amber-300'
          : 'bg-amber-50 border-amber-300 text-amber-800'
      } ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 text-amber-500" />}
      <span>{children}</span>
    </div>
  );
}

/**
 * Standard section header: eyebrow, ruled heading and lead paragraph.
 * Keeps the rhythm identical across pages instead of each one re-inventing it.
 */
export function SectionHeader({ theme, eyebrow, eyebrowIcon, title, lead, className = '' }) {
  const isDark = theme === 'dark';
  return (
    <div className={`text-center max-w-3xl mx-auto space-y-4 ${className}`}>
      {eyebrow && (
        <Eyebrow theme={theme} icon={eyebrowIcon}>
          {eyebrow}
        </Eyebrow>
      )}
      {title && (
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          <span className="heading-rule">{title}</span>
        </h2>
      )}
      {lead && (
        <p className={`text-sm sm:text-lg pt-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{lead}</p>
      )}
    </div>
  );
}
