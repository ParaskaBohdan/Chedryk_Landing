import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Home, BatteryCharging, Zap, ArrowRight, CheckCircle2, ChevronRight, X, FileText } from 'lucide-react';

export default function Services({ onSelectService }) {
  const [selectedModalService, setSelectedModalService] = useState(null);

  const services = [
    {
      id: 'solar_plants',
      title: 'Побудова сонячних станцій (28–60 кВт)',
      category: 'Енергонезалежність під ключ',
      icon: Sun,
      color: 'from-amber-400 to-orange-500',
      shortDesc: 'Комплексне проектування, поставка інверторів, сонячних панелей, отримання дозволів Обленерго та підключення Зеленого тарифу.',
      features: [
        'Розрахунок інсоляції та проектування СЕС 28–60 кВт',
        'Супровід документації та отримання дозволів Обленерго',
        'Підключення Зеленого тарифу для продажу надлишків',
        'Пусконалагодження та інтеграція в енергосистему'
      ],
      details: 'Повний цикл будівництва сонячних станцій середньої та високої потужності (28–60 кВт). Підходить для приватних домогосподарств, фермерських господарств та об’єктів бізнесу на Закарпатті. Беремо на себе повне оформлення Зеленого тарифу та узгодження з Обленерго.'
    },
    {
      id: 'deye_batteries',
      title: 'Гібридні системи Deye та акумулятори',
      category: 'Автономне живлення під ключ',
      icon: BatteryCharging,
      color: 'from-orange-400 to-amber-500',
      shortDesc: 'Монтаж під ключ інверторів Deye (1-фазних та 3-фазних 5–50 кВт), портативних станцій EcoFlow та стаціонарних акумуляторів LiFePO4.',
      features: [
        'Професійний монтаж гібридних інверторів Deye під ключ',
        'Підключення автоматичного вводу резерву (АВР 4 мс)',
        'Інтеграція EcoFlow, Bluetti та LiFePO4 акумуляторів',
        'Налаштування мобільного моніторингу та захисту'
      ],
      details: 'Забезпечуємо безперебійну роботу вашого будинку чи бізнесу під час відключень світла. Монтаж гібридних інверторів Deye дозволяє розумно керувати енергією від сонця, акумуляторів, генератора та мережі.'
    },
    {
      id: 'roof_panels',
      title: 'Установка сонячних панелей на дах',
      category: 'Монтажні роботи',
      icon: Home,
      color: 'from-amber-400 to-yellow-500',
      shortDesc: 'Професійне закріплення панелей на різні типи даху (черепиця, металочерепиця, профнастил, фальцева покрівля) без ризику протікання.',
      features: [
        'Надійні герметичні кріплення (нержавійка/алюміній)',
        'Безпечний підйом та монтаж фотомодулів',
        'Кабельний менеджмент зі стійкістю до УФ-випромінювання',
        'Діагностика цілісності даху до та після встановлення'
      ],
      details: 'Монтаж сонячних панелей проводиться з суворим дотриманням технологічних норм та герметизації покрівлі. Використовуємо спецінструмент для надійної фіксації навіть при сильних вітрових навантаженнях на Закарпатті.'
    },
    {
      id: 'legal_tariff',
      title: 'Супровід документації & Зелений Тариф',
      category: 'Юридичні послуги',
      icon: FileText,
      color: 'from-orange-500 to-amber-400',
      shortDesc: 'Оформлення дозволів в Обленерго, ТУ, збільшення вхідної потужності та офіційне підключення Зеленого Тарифу без черг.',
      features: [
        'Подача заяви та отримання ТУ від Обленерго',
        'Збільшення дозволеної потужності електромережі',
        'Встановлення двонаправленого лічильника',
        'Підписання договору про продаж електроенергії'
      ],
      details: 'Чедрик Іван бере на себе весь бюрократичний процеси. Вам не потрібно самостійно стояти в чергах Обленерго — ми підготуємо повний пакет документів під ключ.'
    },
    {
      id: 'electrical_grids',
      title: 'Налагодження електромереж в будівлях',
      category: 'Електромонтажні роботи',
      icon: Zap,
      color: 'from-amber-500 to-orange-400',
      shortDesc: 'Проектування, розведення проводки, збірка розподільчих щитів, заземлення та автоматика для приватних будинків і коммерційних приміщень.',
      features: [
        'Розрахунок навантаження на кожну фазу',
        'Збірка щитів із ПЗВ, реле напруги та автоматикою',
        'Прокладання вогнестійкого кабелю ГОСТ',
        'Вимірювання опору заземлення та усунення несправностей'
      ],
      details: 'Чедрик Іван виконує електромонтажні роботи будь-якої складності. Гарантуємо пожежну безпеку, правильне балансування фаз та сучасне маркування кожного автомата у вашому щитку.'
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-20 bg-slate-900/90 text-white relative border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="font-semibold text-xs sm:text-sm uppercase tracking-widest px-3 py-1 rounded-full border border-amber-400/40 bg-amber-500/15 text-amber-300">
            Послуги Чедрика Івана
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Спеціалізовані Рішення з <span className="text-amber-400">Енергозабезпечення</span>
          </h2>
          <p className="text-sm sm:text-lg text-slate-300">
            Повний спектр робіт від монтажу дахових батарей та систем Deye до супроводу документів в Обленерго по всій Закарпатській області.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="glass-card rounded-3xl p-5 sm:p-7 border border-slate-700/80 bg-slate-800/80 hover:border-amber-400/60 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 flex items-center justify-center shadow-md`}>
                      <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-amber-400" />
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full border border-slate-700 bg-slate-800/90 text-slate-300">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs leading-relaxed mb-5 text-slate-300">
                    {service.shortDesc}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedModalService(service)}
                    className="text-xs font-semibold flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                  >
                    <span>Детальніше</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className="btn-orange-bright text-slate-950 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md glow-amber"
                  >
                    <span>Замовити</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="max-w-xl w-full p-6 sm:p-8 rounded-3xl border border-slate-700 bg-slate-800 text-white relative shadow-2xl my-8 space-y-5">
            <div className="flex justify-between items-start">
              <h3 className="text-xl sm:text-2xl font-bold pr-6">
                {selectedModalService.title}
              </h3>
              <button
                onClick={() => setSelectedModalService(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
              {selectedModalService.details}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Що входить у вартість:
              </h4>
              <ul className="space-y-2">
                {selectedModalService.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-700 flex justify-end gap-3">
              <button
                onClick={() => setSelectedModalService(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Закрити
              </button>
              <button
                onClick={() => {
                  const title = selectedModalService.title;
                  setSelectedModalService(null);
                  onSelectService(title);
                }}
                className="btn-orange-bright font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg text-slate-950"
              >
                Замовити для цього об'єкта
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
