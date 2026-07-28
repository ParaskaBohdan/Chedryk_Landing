import React, { useId } from 'react';
import { SceneDefs, Sun } from './SolarSvgPrimitives';

/* ==========================================================================
   Engineer concept illustrations — pure inline SVG.
   Stylised field technicians installing, carrying and commissioning modules.
   Shared gradients/props come from SolarSvgPrimitives.
   ========================================================================== */

const SKIN = '#f0c19a';
const SKIN_SHADE = '#dba679';

/** Scene 1 — technician fastening a module onto a pitched roof. */
export function EngineerMountingPanel({ theme, className = '' }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 320 200"
      className={`w-full h-auto ${className}`}
      role="img"
      aria-label="Інженер закріплює сонячну панель на даху"
    >
      <SceneDefs uid={uid} isDark={isDark} />
      <rect width="320" height="200" rx="18" fill={`url(#${uid}-sky)`} />

      <Sun uid={uid} cx={272} cy={40} />

      {/* Roof plane */}
      <path
        d="M20 185 L140 132 L312 158 L196 205 Z"
        fill={isDark ? '#16243c' : '#e2e8f0'}
        stroke={isDark ? 'rgba(148,163,184,0.28)' : 'rgba(100,116,139,0.28)'}
        strokeWidth="1.5"
      />
      <path
        d="M20 185 L140 132"
        stroke={isDark ? 'rgba(148,163,184,0.4)' : 'rgba(100,116,139,0.35)'}
        strokeWidth="2"
      />

      {/* Mounting rails */}
      <path d="M112 166 L206 180" stroke={`url(#${uid}-metal)`} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M160 145 L254 159" stroke={`url(#${uid}-metal)`} strokeWidth="3" strokeLinecap="round" opacity="0.8" />

      {/* Module being fitted */}
      <g>
        <path d="M106 162 L156 140 L251 154 L200 177 Z" fill={`url(#${uid}-panel)`} />
        <path
          d="M106 162 L156 140 L251 154 L200 177 Z"
          fill="none"
          stroke={`url(#${uid}-metal)`}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <g stroke="rgba(148,197,255,0.35)" strokeWidth="1">
          <line x1="137" y1="167" x2="188" y2="145" />
          <line x1="169" y1="172" x2="219" y2="150" />
          <line x1="131" y1="151" x2="226" y2="166" />
        </g>
        <path d="M106 162 L156 140 L251 154 Z" fill="#ffffff" opacity="0.07" />
      </g>

      {/* Technician */}
      <g>
        <rect x="65" y="150" width="11" height="28" rx="5" fill="#0f2947" />
        <rect x="79" y="150" width="11" height="28" rx="5" fill="#16345a" />
        <rect x="61" y="173" width="17" height="8" rx="3.5" fill="#0b1a2e" />
        <rect x="76" y="173" width="17" height="8" rx="3.5" fill="#0b1a2e" />

        <rect x="60" y="110" width="32" height="46" rx="12" fill={`url(#${uid}-suit)`} />
        <rect x="60" y="128" width="32" height="5" fill="#fbbf24" opacity="0.9" />
        <rect x="60" y="138" width="32" height="2.5" fill="#fbbf24" opacity="0.55" />

        {/* Arms */}
        <path d="M90 118 L116 152" stroke={`url(#${uid}-suit)`} strokeWidth="9" strokeLinecap="round" />
        <circle cx="117" cy="154" r="5" fill={SKIN} />
        <path d="M62 118 L44 140" stroke={`url(#${uid}-suit)`} strokeWidth="9" strokeLinecap="round" />
        <circle cx="43" cy="142" r="5" fill={SKIN} />

        {/* Cordless driver in the free hand */}
        <g transform="rotate(-24 38 140)">
          <rect x="22" y="134" width="20" height="10" rx="3.5" fill="#334155" />
          <rect x="28" y="143" width="8" height="11" rx="2.5" fill="#1e293b" />
          <line x1="42" y1="139" x2="50" y2="139" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        <rect x="72" y="102" width="9" height="10" fill={SKIN_SHADE} />
        <circle cx="76" cy="94" r="12" fill={SKIN} />
        <path d="M64 92 A12 12 0 0 1 88 92 Z" fill={`url(#${uid}-helmet)`} />
        <rect x="59" y="90" width="34" height="4.5" rx="2.25" fill={`url(#${uid}-helmet)`} />
      </g>

      {/* Fastening spark */}
      <g opacity="0.95">
        <circle cx="118" cy="156" r="9" fill={`url(#${uid}-glow)`} />
        <path
          d="M118 149 L120 154 L125 156 L120 158 L118 163 L116 158 L111 156 L116 154 Z"
          fill="#fde047"
        />
      </g>
    </svg>
  );
}

/** Scene 2 — field engineer carrying a verified module. */
export function EngineerHoldingPanel({ theme, className = '' }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 320 200"
      className={`w-full h-auto ${className}`}
      role="img"
      aria-label="Інженер тримає сонячну панель після перевірки"
    >
      <SceneDefs uid={uid} isDark={isDark} />
      <rect width="320" height="200" rx="18" fill={`url(#${uid}-sky)`} />

      <Sun uid={uid} cx={44} cy={38} r={13} />

      {/* Module held at an angle */}
      <g>
        <path d="M142 46 L276 74 L262 144 L128 116 Z" fill={`url(#${uid}-panel)`} />
        <path
          d="M142 46 L276 74 L262 144 L128 116 Z"
          fill="none"
          stroke={`url(#${uid}-metal)`}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <g stroke="rgba(148,197,255,0.32)" strokeWidth="1">
          <line x1="187" y1="55" x2="173" y2="125" />
          <line x1="231" y1="65" x2="217" y2="135" />
          <line x1="135" y1="81" x2="269" y2="109" />
        </g>
        <path d="M142 46 L276 74 L269 109 L135 81 Z" fill="#ffffff" opacity="0.06" />
        {/* Junction box + leads */}
        <rect x="236" y="112" width="16" height="10" rx="2" fill="#1e293b" opacity="0.85" />
        <path d="M244 122 C246 132 252 134 258 130" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      {/* Technician */}
      <g>
        <rect x="66" y="140" width="12" height="38" rx="5.5" fill="#0f2947" />
        <rect x="81" y="140" width="12" height="38" rx="5.5" fill="#16345a" />
        <rect x="62" y="173" width="18" height="9" rx="4" fill="#0b1a2e" />
        <rect x="78" y="173" width="18" height="9" rx="4" fill="#0b1a2e" />

        <rect x="61" y="92" width="36" height="52" rx="13" fill={`url(#${uid}-suit)`} />
        <rect x="61" y="112" width="36" height="5.5" fill="#fbbf24" opacity="0.9" />
        <rect x="61" y="123" width="36" height="2.5" fill="#fbbf24" opacity="0.5" />

        {/* Both arms supporting the module */}
        <path d="M94 100 L131 86" stroke={`url(#${uid}-suit)`} strokeWidth="10" strokeLinecap="round" />
        <circle cx="133" cy="85" r="5.5" fill={SKIN} />
        <path d="M66 104 L122 118" stroke="#16345a" strokeWidth="10" strokeLinecap="round" />
        <circle cx="124" cy="118" r="5.5" fill={SKIN} />

        <rect x="74" y="84" width="10" height="10" fill={SKIN_SHADE} />
        <circle cx="79" cy="74" r="13" fill={SKIN} />
        <path d="M66 72 A13 13 0 0 1 92 72 Z" fill={`url(#${uid}-helmet)`} />
        <rect x="61" y="70" width="36" height="5" rx="2.5" fill={`url(#${uid}-helmet)`} />
      </g>

      {/* Verified stamp */}
      <g>
        <circle cx="112" cy="162" r="19" fill={isDark ? '#0b2545' : '#ffffff'} stroke="#34d399" strokeWidth="2.5" />
        <path
          d="M104 162 L110 168 L121 156"
          fill="none"
          stroke="#34d399"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/** Scene 3 — commissioning: engineer testing an inverter with a tablet. */
export function EngineerTestingInverter({ theme, className = '' }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 320 200"
      className={`w-full h-auto ${className}`}
      role="img"
      aria-label="Інженер тестує гібридний інвертор під навантаженням"
    >
      <SceneDefs uid={uid} isDark={isDark} />
      <rect width="320" height="200" rx="18" fill={`url(#${uid}-sky)`} />

      {/* Inverter cabinet */}
      <g>
        <rect
          x="196"
          y="38"
          width="98"
          height="128"
          rx="12"
          fill={isDark ? '#16243c' : '#f1f5f9'}
          stroke={`url(#${uid}-metal)`}
          strokeWidth="2.5"
        />
        <rect x="210" y="54" width="70" height="38" rx="6" fill={isDark ? '#08182c' : '#0f2947'} />
        {/* Readout bars */}
        <g fill="#fbbf24">
          <rect x="218" y="78" width="6" height="8" rx="1.5" />
          <rect x="228" y="72" width="6" height="14" rx="1.5" />
          <rect x="238" y="64" width="6" height="22" rx="1.5" />
          <rect x="248" y="69" width="6" height="17" rx="1.5" />
        </g>
        <rect x="258" y="60" width="16" height="3" rx="1.5" fill="#34d399" />
        <rect x="258" y="66" width="11" height="3" rx="1.5" fill="#34d399" opacity="0.6" />

        {/* Status LEDs */}
        <circle cx="216" cy="106" r="3.5" fill="#34d399" />
        <circle cx="228" cy="106" r="3.5" fill="#fbbf24" />
        <circle cx="240" cy="106" r="3.5" fill={isDark ? '#334155' : '#cbd5e1'} />

        {/* Ventilation */}
        <g stroke={isDark ? 'rgba(148,163,184,0.35)' : 'rgba(100,116,139,0.3)'} strokeWidth="2" strokeLinecap="round">
          <line x1="212" y1="122" x2="278" y2="122" />
          <line x1="212" y1="130" x2="278" y2="130" />
          <line x1="212" y1="138" x2="278" y2="138" />
        </g>

        {/* Conduits */}
        <path
          d="M214 166 C214 182 196 182 186 176"
          fill="none"
          stroke={isDark ? '#334155' : '#94a3b8'}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M262 166 C262 186 286 184 292 174"
          fill="none"
          stroke={isDark ? '#334155' : '#94a3b8'}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* Live link between tablet and inverter */}
      <path
        d="M150 108 C170 96 180 96 196 96"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="energy-flow"
      />

      {/* Technician with diagnostics tablet */}
      <g>
        <rect x="64" y="146" width="12" height="34" rx="5.5" fill="#0f2947" />
        <rect x="79" y="146" width="12" height="34" rx="5.5" fill="#16345a" />
        <rect x="60" y="175" width="18" height="9" rx="4" fill="#0b1a2e" />
        <rect x="76" y="175" width="18" height="9" rx="4" fill="#0b1a2e" />

        <rect x="59" y="98" width="36" height="52" rx="13" fill={`url(#${uid}-suit)`} />
        <rect x="59" y="118" width="36" height="5.5" fill="#fbbf24" opacity="0.9" />
        <rect x="59" y="129" width="36" height="2.5" fill="#fbbf24" opacity="0.5" />

        <path d="M92 108 L118 112" stroke={`url(#${uid}-suit)`} strokeWidth="9" strokeLinecap="round" />
        <path d="M64 110 L114 124" stroke="#16345a" strokeWidth="9" strokeLinecap="round" />

        <rect x="72" y="90" width="10" height="10" fill={SKIN_SHADE} />
        <circle cx="77" cy="80" r="13" fill={SKIN} />
        <path d="M64 78 A13 13 0 0 1 90 78 Z" fill={`url(#${uid}-helmet)`} />
        <rect x="59" y="76" width="36" height="5" rx="2.5" fill={`url(#${uid}-helmet)`} />

        {/* Tablet */}
        <g transform="rotate(-12 132 110)">
          <rect x="112" y="94" width="42" height="30" rx="4" fill="#0b2545" stroke={`url(#${uid}-metal)`} strokeWidth="2" />
          <rect x="117" y="100" width="20" height="3" rx="1.5" fill="#fbbf24" />
          <rect x="117" y="107" width="30" height="3" rx="1.5" fill="#34d399" opacity="0.8" />
          <rect x="117" y="114" width="14" height="3" rx="1.5" fill="#94a3b8" opacity="0.7" />
        </g>
        {/* Hands gripping the tablet, matched to where each arm ends */}
        <circle cx="119" cy="111" r="5" fill={SKIN} />
        <circle cx="115" cy="125" r="5" fill={SKIN} />
      </g>
    </svg>
  );
}
