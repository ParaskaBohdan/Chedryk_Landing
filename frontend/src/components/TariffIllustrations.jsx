import React, { useId } from 'react';
import { SceneDefs, Sun } from './SolarSvgPrimitives';

/* ==========================================================================
   Green-tariff scenes — bi-directional metering, generation split, quarterly
   settlement and the Обленерго permit pipeline. Pure inline SVG.
   Figures shown here are illustrative profiles, not quoted tariff rates.
   ========================================================================== */

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

const ink = (isDark) => ({
  stroke: isDark ? 'rgba(148,163,184,0.45)' : 'rgba(100,116,139,0.42)',
  hair: isDark ? 'rgba(148,163,184,0.24)' : 'rgba(100,116,139,0.24)',
  label: isDark ? '#94a3b8' : '#64748b'
});

function Label({ x, y, text, isDark, anchor = 'middle', tone, weight = '400' }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize="11"
      fontWeight={weight}
      fontFamily={MONO}
      letterSpacing="0.5"
      fill={tone || ink(isDark).label}
    >
      {text}
    </text>
  );
}

/** House and grid either side of a bi-directional meter, both flows animated. */
export function BiDirectionalMeterScene({ theme }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = ink(isDark);

  return (
    <svg viewBox="0 0 320 150" className="w-full h-auto" role="img" aria-label="Двонаправлений облік: віддача надлишків у мережу та споживання з мережі">
      <SceneDefs uid={uid} isDark={isDark} />
      <rect width="320" height="150" rx="18" fill={`url(#${uid}-sky)`} />

      <Sun uid={uid} cx={40} cy={24} r={10} />

      {/* Generating house */}
      <g>
        <rect x="16" y="78" width="66" height="42" rx="3" fill={`url(#${uid}-case)`} stroke={c.stroke} strokeWidth="1.8" />
        <path d="M8 80 L49 52 L90 80 Z" fill={isDark ? '#16243c' : '#e2e8f0'} stroke={c.stroke} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M20 74 L48 55 L58 60 L30 79 Z" fill={`url(#${uid}-panel)`} stroke={`url(#${uid}-metal)`} strokeWidth="1.4" strokeLinejoin="round" />
        <rect x="36" y="94" width="16" height="26" rx="2" fill={isDark ? '#0f2947' : '#cbd5e1'} />
        <rect x="60" y="90" width="14" height="12" rx="2" fill="#fbbf24" opacity="0.5" />
      </g>

      {/* Bi-directional meter */}
      <g>
        <rect x="118" y="46" width="84" height="62" rx="10" fill={`url(#${uid}-case)`} stroke={`url(#${uid}-metal)`} strokeWidth="2.5" />
        <rect x="128" y="56" width="64" height="22" rx="4" fill="#0b2545" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={134 + i * 11} y="62" width="7" height="10" rx="1.5" fill="#fde047" opacity={0.5 + i * 0.12} />
        ))}
        <circle cx="134" cy="94" r="3.5" fill="#34d399" />
        <circle cx="146" cy="94" r="3.5" fill="#fbbf24" />
        <Label x={182} y={98} text="kWh" isDark={isDark} anchor="end" />
      </g>

      {/* Transmission pylon */}
      <g stroke={c.stroke} fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M272 126 L282 62" />
        <path d="M306 126 L296 62" />
        <path d="M282 62 L296 62" />
        <path d="M276 100 L302 100 M279 84 L299 84" strokeWidth="1.2" />
        <path d="M270 72 L308 72" strokeWidth="1.6" />
      </g>
      <g fill="#fbbf24">
        <circle cx="274" cy="72" r="2.5" />
        <circle cx="289" cy="72" r="2.5" />
        <circle cx="304" cy="72" r="2.5" />
      </g>

      {/* Export: house → grid */}
      <g>
        <path d="M90 62 L118 62" stroke={c.hair} strokeWidth="2" strokeLinecap="round" />
        <path d="M202 62 L268 62" stroke={c.hair} strokeWidth="2" strokeLinecap="round" />
        <path d="M90 62 L118 62" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" className="energy-flow" />
        <path d="M202 62 L268 62" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" className="energy-flow" />
        <path d="M262 57 L268 62 L262 67" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Label x={160} y={38} text="ЕКСПОРТ →" isDark={isDark} tone="#34d399" weight="700" />

      {/* Import: grid → house */}
      <g>
        <path d="M268 122 L202 122" stroke={c.hair} strokeWidth="2" strokeLinecap="round" />
        <path d="M118 122 L90 122" stroke={c.hair} strokeWidth="2" strokeLinecap="round" />
        <path d="M268 122 L202 122" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" className="energy-flow" />
        <path d="M118 122 L90 122" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" className="energy-flow" />
        <path d="M96 117 L90 122 L96 127" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Label x={160} y={140} text="← ІМПОРТ" isDark={isDark} tone="#38bdf8" weight="700" />

      {/* Meter risers */}
      <line x1="160" y1="62" x2="160" y2="46" stroke={c.hair} strokeWidth="1.5" />
      <line x1="160" y1="108" x2="160" y2="122" stroke={c.hair} strokeWidth="1.5" />
    </svg>
  );
}

const polar = (cx, cy, r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];

const donutSegment = (cx, cy, R, r, a0, a1) => {
  const large = a1 - a0 > Math.PI ? 1 : 0;
  const [x0, y0] = polar(cx, cy, R, a0);
  const [x1, y1] = polar(cx, cy, R, a1);
  const [x2, y2] = polar(cx, cy, r, a1);
  const [x3, y3] = polar(cx, cy, r, a0);
  return `M${x0},${y0} A${R},${R} 0 ${large} 1 ${x1},${y1} L${x2},${y2} A${r},${r} 0 ${large} 0 ${x3},${y3} Z`;
};

/** Generation split between self-consumption and export to the grid. */
export function EnergySplitScene({ theme, exportShare = 0.65 }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = ink(isDark);

  const cx = 92;
  const cy = 78;
  const R = 46;
  const r = 29;
  const start = -Math.PI / 2;
  const split = start + Math.PI * 2 * exportShare;
  const end = start + Math.PI * 2;

  return (
    <svg viewBox="0 0 320 150" className="w-full h-auto" role="img" aria-label={`Розподіл генерації: ${Math.round(exportShare * 100)}% на продаж, решта на власне споживання`}>
      <SceneDefs uid={uid} isDark={isDark} />
      <rect width="320" height="150" rx="18" fill={`url(#${uid}-sky)`} />

      <defs>
        <linearGradient id={`${uid}-exp`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id={`${uid}-own`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      <path d={donutSegment(cx, cy, R, r, start, split)} fill={`url(#${uid}-exp)`} />
      <path d={donutSegment(cx, cy, R, r, split, end)} fill={`url(#${uid}-own)`} />
      <circle cx={cx} cy={cy} r={r - 3} fill={isDark ? '#0a1c33' : '#f8fafc'} />

      <text x={cx} y={cy + 2} textAnchor="middle" fontSize="20" fontWeight="800" fontFamily={MONO} fill={isDark ? '#ffffff' : '#0f172a'}>
        {Math.round(exportShare * 100)}%
      </text>
      <Label x={cx} y={cy + 16} text="ЕКСПОРТ" isDark={isDark} />

      {/* Legend */}
      <g>
        <rect x="172" y="52" width="12" height="12" rx="3" fill={`url(#${uid}-exp)`} />
        <Label x={192} y={62} text="Продаж у мережу" isDark={isDark} anchor="start" />
        <rect x="172" y="80" width="12" height="12" rx="3" fill={`url(#${uid}-own)`} />
        <Label x={192} y={90} text="Власне споживання" isDark={isDark} anchor="start" />
      </g>

      <line x1="172" y1="108" x2="304" y2="108" stroke={c.hair} strokeWidth="1" />
      <Label x={172} y={126} text="типовий профіль" isDark={isDark} anchor="start" />

      {/* Sunlight feeding the split */}
      <g opacity="0.85">
        <circle cx="34" cy="28" r="9" fill={`url(#${uid}-sun)`} />
        <line x1="40" y1="34" x2="58" y2="48" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" className="energy-flow" />
      </g>
    </svg>
  );
}

const QUARTER_EXPORT = [0.42, 0.94, 1, 0.5];
const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];

/** Quarterly export volume with a cumulative settlement curve. */
export function SettlementScene({ theme }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = ink(isDark);

  const baseline = 108;
  const maxH = 68;
  const barW = 40;
  const gap = 22;
  const x0 = 34;

  let running = 0;
  const total = QUARTER_EXPORT.reduce((a, b) => a + b, 0);
  const curve = QUARTER_EXPORT.map((v, i) => {
    running += v;
    return [x0 + barW / 2 + i * (barW + gap), baseline - (running / total) * maxH];
  });

  return (
    <svg viewBox="0 0 320 150" className="w-full h-auto" role="img" aria-label="Поквартальний обсяг віддачі та накопичений розрахунок">
      <SceneDefs uid={uid} isDark={isDark} />
      <rect width="320" height="150" rx="18" fill={`url(#${uid}-sky)`} />

      <defs>
        <linearGradient id={`${uid}-q`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {[0.33, 0.66, 1].map((g) => (
        <line
          key={g}
          x1="24"
          x2="300"
          y1={baseline - g * maxH}
          y2={baseline - g * maxH}
          stroke={c.hair}
          strokeWidth="1"
          strokeDasharray="3 6"
        />
      ))}

      {QUARTER_EXPORT.map((v, i) => (
        <g key={QUARTERS[i]}>
          <rect x={x0 + i * (barW + gap)} y={baseline - v * maxH} width={barW} height={v * maxH} rx="4" fill={`url(#${uid}-q)`} opacity={0.55 + v * 0.4} />
          <Label x={x0 + barW / 2 + i * (barW + gap)} y={126} text={QUARTERS[i]} isDark={isDark} />
        </g>
      ))}

      {/* Cumulative settlement */}
      <polyline
        points={curve.map((p) => p.join(',')).join(' ')}
        fill="none"
        stroke="#34d399"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points={curve.map((p) => p.join(',')).join(' ')}
        fill="none"
        stroke="#ecfdf5"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="energy-flow"
        opacity="0.7"
      />
      {curve.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="#34d399" stroke={isDark ? '#0a1c33' : '#ffffff'} strokeWidth="1.5" />
      ))}

      <line x1="24" y1={baseline} x2="300" y2={baseline} stroke={c.stroke} strokeWidth="1.2" />

      {/* EUR indexation marker */}
      <g>
        <circle cx="286" cy="30" r="15" fill="none" stroke="#34d399" strokeWidth="2" />
        <text x="286" y="36" textAnchor="middle" fontSize="17" fontWeight="800" fontFamily={MONO} fill="#34d399">
          €
        </text>
      </g>
      <Label x={264} y={34} text="індексація" isDark={isDark} anchor="end" />
    </svg>
  );
}

/** Обленерго permit pipeline. Stage captions live in HTML beneath the SVG. */
export function PermitPipelineScene({ theme, activeStage = 2, stages = 5 }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = ink(isDark);

  // Sized for the wide desktop panel it renders in (~900–1150px), so nodes and
  // numerals land near 1:1 instead of being scaled up. Hidden below lg, where
  // the HTML stage cards carry the same information stacked.
  const width = 1000;
  const cy = 40;
  const step = (width - 80) / (stages - 1);
  const nodes = Array.from({ length: stages }, (_, i) => 40 + i * step);

  return (
    <svg viewBox={`0 0 ${width} 80`} className="w-full h-auto" role="img" aria-label="Маршрут оформлення документів в Обленерго">
      <SceneDefs uid={uid} isDark={isDark} />

      {/* Conductor between stages */}
      <line x1={nodes[0]} y1={cy} x2={nodes[stages - 1]} y2={cy} stroke={c.hair} strokeWidth="3" strokeLinecap="round" />
      <line
        x1={nodes[0]}
        y1={cy}
        x2={nodes[activeStage]}
        y2={cy}
        stroke="#34d399"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1={nodes[activeStage]}
        y1={cy}
        x2={nodes[stages - 1]}
        y2={cy}
        stroke="#fbbf24"
        strokeWidth="3"
        strokeLinecap="round"
        className="energy-flow"
      />

      {nodes.map((x, i) => {
        const done = i < activeStage;
        const active = i === activeStage;
        const tone = done ? '#34d399' : active ? '#fbbf24' : c.stroke;
        return (
          <g key={x}>
            {active && <circle cx={x} cy={cy} r="20" fill="#fbbf24" opacity="0.16" className="solar-flare" />}
            <circle
              cx={x}
              cy={cy}
              r="13"
              fill={done || active ? tone : isDark ? '#0f2947' : '#ffffff'}
              stroke={tone}
              strokeWidth="2.5"
            />
            {done ? (
              <path
                d={`M${x - 5} ${cy} L${x - 1} ${cy + 4} L${x + 6} ${cy - 4}`}
                fill="none"
                stroke={isDark ? '#0a1c33' : '#ffffff'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <text
                x={x}
                y={cy + 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="800"
                fontFamily={MONO}
                fill={active ? (isDark ? '#0a1c33' : '#ffffff') : c.label}
              >
                {i + 1}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
