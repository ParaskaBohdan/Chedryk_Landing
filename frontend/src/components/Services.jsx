import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Home, BatteryCharging, Zap, ArrowRight, CheckCircle2, ChevronRight, X, FileText } from 'lucide-react';

export default function Services({ onSelectService, theme }) {
  const [selectedModalService, setSelectedModalService] = useState(null);
  const isDark = theme === 'dark';

  const services = [
    {
      id: 'solar_plants',
      title: 'Побудова сонячних станцій (28–60 кВт)',
      category: 'Енергонезалежність під ключ',
      icon: Sun,
      darkColor: 'from-amber-500 to-orange-500',
      lightColor: 'from-sky-500 to-blue-600',
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
      darkColor: 'from-emerald-500 to-teal-600',
      lightColor: 'from-teal-500 to-sky-600',
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
      darkColor: 'from-sky-500 to-blue-600',
      lightColor: 'from-cyan-500 to-sky-600',
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
      darkColor: 'from-orange-500 to-amber-500',
      lightColor: 'from-blue-500 to-cyan-500',
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
      darkColor: 'from-purple-500 to-indigo-600',
      lightColor: 'from-blue-600 to-indigo-600',
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
    <section id="services" className={`py-16 sm:py-20 transition-colors duration-300 relative ${
      isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 border-y border-sky-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <span className={`font-semibold text-xs sm:text-sm uppercase tracking-widest px-3 py-1 rounded-full border ${
            isDark ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-sky-700 bg-sky-100 border-sky-200'
          }`}>
            Послуги Чедрика Івана
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Спеціалізовані Рішення з <span className={isDark ? 'text-amber-400' : 'text-sky-600'}>Енергозабезпечення</span>
          </h2>
          <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Повний спектр робіт від монтажу дахових батарей та систем Deye до супроводу документів в Обленерго по всій Закарпатській області.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const cardGradient = isDark ? service.darkColor : service.lightColor;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`glass-card rounded-3xl p-5 sm:p-7 border transition-all flex flex-col justify-between group ${
                  isDark 
                    ? 'border-slate-800 hover:border-slate-700' 
                    : 'border-sky-100 hover:border-sky-300 bg-sky-50/30 hover:shadow-xl hover:shadow-sky-500/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cardGradient} p-0.5 flex items-center justify-center shadow-md`}>
                      <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                        isDark ? 'bg-slate-950' : 'bg-white'
                      }`}>
                        <Icon className={`w-6 h-6 ${isDark ? 'text-amber-400' : 'text-sky-600'}`} />
                      </div>
                    </div>
                    <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${
                      isDark ? 'text-slate-400 bg-slate-800/80 border-slate-700' : 'text-sky-800 bg-sky-100/80 border-sky-200'
                    }`}>
                      {service.category}
                    </span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold mb-2 transition-colors ${
                    isDark ? 'text-white group-hover:text-amber-400' : 'text-slate-900 group-hover:text-sky-600'
                  }`}>
                    {service.title}
                  </h3>

                  <p className={`text-xs leading-relaxed mb-5 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {service.shortDesc}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feat, i) => (
                      <li key={i} className={`flex items-start gap-2 text-xs ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${isDark ? 'text-amber-400' : 'text-sky-500'}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`pt-4 border-t flex items-center justify-between gap-3 ${
                  isDark ? 'border-slate-800' : 'border-sky-100'
                }`}>
                  <button
                    onClick={() => setSelectedModalService(service)}
                    className={`text-xs font-semibold flex items-center gap-1 transition-colors ${
                      isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-sky-600'
                    }`}
                  >
                    <span>Детальніше</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className={`text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm ${
                      isDark 
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' 
                        : 'bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/20'
                    }`}
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
          <div className={`max-w-xl w-full p-6 sm:p-8 rounded-3xl border relative shadow-2xl my-8 space-y-5 transition-colors ${
            isDark ? 'glass-panel border-slate-700 bg-slate-900 text-white' : 'bg-white border-sky-200 text-slate-900 shadow-sky-500/10'
          }`}>
            <div className="flex justify-between items-start">
              <h3 className="text-xl sm:text-2xl font-bold pr-6">
                {selectedModalService.title}
              </h3>
              <button
                onClick={() => setSelectedModalService(null)}
                className={`p-1.5 rounded-full ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-sky-50'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {selectedModalService.details}
            </p>

            <div className="space-y-2">
              <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-amber-400' : 'text-sky-600'}`}>
                Що входить у вартість:
              </h4>
              <ul className="space-y-2">
                {selectedModalService.features.map((f, idx) => (
                  <li key={idx} className={`flex items-center gap-2 text-xs sm:text-sm ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-emerald-400' : 'text-sky-500'}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`pt-4 border-t flex justify-end gap-3 ${isDark ? 'border-slate-800' : 'border-sky-100'}`}>
              <button
                onClick={() => setSelectedModalService(null)}
                className={`px-4 py-2 text-xs font-semibold ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Закрити
              </button>
              <button
                onClick={() => {
                  const title = selectedModalService.title;
                  setSelectedModalService(null);
                  onSelectService(title);
                }}
                className={`font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg ${
                  isDark ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' : 'bg-sky-500 hover:bg-sky-600 text-white'
                }`}
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
