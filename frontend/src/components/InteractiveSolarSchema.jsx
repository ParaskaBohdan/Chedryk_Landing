import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, ShieldCheck, Cpu, BatteryCharging } from 'lucide-react';

export default function InteractiveSolarSchema({
  roofType = 'pitched', // 'pitched' | 'flat'
  roofMaterial = 'metal_tile',
  rowsCount = 2, // 1 | 2 | 3 | 4
  panelBrand = 'jinko',
  panelCount = 24,
  totalKw = 14,
  inverterPowerKw = 15,
  hasBattery = true,
  batteryCapacityKwh = 10,
  theme = 'dark'
}) {
  const isDark = theme === 'dark';

  const brandNames = {
    risen: 'Risen 550W',
    jinko: 'Jinko 585W',
    longi: 'Longi Solar 600W'
  };

  const materialNames = {
    metal_tile: 'Металочерепиця',
    tile: 'Натуральна черепиця',
    corrugated: 'Профнастил',
    seam: 'Фальцева покрівля',
    flat_concrete: 'Плоский бетон'
  };

  const textColor = isDark ? 'text-white' : 'text-slate-900';

  return (
    <div className={`rounded-3xl border p-5 sm:p-7 transition-all shadow-2xl relative overflow-hidden ${
      isDark ? 'border-slate-700/80 bg-slate-800/90' : 'border-amber-200 bg-white shadow-amber-500/10'
    }`}>
      
      {/* Header Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-700/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xs uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-amber-400/40 bg-amber-500/15 text-amber-500">
              3D/2D Візуалізація
            </span>
            <span className={`text-xs font-bold ${textColor}`}>
              {roofType === 'pitched' ? 'Скатий дах' : 'Плоский дах'} • {materialNames[roofMaterial]}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Масштабована схема розташування обладнання на об'єкті
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-amber-400/40 bg-amber-500/15 text-amber-500 shadow-xs">
          <Sun className="w-4 h-4" />
          <span>{totalKw} кВт ({panelCount} шт. {brandNames[panelBrand]})</span>
        </div>
      </div>

      {/* Main Illustration Canvas with Animated Transitions */}
      <div className="w-full aspect-[16/10] sm:aspect-[16/9] relative rounded-2xl border border-slate-700/60 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 flex items-center justify-center p-2 sm:p-4">
        
        {/* Background Sun Rays Effect */}
        <div className="absolute top-4 left-6 w-24 h-24 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.svg
            key={`${roofType}-${rowsCount}-${hasBattery}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            viewBox="0 0 900 500" 
            className="w-full h-full relative z-10"
          >
            <defs>
              {/* Solar Panel Glossy Gradient */}
              <linearGradient id="pvPanelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1d4ed8" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>

              {/* Inverter Box Gradient */}
              <linearGradient id="inverterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              {/* Shadow filter */}
              <filter id="softDropShadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* SKY BACKGROUND ELEMENTS */}
            <circle cx="90" cy="80" r="35" fill="#f59e0b" opacity="0.85" />
            <g stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" opacity="0.6">
              <line x1="90" y1="30" x2="90" y2="40" />
              <line x1="90" y1="120" x2="90" y2="130" />
              <line x1="40" y1="80" x2="50" y2="80" />
              <line x1="130" y1="80" x2="140" y2="80" />
              <line x1="55" y1="45" x2="62" y2="52" />
              <line x1="118" y1="108" x2="125" y2="115" />
            </g>

            {/* --- SCENARIO A: PITCHED ROOF MODERN HOUSE (Side 3/4 Angle) --- */}
            {roofType === 'pitched' ? (
              <g filter="url(#softDropShadow)">
                {/* Main House Wall / Side Facade */}
                <polygon points="180,260 520,260 520,420 180,420" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
                
                {/* Front Side Wall Segment */}
                <polygon points="520,260 620,210 620,370 520,420" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="3" />

                {/* Windows & Doors */}
                <rect x="220" y="290" width="60" height="80" rx="4" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                <rect x="330" y="290" width="60" height="80" rx="4" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                <rect x="440" y="310" width="50" height="110" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />

                {/* Pitched Roof Mass (Side Angle Perspective) */}
                <polygon points="140,260 500,260 420,130 140,130" fill="#334155" stroke="#475569" strokeWidth="4" />
                <polygon points="500,260 630,210 520,110 420,130" fill="#1e293b" stroke="#475569" strokeWidth="4" />

                {/* Roof Texture Lines */}
                <line x1="140" y1="130" x2="500" y2="260" stroke="#f59e0b" strokeWidth="3" opacity="0.8" />
                <line x1="210" y1="130" x2="535" y2="235" stroke="#475569" strokeWidth="1.5" opacity="0.5" />
                <line x1="280" y1="130" x2="570" y2="210" stroke="#475569" strokeWidth="1.5" opacity="0.5" />

                {/* Mounting Aluminum Rails on Roof */}
                <line x1="170" y1="230" x2="470" y2="230" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                <line x1="190" y1="190" x2="450" y2="190" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                {rowsCount >= 3 && <line x1="210" y1="150" x2="430" y2="150" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />}

                {/* DYNAMIC SOLAR PANEL ROWS ON PITCHED ROOF */}
                {Array.from({ length: Math.min(rowsCount, 3) }).map((_, rIdx) => {
                  const py = 210 - rIdx * 38;
                  const px = 180 + rIdx * 15;
                  const pWidth = 270 - rIdx * 25;
                  const rowPanels = Math.ceil(panelCount / rowsCount);

                  return (
                    <g key={rIdx}>
                      {/* Solar Panel Row Panel Box */}
                      <polygon 
                        points={`${px},${py} ${px + pWidth},${py + 25} ${px + pWidth - 30},${py + 5} ${px - 30},${py - 15}`} 
                        fill="url(#pvPanelGrad)" 
                        stroke="#fbbf24" 
                        strokeWidth="2.5" 
                      />

                      {/* Cell Division Lines */}
                      <line x1={px + pWidth * 0.25} y1={py + 5} x2={px + pWidth * 0.25 - 20} y2={py - 10} stroke="#38bdf8" strokeWidth="1" />
                      <line x1={px + pWidth * 0.5} y1={py + 12} x2={px + pWidth * 0.5 - 20} y2={py - 5} stroke="#38bdf8" strokeWidth="1" />
                      <line x1={px + pWidth * 0.75} y1={py + 18} x2={px + pWidth * 0.75 - 20} y2={py} stroke="#38bdf8" strokeWidth="1" />

                      {/* Row Badge */}
                      <text x={px + pWidth * 0.4} y={py + 12} fill="#ffffff" fontSize="11" fontWeight="bold">
                        Ряд {rIdx + 1}: {rowPanels} шт
                      </text>
                    </g>
                  );
                })}
              </g>
            ) : (
              /* --- SCENARIO B: FLAT ROOF MODERN HOUSE WITH ANGLED BALLAST RACKS --- */
              <g filter="url(#softDropShadow)">
                {/* Modern Cube Building Base */}
                <rect x="180" y="220" width="380" height="200" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
                <polygon points="560,220 660,180 660,370 560,420" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="3" />

                {/* Architectural Features */}
                <rect x="220" y="260" width="70" height="100" rx="4" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                <rect x="330" y="260" width="70" height="100" rx="4" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                <rect x="450" y="280" width="60" height="140" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />

                {/* Flat Roof Parapet Line */}
                <line x1="160" y1="220" x2="570" y2="220" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />

                {/* ELEVATED ANGLED BALLAST FRAME RACKS FOR FLAT ROOF */}
                {Array.from({ length: Math.min(rowsCount, 3) }).map((_, rIdx) => {
                  const rx = 200 + rIdx * 115;
                  const rowPanels = Math.ceil(panelCount / rowsCount);

                  return (
                    <g key={rIdx}>
                      {/* Triangular Metal Ballast Support (15 deg angle) */}
                      <polygon points={`${rx},220 ${rx + 85},220 ${rx + 85},160`} fill="#334155" stroke="#f59e0b" strokeWidth="2.5" />
                      {/* Concrete Weight */}
                      <rect x={rx + 10} y="210" width="55" height="10" fill="#64748b" stroke="#94a3b8" strokeWidth="1" />

                      {/* Angled Solar Panel Module Mounted on Top */}
                      <polygon 
                        points={`${rx - 5},225 ${rx + 95},165 ${rx + 85},150 ${rx - 15},210`} 
                        fill="url(#pvPanelGrad)" 
                        stroke="#fbbf24" 
                        strokeWidth="2.5" 
                      />

                      {/* Text Label */}
                      <text x={rx + 35} y="180" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                        Ряд {rIdx + 1}
                      </text>
                      <text x={rx + 35} y="195" fill="#fcd34d" fontSize="9" fontWeight="bold" textAnchor="middle">
                        {rowPanels} шт
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* --- POWER EQUIPMENT (INVERTER & BATTERY RACK ON SIDE WALL) --- */}
            {/* Cable Line Down */}
            <path d="M 520,260 L 700,260 L 700,310" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="6 3" />

            {/* Deye Inverter Box Mounted on Wall */}
            <g filter="url(#softDropShadow)">
              <rect x="650" y="270" width="130" height="75" rx="10" fill="url(#inverterGrad)" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="675" cy="292" r="6" fill="#10b981" />
              <text x="690" y="296" fill="#ffffff" fontSize="11" fontWeight="bold">Deye Inverter</text>
              <text x="715" y="325" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                {inverterPowerKw} кВт (3-фазний)
              </text>
            </g>

            {/* Battery Storage Stand */}
            {hasBattery && (
              <g filter="url(#softDropShadow)">
                <line x1="715" y1="345" x2="715" y2="375" stroke="#10b981" strokeWidth="3.5" />
                
                <rect x="660" y="375" width="110" height="85" rx="10" fill="#022c22" stroke="#10b981" strokeWidth="3" />
                <rect x="670" y="388" width="90" height="13" rx="2" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                <rect x="670" y="407" width="90" height="13" rx="2" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                <rect x="670" y="426" width="90" height="13" rx="2" fill="#064e3b" stroke="#10b981" strokeWidth="1" />

                <text x="715" y="448" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">
                  АКБ LiFePO4 {batteryCapacityKwh} кВт·год
                </text>
              </g>
            )}
          </motion.svg>
        </AnimatePresence>

      </div>

      {/* Footer Schema Legend */}
      <div className="mt-4 pt-3 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-semibold text-slate-300">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-xs bg-amber-500 border border-amber-300" />
          <span>Каркас {materialNames[roofMaterial]}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-xs bg-blue-600 border border-sky-400" />
          <span>Панелі {brandNames[panelBrand]}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-sky-400" />
          <span>Інвертор {inverterPowerKw} кВт</span>
        </div>
        <div className="flex items-center gap-1.5">
          <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
          <span>{hasBattery ? `АКБ ${batteryCapacityKwh} кВт·год` : 'Мережевий режим'}</span>
        </div>
      </div>

    </div>
  );
}
