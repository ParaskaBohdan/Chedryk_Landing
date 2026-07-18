import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, FileText, Truck, Wrench, Headphones, ArrowDown } from 'lucide-react';

export default function StepProcess({ onOpenConsultation, theme }) {
  const isDark = theme === 'dark';

  const steps = [
    {
      step: '01',
      title: 'Консультація та виїзд на об\'єкт',
      icon: PhoneCall,
      desc: 'Первинна розмова, аналіз енергетичних потреб вашого будинку чи бізнесу. Виїзд майстра (Чедрик Іван) для огляду покрівлі, електрощита та умов монтажу по Закарпаттю.'
    },
    {
      step: '02',
      title: 'Проектування та підбір обладнання',
      icon: FileText,
      desc: 'Розрахунок оптимальної потужності (28–60 кВт для СЕС або необхідної ємності акумуляторів EcoFlow). Підбір сертифікованих інверторів, кабелів та захисної автоматики.'
    },
    {
      step: '03',
      title: 'Доставка та професійний монтаж',
      icon: Truck,
      desc: 'Оперативна доставка обладнання. Установка кріплень та сонячних панелей на дах без пошкодження покрівлі. Силовий електромонтаж та прокладання трас.'
    },
    {
      step: '04',
      title: 'Налагодження, тестування та запуск',
      icon: Wrench,
      desc: 'Збірка та комутація електрощита, перевірка заземлення, випробування під навантаженням та первинний пуск СЕС / акумуляторних систем.'
    },
    {
      step: '05',
      title: 'Гарантійне та сервісне обслуговування',
      icon: Headphones,
      desc: 'Інструктаж із користування, налаштування мобільного моніторингу генерації та постійна технічна підтримка вашого об\'єкта.'
    }
  ];

  return (
    <section id="process" className={`py-16 sm:py-20 transition-colors duration-300 relative ${
      isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <span className={`font-semibold text-xs sm:text-sm uppercase tracking-widest px-3 py-1 rounded-full border ${
            isDark ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-sky-700 bg-sky-100 border-sky-200'
          }`}>
            Прозорий Процес
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            5 Кроків До Вашої <span className={isDark ? 'text-amber-400' : 'text-sky-600'}>Енергонезалежності</span>
          </h2>
          <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Як відбувається співпраця від першого дзвінка до повного запуску системи.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line for desktop */}
          <div className={`hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 ${
            isDark ? 'bg-gradient-to-b from-amber-500 via-orange-500 to-amber-500/20' : 'bg-gradient-to-b from-sky-400 via-blue-500 to-sky-300'
          }`} />

          <div className="space-y-8 sm:space-y-12">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`flex flex-col md:flex-row items-center gap-6 sm:gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Step Card */}
                  <div className="w-full md:w-1/2">
                    <div className={`glass-card p-5 sm:p-8 rounded-3xl border transition-all group ${
                      isDark 
                        ? 'border-slate-800 hover:border-amber-500/40 bg-slate-950/80' 
                        : 'border-sky-100 hover:border-sky-300 bg-sky-50/40 shadow-xs'
                    }`}>
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <span className={`text-2xl sm:text-3xl font-extrabold tracking-wider ${
                          isDark ? 'text-amber-400' : 'text-sky-600'
                        }`}>
                          КРОК {item.step}
                        </span>
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border ${
                          isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-sky-100 border-sky-300 text-sky-600'
                        }`}>
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </div>
                      <h3 className={`text-base sm:text-xl font-bold mb-2 transition-colors ${
                        isDark ? 'text-white group-hover:text-amber-400' : 'text-slate-900 group-hover:text-sky-600'
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`text-xs sm:text-sm leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Circle Badge in Center (Desktop) */}
                  <div className={`hidden md:flex relative z-10 w-11 h-11 rounded-full border-2 items-center justify-center shadow-lg flex-shrink-0 ${
                    isDark 
                      ? 'bg-slate-950 border-amber-400 text-amber-400 shadow-amber-500/20' 
                      : 'bg-white border-sky-500 text-sky-600 shadow-sky-500/10'
                  }`}>
                    <span className="text-xs font-bold">{item.step}</span>
                  </div>

                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Process Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <button
            onClick={onOpenConsultation}
            className={`inline-flex items-center gap-2.5 font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-xl hover:scale-105 transition-all ${
              isDark 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 glow-amber' 
                : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white glow-sky'
            }`}
          >
            <span>Почати з Кроку 1 — Консультація</span>
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
