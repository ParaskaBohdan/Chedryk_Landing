import React, { useState } from 'react';
import { Calculator, Sun, DollarSign, Zap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import ConsultationForm from '../components/ConsultationForm';

export default function CalculatorPage({ theme, onOpenConsultation }) {
  const isDark = theme === 'dark';
  
  const [powerKw, setPowerKw] = useState(30); // Default 30 kW
  const [stationType, setStationType] = useState('hybrid'); // 'grid' | 'hybrid' | 'autonomous'
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  // Estimation Formulas
  const annualGenKwh = Math.round(powerKw * 1150);
  const estCostUsd = Math.round(
    stationType === 'grid' 
      ? powerKw * 580 
      : stationType === 'hybrid' 
      ? powerKw * 780 
      : powerKw * 920
  );
  const estSavingsPerYear = Math.round(annualGenKwh * 0.16); // ~4.32 грн/кВт
  const paybackYears = (estCostUsd / Math.max(1, estSavingsPerYear)).toFixed(1);

  return (
    <div className={`py-12 sm:py-20 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-amber-50/40 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/40 bg-amber-500/15 text-amber-500 text-xs sm:text-sm font-semibold">
            <Calculator className="w-4 h-4 text-amber-500" />
            <span>Калькулятор Сонячних Станцій</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            Розрахунок Вартності СЕС <span className="text-amber-500">(5 кВт – 1 МВт)</span>
          </h1>
          <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Отримайте попередню оцінку потужності, генерації та окупності для вашого будинку чи бізнесу в Закарпатській та Івано-Франківській областях.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`glass-panel p-6 sm:p-8 rounded-3xl border space-y-6 ${
              isDark ? 'border-slate-800 bg-slate-800/80' : 'border-amber-200 bg-white shadow-md'
            }`}>
              
              {/* Station Type Select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-500 mb-3">
                  1. Оберіть тип системи
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setStationType('hybrid')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      stationType === 'hybrid'
                        ? 'border-amber-500 bg-amber-500/20 text-white shadow-md'
                        : isDark ? 'border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400/50' : 'border-amber-200 bg-amber-50/50 text-slate-700 hover:border-amber-300'
                    }`}
                  >
                    <p className="font-bold text-sm">Гібридна Deye</p>
                    <p className="text-[11px] opacity-80 mt-1">Сонце + Акумулятори + Мережа</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStationType('grid')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      stationType === 'grid'
                        ? 'border-amber-500 bg-amber-500/20 text-white shadow-md'
                        : isDark ? 'border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400/50' : 'border-amber-200 bg-amber-50/50 text-slate-700 hover:border-amber-300'
                    }`}
                  >
                    <p className="font-bold text-sm">Мережева СЕС</p>
                    <p className="text-[11px] opacity-80 mt-1">Зелений тариф та економія</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStationType('autonomous')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      stationType === 'autonomous'
                        ? 'border-amber-500 bg-amber-500/20 text-white shadow-md'
                        : isDark ? 'border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400/50' : 'border-amber-200 bg-amber-50/50 text-slate-700 hover:border-amber-300'
                    }`}
                  >
                    <p className="font-bold text-sm">Автономна EcoFlow</p>
                    <p className="text-[11px] opacity-80 mt-1">100% захист від блек-аутів</p>
                  </button>
                </div>
              </div>

              {/* Power Slider */}
              <div className="space-y-3 pt-4 border-t border-slate-700/60">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-500">
                    2. Потужність станції
                  </label>
                  <span className="text-xl font-extrabold text-amber-500">
                    {powerKw >= 1000 ? `${(powerKw / 1000).toFixed(1)} МВт` : `${powerKw} кВт`}
                  </span>
                </div>

                <input
                  type="range"
                  min="5"
                  max="1000"
                  step="5"
                  value={powerKw}
                  onChange={(e) => setPowerKw(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />

                <div className="flex justify-between text-xs text-slate-400">
                  <span>5 кВт (Приватний будинок)</span>
                  <span>30 кВт (Зелений тариф)</span>
                  <span>1 МВт (Промислова СЕС)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5">
            <div className={`glass-card p-6 sm:p-8 rounded-3xl border space-y-6 ${
              isDark ? 'border-slate-700 bg-slate-800/90' : 'border-amber-200 bg-white shadow-xl'
            }`}>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Результат Розрахунку
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/80 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Річна генерація</p>
                    <p className="text-lg font-bold text-amber-400">~{annualGenKwh.toLocaleString()} кВт·год</p>
                  </div>
                  <Sun className="w-8 h-8 text-amber-400/80" />
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/80 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Орієнтовна вартість обладнання</p>
                    <p className="text-lg font-bold text-emerald-400">${estCostUsd.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-emerald-400/80" />
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/80 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Термін окупності</p>
                    <p className="text-lg font-bold text-sky-400">~{paybackYears} років</p>
                  </div>
                  <ShieldCheck className="w-8 h-8 text-sky-400/80" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/60 space-y-3">
                <button
                  onClick={() => {
                    const pref = `Розрахунок СЕС ${powerKw} кВт (${stationType === 'hybrid' ? 'Гібридна Deye' : stationType === 'grid' ? 'Мережева' : 'Автономна'})`;
                    onOpenConsultation(pref);
                  }}
                  className="w-full btn-orange-bright py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 glow-amber"
                >
                  <span>Замовити Точний Кошторис під ключ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <p className="text-[11px] text-center text-slate-400">
                  Виїзд майстра (Чедрик Іван) для замірів у Закарпатській та Івано-Франківській областях.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
