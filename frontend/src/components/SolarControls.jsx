import React, { useEffect, useRef, useState } from 'react';

/* ==========================================================================
   Control-surface primitives for the configurator: a busbar slider, an
   instrument-framed viewport, a wizard step rail and animated numerals.
   ========================================================================== */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Number that eases to its target instead of snapping, so readouts driven by
 * sliders feel like instruments settling. Honours reduced-motion.
 */
export function CountUp({ value: rawValue, decimals = 0, duration = 550, format }) {
  // Callers legitimately hand us numeric strings (a `.toFixed()` result, for
  // instance), so coerce rather than trusting the prop's type. Anything that
  // isn't finite is rendered verbatim instead of crashing the tree.
  const value = typeof rawValue === 'number' ? rawValue : Number(rawValue);
  const isNumeric = Number.isFinite(value);

  const [shown, setShown] = useState(isNumeric ? value : 0);
  // Tracks what is currently on screen. The animation always starts from this,
  // never from the incoming prop — under StrictMode the effect is invoked
  // twice, and advancing the origin in cleanup would make the second pass see
  // a zero delta and leave the readout permanently stale.
  const shownRef = useRef(value);
  const rafRef = useRef(null);
  const settleRef = useRef(null);

  useEffect(() => {
    // Derived here rather than taken as a dependency: it is a pure function of
    // `value`, so the deps stay [value, duration] and cannot change length.
    if (!Number.isFinite(value)) return undefined;

    const from = shownRef.current;
    const delta = value - from;
    if (Math.abs(delta) < 1e-9) return undefined;

    const snap = () => {
      shownRef.current = value;
      setShown(value);
    };

    // rAF is paused whenever the page isn't painting (hidden tab, backgrounded
    // window), so it can never be the only path to the correct number. Snap
    // outright when motion is unwanted or the page is hidden, and otherwise
    // keep a timer that guarantees the final value even if no frame ever runs.
    if (prefersReducedMotion() || (typeof document !== 'undefined' && document.hidden)) {
      snap();
      return undefined;
    }

    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const next = from + delta * (1 - (1 - t) ** 3);
      shownRef.current = next;
      setShown(next);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    settleRef.current = setTimeout(snap, duration + 80);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (settleRef.current) clearTimeout(settleRef.current);
    };
  }, [value, duration]);

  if (!isNumeric) return <>{rawValue}</>;

  const rounded = decimals > 0 ? Number(shown.toFixed(decimals)) : Math.round(shown);
  return <>{format ? format(rounded) : rounded.toLocaleString('uk-UA')}</>;
}

/** Range input styled as a busbar with a glowing gold thumb. */
export function SolarSlider({ value, min, max, step = 1, onChange, theme, label, display, hint, id }) {
  const isDark = theme === 'dark';
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2.5">
      {(label || display) && (
        <div className="flex justify-between items-baseline gap-3">
          {label && (
            <label htmlFor={id} className={`text-[10px] font-bold telemetry-label ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {label}
            </label>
          )}
          {display && <span className="text-lg font-extrabold text-amber-500 tabular-nums">{display}</span>}
        </div>
      )}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="solar-range"
        style={{ '--fill': `${pct}%` }}
      />
      {hint && <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{hint}</p>}
    </div>
  );
}

/**
 * Machined bezel around a live view: corner brackets, scanlines and a slow
 * sweep, so the 3D canvas reads as a monitor rather than a bare element.
 */
export function InstrumentFrame({ theme, children, className = '', label, status }) {
  const isDark = theme === 'dark';
  const bracket = 'instrument-corner border-amber-400/70';

  return (
    <div className={`relative rounded-2xl overflow-hidden border ${
      isDark ? 'border-slate-700/70 bg-slate-950' : 'border-slate-300 bg-slate-100'
    } ${className}`}>
      {children}

      <span className={`${bracket} top-2 left-2 border-t-2 border-l-2 rounded-tl-md`} aria-hidden="true" />
      <span className={`${bracket} top-2 right-2 border-t-2 border-r-2 rounded-tr-md`} aria-hidden="true" />
      <span className={`${bracket} bottom-2 left-2 border-b-2 border-l-2 rounded-bl-md`} aria-hidden="true" />
      <span className={`${bracket} bottom-2 right-2 border-b-2 border-r-2 rounded-br-md`} aria-hidden="true" />

      <span className="instrument-scanlines" aria-hidden="true" />
      <span className="instrument-sweep" aria-hidden="true" />

      {label && (
        <span className="absolute top-3 left-1/2 -translate-x-1/2 z-10 glass-deep rounded-md px-2 py-0.5 text-[9px] font-bold telemetry-label text-amber-300">
          {label}
        </span>
      )}
      {status && <span className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">{status}</span>}
    </div>
  );
}

/**
 * Wizard progress rail. Completed steps fill green, the active step pulses
 * amber, pending steps stay outlined — same language as the permit pipeline.
 */
export function StepRail({ steps, active, onSelect, theme }) {
  const isDark = theme === 'dark';

  return (
    <div className="relative">
      {/* Conductor behind the nodes */}
      <div className="absolute top-5 left-[10%] right-[10%] h-0.5 -z-0 hidden sm:block">
        <div className={`h-full w-full rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
        <div
          className="h-full rounded-full absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 to-amber-400 transition-[width] duration-500 ease-out"
          style={{ width: `${(active / Math.max(steps.length - 1, 1)) * 100}%` }}
        />
      </div>

      <div className="relative grid gap-2 sm:gap-4" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
        {steps.map((s, i) => {
          const Icon = s.icon;
          const done = i < active;
          const isActive = i === active;
          return (
            <button
              key={s.id ?? i}
              type="button"
              onClick={() => onSelect(i)}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <span
                className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'border-amber-400 bg-amber-400 text-slate-950 solar-halo scale-110'
                    : done
                      ? 'border-emerald-400 bg-emerald-400 text-slate-950'
                      : isDark
                        ? 'border-slate-600 bg-slate-900 text-slate-400 group-hover:border-amber-400/60'
                        : 'border-slate-300 bg-white text-slate-500 group-hover:border-amber-400'
                }`}
              >
                {Icon ? <Icon className="w-4 h-4" /> : <span className="text-xs font-black">{i + 1}</span>}
                {isActive && <span className="absolute inset-0 rounded-full border-2 border-amber-400 live-dot" />}
              </span>

              <span className="text-center leading-tight">
                <span className={`block text-[9px] font-bold telemetry-label ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`block text-[10px] sm:text-xs font-bold transition-colors ${
                    isActive
                      ? 'text-amber-500'
                      : done
                        ? isDark ? 'text-emerald-300' : 'text-emerald-700'
                        : isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {s.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
