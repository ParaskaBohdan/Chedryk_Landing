import React from 'react';
import { Cpu, BatteryCharging, ShieldCheck, Sun } from 'lucide-react';

export default function InteractiveSolarSchema({
  roofType = 'pitched', // 'pitched' | 'flat'
  roofMaterial = 'metal_tile', // 'metal_tile' | 'tile' | 'corrugated' | 'seam' | 'flat_concrete'
  rowsCount = 2, // 1 | 2 | 3 | 4
  panelBrand = 'jinko', // 'risen' | 'jinko' | 'longi'
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
    longi: 'Longi 600W'
  };

  const materialNames = {
    metal_tile: 'Металочерепиця (Кронштейни-гачки)',
    tile: 'Натуральна черепиця (Шпильки M10)',
    corrugated: 'Профнастил (Міні-рейки)',
    seam: 'Фальцева покрівля (Безпрокольні затискачі)',
    flat_concrete: 'Плоский бетон (Баластна конструкція 15°)'
  };

  // Colors for Blueprint SVG
  const strokeColor = isDark ? '#f59e0b' : '#d97706'; // Amber / Orange
  const lineMuted = isDark ? '#475569' : '#cbd5e1';
  const bgGrid = isDark ? '#1e293b' : '#ffffff';
  const textColor = isDark ? '#f8fafc' : '#0f172a';

  return (
    <div className={`rounded-3xl border p-4 sm:p-6 transition-all shadow-xl relative overflow-hidden ${
      isDark ? 'border-slate-700 bg-slate-800/90' : 'border-amber-200 bg-white'
    }`}>
      
      {/* Header Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-700/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-500 flex items-center justify-center font-bold text-xs">
            SVG
          </div>
          <div>
            <h4 className={`text-xs sm:text-sm font-bold ${textColor}`}>
              Арх-Схема Монтажу Панелей
            </h4>
            <p className="text-[11px] text-amber-500 font-semibold">
              {materialNames[roofMaterial] || 'Стандартне кріплення'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/40 bg-amber-500/15 text-amber-500">
          <Sun className="w-3.5 h-3.5" />
          <span>Загалом: {totalKw} кВт ({panelCount} шт. {brandNames[panelBrand]})</span>
        </div>
      </div>

      {/* SVG Canvas Drawing */}
      <div className="w-full aspect-[16/10] sm:aspect-[16/9] relative rounded-2xl border border-slate-700/70 overflow-hidden bg-slate-900/95 flex items-center justify-center">
        
        {/* Background Grid Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <defs>
            <pattern id="gridPattern" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke={lineMuted} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>

        {/* Dynamic Vector Drawing */}
        <svg viewBox="0 0 800 480" className="w-full h-full p-2 relative z-10">
          
          {/* Defs / Gradients */}
          <defs>
            <linearGradient id="panelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>

          {/* 1. ROOF STRUCTURE DRAWING */}
          {roofType === 'pitched' ? (
            /* Pitched Roof (Angle 25 deg) */
            <g>
              {/* House Facade Base */}
              <rect x="120" y="280" width="400" height="150" fill="#0f172a" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
              <text x="320" y="360" fill="#64748b" fontSize="13" textAnchor="middle" fontFamily="monospace">БУДІНОК / СКАНИЙ ДАХ (~30°)</text>

              {/* Roof Slope Line */}
              <polygon points="100,280 320,130 540,280" fill="#1e293b" stroke="#f59e0b" strokeWidth="3" />
              
              {/* Roof Cover Texture Indicator */}
              <path d="M 120,270 L 320,140 L 520,270" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />

              {/* Mounting Rail Brackets */}
              <line x1="160" y1="240" x2="480" y2="240" stroke="#fbbf24" strokeWidth="4" />
              <line x1="180" y1="200" x2="460" y2="200" stroke="#fbbf24" strokeWidth="4" />
              {rowsCount >= 3 && <line x1="200" y1="160" x2="440" y2="160" stroke="#fbbf24" strokeWidth="4" />}
            </g>
          ) : (
            /* Flat Roof (Ballast Triangle Frames) */
            <g>
              {/* House Facade Base */}
              <rect x="100" y="270" width="450" height="160" fill="#0f172a" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
              <text x="325" y="360" fill="#64748b" fontSize="13" textAnchor="middle" fontFamily="monospace">ПЛОСКИЙ БЕТОННИЙ ДАХ (0°–5°)</text>
              <line x1="80" y1="270" x2="470" y2="270" stroke="#cbd5e1" strokeWidth="4" />

              {/* Triangular Ballast Frames for Flat Roof */}
              {Array.from({ length: Math.min(rowsCount, 3) }).map((_, rIdx) => {
                const rx = 140 + rIdx * 110;
                return (
                  <g key={rIdx}>
                    {/* Triangular Steel Structure */}
                    <polygon points={`${rx},270 ${rx + 70},270 ${rx + 70},210`} fill="#334155" stroke="#f59e0b" strokeWidth="2" />
                    {/* Concrete Weight Ballast */}
                    <rect x={rx + 10} y="260" width="40" height="10" fill="#64748b" stroke="#94a3b8" strokeWidth="1" />
                    <text x={rx + 30} y="258" fill="#cbd5e1" fontSize="9" textAnchor="middle">Баласт</text>
                  </g>
                );
              })}
            </g>
          )}

          {/* 2. SOLAR PANELS LAYOUT DRAWING */}
          {Array.from({ length: Math.min(rowsCount, 4) }).map((_, rIndex) => {
            const yOffset = roofType === 'pitched' ? 220 - rIndex * 35 : 190 - rIndex * 15;
            const xOffset = roofType === 'pitched' ? 170 + rIndex * 15 : 140 + rIndex * 110;
            const rowPanelsCount = Math.ceil(panelCount / rowsCount);

            return (
              <g key={rIndex} className="transition-all duration-300">
                {/* Panel Frame Container */}
                <rect 
                  x={xOffset} 
                  y={yOffset} 
                  width={roofType === 'pitched' ? 280 - rIndex * 30 : 90} 
                  height={roofType === 'pitched' ? 22 : 45} 
                  fill="url(#panelGrad)" 
                  stroke="#fbbf24" 
                  strokeWidth="2" 
                  rx="3" 
                />

                {/* Solar Cell Grid Lines */}
                <line x1={xOffset + 20} y1={yOffset} x2={xOffset + 20} y2={yOffset + (roofType === 'pitched' ? 22 : 45)} stroke="#38bdf8" strokeWidth="0.8" opacity="0.7" />
                <line x1={xOffset + 60} y1={yOffset} x2={xOffset + 60} y2={yOffset + (roofType === 'pitched' ? 22 : 45)} stroke="#38bdf8" strokeWidth="0.8" opacity="0.7" />
                {roofType === 'pitched' && (
                  <>
                    <line x1={xOffset + 120} y1={yOffset} x2={xOffset + 120} y2={yOffset + 22} stroke="#38bdf8" strokeWidth="0.8" opacity="0.7" />
                    <line x1={xOffset + 180} y1={yOffset} x2={xOffset + 180} y2={yOffset + 22} stroke="#38bdf8" strokeWidth="0.8" opacity="0.7" />
                    <line x1={xOffset + 220} y1={yOffset} x2={xOffset + 220} y2={yOffset + 22} stroke="#38bdf8" strokeWidth="0.8" opacity="0.7" />
                  </>
                )}

                {/* Label on Row */}
                <text 
                  x={xOffset + (roofType === 'pitched' ? 130 : 45)} 
                  y={yOffset + (roofType === 'pitched' ? 14 : 26)} 
                  fill="#ffffff" 
                  fontSize="10" 
                  fontWeight="bold" 
                  textAnchor="middle"
                >
                  Ряд {rIndex + 1}: ~{rowPanelsCount} шт ({brandNames[panelBrand]})
                </text>
              </g>
            );
          })}

          {/* 3. DC POWER CABLE & INVERTER / BATTERY DIAGRAM */}
          {/* Cable Line Down to Inverter */}
          <path d="M 450,220 L 580,220 L 580,310 L 640,310" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 3" />
          <text x="560" y="210" fill="#f59e0b" fontSize="10" fontWeight="bold">Кабель DC</text>

          {/* Inverter Box */}
          <g>
            <rect x="640" y="270" width="120" height="70" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
            <circle cx="660" cy="290" r="6" fill="#38bdf8" />
            <text x="675" y="293" fill="#ffffff" fontSize="11" fontWeight="bold">Інвертор Deye</text>
            <text x="700" y="320" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">{inverterPowerKw} кВт (3-фазний)</text>
          </g>

          {/* Optional Battery Storage Rack Drawing */}
          {hasBattery && (
            <g>
              {/* Cable from Inverter to Battery */}
              <line x1="700" y1="340" x2="700" y2="380" stroke="#10b981" strokeWidth="3" />

              {/* Battery Cabinet */}
              <rect x="650" y="380" width="100" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
              <rect x="660" y="390" width="80" height="12" fill="#022c22" stroke="#10b981" strokeWidth="1" />
              <rect x="660" y="406" width="80" height="12" fill="#022c22" stroke="#10b981" strokeWidth="1" />
              <rect x="660" y="422" width="80" height="12" fill="#022c22" stroke="#10b981" strokeWidth="1" />
              
              <text x="700" y="443" fill="#a7f3d0" fontSize="10" fontStyle="bold" textAnchor="middle">
                АКБ LiFePO4 {batteryCapacityKwh} кВт·год
              </text>
            </g>
          )}

        </svg>
      </div>

      {/* Footer Schema Legend */}
      <div className="mt-4 pt-3 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-semibold text-slate-300">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-xs bg-amber-500 border border-amber-300" />
          <span>Каркас & Рейки</span>
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
