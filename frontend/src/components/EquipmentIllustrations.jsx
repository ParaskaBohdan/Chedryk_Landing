import React, { useId } from 'react';
import { SceneDefs, Sun } from './SolarSvgPrimitives';

/* ==========================================================================
   Equipment catalogue illustrations — pure inline SVG.
   These are parametric rather than one-off: a single module/battery/inverter
   scene is driven by props (cell layout, full-black finish, bifacial gain,
   stack style, MPPT and phase count) so every product in a tab renders as a
   visibly different piece of hardware from one implementation.
   ========================================================================== */

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

const ink = (isDark) => ({
  stroke: isDark ? 'rgba(148,163,184,0.45)' : 'rgba(100,116,139,0.42)',
  hair: isDark ? 'rgba(148,163,184,0.26)' : 'rgba(100,116,139,0.24)',
  label: isDark ? '#94a3b8' : '#64748b',
  panelBack: isDark ? '#0b1a2e' : '#cbd5e1'
});

function Scene({ label, shiftY = -40, height = 190, children }) {
  return (
    <svg viewBox={`0 ${shiftY} 320 ${height}`} className="w-full h-auto" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/* Rendered around 0.7–1.0 scale inside catalogue cards, so label sizes are
   picked to land near 8–10px on screen rather than in viewBox units. */
function Label({ x, y, text, isDark, anchor = 'middle', tone }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize="11" fontFamily={MONO} letterSpacing="0.5" fill={tone || ink(isDark).label}>
      {text}
    </text>
  );
}

/** Photovoltaic module, front view. Cell grid, finish and bifacial gain vary. */
export function PanelModuleScene({ theme, cols = 6, rows = 3, fullBlack = false, bifacial = false }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = ink(isDark);

  const gx = 54;
  const gy = 30;
  const gw = 212;
  const gh = 84;
  const pad = 3;
  const cellW = (gw - pad * (cols + 1)) / cols;
  const cellH = (gh - pad * (rows + 1)) / rows;

  const cellFill = fullBlack ? '#080d16' : `url(#${uid}-panel)`;
  const cellStroke = fullBlack ? 'rgba(148,163,184,0.14)' : 'rgba(148,197,255,0.2)';
  const frameFill = fullBlack ? '#1e293b' : `url(#${uid}-metal)`;

  const cells = [];
  for (let r = 0; r < rows; r += 1) {
    for (let i = 0; i < cols; i += 1) {
      cells.push({
        key: `${r}-${i}`,
        x: gx + pad + i * (cellW + pad),
        y: gy + pad + r * (cellH + pad)
      });
    }
  }

  return (
    <Scene label={`Фотомодуль: ${cols}×${rows} комірок${bifacial ? ', двосторонній' : ''}${fullBlack ? ', Full Black' : ''}`} shiftY={-40} height={190}>
      <SceneDefs uid={uid} isDark={isDark} />
      <rect x="0" y="-40" width="320" height="190" rx="18" fill={`url(#${uid}-sky)`} />

      <Sun uid={uid} cx={288} cy={-15} r={9} />

      {/* Depth plate behind the frame */}
      <rect x="54" y="30" width="220" height="94" rx="5" fill={c.panelBack} opacity="0.85" />

      {/* Anodised frame */}
      <rect x="48" y="24" width="220" height="96" rx="5" fill={frameFill} />
      <rect x={gx} y={gy} width={gw} height={gh} rx="2" fill={fullBlack ? '#05080f' : '#08182c'} />

      {/* Cells with busbars */}
      {cells.map((cell) => (
        <g key={cell.key}>
          <rect x={cell.x} y={cell.y} width={cellW} height={cellH} rx="1.5" fill={cellFill} stroke={cellStroke} strokeWidth="0.6" />
          <line
            x1={cell.x + cellW / 3}
            y1={cell.y}
            x2={cell.x + cellW / 3}
            y2={cell.y + cellH}
            stroke="rgba(226,232,240,0.28)"
            strokeWidth="0.7"
          />
          <line
            x1={cell.x + (cellW * 2) / 3}
            y1={cell.y}
            x2={cell.x + (cellW * 2) / 3}
            y2={cell.y + cellH}
            stroke="rgba(226,232,240,0.28)"
            strokeWidth="0.7"
          />
        </g>
      ))}

      {/* Glass reflection */}
      <path d={`M${gx} ${gy + gh} L${gx + 62} ${gy} L${gx + 96} ${gy} L${gx + 34} ${gy + gh} Z`} fill="#ffffff" opacity="0.07" />

      {/* Junction box + MC4 leads */}
      <rect x="140" y="120" width="34" height="9" rx="2" fill={fullBlack ? '#0f172a' : '#1e293b'} stroke={c.hair} strokeWidth="1" />
      <path d="M148 129 C146 138 138 140 130 137" fill="none" stroke={c.stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M166 129 C168 138 176 140 184 137" fill="none" stroke={c.stroke} strokeWidth="2" strokeLinecap="round" />

      {/* Bifacial rear gain */}
      {bifacial && (
        <g>
          <line x1="20" y1="140" x2="300" y2="140" stroke={c.hair} strokeWidth="1" strokeDasharray="4 4" />
          {[86, 130, 174, 218].map((x) => (
            <line key={x} x1={x} y1="138" x2={x + 10} y2="122" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" className="energy-flow" opacity="0.9" />
          ))}
          {/* <Label x={300} y={144} text="+15–20%" isDark={isDark} anchor="end" tone="#34d399" /> */}
        </g>
      )}

      {/* Cell layout callout */}
      <Label x={20} y={20} text={`${cols}×${rows}`} isDark={isDark} anchor="start" />
      {/* {fullBlack && <Label x={20} y={34} text="FULL BLACK" isDark={isDark} anchor="start" />} */}

      {/* Width dimension */}
      <g stroke={c.hair} strokeWidth="1">
        <line x1="48" y1="16" x2="268" y2="16" />
        <line x1="48" y1="12" x2="48" y2="20" />
        <line x1="268" y1="12" x2="268" y2="20" />
      </g>
    </Scene>
  );
}

/** Battery storage: 19" rack, stackable tower or portable power kit. */
export function BatteryStackScene({ theme, style = 'rack', modules = 4 }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = ink(isDark);
  const moduleFill = isDark ? '#0f2947' : '#e2e8f0';

  const Module = ({ x, y, w, h, level, warn }) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={moduleFill} stroke={c.hair} strokeWidth="1" />
      <rect x={x + 6} y={y + h / 2 - 3} width={(w - 34) * level} height="6" rx="3" fill={warn ? '#fbbf24' : '#34d399'} opacity="0.9" />
      <circle cx={x + w - 10} cy={y + h / 2} r="3" fill={warn ? '#fbbf24' : '#34d399'} />
    </g>
  );

  if (style === 'portable') {
    return (
      <Scene label="Портативна система накопичення Plug & Play з мобільним застосунком" shiftY={-20} height={170}>
        <SceneDefs uid={uid} isDark={isDark} />
        <rect x="0" y="-20" width="320" height="170" rx="18" fill={`url(#${uid}-sky)`} />

        {/* Carry handle */}
        <path d="M104 34 C104 20 168 20 168 34" fill="none" stroke={`url(#${uid}-metal)`} strokeWidth="6" strokeLinecap="round" />

        {/* Unit body */}
        <rect x="76" y="34" width="124" height="88" rx="12" fill={`url(#${uid}-case)`} stroke={`url(#${uid}-metal)`} strokeWidth="2.5" />
        <rect x="88" y="46" width="72" height="30" rx="4" fill="#0b2545" />
        <rect x="94" y="54" width="34" height="6" rx="3" fill="#34d399" />
        <rect x="94" y="64" width="22" height="4" rx="2" fill="#fbbf24" opacity="0.85" />
        <Label x={182} y={62} text="AC" isDark={isDark} anchor="end" />

        {/* Sockets */}
        {[96, 122, 148].map((x) => (
          <g key={x}>
            <circle cx={x} cy="98" r="9" fill={isDark ? '#0f2947' : '#e2e8f0'} stroke={c.hair} strokeWidth="1.5" />
            <circle cx={x - 3} cy="98" r="1.8" fill={c.stroke} />
            <circle cx={x + 3} cy="98" r="1.8" fill={c.stroke} />
          </g>
        ))}
        <rect x="168" y="90" width="20" height="16" rx="3" fill="#fbbf24" opacity="0.85" />

        {/* Companion app */}
        <g>
          <rect x="228" y="34" width="52" height="88" rx="10" fill={`url(#${uid}-case)`} stroke={`url(#${uid}-metal)`} strokeWidth="2" />
          <rect x="234" y="44" width="40" height="66" rx="4" fill="#0b2545" />
          <rect x="240" y="52" width="26" height="4" rx="2" fill="#fbbf24" />
          <g fill="#34d399">
            <rect x="240" y="76" width="5" height="14" rx="1.5" />
            <rect x="248" y="70" width="5" height="20" rx="1.5" />
            <rect x="256" y="64" width="5" height="26" rx="1.5" />
            <rect x="264" y="72" width="5" height="18" rx="1.5" />
          </g>
          <circle cx="254" cy="115" r="2.5" fill={c.hair} />
        </g>

        <path d="M200 78 L228 78" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" className="energy-flow" />
        <Label x={138} y={140} text="PLUG & PLAY" isDark={isDark} />
      </Scene>
    );
  }

  if (style === 'tower') {
    const h = 22;
    const gap = 4;
    const topY = 30;
    return (
      <Scene label="Стекова акумуляторна вежа з класом захисту IP65" shiftY={-20} height={170}>
        <SceneDefs uid={uid} isDark={isDark} />
        <rect x="0" y="-20" width="320" height="170" rx="18" fill={`url(#${uid}-sky)`} />

        {/* Base */}
        <rect x="108" y={topY + modules * (h + gap) + 4} width="104" height="14" rx="4" fill={`url(#${uid}-metal)`} />

        {/* Stacked modules, no external cabling */}
        {Array.from({ length: modules }).map((_, i) => (
          <Module
            key={i}
            x={112}
            y={topY + (modules - 1 - i) * (h + gap)}
            w={96}
            h={h}
            level={0.55 + i * 0.12}
            warn={i === modules - 1}
          />
        ))}

        {/* BMS cap */}
        <rect x="112" y={topY - 22} width="96" height="18" rx="4" fill={`url(#${uid}-case)`} stroke={`url(#${uid}-metal)`} strokeWidth="1.5" />
        <circle cx="126" cy={topY - 13} r="3" fill="#34d399" />
        <Label x={168} y={topY - 9} text="BMS" isDark={isDark} />

        {/* IP65 shield */}
        <g transform="translate(238 54)">
          <path d="M0 0 L20 -8 L40 0 L40 22 C40 38 20 46 20 46 C20 46 0 38 0 22 Z" fill="#38bdf8" opacity="0.16" stroke="#38bdf8" strokeWidth="2" />
          <text x="20" y="26" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily={MONO} fill="#38bdf8">
            IP65
          </text>
        </g>

        {/* Droplets deflected by the seal */}
        {[248, 262, 276].map((x, i) => (
          <circle key={x} cx={x} cy={26 + i * 6} r="2.5" fill="#38bdf8" opacity="0.5" />
        ))}
      </Scene>
    );
  }

  // 19" rack cabinet
  const h = 20;
  const gap = 6;
  const topY = 34;
  return (
    <Scene label={`Акумуляторна стійка 19 дюймів на ${modules} модулів`} shiftY={-20} height={170}>
      <SceneDefs uid={uid} isDark={isDark} />
      <rect x="0" y="-20" width="320" height="170" rx="18" fill={`url(#${uid}-sky)`} />

      {/* Cabinet */}
      <rect
        x="70"
        y="18"
        width="150"
        height={topY + modules * (h + gap) + 6 - 18}
        rx="8"
        fill={`url(#${uid}-case)`}
        stroke={`url(#${uid}-metal)`}
        strokeWidth="2.5"
      />

      {/* BMS controller */}
      <rect x="80" y="24" width="130" height="14" rx="3" fill={isDark ? '#08182c' : '#0f2947'} />
      <circle cx="90" cy="31" r="3" fill="#34d399" />
      <circle cx="100" cy="31" r="3" fill="#fbbf24" />
      <Label x={196} y={35} text="CAN/RS485" isDark={isDark} anchor="end" tone="#94a3b8" />

      {Array.from({ length: modules }).map((_, i) => (
        <Module key={i} x={80} y={topY + i * (h + gap) + 8} w={130} h={h} level={0.85 - i * 0.12} warn={i === modules - 1} />
      ))}

      {/* DC bus to the inverter */}
      <path d="M220 80 L262 80" stroke={c.hair} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M220 80 L262 80" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" className="energy-flow" />
      <rect x="262" y="58" width="36" height="46" rx="6" fill={`url(#${uid}-case)`} stroke={`url(#${uid}-metal)`} strokeWidth="2" />
      <circle cx="280" cy="81" r="6" fill="none" stroke="#fbbf24" strokeWidth="2" />
      <Label x={280} y={118} text="INV" isDark={isDark} />
    </Scene>
  );
}

/** Hybrid inverter with a variable number of MPPT inputs and output phases. */
export function InverterUnitScene({ theme, phases = 1, mppt = 2, commercial = false }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = ink(isDark);

  // Chassis height is fixed so the callout baselines below it always stay
  // inside the viewBox; commercial units read as larger via width and fin count.
  const bx = commercial ? 74 : 88;
  const bw = commercial ? 172 : 144;
  const by = 16;
  const bh = 96;
  const labelY = by + bh + 32;

  const inputs = Array.from({ length: Math.min(mppt, 6) }, (_, i) => bx + 16 + i * ((bw - 32) / Math.max(mppt - 1, 1)));

  // Fins are spread across the space actually available inside the chassis.
  const finCount = commercial ? 8 : 6;
  const finTop = by + 56;
  const finStep = (by + bh - 12 - finTop) / (finCount - 1);
  const phaseColors = ['#b45309', '#2563eb', '#84cc16'];

  return (
    <Scene label={`Гібридний інвертор: ${mppt} MPPT входів, ${phases}-фазний вихід`} shiftY={-20} height={170}>
      <SceneDefs uid={uid} isDark={isDark} />
      <rect x="0" y="-20" width="320" height="170" rx="18" fill={`url(#${uid}-sky)`} />

      {/* Wall bracket */}
      <rect x={bx - 8} y={by + 8} width="6" height={bh - 16} rx="3" fill={`url(#${uid}-metal)`} opacity="0.8" />
      <rect x={bx + bw + 2} y={by + 8} width="6" height={bh - 16} rx="3" fill={`url(#${uid}-metal)`} opacity="0.8" />

      {/* Chassis */}
      <rect x={bx} y={by} width={bw} height={bh} rx="10" fill={`url(#${uid}-case)`} stroke={`url(#${uid}-metal)`} strokeWidth="2.5" />

      {/* Display */}
      <rect x={bx + 14} y={by + 12} width={bw - 78} height="32" rx="4" fill="#0b2545" />
      <g fill="#fbbf24">
        <rect x={bx + 22} y={by + 32} width="5" height="8" rx="1.5" />
        <rect x={bx + 31} y={by + 26} width="5" height="14" rx="1.5" />
        <rect x={bx + 40} y={by + 20} width="5" height="20" rx="1.5" />
        <rect x={bx + 49} y={by + 28} width="5" height="12" rx="1.5" />
      </g>
      <rect x={bx + 60} y={by + 18} width="16" height="3" rx="1.5" fill="#34d399" />

      {/* Status LEDs */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={bx + bw - 46 + i * 13}
          cy={by + 20}
          r="3.5"
          fill={i === 0 ? '#34d399' : i === 1 ? '#fbbf24' : isDark ? '#334155' : '#cbd5e1'}
        />
      ))}

      {/* Heat sink */}
      <g stroke={c.hair} strokeWidth="2" strokeLinecap="round">
        {Array.from({ length: finCount }).map((_, i) => (
          <line key={i} x1={bx + 14} y1={finTop + i * finStep} x2={bx + bw - 14} y2={finTop + i * finStep} />
        ))}
      </g>

      {/* DC strings in */}
      {inputs.map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={by + bh} r="3.5" fill={isDark ? '#334155' : '#94a3b8'} />
          <path d={`M${x} ${by + bh} L${x - 6} ${by + bh + 20}`} stroke={c.hair} strokeWidth="2" strokeLinecap="round" />
          <path d={`M${x} ${by + bh} L${x - 6} ${by + bh + 20}`} stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" className="energy-flow" />
        </g>
      ))}
      <Label x={bx + 4} y={labelY} text={`${mppt}× MPPT`} isDark={isDark} anchor="start" />

      {/* AC phases out */}
      {Array.from({ length: phases }).map((_, i) => (
        <path
          key={i}
          d={`M${bx + bw - 20 + i * 7} ${by + bh} C${bx + bw + 10} ${by + bh + 12} ${bx + bw + 24} ${by + bh + 8} ${bx + bw + 40} ${by + bh + 14 + i * 5}`}
          fill="none"
          stroke={phaseColors[i]}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.9"
        />
      ))}
      <Label x={314} y={labelY} text={phases === 1 ? '1Ф · 230 В' : '3Ф · 400 В'} isDark={isDark} anchor="end" />

      {/* AC waveform */}
      <path
        d="M18 118 Q28 104 38 118 T58 118 T78 118"
        fill="none"
        stroke="#34d399"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
    </Scene>
  );
}

/** Rail, hanger bolt, EPDM seal and mid-clamp on a profiled roof sheet. */
export function MountingHardwareScene({ theme }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = ink(isDark);

  return (
    <Scene label="Кріплення: шпилька М10 з ЕПДМ-ущільнювачем, кронштейн та затискач" shiftY={-40} height={190}>
      <SceneDefs uid={uid} isDark={isDark} />
      <rect x="0" y="-40" width="320" height="190" rx="18" fill={`url(#${uid}-sky)`} />

      {/* Profiled roof sheet */}
      <path
        d="M12 118 L34 100 L56 118 L78 100 L100 118 L122 100 L144 118 L166 100 L188 118 L210 100 L232 118 L254 100 L276 118 L298 100 L308 108 L308 138 L12 138 Z"
        fill={isDark ? '#16243c' : '#dbe3ee'}
        stroke={c.stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Hanger bolts through the ridges, with EPDM seals */}
      {[122, 210].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="99" rx="11" ry="4" fill="#0f172a" opacity={isDark ? 0.55 : 0.25} />
          <rect x={x - 3} y="62" width="6" height="38" rx="2" fill={`url(#${uid}-metal)`} />
          <rect x={x - 8} y="58" width="16" height="7" rx="2" fill="#94a3b8" />
        </g>
      ))}

      {/* L-brackets and rail */}
      <rect x="108" y="52" width="118" height="10" rx="3" fill={`url(#${uid}-metal)`} />
      <rect x="108" y="52" width="118" height="3" rx="1.5" fill="#ffffff" opacity="0.35" />

      {/* Mid-clamp holding two module edges */}
      <g>
        <rect x="152" y="34" width="30" height="8" rx="2" fill={`url(#${uid}-panel)`} stroke={c.hair} strokeWidth="1" />
        <rect x="112" y="36" width="38" height="6" rx="2" fill={`url(#${uid}-panel)`} stroke={c.hair} strokeWidth="1" />
        <rect x="184" y="36" width="38" height="6" rx="2" fill={`url(#${uid}-panel)`} stroke={c.hair} strokeWidth="1" />
        <path d="M160 30 L174 30 L174 52 L160 52 Z" fill="#94a3b8" />
        <circle cx="167" cy="26" r="5" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
        <line x1="167" y1="30" x2="167" y2="52" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      <Label x={12} y={26} text="AISI 304 · M10" isDark={isDark} anchor="start" />
      <Label x={308} y={26} text="АД31 Т5" isDark={isDark} anchor="end" />
      <Label x={122} y={132} text="EPDM" isDark={isDark} />
    </Scene>
  );
}

/** Solar cable cut-away: tinned copper core, double insulation, MC4 pair. */
export function SolarCableScene({ theme }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = ink(isDark);

  const strands = [];
  for (let ring = 0; ring < 2; ring += 1) {
    const count = ring === 0 ? 6 : 10;
    const r = ring === 0 ? 6 : 12;
    for (let i = 0; i < count; i += 1) {
      const a = (i / count) * Math.PI * 2 + ring;
      strands.push({ key: `${ring}-${i}`, x: 78 + Math.cos(a) * r, y: 74 + Math.sin(a) * r });
    }
  }

  return (
    <Scene label="Двожильний сонячний кабель у розрізі з обтиснутим конектором MC4" shiftY={-40} height={190}>
      <SceneDefs uid={uid} isDark={isDark} />
      <rect x="0" y="-40" width="320" height="190" rx="18" fill={`url(#${uid}-sky)`} />

      {/* Cable run */}
      <path d="M132 74 C176 74 190 40 232 40" fill="none" stroke={isDark ? '#0f172a' : '#334155'} strokeWidth="14" strokeLinecap="round" />
      <path d="M132 74 C176 74 190 40 232 40" fill="none" stroke="#1e293b" strokeWidth="9" strokeLinecap="round" />
      <path d="M132 74 C176 74 190 40 232 40" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" className="energy-flow" opacity="0.85" />

      {/* Cut-away cross-section */}
      <circle cx="78" cy="74" r="34" fill={isDark ? '#0a1c33' : '#f1f5f9'} stroke={`url(#${uid}-metal)`} strokeWidth="2" />
      <circle cx="78" cy="74" r="28" fill="#0f172a" />
      <circle cx="78" cy="74" r="21" fill="#1e293b" />
      {strands.map((s) => (
        <circle key={s.key} cx={s.x} cy={s.y} r="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.6" />
      ))}
      <circle cx="78" cy="74" r="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.6" />

      {/* MC4 connector pair */}
      <g>
        <rect x="232" y="30" width="34" height="20" rx="6" fill={isDark ? '#111f36' : '#e2e8f0'} stroke={c.stroke} strokeWidth="1.5" />
        <rect x="266" y="35" width="14" height="10" rx="3" fill="#94a3b8" />
        <rect x="280" y="30" width="28" height="20" rx="6" fill={isDark ? '#111f36' : '#e2e8f0'} stroke={c.stroke} strokeWidth="1.5" />
        <Label x={270} y={66} text="MC4 · IP68" isDark={isDark} />
      </g>

      {/* Layer callouts */}
      <g stroke={c.hair} strokeWidth="1">
        <line x1="78" y1="40" x2="78" y2="24" />
        <line x1="104" y1="92" x2="126" y2="106" />
      </g>
      <Label x={78} y={20} text="Cu · луджена" isDark={isDark} />
      <Label x={130} y={112} text="XLPE ×2" isDark={isDark} anchor="start" />
      <Label x={16} y={136} text="−40…+90 °C" isDark={isDark} anchor="start" />
      <Label x={306} y={136} text="6 мм² · 1.5 кВ" isDark={isDark} anchor="end" />
    </Scene>
  );
}

/** IP65 protection enclosure: SPD, DC fuses, breakers and an earth path. */
export function ProtectionBoxScene({ theme }) {
  const isDark = theme === 'dark';
  const uid = useId().replace(/:/g, '');
  const c = ink(isDark);
  const deviceFill = isDark ? '#1b2c47' : '#f8fafc';

  return (
    <Scene label="Типове металеве кріплення для похилого даху із затискачами" shiftY={-40} height={190}>
      <SceneDefs uid={uid} isDark={isDark} />
      <rect x="0" y="-40" width="320" height="190" rx="18" fill={`url(#${uid}-sky)`} />

      {/* Open door */}
      <path d="M60 26 L28 40 L28 122 L60 132 Z" fill={isDark ? '#16243c' : '#e2e8f0'} stroke={`url(#${uid}-metal)`} strokeWidth="2" strokeLinejoin="round" />
      <path d="M34 46 L34 116" stroke={c.hair} strokeWidth="2" strokeLinecap="round" />

      {/* Enclosure */}
      <rect x="60" y="22" width="176" height="112" rx="9" fill={`url(#${uid}-case)`} stroke={`url(#${uid}-metal)`} strokeWidth="2.5" />
      <rect x="70" y="52" width="156" height="5" rx="1.5" fill={`url(#${uid}-metal)`} opacity="0.9" />
      <rect x="70" y="100" width="156" height="5" rx="1.5" fill={`url(#${uid}-metal)`} opacity="0.9" />

      {/* SPD class II modules */}
      {[74, 96, 118].map((x) => (
        <g key={x}>
          <rect x={x} y="34" width="18" height="30" rx="2.5" fill={deviceFill} stroke={c.stroke} strokeWidth="1.2" />
          <rect x={x + 4} y="39" width="10" height="11" rx="1.5" fill="#f87171" />
        </g>
      ))}
      <Label x={107} y={78} text="ПЗІП II" isDark={isDark} />

      {/* DC fuse holders */}
      {[152, 174, 196].map((x) => (
        <g key={x}>
          <rect x={x} y="34" width="18" height="30" rx="2.5" fill={deviceFill} stroke={c.stroke} strokeWidth="1.2" />
          <circle cx={x + 9} cy="49" r="5" fill="none" stroke="#fbbf24" strokeWidth="2" />
        </g>
      ))}
      <Label x={182} y={78} text="1000 В DC" isDark={isDark} />

      {/* AC breakers */}
      {[74, 96, 118, 140, 162].map((x) => (
        <g key={x}>
          <rect x={x} y="82" width="18" height="30" rx="2.5" fill={deviceFill} stroke={c.stroke} strokeWidth="1.2" />
          <rect x={x + 5} y="87" width="8" height="10" rx="1.5" fill="#fbbf24" />
        </g>
      ))}

      {/* Surge to earth */}
      <path d="M262 26 L250 62 L266 62 L252 100" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <g stroke="#84cc16" strokeWidth="2.5" strokeLinecap="round">
        <line x1="252" y1="100" x2="252" y2="110" />
        <line x1="240" y1="112" x2="264" y2="112" />
        <line x1="244" y1="118" x2="260" y2="118" />
        <line x1="248" y1="124" x2="256" y2="124" />
      </g>

      <Label x={148} y={128} text="IP65" isDark={isDark} tone="#38bdf8" />
    </Scene>
  );
}
