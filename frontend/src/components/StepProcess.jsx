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
      title: 'Проектування & Дозволи Обленерго',
      icon: FileText,
      desc: 'Розрахунок потужності (28–60 кВт для СЕС або гібридів Deye). Подача документів, отримання ТУ та офіційних дозволів від Обленерго на збільшення потужності.'
    },
    {
      step: '03',
      title: 'Доставка & Монтаж гібридів Deye',
      icon: Truck,
      desc: 'Оперативна доставка обладнання. Установка сонячних панелей на дах та професійне розгортання гібридних систем Deye і LiFePO4 акумуляторів під ключ.'
    },
    {
      step: '04',
      title: 'Налагодження, тестування та запуск',
      icon: Wrench,
      desc: 'Збірка та комутація електрощита, перевірка заземлення, випробування під навантаженням та первинний пуск СЕС / акумуляторних систем.'
    },
    {
      step: '05',
      title: 'Підключення Зеленого Тарифу & Сервіс',
      icon: Headphones,
      desc: 'Встановлення двонаправленого лічильника, підключення Зеленого Тарифу для продажу надлишків, інструктаж та постійний технічний супровід.'
    }
  ];

  return (
    <section id="process" className="py-16 sm:py-20 transition-colors duration-300 relative theme-bg-section border-t theme-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="font-semibold text-xs sm:text-sm uppercase tracking-widest px-3 py-1 rounded-full border theme-badge">
            Прозорий Процес
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-normal theme-text-primary">
            5 Кроків До Вашої <span className="theme-text-accent">Енергонезалежності</span>
          </h2>
          <p className="text-sm sm:text-lg theme-text-secondary">
            Як відбувається співпраця від першого дзвінка до виходу на виплати за Зеленим тарифом.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 theme-timeline-line" />

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
                    <div className="glass-card p-5 sm:p-8 rounded-3xl border transition-all group theme-bg-card theme-border-card">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <span className="text-2xl sm:text-3xl font-extrabold tracking-wider theme-text-accent">
                          КРОК {item.step}
                        </span>
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border theme-badge">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 theme-icon-accent" />
                        </div>
                      </div>
                      <h3 className="text-base sm:text-xl font-bold mb-2 transition-colors theme-text-primary group-hover:theme-text-accent">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed theme-text-secondary">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Circle Badge in Center (Desktop) */}
                  <div className="hidden md:flex relative z-10 w-11 h-11 rounded-full border-2 items-center justify-center shadow-lg flex-shrink-0 theme-badge">
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
            className="inline-flex items-center gap-2.5 font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-xl hover:scale-105 transition-all theme-btn-primary"
          >
            <span>Почати з Кроку 1 — Консультація</span>
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
