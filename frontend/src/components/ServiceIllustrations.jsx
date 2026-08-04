import React, { useId } from 'react';
import { SceneDefs, Sun, TiltedModule } from './SolarSvgPrimitives';

/* ==========================================================================
   Service concept illustrations — pure inline SVG, one scene per offering.
   Same visual language as the engineer scenes: deep-blue silicon, anodised
   metal, gold light, and animated conductors for anything carrying current.
   ========================================================================== */

const frameProps = (isDark) => ({
  stroke: isDark ? 'rgba(148,163,184,0.45)' : 'rgba(100,116,139,0.4)',
  hair: isDark ? 'rgba(148,163,184,0.28)' : 'rgba(100,116,139,0.26)',
  ink: isDark ? '#cbd5e1' : '#475569',
  ground: isDark ? 'rgba(148,163,184,0.35)' : 'rgba(100,116,139,0.32)'
});

function Scene({ label, children, className }) {
  return (
    <svg viewBox="0 -40 320 190" className={`w-full h-auto ${className}`} role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/** Utility-scale array feeding a transmission pylon. */
export function SolarFarmScene({ theme, className = '' }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = frameProps(isDark);

  return (
    <Scene label="Сонячна електростанція: масив панелей та підключення до мережі" className={className}>
      <SceneDefs uid={uid} isDark={isDark} />
      <rect y="-40" width="320" height="190" rx="18" fill={`url(#${uid}-sky)`} />

      <Sun uid={uid} cx={46} cy={32} r={13} />

      {/* Terrain */}
      <line x1="8" y1="132" x2="312" y2="132" stroke={c.ground} strokeWidth="1.5" strokeDasharray="1 0" />
      <path d="M8 132 Q90 124 168 132 T312 132" fill="none" stroke={c.hair} strokeWidth="1" />

      {/* Tracker rows */}
      <TiltedModule uid={uid} x={26} y={112} w={46} rise={24} depth={16} drop={7} post={28} cells={3} />
      <TiltedModule uid={uid} x={104} y={112} w={46} rise={24} depth={16} drop={7} post={28} cells={3} />
      <TiltedModule uid={uid} x={182} y={112} w={46} rise={24} depth={16} drop={7} post={28} cells={3} />

      {/* Collector cable running to the pylon */}
      <path d="M60 130 L262 130" stroke={c.hair} strokeWidth="2" strokeLinecap="round" />
      <path d="M60 130 L262 130" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" className="energy-flow" />

      {/* Transmission pylon */}
      <g stroke={c.stroke} fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M262 132 L274 66" />
        <path d="M300 132 L288 66" />
        <path d="M274 66 L288 66" />
        <path d="M266 110 L296 110 M269 92 L293 92" strokeWidth="1.2" />
        <path d="M266 110 L293 92 M269 92 L296 110" strokeWidth="1" opacity="0.7" />
        <path d="M262 78 L300 78" strokeWidth="1.6" />
      </g>
      <g fill="#fbbf24">
        <circle cx="266" cy="78" r="2.5" />
        <circle cx="281" cy="78" r="2.5" />
        <circle cx="296" cy="78" r="2.5" />
      </g>
      <path d="M296 78 Q310 84 318 80" fill="none" stroke={c.hair} strokeWidth="1.4" />
      <path d="M266 78 Q250 86 240 82" fill="none" stroke={c.hair} strokeWidth="1.4" />
    </Scene>
  );
}

/** Interactive Solar Calculator & ROI estimation dashboard. */
export function CalculatorScene({ theme, className = '' }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = frameProps(isDark);

  return (
    <Scene label="Калькулятор СЕС: розрахунок вартості та окупності" className={className}>
      <SceneDefs uid={uid} isDark={isDark} />
      <rect y="-40" width="320" height="190" rx="18" fill={`url(#${uid}-sky)`} />

      <Sun uid={uid} cx={46} cy={32} r={13} />

      {/* Terrain */}
      <line x1="8" y1="132" x2="312" y2="132" stroke={c.ground} strokeWidth="1.5" />

      {/* House Silhouette with Solar Panels on the left */}
      <g stroke={c.stroke} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 132 L24 92 L64 62 L104 92 L104 132 Z" />
        <path d="M54 132 L54 104 L74 104 L74 132" />
        <rect x="32" y="98" width="14" height="14" rx="2" />
        {/* Solar panels on roof */}
        <path d="M68 72 L96 93" stroke="#fbbf24" strokeWidth="2.5" />
        <path d="M64 76 L92 97" stroke="#fbbf24" strokeWidth="2.5" />
      </g>

      {/* Financial Bar Chart / Payback Graph on the right */}
      <g stroke={c.stroke} strokeWidth="2" fill="none" strokeLinecap="round">
        {/* Graph Axes */}
        <path d="M148 132 L148 44" />
        <path d="M148 132 L290 132" />

        {/* Year 1 Bar */}
        <rect x="162" y="106" width="18" height="26" rx="3" fill="rgba(251, 191, 36, 0.15)" stroke={c.stroke} strokeWidth="1.5" />
        {/* Year 2 Bar */}
        <rect x="198" y="88" width="18" height="44" rx="3" fill="rgba(251, 191, 36, 0.35)" stroke={c.stroke} strokeWidth="1.5" />
        {/* Year 3 Bar */}
        <rect x="234" y="66" width="18" height="66" rx="3" fill="rgba(251, 191, 36, 0.65)" stroke={c.stroke} strokeWidth="1.5" />
        {/* Year 4 Bar (Payback complete!) */}
        <rect x="270" y="44" width="18" height="88" rx="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />

        {/* Animated flow payback trendline */}
        <path d="M152 128 Q180 115 208 92 T280 48" stroke={isDark ? 'rgba(245,158,11,0.5)' : 'rgba(217,119,6,0.4)'} strokeWidth="2.5" />
        <path d="M152 128 Q180 115 208 92 T280 48" stroke="#fbbf24" strokeWidth="3" className="energy-flow" />
      </g>

      {/* Floating Calculator badge */}
      <g transform="translate(132, -18)">
        <rect x="0" y="0" width="36" height="46" rx="6" fill={isDark ? '#1e293b' : '#ffffff'} stroke={c.stroke} strokeWidth="2" />
        <rect x="5" y="6" width="26" height="10" rx="2" fill={isDark ? '#0f172a' : '#f1f5f9'} stroke={c.stroke} strokeWidth="1" />
        <line x1="9" y1="11" x2="27" y2="11" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        <circle cx="10" cy="24" r="1.5" fill="#f59e0b" />
        <circle cx="18" cy="24" r="1.5" fill={c.ink} />
        <circle cx="26" cy="24" r="1.5" fill={c.ink} />
        <circle cx="10" cy="31" r="1.5" fill={c.ink} />
        <circle cx="18" cy="31" r="1.5" fill={c.ink} />
        <circle cx="26" cy="31" r="1.5" fill="#10b981" />
        <circle cx="10" cy="38" r="1.5" fill={c.ink} />
        <circle cx="18" cy="38" r="1.5" fill={c.ink} />
        <circle cx="26" cy="38" r="1.5" fill={c.ink} />
      </g>
    </Scene>
  );
}

/** Hybrid inverter wired to a LiFePO4 battery rack. */
export function HybridSystemScene({ theme, className = '' }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = frameProps(isDark);

  return (
    <Scene label="Гібридний інвертор Deye з акумуляторною стійкою" className={className}>
      <SceneDefs uid={uid} isDark={isDark} />
      <rect y="-40" width="320" height="190" rx="18" fill={`url(#${uid}-sky)`} />

      {/* Source module */}
      <TiltedModule uid={uid} x={14} y={122} w={34} rise={16} depth={11} drop={5} post={14} cells={2} />
      <path d="M46 116 Q64 108 72 86" fill="none" stroke={c.hair} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M46 116 Q64 108 72 86" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" className="energy-flow" />

      {/* Hybrid inverter */}
      <g>
        <rect x="74" y="24" width="70" height="84" rx="9" fill={`url(#${uid}-case)`} stroke={`url(#${uid}-metal)`} strokeWidth="2.5" />
        <rect x="84" y="34" width="50" height="28" rx="4" fill="#0b2545" />
        <g fill="#fbbf24">
          <rect x="91" y="50" width="5" height="7" rx="1.5" />
          <rect x="100" y="45" width="5" height="12" rx="1.5" />
          <rect x="109" y="40" width="5" height="17" rx="1.5" />
          <rect x="118" y="47" width="5" height="10" rx="1.5" />
        </g>
        <rect x="88" y="40" width="12" height="2.5" rx="1.25" fill="#34d399" opacity="0.85" />
        <g>
          <circle cx="88" cy="72" r="3.2" fill="#34d399" />
          <circle cx="99" cy="72" r="3.2" fill="#fbbf24" />
          <circle cx="110" cy="72" r="3.2" fill={isDark ? '#334155' : '#cbd5e1'} />
        </g>
        <g stroke={c.hair} strokeWidth="2" strokeLinecap="round">
          <line x1="84" y1="86" x2="134" y2="86" />
          <line x1="84" y1="94" x2="134" y2="94" />
          <line x1="84" y1="102" x2="134" y2="102" />
        </g>
      </g>

      {/* DC bus to the battery rack */}
      <path d="M144 66 L186 66" stroke={c.hair} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M144 66 L186 66" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" className="energy-flow" />

      {/* Battery rack */}
      <g>
        <rect x="186" y="26" width="98" height="94" rx="9" fill={`url(#${uid}-case)`} stroke={`url(#${uid}-metal)`} strokeWidth="2.5" />
        {[36, 62, 88].map((y, i) => (
          <g key={y}>
            <rect x="194" y={y} width="82" height="22" rx="4" fill={isDark ? '#0f2947' : '#e2e8f0'} stroke={c.hair} strokeWidth="1" />
            <rect x="200" y={y + 8} width={44 - i * 8} height="6" rx="3" fill="#34d399" opacity={0.9 - i * 0.15} />
            <circle cx="266" cy={y + 11} r="3" fill={i === 2 ? '#fbbf24' : '#34d399'} />
          </g>
        ))}
        <text
          x="235"
          y="114"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1"
          fill={c.ink}
          fontFamily="ui-monospace, monospace"
        >
          LiFePO4
        </text>
      </g>

      <line x1="8" y1="136" x2="312" y2="136" stroke={c.ground} strokeWidth="1.5" />
    </Scene>
  );
}

/** Modules clamped to a pitched roof, with a magnified bracket callout. */
export function RoofMountScene({ theme, className = '' }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = frameProps(isDark);

  return (
    <Scene label="Монтаж сонячних панелей на скатний дах із кріпленнями" className={className}>
      <SceneDefs uid={uid} isDark={isDark} />
      <rect y="-40" width="320" height="190" rx="18" fill={`url(#${uid}-sky)`} />

      <Sun uid={uid} cx={276} cy={32} r={12} />

      {/* House */}
      <rect x="70" y="84" width="152" height="52" rx="3" fill={`url(#${uid}-case)`} stroke={c.stroke} strokeWidth="2" />
      <path d="M56 86 L146 36 L236 86 Z" fill={isDark ? '#16243c' : '#e2e8f0'} stroke={c.stroke} strokeWidth="2" strokeLinejoin="round" />
      <rect x="196" y="46" width="14" height="24" rx="2" fill={isDark ? '#16243c' : '#cbd5e1'} stroke={c.stroke} strokeWidth="1.5" />

      {/* Windows & door */}
      <rect x="86" y="98" width="24" height="20" rx="2" fill="#fbbf24" opacity="0.45" stroke={c.hair} strokeWidth="1" />
      <rect x="182" y="98" width="24" height="20" rx="2" fill="#fbbf24" opacity="0.45" stroke={c.hair} strokeWidth="1" />
      <rect x="134" y="102" width="24" height="34" rx="2" fill={isDark ? '#0f2947' : '#cbd5e1'} stroke={c.hair} strokeWidth="1" />

      {/* Mounting rails on the slope */}
      <path d="M70 82 L142 42" stroke={`url(#${uid}-metal)`} strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <path d="M84 90 L156 50" stroke={`url(#${uid}-metal)`} strokeWidth="3" strokeLinecap="round" opacity="0.85" />

      {/* Module array clamped on top */}
      <g>
        <path d="M72 80 L144 40 L158 47 L86 87 Z" fill={`url(#${uid}-panel)`} stroke={`url(#${uid}-metal)`} strokeWidth="2" strokeLinejoin="round" />
        <g stroke="rgba(148,197,255,0.34)" strokeWidth="1">
          <line x1="90" y1="70" x2="104" y2="77" />
          <line x1="108" y1="60" x2="122" y2="67" />
          <line x1="126" y1="50" x2="140" y2="57" />
          <line x1="79" y1="83.5" x2="151" y2="43.5" />
        </g>
        <path d="M72 80 L144 40 L151 43.5 L79 83.5 Z" fill="#ffffff" opacity="0.07" />
      </g>

      {/* Magnified clamp detail */}
      <g>
        <line x1="150" y1="62" x2="248" y2="96" stroke={c.hair} strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="272" cy="106" r="30" fill={`url(#${uid}-case)`} stroke={`url(#${uid}-metal)`} strokeWidth="2" />
        <rect x="250" y="112" width="44" height="7" rx="2" fill={`url(#${uid}-metal)`} />
        <rect x="252" y="103" width="18" height="9" rx="2" fill={`url(#${uid}-panel)`} />
        <path d="M272 104 L284 104 L284 112 L272 112 Z" fill="#94a3b8" />
        <circle cx="278" cy="99" r="4" fill="none" stroke="#fbbf24" strokeWidth="2" />
        <line x1="278" y1="103" x2="278" y2="112" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      </g>

      <line x1="8" y1="136" x2="312" y2="136" stroke={c.ground} strokeWidth="1.5" />
    </Scene>
  );
}

/** Permit dossier with an official seal beside a bi-directional meter. */
export function PermitsScene({ theme, className = '' }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = frameProps(isDark);

  return (
    <Scene label="Документи, дозволи Обленерго та двонаправлений лічильник" className={className}>
      <SceneDefs uid={uid} isDark={isDark} />
      <rect y="-40" width="320" height="190" rx="18" fill={`url(#${uid}-sky)`} />

      {/* Dossier — back sheets */}
      <rect x="38" y="26" width="110" height="102" rx="6" fill={`url(#${uid}-case)`} stroke={c.hair} strokeWidth="1.5" opacity="0.6" transform="rotate(-5 93 77)" />
      <rect x="34" y="22" width="110" height="102" rx="6" fill={`url(#${uid}-case)`} stroke={`url(#${uid}-metal)`} strokeWidth="2" />

      {/* Header + body text */}
      <rect x="46" y="32" width="52" height="6" rx="3" fill="#fbbf24" />
      <g fill={c.hair}>
        <rect x="46" y="48" width="86" height="4" rx="2" />
        <rect x="46" y="58" width="72" height="4" rx="2" />
        <rect x="46" y="68" width="80" height="4" rx="2" />
        <rect x="46" y="78" width="58" height="4" rx="2" />
      </g>

      {/* Official seal */}
      <g>
        <circle cx="112" cy="100" r="20" fill="none" stroke="#34d399" strokeWidth="2.5" />
        <circle cx="112" cy="100" r="14" fill="none" stroke="#34d399" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M104 100 L110 106 L121 94" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Green-tariff leaf */}
      <g transform="translate(150 30)">
        <path d="M0 16 C0 6 8 0 18 0 C18 10 10 16 0 16 Z" fill="#34d399" opacity="0.85" />
        <path d="M2 15 L16 2" stroke={isDark ? '#0a1c33' : '#ffffff'} strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* Data link to the meter */}
      <path d="M148 92 L192 92" stroke={c.hair} strokeWidth="2" strokeLinecap="round" />
      <path d="M148 92 L192 92" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" className="energy-flow" />

      {/* Bi-directional meter */}
      <g>
        <rect x="192" y="44" width="98" height="72" rx="10" fill={`url(#${uid}-case)`} stroke={`url(#${uid}-metal)`} strokeWidth="2.5" />
        <rect x="202" y="54" width="78" height="24" rx="4" fill="#0b2545" />
        <g fill="#fde047">
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={209 + i * 14} y="61" width="9" height="11" rx="1.5" opacity={0.55 + i * 0.1} />
          ))}
        </g>
        {/* Import / export arrows */}
        <g strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M210 92 L238 92 M232 87 L238 92 L232 97" stroke="#fbbf24" />
          <path d="M272 104 L244 104 M250 99 L244 104 L250 109" stroke="#34d399" />
        </g>
        <circle cx="278" cy="92" r="3.5" fill="#34d399" />
      </g>
    </Scene>
  );
}

/** Distribution board: DIN rails, breakers, RCD and phase conductors. */
export function SwitchboardScene({ theme, className = '' }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = frameProps(isDark);
  const breakerFill = isDark ? '#1b2c47' : '#f8fafc';

  return (
    <Scene label="Розподільчий щит з автоматами, ПЗВ та заземленням" className={className}>
      <SceneDefs uid={uid} isDark={isDark} />
      <rect y="-40" width="320" height="190" rx="18" fill={`url(#${uid}-sky)`} />

      {/* Enclosure */}
      <rect x="52" y="16" width="200" height="112" rx="11" fill={`url(#${uid}-case)`} stroke={`url(#${uid}-metal)`} strokeWidth="2.5" />
      <rect x="62" y="26" width="180" height="92" rx="6" fill={isDark ? 'rgba(8,20,38,0.5)' : 'rgba(226,232,240,0.55)'} stroke={c.hair} strokeWidth="1" />

      {/* DIN rail 1 with breakers */}
      <rect x="70" y="46" width="164" height="6" rx="1.5" fill={`url(#${uid}-metal)`} opacity="0.9" />
      {[74, 100, 126, 152, 178, 204].map((x, i) => (
        <g key={x}>
          <rect x={x} y="36" width="20" height="28" rx="2.5" fill={breakerFill} stroke={c.stroke} strokeWidth="1.2" />
          <rect x={x + 6} y={i % 3 === 2 ? 54 : 40} width="8" height="9" rx="1.5" fill={i % 3 === 2 ? '#f87171' : '#fbbf24'} />
          <line x1={x + 4} y1="49" x2={x + 16} y2="49" stroke={c.hair} strokeWidth="1" />
        </g>
      ))}

      {/* DIN rail 2: RCD + voltage relay */}
      <rect x="70" y="92" width="164" height="6" rx="1.5" fill={`url(#${uid}-metal)`} opacity="0.9" />
      <g>
        <rect x="74" y="80" width="46" height="30" rx="2.5" fill={breakerFill} stroke={c.stroke} strokeWidth="1.2" />
        <rect x="82" y="86" width="12" height="9" rx="1.5" fill="#34d399" />
        <text x="104" y="94" textAnchor="middle" fontSize="8" fontWeight="700" fill={c.ink} fontFamily="ui-monospace, monospace">
          RCD
        </text>
        <line x1="78" y1="102" x2="116" y2="102" stroke={c.hair} strokeWidth="1" />
      </g>
      <g>
        <rect x="128" y="80" width="52" height="30" rx="2.5" fill={breakerFill} stroke={c.stroke} strokeWidth="1.2" />
        <rect x="134" y="85" width="40" height="14" rx="2" fill="#0b2545" />
        <text x="154" y="96" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fde047" fontFamily="ui-monospace, monospace">
          400V
        </text>
      </g>
      {[188, 210].map((x) => (
        <g key={x}>
          <rect x={x} y="80" width="20" height="30" rx="2.5" fill={breakerFill} stroke={c.stroke} strokeWidth="1.2" />
          <rect x={x + 6} y="86" width="8" height="9" rx="1.5" fill="#fbbf24" />
        </g>
      ))}

      {/* Phase conductors leaving the board */}
      <g fill="none" strokeWidth="3" strokeLinecap="round">
        <path d="M96 128 C96 142 76 140 62 144" stroke="#b45309" />
        <path d="M126 128 C126 144 106 144 92 148" stroke="#2563eb" opacity="0.8" />
        <path d="M156 128 C156 142 176 142 190 146" stroke="#84cc16" opacity="0.85" />
      </g>

      {/* Earthing symbol */}
      <g stroke="#84cc16" strokeWidth="2.5" strokeLinecap="round">
        <line x1="272" y1="86" x2="272" y2="100" />
        <line x1="260" y1="102" x2="284" y2="102" />
        <line x1="264" y1="108" x2="280" y2="108" />
        <line x1="268" y1="114" x2="276" y2="114" />
      </g>

      {/* Incoming feed */}
      <path d="M8 40 L52 40" stroke={c.hair} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M8 40 L52 40" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" className="energy-flow" />
    </Scene>
  );
}
