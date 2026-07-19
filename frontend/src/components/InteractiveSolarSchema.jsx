import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Cpu, BatteryCharging, CheckCircle2, Zap, Layers, ShieldCheck } from 'lucide-react';

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
    metal_tile: 'Металочерепиця (Кронштейни-гачки)',
    tile: 'Натуральна черепиця (Шпильки M10)',
    corrugated: 'Профнастил (Міні-рейки з ЕПДМ)',
    seam: 'Фальцева покрівля (Затискачі без проколу)',
    flat_concrete: 'Плоский бетон (Баластні трикутні опори 15°)'
  };

  const textColor = isDark ? 'text-white' : 'text-slate-900';

  return (
    <div className={`rounded-3xl border p-4 sm:p-6 transition-all shadow-2xl relative overflow-hidden ${
      isDark ? 'border-slate-700/80 bg-slate-800/90' : 'border-amber-200 bg-white shadow-amber-500/10'
    }`}>
      
      {/* Header Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-700/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xs uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-amber-400/40 bg-amber-500/15 text-amber-500">
              3D Рендер & Візуалізація
            </span>
            <span className={`text-xs font-bold ${textColor}`}>
              {roofType === 'pitched' ? 'Скатий дах' : 'Плоский дах'}
            </span>
          </div>
          <p className="text-xs text-amber-500 font-semibold mt-1">
            Кріплення: {materialNames[roofMaterial]}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-amber-400/40 bg-amber-500/15 text-amber-500 shadow-xs">
          <Sun className="w-4 h-4 text-amber-500" />
          <span>Потужність: {totalKw} кВт ({panelCount} шт)</span>
        </div>
      </div>

      {/* Main Photorealistic 3D House Rendering Container */}
      <div className="w-full aspect-[16/10] sm:aspect-[16/9] relative rounded-2xl border border-slate-700/60 overflow-hidden bg-slate-950 flex items-center justify-center shadow-inner">
        
        {/* Animated 3D House Image Switcher */}
        <AnimatePresence mode="wait">
          <motion.div
            key={roofType}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full h-full relative"
          >
            <img 
              src={roofType === 'pitched' ? '/images/solar_pitched.png' : '/images/solar_flat.png'}
              alt={roofType === 'pitched' ? 'Будинок зі скатним дахом' : 'Будинок з плоским дахом'}
              className="w-full h-full object-cover"
            />
            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* OVERLAY BADGE 1: Solar Panel Array Info */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          key={`panels-${rowsCount}-${panelBrand}`}
          className="absolute top-3 left-3 sm:top-4 sm:left-4 backdrop-blur-md bg-slate-950/85 border border-amber-400/50 p-2.5 sm:p-3 rounded-2xl shadow-xl text-white space-y-1 max-w-[240px] sm:max-w-[280px]"
        >
          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
            <Sun className="w-3.5 h-3.5" />
            <span>Сонячні Панелі ({brandNames[panelBrand]})</span>
          </div>
          <p className="text-[11px] text-slate-200 leading-tight font-medium">
            Комплектація: <strong className="text-white">{rowsCount} {rowsCount === 1 ? 'ряд' : 'ряди'}</strong> ({panelCount} фотомодулів) = <strong className="text-amber-400">{totalKw} кВт</strong>
          </p>
        </motion.div>

        {/* OVERLAY BADGE 2: Mounting Frame Hardware */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          key={`frame-${roofMaterial}`}
          className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 backdrop-blur-md bg-slate-950/85 border border-slate-700 p-2.5 sm:p-3 rounded-2xl shadow-xl text-white space-y-1 max-w-[240px] sm:max-w-[280px]"
        >
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>Каркас Кріплення</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-tight">
            {materialNames[roofMaterial]}
          </p>
        </motion.div>

        {/* OVERLAY BADGE 3: Inverter & Battery Equipment Box */}
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          key={`inverter-${inverterPowerKw}-${hasBattery}`}
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 backdrop-blur-md bg-slate-950/90 border border-sky-400/50 p-3 sm:p-3.5 rounded-2xl shadow-xl text-white space-y-2 max-w-[220px] sm:max-w-[260px]"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="flex items-center gap-1.5 text-sky-400 text-xs font-bold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Deye Inverter</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
              {inverterPowerKw} кВт
            </span>
          </div>

          {hasBattery ? (
            <div className="flex items-center justify-between pt-0.5">
              <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                <BatteryCharging className="w-3.5 h-3.5" />
                <span>АКБ LiFePO4</span>
              </span>
              <span className="text-xs font-bold text-emerald-300">
                {batteryCapacityKwh} кВт·год
              </span>
            </div>
          ) : (
            <p className="text-[11px] text-slate-400 font-medium">
              Мережевий режим (Без АКБ)
            </p>
          )}
        </motion.div>

      </div>

      {/* Footer Schema Legend */}
      <div className="mt-4 pt-3 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-semibold text-slate-300">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
          <span>Каркас & Опори</span>
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
