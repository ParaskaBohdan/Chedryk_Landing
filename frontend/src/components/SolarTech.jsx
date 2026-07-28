import React, { useId } from 'react';
import useLiveValue from '../hooks/useLiveValue';

/* ==========================================================================
   Micro-technical telemetry primitives.
   Small, composable readouts (live badges, efficiency meters, tilt gauges,
   irradiance charts) used to scatter high-tech detail across the site.
   All visuals are inline SVG/CSS so they render without extra assets.
   ========================================================================== */

/** Pulsing "LIVE GRID ACTIVE" style status chip. */
export function LiveBadge({ label = 'Live Grid Active', theme, tone = 'emerald', className = '' }) {
  const isDark = theme === 'dark';
  const tones = {
    emerald: isDark
      ? 'border-emerald-400/40 bg-emerald-500/12 text-emerald-300'
      : 'border-emerald-300 bg-emerald-50 text-emerald-700',
    amber: isDark
      ? 'border-amber-400/40 bg-amber-500/12 text-amber-300'
      : 'border-amber-300 bg-amber-50 text-amber-800',
    sky: isDark
      ? 'border-sky-400/40 bg-sky-500/12 text-sky-300'
      : 'border-sky-300 bg-sky-50 text-sky-700'
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-[10px] font-bold telemetry-label ${tones[tone]} ${className}`}
    >
      <span className="live-dot relative w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
      <span>{label}</span>
    </span>
  );
}

/** Horizontal efficiency / load meter with a shimmering fill. */
export function EfficiencyMeter({
  label,
  value,
  unit = '%',
  max = 100,
  decimals = 1,
  theme,
  live = false,
  tone = 'amber'
}) {
  const isDark = theme === 'dark';
  const liveValue = useLiveValue(value, live ? 0.18 : 0);
  const shown = live ? liveValue : value;
  const pct = Math.max(0, Math.min(100, (shown / max) * 100));

  const fillTone =
    tone === 'emerald'
      ? 'from-emerald-400 to-teal-300'
      : tone === 'sky'
        ? 'from-sky-400 to-cyan-300'
        : 'from-amber-400 via-orange-400 to-yellow-300';

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className={`text-[10px] font-bold telemetry-label ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {label}
        </span>
        <span className={`text-xs font-black tabular-nums ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
          {shown.toFixed(decimals)}
          {unit}
        </span>
      </div>
      <div
        className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-slate-900/80' : 'bg-slate-200'}`}
      >
        <div
          className={`meter-fill h-full rounded-full bg-gradient-to-r ${fillTone} transition-[width] duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/** Half-dial gauge used for panel tilt / azimuth angles. */
export function TiltGauge({ angle = 35, maxAngle = 60, label = 'Tilt Angle', theme }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const fraction = Math.max(0, Math.min(1, angle / maxAngle));
  const rad = ((180 - 180 * fraction) * Math.PI) / 180;
  const cx = 60;
  const cy = 58;
  const r = 42;
  const px = cx + r * Math.cos(rad);
  const py = cy - r * Math.sin(rad);

  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 120 68" className="w-[92px] h-[52px] flex-shrink-0" role="img" aria-label={`${label}: ${angle}°`}>
        <defs>
          <linearGradient id={`tilt-${uid}`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="60%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fde047" />
          </linearGradient>
        </defs>
        <path
          d={`M${cx - r},${cy} A${r},${r} 0 0 1 ${cx + r},${cy}`}
          fill="none"
          stroke={isDark ? 'rgba(148,163,184,0.25)' : 'rgba(100,116,139,0.22)'}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d={`M${cx - r},${cy} A${r},${r} 0 0 1 ${px},${py}`}
          fill="none"
          stroke={`url(#tilt-${uid})`}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1={cx}
          y1={cy}
          x2={cx + (r - 10) * Math.cos(rad)}
          y2={cy - (r - 10) * Math.sin(rad)}
          stroke={isDark ? '#fde68a' : '#b45309'}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="4" fill={isDark ? '#fbbf24' : '#b45309'} />
      </svg>
      <div>
        <p className={`text-[10px] font-bold telemetry-label ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {label}
        </p>
        <p className={`text-lg font-black leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {angle}
          <span className="text-amber-500">°</span>
        </p>
      </div>
    </div>
  );
}

const IRRADIANCE_CURVE = [0, 4, 13, 29, 51, 72, 89, 97, 93, 79, 59, 37, 19, 7, 2];

const smoothPath = (pts) =>
  pts.reduce((d, p, i, all) => {
    if (i === 0) return `M${p.x},${p.y}`;
    const prev = all[i - 1];
    const midX = (prev.x + p.x) / 2;
    return `${d} C${midX},${prev.y} ${midX},${p.y} ${p.x},${p.y}`;
  }, '');

/** Daily solar radiation profile with an animated charge travelling the curve. */
export function IrradianceChart({ theme, peak = '1 042 Вт/м²', className = '' }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const width = 260;
  const height = 92;
  const baseline = 78;

  const points = IRRADIANCE_CURVE.map((v, i) => ({
    x: (i * width) / (IRRADIANCE_CURVE.length - 1),
    y: baseline - (v / 100) * 64
  }));

  const line = smoothPath(points);
  const area = `${line} L${width},${baseline} L0,${baseline} Z`;

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1.5">
        <span className={`text-[10px] font-bold telemetry-label ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Solar Irradiance · 24h
        </span>
        <span className={`text-[10px] font-black tabular-nums ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
          {peak}
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[72px]" role="img" aria-label="Графік сонячної радіації протягом доби">
        <defs>
          <linearGradient id={`irr-area-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id={`irr-line-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>

        {/* Grid rules */}
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1="0"
            x2={width}
            y1={baseline - g * 64}
            y2={baseline - g * 64}
            stroke={isDark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.14)'}
            strokeWidth="1"
            strokeDasharray="3 5"
          />
        ))}

        <path d={area} fill={`url(#irr-area-${uid})`} />
        <path d={line} fill="none" stroke={`url(#irr-line-${uid})`} strokeWidth="2" strokeLinecap="round" />
        <path d={line} fill="none" stroke="#fff8e1" strokeWidth="2.5" strokeLinecap="round" className="energy-flow" opacity="0.75" />

        <line
          x1="0"
          x2={width}
          y1={baseline}
          y2={baseline}
          stroke={isDark ? 'rgba(148,163,184,0.3)' : 'rgba(100,116,139,0.3)'}
          strokeWidth="1"
        />
        <circle cx={points[7].x} cy={points[7].y} r="3.5" fill="#fde047" stroke="#f59e0b" strokeWidth="1.5" />
      </svg>

      <div className={`flex justify-between text-[9px] telemetry-label ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
        <span>05:00</span>
        <span>12:00</span>
        <span>19:00</span>
      </div>
    </div>
  );
}

const MONTHS = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'];
const MONTHLY_YIELD = [44, 60, 94, 122, 145, 150, 154, 143, 109, 77, 46, 34];

/** Monthly specific yield (kWh per kW installed) for the region. */
export function MonthlyYieldChart({ theme, className = '' }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const max = Math.max(...MONTHLY_YIELD);
  const peak = MONTHLY_YIELD.indexOf(max);
  const total = MONTHLY_YIELD.reduce((a, b) => a + b, 0);

  const width = 560;
  const baseline = 112;
  const gap = 10;
  const barW = (width - gap * (MONTHLY_YIELD.length - 1)) / MONTHLY_YIELD.length;

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between mb-2">
        <span className={`text-[10px] font-bold telemetry-label ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Monthly Specific Yield · кВт·год/кВт
        </span>
        <span className={`text-[10px] font-black tabular-nums ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
          Σ {total} / рік
        </span>
      </div>

      {/* Bars scale with the container; month labels live in HTML below so they
          stay the same size whatever width the chart is rendered at. */}
      <svg
        viewBox={`0 0 ${width} 124`}
        className="w-full h-auto"
        role="img"
        aria-label={`Місячна генерація на кВт встановленої потужності, разом ${total} кВт·год за рік`}
      >
        <defs>
          <linearGradient id={`bar-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id={`bar-dim-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {[0.33, 0.66, 1].map((g) => (
          <line
            key={g}
            x1="0"
            x2={width}
            y1={baseline - g * 92}
            y2={baseline - g * 92}
            stroke={isDark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.14)'}
            strokeWidth="1"
            strokeDasharray="3 6"
          />
        ))}

        {MONTHLY_YIELD.map((v, i) => {
          const h = (v / max) * 92;
          const x = i * (barW + gap);
          return (
            <rect
              key={MONTHS[i]}
              x={x}
              y={baseline - h}
              width={barW}
              height={h}
              rx="4"
              fill={`url(#${i === peak ? `bar-${uid}` : `bar-dim-${uid}`})`}
            >
              <title>{`${MONTHS[i]}: ${v} кВт·год/кВт`}</title>
            </rect>
          );
        })}

        <line
          x1="0"
          x2={width}
          y1={baseline}
          y2={baseline}
          stroke={isDark ? 'rgba(148,163,184,0.3)' : 'rgba(100,116,139,0.28)'}
          strokeWidth="1.5"
        />
      </svg>

      <div className={`grid grid-cols-12 mt-1 text-[9px] telemetry-label ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
        {MONTHS.map((m, i) => (
          <span key={m} className={`text-center ${i === peak ? (isDark ? 'text-amber-300' : 'text-amber-700') : ''}`}>
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Compact labelled readout used in dense telemetry strips. */
export function TelemetryChip({ icon: Icon, label, value, theme, live = false }) {
  const isDark = theme === 'dark';
  return (
    <div
      className={`glass-deep rounded-xl px-3 py-2.5 flex items-center gap-2.5 transition-colors ${
        isDark ? 'hover:border-amber-400/40' : 'hover:border-amber-400/70'
      }`}
    >
      {Icon && (
        <span className="w-7 h-7 rounded-lg flex items-center justify-center border border-amber-400/40 bg-amber-500/15 text-amber-500 flex-shrink-0">
          <Icon className="w-3.5 h-3.5" />
        </span>
      )}
      <div className="min-w-0">
        <p className={`text-[9px] font-bold telemetry-label truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {label}
        </p>
        <p className={`text-xs font-black tabular-nums flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {value}
          {live && <span className="w-1 h-1 rounded-full bg-emerald-400 live-dot relative text-emerald-400" />}
        </p>
      </div>
    </div>
  );
}

/** Animated string diagram: panels feeding an inverter, then the grid. */
export function EnergyFlowStrip({ theme, className = '' }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const stroke = isDark ? 'rgba(148,163,184,0.35)' : 'rgba(100,116,139,0.35)';

  return (
    <svg viewBox="0 0 320 40" className={`w-full h-10 ${className}`} role="img" aria-label="Потік енергії: панелі → інвертор → мережа">
      <defs>
        <linearGradient id={`flow-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>

      {/* Panel node */}
      <g>
        <rect x="4" y="10" width="34" height="20" rx="4" fill="none" stroke={stroke} strokeWidth="1.5" />
        <line x1="15" y1="10" x2="15" y2="30" stroke={stroke} strokeWidth="1" />
        <line x1="27" y1="10" x2="27" y2="30" stroke={stroke} strokeWidth="1" />
        <line x1="4" y1="20" x2="38" y2="20" stroke={stroke} strokeWidth="1" />
      </g>

      {/* Inverter node */}
      <rect x="143" y="8" width="34" height="24" rx="6" fill="none" stroke={stroke} strokeWidth="1.5" />
      <circle cx="160" cy="20" r="4" fill="none" stroke="#fbbf24" strokeWidth="1.5" />

      {/* Grid node */}
      <g>
        <path d="M286 30 L294 10 L302 30" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="289" y1="22" x2="299" y2="22" stroke={stroke} strokeWidth="1.5" />
      </g>

      {/* Conductors with travelling charge */}
      <line x1="38" y1="20" x2="143" y2="20" stroke={stroke} strokeWidth="1.5" />
      <line x1="38" y1="20" x2="143" y2="20" stroke={`url(#flow-${uid})`} strokeWidth="2.5" className="energy-flow" strokeLinecap="round" />
      <line x1="177" y1="20" x2="286" y2="20" stroke={stroke} strokeWidth="1.5" />
      <line x1="177" y1="20" x2="286" y2="20" stroke={`url(#flow-${uid})`} strokeWidth="2.5" className="energy-flow" strokeLinecap="round" />
    </svg>
  );
}
