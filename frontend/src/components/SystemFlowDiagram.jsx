import React, { useId } from 'react';

/* ==========================================================================
   Single-line diagram of the configured station: array → inverter → battery
   → grid. Node count and captions come from the live configuration, so the
   drawing changes as the user configures. Captions live in HTML beneath the
   SVG so they stay legible at any container width.
   ========================================================================== */

export default function SystemFlowDiagram({
  theme,
  panelCount,
  totalKw,
  inverterPowerKw,
  hasBattery,
  batteryCapacityKwh,
  className = ''
}) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');

  const stroke = isDark ? 'rgba(148,163,184,0.4)' : 'rgba(100,116,139,0.38)';
  const bodyFill = isDark ? '#16243c' : '#f1f5f9';
  const metal = isDark ? '#94a3b8' : '#64748b';

  const nodes = [
    { key: 'array', caption: 'Масив', value: `${panelCount} шт · ${totalKw} кВт`, tone: 'text-amber-500' },
    { key: 'inverter', caption: 'Інвертор Deye', value: `${inverterPowerKw} кВт`, tone: 'text-sky-500' },
    ...(hasBattery
      ? [{ key: 'battery', caption: 'Накопичувач', value: `${batteryCapacityKwh} кВт·год`, tone: 'text-emerald-500' }]
      : []),
    { key: 'grid', caption: 'Будинок / Мережа', value: hasBattery ? 'з резервом' : 'мережева', tone: 'text-emerald-500' }
  ];

  const width = 560;
  const height = 72;
  const cy = 40;
  const n = nodes.length;
  const xs = nodes.map((_, i) => ((i + 0.5) / n) * width);

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        role="img"
        aria-label={`Схема станції: ${panelCount} панелей ${totalKw} кВт, інвертор ${inverterPowerKw} кВт${
          hasBattery ? `, акумулятор ${batteryCapacityKwh} кВт·год` : ''
        }, підключення до мережі`}
      >
        <defs>
          <linearGradient id={`flow-dc-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id={`flow-ac-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>

        {/* Conductors between consecutive nodes */}
        {xs.slice(0, -1).map((x, i) => {
          const x1 = x + 26;
          const x2 = xs[i + 1] - 26;
          const isDc = i === 0;
          return (
            <g key={i}>
              <line x1={x1} y1={cy} x2={x2} y2={cy} stroke={stroke} strokeWidth="2" strokeLinecap="round" />
              <line
                x1={x1}
                y1={cy}
                x2={x2}
                y2={cy}
                stroke={`url(#${isDc ? `flow-dc-${uid}` : `flow-ac-${uid}`})`}
                strokeWidth="2.5"
                strokeLinecap="round"
                className="energy-flow"
              />
              <text
                x={(x1 + x2) / 2}
                y={cy - 10}
                textAnchor="middle"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fill={isDark ? '#64748b' : '#94a3b8'}
              >
                {isDc ? 'DC' : 'AC'}
              </text>
            </g>
          );
        })}

        {nodes.map((node, i) => {
          const x = xs[i];
          if (node.key === 'array') {
            return (
              <g key={node.key}>
                <path
                  d={`M${x - 24} ${cy + 12} L${x - 4} ${cy - 12} L${x + 24} ${cy - 12} L${x + 4} ${cy + 12} Z`}
                  fill={isDark ? '#0b2545' : '#1c4e80'}
                  stroke={metal}
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <line x1={x - 14} y1={cy + 12} x2={x + 6} y2={cy - 12} stroke="rgba(148,197,255,0.4)" strokeWidth="1" />
                <line x1={x - 4} y1={cy + 12} x2={x + 16} y2={cy - 12} stroke="rgba(148,197,255,0.4)" strokeWidth="1" />
              </g>
            );
          }
          if (node.key === 'inverter') {
            return (
              <g key={node.key}>
                <rect x={x - 22} y={cy - 18} width="44" height="36" rx="7" fill={bodyFill} stroke={metal} strokeWidth="2" />
                <rect x={x - 14} y={cy - 11} width="28" height="12" rx="2.5" fill="#0b2545" />
                <circle cx={x - 8} cy={cy + 9} r="2.5" fill="#34d399" />
                <circle cx={x} cy={cy + 9} r="2.5" fill="#fbbf24" />
              </g>
            );
          }
          if (node.key === 'battery') {
            return (
              <g key={node.key}>
                <rect x={x - 20} y={cy - 20} width="40" height="40" rx="6" fill={bodyFill} stroke={metal} strokeWidth="2" />
                {[0, 1, 2].map((r) => (
                  <rect key={r} x={x - 13} y={cy - 13 + r * 10} width="26" height="6" rx="2" fill="#34d399" opacity={0.85 - r * 0.2} />
                ))}
              </g>
            );
          }
          return (
            <g key={node.key}>
              <path
                d={`M${x - 20} ${cy + 16} L${x} ${cy - 16} L${x + 20} ${cy + 16}`}
                fill="none"
                stroke={metal}
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <line x1={x - 12} y1={cy + 3} x2={x + 12} y2={cy + 3} stroke={metal} strokeWidth="2" />
              <line x1={x - 6} y1={cy + 16} x2={x + 6} y2={cy + 16} stroke={metal} strokeWidth="2" />
            </g>
          );
        })}
      </svg>

      <div className="grid mt-1" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {nodes.map((node) => (
          <div key={node.key} className="text-center px-1">
            <p className={`text-[9px] font-bold telemetry-label truncate ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {node.caption}
            </p>
            <p className={`text-[11px] font-black tabular-nums ${node.tone}`}>{node.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
