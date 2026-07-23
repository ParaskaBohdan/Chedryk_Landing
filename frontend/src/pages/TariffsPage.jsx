import React, { useEffect } from 'react';
import DeyeAndLegal from '../components/DeyeAndLegal';
import StepProcess from '../components/StepProcess';
import { Zap, ShieldCheck } from 'lucide-react';

export default function TariffsPage({ theme, onOpenConsultation }) {
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className={`py-12 sm:py-20 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-slate-100/70 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full border ${
            isDark ? 'border-amber-400/40 bg-amber-500/15 text-amber-300' : 'border-amber-300 bg-amber-100 text-amber-800'
          }`}>
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Зелений Тариф & Документи</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Оформлення <span className="text-amber-500">Зеленого Тарифу</span> Під Ключ
          </h1>
          <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Повний супровід документації в Обленерго Закарпатської та Івано-Франківської областей. Збільшення дозволеної потужності, технічні умови та виплати за згенеровану електроенергію.
          </p>
        </div>

        {/* Deye and Legal Section */}
        <DeyeAndLegal onOpenConsultation={onOpenConsultation} theme={theme} />

        {/* Step Process for Connection */}
        <StepProcess theme={theme} />

        {/* Bottom CTA Banner */}
        <div className={`p-8 sm:p-10 rounded-3xl border text-center space-y-4 shadow-xl ${
          isDark ? 'border-slate-800 bg-slate-950/80' : 'border-amber-200 bg-white'
        }`}>
          <h3 className="text-xl sm:text-2xl font-extrabold">Потрібна допомога з Зеленим Тарифом чи ТУ?</h3>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Юридичний супровід та подача документів в Обленерго Закарпаття та Франківщини.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenConsultation && onOpenConsultation('Оформлення Зеленого Тарифу')}
              className="btn-orange-bright px-8 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Отримати Консультацію щодо Документів</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
