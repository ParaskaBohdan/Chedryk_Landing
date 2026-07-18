import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileCheck, Leaf, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DeyeAndLegal({ onOpenConsultation, theme }) {
  const isDark = theme === 'dark';

  const highlights = [
    {
      icon: FileCheck,
      title: 'Отримання дозволів Обленерго',
      desc: 'Повний супровід: подача заяви, розробка проектної документації, збільшення дозволеної вхідної потужності будинку.',
      badge: '100% Бюрократія на нас'
    },
    {
      icon: Leaf,
      title: 'Підключення Зеленого Тарифу',
      desc: 'Консультації, збір документів, встановлення двонаправленого лічильника та юридичний супровід до перших виплат за вироблену електроенергію.',
      badge: 'Продаж надлишків'
    },
    {
      icon: Cpu,
      title: 'Гібридні системи Deye під ключ',
      desc: 'Професійний монтаж та налаштування легендарних гібридних інверторів Deye (однофазні та трифазні 5–50 кВт) з інтелектуальним керуванням акумуляторами.',
      badge: 'Офіційна техніка'
    }
  ];

  return (
    <section id="deye-legal" className={`py-16 sm:py-20 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-slate-950 text-white border-t border-slate-900' : 'bg-gradient-to-b from-white via-sky-50/40 to-white text-slate-900 border-t border-sky-100'
    }`}>
      {/* Background Decorative Blobs */}
      <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[130px] pointer-events-none ${
        isDark ? 'bg-amber-500/10' : 'bg-sky-400/20'
      }`} />
      <div className={`absolute top-1/2 right-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[130px] pointer-events-none ${
        isDark ? 'bg-blue-500/10' : 'bg-blue-400/15'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold ${
            isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-sky-100 border-sky-300 text-sky-800'
          }`}>
            <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-sky-600'}`} />
            <span>Юридичний Супровід & Преміум Монтаж</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Зелений Тариф, Дозволи Обленерго & <span className={isDark ? 'text-amber-400' : 'text-sky-600'}>Системи Deye</span>
          </h2>
          <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Беремо на себе найскладніші етапи — від бюрократичного оформлення документів до вибору та налаштування надійних інверторів Deye.
          </p>
        </div>

        {/* 3 Main Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`glass-card rounded-3xl p-6 sm:p-8 border flex flex-col justify-between transition-all group ${
                  isDark 
                    ? 'border-slate-800 hover:border-amber-500/40 bg-slate-900/90' 
                    : 'border-sky-100 hover:border-sky-300 bg-white shadow-lg shadow-sky-500/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-md ${
                      isDark 
                        ? 'bg-amber-500/15 border-amber-500/30 text-amber-400' 
                        : 'bg-sky-500/10 border-sky-300 text-sky-600'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                      isDark 
                        ? 'bg-slate-800 text-slate-300 border-slate-700' 
                        : 'bg-sky-50 text-sky-800 border-sky-200'
                    }`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold mb-3 transition-colors ${
                    isDark ? 'text-white group-hover:text-amber-400' : 'text-slate-900 group-hover:text-sky-600'
                  }`}>
                    {item.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {item.desc}
                  </p>
                </div>

                <div className={`pt-4 border-t flex items-center justify-between ${
                  isDark ? 'border-slate-800' : 'border-sky-100'
                }`}>
                  <span className={`text-xs font-semibold flex items-center gap-1 ${
                    isDark ? 'text-amber-400' : 'text-sky-600'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Гарантований результат
                  </span>

                  <button
                    onClick={onOpenConsultation}
                    className={`p-2 rounded-xl border transition-all ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700' 
                        : 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100'
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deye Feature Highlights Banner */}
        <div className={`mt-10 sm:mt-14 p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-sky-200 shadow-md'
        }`}>
          <div className="space-y-2 text-center md:text-left">
            <h4 className={`text-lg sm:text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Чому саме інвертори <span className={isDark ? 'text-amber-400' : 'text-sky-600'}>Deye</span>?
            </h4>
            <p className={`text-xs sm:text-sm max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Підтримка паралельного підключення, миттєве переключення за 4 мс при відключенні світла, інтеграція з дизель-генераторами та розумне керування через додаток.
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className={`font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:scale-105 transition-all flex-shrink-0 ${
              isDark 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 glow-amber' 
                : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white glow-sky'
            }`}
          >
            Замовити Розрахунок Deye
          </button>
        </div>

      </div>
    </section>
  );
}
