import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Cpu, BatteryCharging, CheckCircle2, Layers, Image, PenTool, Box } from 'lucide-react';
import Solar3DCanvas from './Solar3DCanvas';

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
  const [viewMode, setViewMode] = useState('interactive_3d'); // 'interactive_3d' | '3d' | '2d'

  const brandNames = {
    risen: 'Risen 550W',
    jinko: 'Jinko 585W',
    longi: 'Longi Solar 600W'
  };

  const materialNames = {
    metal_tile: 'Металочерепиця (Кронштейни-гачки)',
    tile: 'Натуральна черепиця (Шпильки M10)',
    corrugated: 'Профнастил (Міні-рейки з ЕПДМ)',
    seam: 'Фальцева покрівля (Затискачі без проколу)',
    flat_concrete: 'Плоский бетон (Баластні трикутні опори 15°)'
  };

  const currentRowsKey = Math.min(rowsCount, 3);
  const current3DImage = `/images/${roofType}_${currentRowsKey}.png`;
  const textColor = isDark ? 'text-white' : 'text-slate-900';

  return (
    <div className={`rounded-3xl border p-4 sm:p-6 transition-all shadow-2xl relative overflow-hidden ${
      isDark ? 'border-slate-700/80 bg-slate-800/90' : 'border-amber-200 bg-white shadow-amber-500/10'
    }`}>
      
      {/* Header Info Bar with 3-Way Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-700/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xs uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-amber-400/40 bg-amber-500/15 text-amber-500">
              Візуалізатор Об'єкта
            </span>
            <span className={`text-xs font-bold ${textColor}`}>
              {roofType === 'pitched' ? 'Скатий дах' : 'Плоский дах'} • {totalKw} кВт
            </span>
          </div>
          <p className="text-xs text-amber-500 font-semibold mt-1">
            Кріплення: {materialNames[roofMaterial]}
          </p>
        </div>

        {/* 3-Way View Switcher Bar */}
        <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl border border-slate-700 bg-slate-900">
          <button
            type="button"
            onClick={() => setViewMode('interactive_3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'interactive_3d'
                ? 'btn-orange-active shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5 text-amber-400" />
            <span>🎮 3D Інтерактив (360°)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === '3d'
                ? 'btn-orange-active shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>📸 3D Рендер</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('2d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === '2d'
                ? 'btn-orange-active shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>📐 2D Схема</span>
          </button>
        </div>
      </div>

      {/* Main Visual Display Container */}
      <div className="w-full aspect-[16/10] sm:aspect-[16/9] relative rounded-2xl border border-slate-700/60 overflow-hidden bg-slate-950 flex items-center justify-center shadow-inner">
        
        <AnimatePresence mode="wait">
          {/* VIEW MODE 1: THREE.JS REAL-TIME 3D WEBGL INTERACTIVE CANVAS */}
          {viewMode === 'interactive_3d' ? (
            <motion.div
              key="three-3d-canvas"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full relative"
            >
              <Solar3DCanvas
                roofType={roofType}
                roofMaterial={roofMaterial}
                rowsCount={rowsCount}
                panelBrand={panelBrand}
                panelCount={panelCount}
                totalKw={totalKw}
                inverterPowerKw={inverterPowerKw}
                hasBattery={hasBattery}
                batteryCapacityKwh={batteryCapacityKwh}
                theme={theme}
              />
            </motion.div>
          ) : viewMode === '3d' ? (
            /* VIEW MODE 2: PHOTOREALISTIC STATIC 3D ARCHITECTURAL RENDERS */
            <motion.div
              key={`3d-${roofType}-${rowsCount}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full h-full relative"
            >
              <img 
                src={current3DImage}
                alt={`Будинок ${roofType === 'pitched' ? 'зі скатним дахом' : 'з плоским дахом'}, ${rowsCount} ряди панелей`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" />

              {/* Floating Badge Overlay 1 */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 backdrop-blur-md bg-slate-950/85 border border-amber-400/50 p-2.5 sm:p-3 rounded-2xl shadow-xl text-white space-y-1 max-w-[250px] sm:max-w-[290px]">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                  <Sun className="w-3.5 h-3.5" />
                  <span>{panelCount} шт. {brandNames[panelBrand]}</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Розміщення: <strong className="text-amber-400">{rowsCount} {rowsCount === 1 ? 'ряд' : 'ряди'}</strong> = <strong>{totalKw} кВт</strong>
                </p>
              </div>

              {/* Floating Badge Overlay 2 */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 backdrop-blur-md bg-slate-950/90 border border-sky-400/50 p-3 rounded-2xl shadow-xl text-white space-y-2 max-w-[220px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-sky-400 text-xs font-bold flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Deye {inverterPowerKw} кВт</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400">
                    {hasBattery ? `АКБ ${batteryCapacityKwh}кВт·г` : 'Мережа'}
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* VIEW MODE 3: 2D ARCHITECTURAL BLUEPRINT SCHEMATIC DIAGRAM */
            <motion.div
              key="2d-blueprint"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full relative"
            >
              <svg viewBox="0 0 800 480" className="w-full h-full p-2">
                <defs>
                  <pattern id="bpGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#334155" strokeWidth="0.5" />
                  </pattern>
                  <linearGradient id="bpPanelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a8a" opacity="0.9" />
                    <stop offset="100%" stopColor="#0284c7" opacity="0.9" />
                  </linearGradient>
                </defs>

                <rect width="100%" height="100%" fill="url(#bpGrid)" />

                {roofType === 'pitched' ? (
                  <g>
                    <polygon points="120,280 520,280 520,420 120,420" fill="#0f172a" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="320" y="360" fill="#64748b" fontSize="13" textAnchor="middle" fontFamily="monospace">АРХІТЕКТУРНИЙ ПРОФІЛЬ САКТНОГО ДАХУ (~30°)</text>
                    <polygon points="100,280 320,130 540,280" fill="#1e293b" stroke="#f59e0b" strokeWidth="3" />

                    <line x1="160" y1="240" x2="480" y2="240" stroke="#fbbf24" strokeWidth="4" />
                    <line x1="180" y1="200" x2="460" y2="200" stroke="#fbbf24" strokeWidth="4" />
                    {rowsCount >= 3 && <line x1="200" y1="160" x2="440" y2="160" stroke="#fbbf24" strokeWidth="4" />}

                    {Array.from({ length: Math.min(rowsCount, 3) }).map((_, rIdx) => {
                      const py = 220 - rIdx * 35;
                      const px = 170 + rIdx * 15;
                      const rowPanels = Math.ceil(panelCount / rowsCount);

                      return (
                        <g key={rIdx}>
                          <rect x={px} y={py} width={280 - rIdx * 30} height={22} fill="url(#bpPanelGrad)" stroke="#fbbf24" strokeWidth="2" rx="3" />
                          <text x={px + 130 - rIdx * 10} y={py + 14} fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                            Ряд {rIdx + 1}: {rowPanels} шт ({brandNames[panelBrand]})
                          </text>
                        </g>
                      );
                    })}
                  </g>
                ) : (
                  <g>
                    <rect x="100" y="270" width="450" height="160" fill="#0f172a" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="325" y="360" fill="#64748b" fontSize="13" textAnchor="middle" fontFamily="monospace">ПЛОСКИЙ БЕТОННИЙ ДАХ СЛАР (0°–5°)</text>
                    <line x1="80" y1="270" x2="470" y2="270" stroke="#cbd5e1" strokeWidth="4" />

                    {Array.from({ length: Math.min(rowsCount, 3) }).map((_, rIdx) => {
                      const rx = 140 + rIdx * 110;
                      const rowPanels = Math.ceil(panelCount / rowsCount);

                      return (
                        <g key={rIdx}>
                          <polygon points={`${rx},270 ${rx + 70},270 ${rx + 70},210`} fill="#334155" stroke="#f59e0b" strokeWidth="2" />
                          <rect x={rx - 10} y="200" width="90" height="15" fill="url(#bpPanelGrad)" stroke="#fbbf24" strokeWidth="2" rx="2" />
                          <text x={rx + 35} y="212" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                            Ряд {rIdx + 1} ({rowPanels} шт)
                          </text>
                        </g>
                      );
                    })}
                  </g>
                )}

                <path d="M 450,220 L 580,220 L 580,310 L 640,310" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 3" />
                <rect x="640" y="270" width="120" height="70" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
                <text x="700" y="310" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Deye {inverterPowerKw} кВт</text>

                {hasBattery && (
                  <g>
                    <line x1="700" y1="340" x2="700" y2="380" stroke="#10b981" strokeWidth="3" />
                    <rect x="650" y="380" width="100" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
                    <text x="700" y="420" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">АКБ LiFePO4 {batteryCapacityKwh}кВт·г</text>
                  </g>
                )}
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Footer Schema Legend */}
      <div className="mt-4 pt-3 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-semibold text-slate-300">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
          <span>Кріплення {materialNames[roofMaterial]}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span>Панелі {brandNames[panelBrand]}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-sky-400" />
          <span>Інвертор {inverterPowerKw} кВт</span>
        </div>
        <div className="flex items-center gap-1.5">
          <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
          <span>{hasBattery ? `АКБ ${batteryCapacityKwh} кВт·год` : 'Без АКБ'}</span>
        </div>
      </div>

    </div>
  );
}
