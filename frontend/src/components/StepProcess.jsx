import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, FileText, Truck, Wrench, Headphones, ArrowDown } from 'lucide-react';

export default function StepProcess({ onOpenConsultation }) {
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
    <section id="process" className="py-20 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-400 font-semibold text-xs sm:text-sm uppercase tracking-widest px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
            Прозорий Процес
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            5 Кроків До Вашої <span className="text-amber-400">Енергонезалежності</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Як відбувається співпраця від першого дзвінка до повного запуску системи.
          </p>
        </div>

        {/* Vertical Animated Process Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-amber-500 via-orange-500 to-amber-500/20 -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Step Card */}
                  <div className="w-full md:w-1/2">
                    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all group shadow-xl">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-extrabold text-amber-400/90 tracking-wider">
                          КРОК {item.step}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                          <Icon className="w-5 h-5 text-amber-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Circle Badge in Center */}
                  <div className="hidden md:flex relative z-10 w-12 h-12 rounded-full bg-slate-950 border-2 border-amber-400 items-center justify-center shadow-lg shadow-amber-500/20 flex-shrink-0">
                    <span className="text-xs font-bold text-amber-400">{item.step}</span>
                  </div>

                  {/* Empty Spacer for alternating layout */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Process Bottom Call to Action */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-base px-8 py-4 rounded-xl shadow-xl glow-amber hover:scale-105 transition-all"
          >
            <span>Почати з Кроку 1 — Консультація</span>
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
