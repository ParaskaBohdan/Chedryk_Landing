import React, { useId } from 'react';
import { SceneDefs, Sun } from './SolarSvgPrimitives';

/* ==========================================================================
   Analytics scenes — the data-visualisation counterpart to the service and
   engineer illustrations. Each one plots the figure its card is claiming:
   regional irradiance, payback crossover, 25-year degradation, inverter
   conversion efficiency. Pure inline SVG.
   ========================================================================== */

const ink = (isDark) => ({
  axis: isDark ? 'rgba(148,163,184,0.45)' : 'rgba(100,116,139,0.45)',
  hair: isDark ? 'rgba(148,163,184,0.22)' : 'rgba(100,116,139,0.22)',
  label: isDark ? '#94a3b8' : '#64748b'
});

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

function Scene({ label, children }) {
  return (
    <svg viewBox="0 -40 320 170" className="w-full h-auto" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/* Scenes render around 220px wide inside a four-up grid, i.e. ~0.7 scale, so
   these sizes are chosen to land near 8px on screen rather than in the viewBox. */
function Tick({ x, y, text, isDark, anchor = 'middle' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize="12" fontFamily={MONO} fill={ink(isDark).label} letterSpacing="0.5">
      {text}
    </text>
  );
}

/** Regional irradiance: sun beaming onto the Carpathian ridge line. */
export function InsolationScene({ theme }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = ink(isDark);

  const beams = [
    [64, 92],
    [104, 74],
    [142, 90],
    [178, 80],
    [212, 94]
  ];

  return (
    <Scene label="Карта інсоляції: сонячна радіація над Карпатським регіоном">
      <SceneDefs uid={uid} isDark={isDark} />
      <rect y="-40" width="320" height="170" rx="18" fill={`url(#${uid}-sky)`} />

      <Sun uid={uid} cx={252} cy={30} r={13} />

      {/* Irradiance beams reaching the terrain */}
      {beams.map(([x, y], i) => (
        <g key={i}>
          <line x1="252" y1="30" x2={x} y2={y} stroke="#fbbf24" strokeWidth="1.4" opacity={0.28} />
          {i % 2 === 0 && (
            <line x1="252" y1="30" x2={x} y2={y} stroke="#fde047" strokeWidth="2" strokeLinecap="round" className="energy-flow" opacity="0.8" />
          )}
        </g>
      ))}

      {/* Back ridge */}
      <path
        d="M0 96 L34 76 L62 90 L98 62 L134 88 L168 70 L206 94 L242 68 L278 88 L310 74 L320 86 L320 130 L0 130 Z"
        fill={isDark ? '#132a47' : '#dbe3ee'}
        opacity="0.75"
      />
      {/* Front ridge */}
      <path
        d="M0 110 L40 92 L74 106 L112 82 L150 104 L190 88 L228 108 L268 90 L304 106 L320 98 L320 130 L0 130 Z"
        fill={isDark ? '#0d1f36' : '#c7d3e2'}
      />

      {/* Site marker */}
      <g>
        <circle cx="122" cy="86" r="12" fill="#fbbf24" opacity="0.18" className="solar-flare" />
        <path d="M122 74 C128 74 132 79 132 84 C132 90 122 100 122 100 C122 100 112 90 112 84 C112 79 116 74 122 74 Z" fill="#f59e0b" />
        <circle cx="122" cy="84" r="4" fill={isDark ? '#0a1c33' : '#ffffff'} />
      </g>

      <Tick x={122} y={119} text="ЗАКАРПАТТЯ" isDark={isDark} />
      <Tick x={310} y={119} text="1250" isDark={isDark} anchor="end" />
      <Tick x={12} y={119} text="1150" isDark={isDark} anchor="start" />
      <line x1="8" y1="122" x2="312" y2="122" stroke={c.hair} strokeWidth="1" />
    </Scene>
  );
}

/** Cumulative cash flow crossing break-even between years 3.5 and 4.5. */
export function PaybackScene({ theme }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = ink(isDark);
  const zero = 62;
  const curve = 'M36 100 C88 98 128 84 168 62 C206 42 254 30 300 22';

  return (
    <Scene label="Крива окупності: накопичений грошовий потік перетинає нуль">
      <SceneDefs uid={uid} isDark={isDark} />
      <rect y="-40" width="320" height="170" rx="18" fill={`url(#${uid}-sky)`} />

      <defs>
        <linearGradient id={`${uid}-pos`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={`${uid}-neg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Investment recovery (below zero) and profit (above zero) */}
      <path d="M36 100 C88 98 128 84 168 62 L36 62 Z" fill={`url(#${uid}-neg)`} />
      <path d="M168 62 C206 42 254 30 300 22 L300 62 Z" fill={`url(#${uid}-pos)`} />

      {/* Break-even axis */}
      <line x1="30" y1={zero} x2="308" y2={zero} stroke={c.axis} strokeWidth="1.2" strokeDasharray="4 4" />
      <Tick x={36} y={zero - 5} text="0 ₴" isDark={isDark} anchor="start" />

      {/* Curve */}
      <path d={curve} fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
      <path d={curve} fill="none" stroke="#fff8e1" strokeWidth="2.5" strokeLinecap="round" className="energy-flow" opacity="0.7" />

      {/* Crossover marker */}
      <line x1="168" y1={zero} x2="168" y2="108" stroke="#34d399" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="168" cy={zero} r="5" fill="#34d399" stroke={isDark ? '#0a1c33' : '#ffffff'} strokeWidth="2" />
      <Tick x={168} y={123} text="3.5–4.5 Р" isDark={isDark} />

      {/* Time axis */}
      <line x1="30" y1="108" x2="308" y2="108" stroke={c.axis} strokeWidth="1.2" />
      {[36, 102, 234, 300].map((x) => (
        <line key={x} x1={x} y1="108" x2={x} y2="112" stroke={c.hair} strokeWidth="1.2" />
      ))}
      <Tick x={308} y={123} text="10 Р" isDark={isDark} anchor="end" />
      <Tick x={30} y={123} text="0" isDark={isDark} anchor="start" />
    </Scene>
  );
}

/** 25-year output warranty band with the real degradation curve above it. */
export function DegradationScene({ theme }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = ink(isDark);
  const actual = 'M36 30 C110 38 200 54 300 68';
  const warranty = 'M36 34 C110 52 200 78 300 96';

  return (
    <Scene label="Деградація фотомодулів протягом 25 років із гарантійним коридором">
      <SceneDefs uid={uid} isDark={isDark} />
      <rect y="-40" width="320" height="170" rx="18" fill={`url(#${uid}-sky)`} />

      <defs>
        <linearGradient id={`${uid}-band`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Guaranteed-vs-actual margin */}
      <path d={`${actual} L300 96 C200 78 110 52 36 34 Z`} fill={`url(#${uid}-band)`} />

      {/* Percentage rules */}
      {[30, 54, 78].map((y) => (
        <line key={y} x1="30" y1={y} x2="308" y2={y} stroke={c.hair} strokeWidth="1" strokeDasharray="3 5" />
      ))}
      <Tick x={36} y={24} text="100%" isDark={isDark} anchor="start" />
      <Tick x={36} y={72} text="85%" isDark={isDark} anchor="start" />

      <path d={warranty} fill="none" stroke={c.axis} strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" />
      <path d={actual} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="36" cy="30" r="4" fill="#38bdf8" />
      <circle cx="300" cy="68" r="4.5" fill="#38bdf8" stroke={isDark ? '#0a1c33' : '#ffffff'} strokeWidth="2" />

      <line x1="30" y1="106" x2="308" y2="106" stroke={c.axis} strokeWidth="1.2" />
      <Tick x={30} y={122} text="0 Р" isDark={isDark} anchor="start" />
      <Tick x={168} y={122} text="12 Р" isDark={isDark} />
      <Tick x={308} y={122} text="25 Р" isDark={isDark} anchor="end" />
    </Scene>
  );
}

/** Inverter conversion efficiency across the load range, with AC output. */
export function InverterEfficiencyScene({ theme }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = ink(isDark);
  const curve = 'M36 96 C54 48 76 34 112 30 C168 24 232 28 296 32';

  return (
    <Scene label="Крива ККД інвертора залежно від навантаження">
      <SceneDefs uid={uid} isDark={isDark} />
      <rect y="-40" width="320" height="170" rx="18" fill={`url(#${uid}-sky)`} />

      <defs>
        <linearGradient id={`${uid}-eff`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      <path d={`${curve} L296 96 L36 96 Z`} fill={`url(#${uid}-eff)`} />

      {[30, 52, 74].map((y) => (
        <line key={y} x1="30" y1={y} x2="308" y2={y} stroke={c.hair} strokeWidth="1" strokeDasharray="3 5" />
      ))}
      <Tick x={36} y={24} text="98.5%" isDark={isDark} anchor="start" />
      <Tick x={36} y={68} text="90%" isDark={isDark} anchor="start" />

      <path d={curve} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <path d={curve} fill="none" stroke="#fff8e1" strokeWidth="2.5" strokeLinecap="round" className="energy-flow" opacity="0.7" />

      {/* Operating point */}
      <line x1="188" y1="26" x2="188" y2="96" stroke="#34d399" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="188" cy="26" r="5" fill="#34d399" stroke={isDark ? '#0a1c33' : '#ffffff'} strokeWidth="2" />

      {/* DC in → AC out */}
      <line x1="30" y1="96" x2="308" y2="96" stroke={c.axis} strokeWidth="1.2" />
      <Tick x={30} y={122} text="DC IN" isDark={isDark} anchor="start" />
      <path
        d="M120 114 Q132 100 144 114 T168 114 T192 114"
        fill="none"
        stroke="#34d399"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <Tick x={308} y={122} text="AC 230V" isDark={isDark} anchor="end" />
    </Scene>
  );
}
