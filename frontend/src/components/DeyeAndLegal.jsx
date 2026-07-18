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
    <section id="deye-legal" className="py-16 sm:py-20 relative overflow-hidden transition-colors duration-300 theme-bg-section border-t theme-border-subtle">
      {/* Background Decorative Soft Glow */}
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[130px] pointer-events-none transition-all duration-500"
        style={{ background: 'var(--hero-glow)' }}
      />
      <div 
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[130px] pointer-events-none transition-all duration-500"
        style={{ background: 'var(--hero-glow)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold theme-badge">
            <ShieldCheck className="w-4 h-4 theme-icon-accent" />
            <span>Юридичний Супровід & Преміум Монтаж</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-normal theme-text-primary">
            Зелений Тариф, Дозволи Обленерго & <span className="theme-text-accent">Системи Deye</span>
          </h2>
          <p className="text-sm sm:text-lg theme-text-secondary">
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
                className="glass-card rounded-3xl p-6 sm:p-8 border flex flex-col justify-between transition-all group theme-bg-card theme-border-card"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-md theme-badge">
                      <Icon className="w-6 h-6 theme-icon-accent" />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full border theme-badge">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold mb-3 transition-colors theme-text-primary group-hover:theme-text-accent">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed mb-6 theme-text-secondary">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t theme-border-subtle flex items-center justify-between">
                  <span className="text-xs font-semibold flex items-center gap-1 theme-text-accent">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Гарантований результат
                  </span>

                  <button
                    onClick={onOpenConsultation}
                    className="p-2 rounded-xl border transition-all theme-btn-secondary"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deye Feature Highlights Banner */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 theme-bg-card theme-border-card">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-extrabold theme-text-primary">
              Чому саме інвертори <span className="theme-text-accent">Deye</span>?
            </h4>
            <p className="text-xs sm:text-sm max-w-2xl theme-text-secondary">
              Підтримка паралельного підключення, миттєве переключення за 4 мс при відключенні світла, інтеграція з дизель-генераторами та розумне керування через додаток.
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:scale-105 transition-all flex-shrink-0 theme-btn-primary"
          >
            Замовити Розрахунок Deye
          </button>
        </div>

      </div>
    </section>
  );
}
