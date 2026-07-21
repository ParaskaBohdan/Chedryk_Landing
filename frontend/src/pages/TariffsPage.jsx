import React, { useEffect } from 'react';
import DeyeAndLegal from '../components/DeyeAndLegal';
import StepProcess from '../components/StepProcess';
import ConsultationForm from '../components/ConsultationForm';
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

        {/* Consultation Form Section */}
        <div className="pt-12 border-t border-slate-700/60">
          <ConsultationForm theme={theme} />
        </div>

      </div>
    </div>
  );
}
