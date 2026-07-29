import React, { useId, useState } from 'react';

/* ==========================================================================
   Service coverage map — Закарпатська та Івано-Франківська області.
   A stylised regional outline (not a survey-accurate boundary) with the towns
   the company actually works in, service radius rings and a hover readout.
   Pure inline SVG, no tiles or external map service.
   ========================================================================== */

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

// Positions are laid out to read like the region's shape — Закарпаття running
// south-west along the Carpathian arc, Прикарпаття to the north-east.
const CITIES = [
  { id: 'uzh', name: 'Ужгород', x: 92, y: 214, hub: true, note: 'Головний офіс' },
  { id: 'muk', name: 'Мукачево', x: 148, y: 196, note: '40 км · 45 хв' },
  { id: 'ber', name: 'Берегове', x: 158, y: 240, note: '72 км · 1 год' },
  { id: 'vyn', name: 'Виноградів', x: 214, y: 232, note: '92 км · 1.5 год' },
  { id: 'hus', name: 'Хуст', x: 226, y: 196, note: '105 км · 1.5 год' },
  { id: 'sva', name: 'Свалява', x: 190, y: 154, note: '58 км · 1 год' },
  { id: 'mzh', name: 'Міжгір’я', x: 268, y: 150, note: '140 км · 2 год' },
  { id: 'rah', name: 'Рахів', x: 330, y: 168, note: '196 км · 3 год' },
  { id: 'if', name: 'Івано-Франківськ', x: 404, y: 96, hub: true, note: 'Друга область' },
  { id: 'kal', name: 'Калуш', x: 366, y: 66, note: 'Прикарпаття' },
  { id: 'kol', name: 'Коломия', x: 448, y: 132, note: 'Прикарпаття' }
];

export default function CoverageMap({ theme, className = '' }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const [active, setActive] = useState('uzh');

  const activeCity = CITIES.find((c) => c.id === active) ?? CITIES[0];

  const land = isDark ? '#132a47' : '#dbe4ef';
  const landAlt = isDark ? '#0f2340' : '#cfdae9';
  const edge = isDark ? 'rgba(148,163,184,0.4)' : 'rgba(100,116,139,0.38)';
  const ridge = isDark ? 'rgba(148,163,184,0.28)' : 'rgba(100,116,139,0.26)';

  return (
    <div className={className}>
      <svg
        viewBox="0 0 520 300"
        className="w-full h-auto"
        role="img"
        aria-label="Карта покриття: Закарпатська та Івано-Франківська області"
      >
        <defs>
          <linearGradient id={`cm-sky-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={isDark ? '#0f2947' : '#eff6ff'} />
            <stop offset="100%" stopColor={isDark ? '#0a1c33' : '#f8fafc'} />
          </linearGradient>
          <radialGradient id={`cm-glow-${uid}`}>
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="520" height="300" rx="18" fill={`url(#cm-sky-${uid})`} />

        {/* Graticule */}
        <g stroke={isDark ? 'rgba(148,163,184,0.09)' : 'rgba(100,116,139,0.09)'} strokeWidth="1">
          {[60, 120, 180, 240].map((y) => (
            <line key={`h${y}`} x1="0" x2="520" y1={y} y2={y} />
          ))}
          {[100, 200, 300, 400].map((x) => (
            <line key={`v${x}`} x1={x} x2={x} y1="0" y2="300" />
          ))}
        </g>

        {/* Івано-Франківська область (north-east) */}
        <path
          d="M300 130 C318 92 348 44 396 34 C444 24 486 52 496 96 C504 132 480 168 444 182 C408 196 356 186 328 166 Z"
          fill={landAlt}
          stroke={edge}
          strokeWidth="1.8"
        />
        {/* Закарпатська область (south-west along the arc) */}
        <path
          d="M40 226 C48 186 92 150 152 138 C214 126 268 128 316 152 C352 170 352 206 320 226 C280 250 214 268 152 264 C96 260 44 254 40 226 Z"
          fill={land}
          stroke={edge}
          strokeWidth="1.8"
        />

        {/* Carpathian ridge hatching along the divide */}
        <g stroke={ridge} strokeWidth="1.6" strokeLinecap="round" fill="none">
          <path d="M120 168 L134 154 L148 168" />
          <path d="M172 148 L188 132 L204 148" />
          <path d="M232 142 L248 126 L264 142" />
          <path d="M292 152 L308 136 L324 152" />
          <path d="M338 132 L354 116 L370 132" />
        </g>

        {/* Service radius rings around the two hubs */}
        {CITIES.filter((c) => c.hub).map((hub) => (
          <g key={`ring-${hub.id}`}>
            {[38, 62, 86].map((r) => (
              <circle
                key={r}
                cx={hub.x}
                cy={hub.y}
                r={r}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="1"
                strokeDasharray="3 6"
                opacity={0.34 - (r - 38) / 400}
              />
            ))}
          </g>
        ))}

        {/* Link from the primary hub out to each town */}
        {CITIES.filter((c) => !c.hub).map((c) => (
          <line
            key={`link-${c.id}`}
            x1={92}
            y1={214}
            x2={c.x}
            y2={c.y}
            stroke={isDark ? 'rgba(251,191,36,0.2)' : 'rgba(180,118,9,0.2)'}
            strokeWidth="1"
          />
        ))}
        <line
          x1={92}
          y1={214}
          x2={404}
          y2={96}
          stroke="#fbbf24"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="energy-flow"
          opacity="0.8"
        />

        {/* Town pins */}
        {CITIES.map((c) => {
          const isActive = c.id === active;
          return (
            <g
              key={c.id}
              onMouseEnter={() => setActive(c.id)}
              onFocus={() => setActive(c.id)}
              tabIndex={0}
              role="button"
              aria-label={`${c.name} — ${c.note}`}
              style={{ cursor: 'pointer' }}
            >
              {(isActive || c.hub) && <circle cx={c.x} cy={c.y} r="26" fill={`url(#cm-glow-${uid})`} />}
              <circle
                cx={c.x}
                cy={c.y}
                r={c.hub ? 7 : 4.5}
                fill={isActive ? '#fde047' : c.hub ? '#f59e0b' : isDark ? '#334155' : '#94a3b8'}
                stroke={c.hub || isActive ? '#b45309' : edge}
                strokeWidth="2"
              />
              {c.hub && <circle cx={c.x} cy={c.y} r="3" fill={isDark ? '#0a1c33' : '#ffffff'} />}
              {/* Generous invisible hit area */}
              <circle cx={c.x} cy={c.y} r="16" fill="transparent" />
            </g>
          );
        })}

        {/* Region captions */}
        <text x={176} y={288} textAnchor="middle" fontSize="12" fontFamily={MONO} letterSpacing="1.5" fill={isDark ? '#64748b' : '#94a3b8'}>
          ЗАКАРПАТСЬКА
        </text>
        <text x={420} y={218} textAnchor="middle" fontSize="12" fontFamily={MONO} letterSpacing="1.5" fill={isDark ? '#64748b' : '#94a3b8'}>
          ІВАНО-ФРАНКІВСЬКА
        </text>
      </svg>

      {/* Readout for the focused town + the full list */}
      <div className="mt-4 space-y-3">
        <div className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 ${
          isDark ? 'border-amber-400/40 bg-amber-500/10' : 'border-amber-300 bg-amber-50'
        }`}>
          <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{activeCity.name}</span>
          <span className={`text-[10px] font-bold telemetry-label ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
            {activeCity.note}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {CITIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onMouseEnter={() => setActive(c.id)}
              onClick={() => setActive(c.id)}
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer ${
                c.id === active
                  ? 'border-amber-400 bg-amber-400/20 text-amber-500'
                  : isDark
                    ? 'border-slate-700 bg-slate-900/50 text-slate-300 hover:border-amber-400/50'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-amber-400'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
