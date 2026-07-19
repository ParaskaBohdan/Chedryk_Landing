import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileCheck, Leaf, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DeyeAndLegal({ onOpenConsultation, theme }) {
  const isDark = theme === 'dark';

  const highlights = [
    {
      icon: FileCheck,
      title: 'Отримання дозволів Обленерго',
      desc: 'Повний супровід: подача заяви, проектна документація, ТУ, збільшення дозволеної вхідної потужності будинку або об\'єкта.',
      badge: '100% Бюрократія на нас'
    },
    {
      icon: Leaf,
      title: 'Підключення Зеленого Тарифу',
      desc: 'Консультації, збір документів, встановлення двонаправленого лічильника та юридичний супровід до виплат за електроенергію.',
      badge: 'Продаж надлишків'
    },
    {
      icon: Cpu,
      title: 'Гібридні системи Deye під ключ',
      desc: 'Професійний монтаж інверторів Deye (1-фазних та 3-фазних від 5 кВт до 50 кВт і більше) з інтелектуальним керуванням акумуляторами.',
      badge: 'Офіційна техніка'
    }
  ];

  return (
    <section id="deye-legal" className={`py-16 sm:py-20 relative overflow-hidden transition-colors duration-300 border-t ${
      isDark ? 'bg-slate-900 text-white border-slate-800' : 'bg-white text-slate-900 border-amber-100'
    }`}>
      {/* Background Decorative Blobs */}
      <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[140px] pointer-events-none ${
        isDark ? 'bg-amber-500/15' : 'bg-amber-400/20'
      }`} />
      <div className={`absolute top-1/2 right-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[140px] pointer-events-none ${
        isDark ? 'bg-orange-500/15' : 'bg-orange-400/20'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold ${
            isDark ? 'bg-amber-500/15 border-amber-400/40 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-800'
          }`}>
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Юридичний Супровід & Преміум Монтаж</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Зелений Тариф, Дозволи Обленерго & <span className="text-amber-500">Системи Deye</span>
          </h2>
          <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Беремо на себе найскладніші етапи — від юридичного оформлення документів до вибору інверторів Deye на Закарпатті та Франківщині.
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
                className={`glass-card rounded-3xl p-6 sm:p-8 border flex flex-col justify-between transition-all group shadow-lg ${
                  isDark ? 'border-slate-700/80 bg-slate-800/80 hover:border-amber-400/60' : 'border-amber-200 bg-white hover:border-amber-400 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-amber-400/40 bg-amber-500/15 text-amber-500 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                      isDark ? 'text-amber-300 bg-slate-800 border-slate-700' : 'text-amber-800 bg-amber-50 border-amber-200'
                    }`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold mb-3 transition-colors ${
                    isDark ? 'text-white group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'
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
                  isDark ? 'border-slate-700/80' : 'border-amber-100'
                }`}>
                  <span className="text-xs font-semibold flex items-center gap-1 text-amber-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Гарантований результат
                  </span>

                  <button
                    onClick={onOpenConsultation}
                    className={`p-2 rounded-xl border transition-all ${
                      isDark ? 'border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:border-amber-400' : 'border-amber-200 bg-amber-50 text-slate-700 hover:border-amber-400'
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
        <div className={`mt-10 sm:mt-14 p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl ${
          isDark ? 'border-slate-700 bg-slate-800/90' : 'border-amber-200 bg-white shadow-amber-500/5'
        }`}>
          <div className="space-y-2 text-center md:text-left">
            <h4 className={`text-lg sm:text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Чому саме інвертори <span className="text-amber-500">Deye</span>?
            </h4>
            <p className={`text-xs sm:text-sm max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Підтримка паралельного підключення, миттєве переключення за 4 мс при відключенні світла, інтеграція з генераторами та мобільний моніторинг.
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="btn-orange-bright font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:scale-105 transition-all flex-shrink-0 glow-amber"
          >
            Замовити Розрахунок Deye
          </button>
        </div>

      </div>
    </section>
  );
}
