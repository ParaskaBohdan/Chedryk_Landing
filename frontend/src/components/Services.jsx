import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Home, BatteryCharging, Zap, ArrowRight, CheckCircle2, ChevronRight, X } from 'lucide-react';

export default function Services({ onSelectService, theme }) {
  const [selectedModalService, setSelectedModalService] = useState(null);
  const isDark = theme === 'dark';

  const services = [
    {
      id: 'solar_plants',
      title: 'Побудова сонячних станцій (28–60 кВт)',
      category: 'Енергонезалежність під ключ',
      icon: Sun,
      color: 'from-amber-500 to-orange-500',
      shortDesc: 'Комплексне проектування, поставка інверторів, сонячних панелей та розгортання мережевих чи гібридних СЕС потужністю 28–60 кВт.',
      features: [
        'Розрахунок кута нахилу та інсоляції ділянки',
        'Підбір мережевих або автономних інверторів',
        'Монтаж металоконструкцій та симетричне навантаження',
        'Пусконалагодження та інтеграція в енергосистему'
      ],
      details: 'Повний цикл будівництва сонячних станцій середньої та високої потужності (28–60 кВт). Підходить для приватних домогосподарств, фермерських господарств та об’єктів бізнесу на Закарпатті. Допомагаємо оптимізувати власне споживання та забезпечити безперебійне живлення.'
    },
    {
      id: 'roof_panels',
      title: 'Установка сонячних панелей на дах',
      category: 'Монтажні роботи',
      icon: Home,
      color: 'from-sky-500 to-blue-600',
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
      id: 'ecoflow_batteries',
      title: 'Установка систем EcoFlow та акумуляторів',
      category: 'Автономне живлення',
      icon: BatteryCharging,
      color: 'from-emerald-500 to-teal-600',
      shortDesc: 'Інтеграція портативних зарядних станцій EcoFlow, Bluetti та стаціонарних акумуляторів LiFePO4 в електромережу будинку чи офісу.',
      features: [
        'Підключення автоматичного вводу резерву (АВР)',
        'Налаштування захисту від перезаряду та глибокого розряду',
        'Інтеграція з існуючим щитком без ризику зустрічного струму',
        'Оптимізація автономного часу роботи критичних приладів'
      ],
      details: 'Забезпечуємо безперебійну роботу газових котлів, насосів, роутерів, освітлення та побутової техніки під час відключень світла. Використовуємо надійні акумуляторні блоки з ресурсом від 3000+ циклів.'
    },
    {
      id: 'electrical_grids',
      title: 'Налагодження електромереж в будівлях',
      category: 'Електромонтажні роботи',
      icon: Zap,
      color: 'from-purple-500 to-indigo-600',
      shortDesc: 'Проектування, розведення проводки, збірка розподільчих щитів, заземлення та автоматика для приватних будинків і коммерційних приміщень.',
      features: [
        'Розрахунок навантаження на кожну фазу',
        'Збірка щитів із ПЗВ, реле напруги та автоматографією',
        'Прокладання вогнестійкого кабелю ГОСТ',
        'Вимірювання опору заземлення та усунення несправностей'
      ],
      details: 'Чедрик Іван виконує електромонтажні роботи будь-якої складності. Гарантуємо пожежну безпеку, правильне балансування фаз та сучасне маркування кожного автомата у вашому щитку.'
    }
  ];

  return (
    <section id="services" className={`py-16 sm:py-20 transition-colors duration-300 relative ${
      isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 border-y border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <span className={`font-semibold text-xs sm:text-sm uppercase tracking-widest px-3 py-1 rounded-full border ${
            isDark ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-amber-700 bg-amber-100 border-amber-200'
          }`}>
            Послуги Чедрика Івана
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Спеціалізовані Рішення з <span className="text-amber-500">Енергозабезпечення</span>
          </h2>
          <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Повний спектр робіт від монтажу дахових сонячних батарей до збірки складних електрощитів по всій Закарпатській області.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`glass-card rounded-3xl p-5 sm:p-8 border transition-all flex flex-col justify-between group ${
                  isDark 
                    ? 'border-slate-800 hover:border-slate-700' 
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:shadow-xl'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 flex items-center justify-center shadow-md`}>
                      <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                        isDark ? 'bg-slate-950' : 'bg-white'
                      }`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500" />
                      </div>
                    </div>
                    <span className={`text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full border ${
                      isDark ? 'text-slate-400 bg-slate-800/80 border-slate-700' : 'text-slate-600 bg-slate-100 border-slate-200'
                    }`}>
                      {service.category}
                    </span>
                  </div>

                  <h3 className={`text-lg sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-amber-500 transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {service.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {service.shortDesc}
                  </p>

                  <ul className="space-y-2 mb-6 sm:mb-8">
                    {service.features.map((feat, i) => (
                      <li key={i} className={`flex items-start gap-2 text-xs sm:text-sm ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}>
                  <button
                    onClick={() => setSelectedModalService(service)}
                    className={`text-xs font-semibold flex items-center gap-1 transition-colors ${
                      isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <span>Детальніше про послугу</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
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
            isDark ? 'glass-panel border-slate-700 bg-slate-900 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex justify-between items-start">
              <h3 className="text-xl sm:text-2xl font-bold pr-6">
                {selectedModalService.title}
              </h3>
              <button
                onClick={() => setSelectedModalService(null)}
                className={`p-1.5 rounded-full ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {selectedModalService.details}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider">Що входить у вартість:</h4>
              <ul className="space-y-2">
                {selectedModalService.features.map((f, idx) => (
                  <li key={idx} className={`flex items-center gap-2 text-xs sm:text-sm ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`pt-4 border-t flex justify-end gap-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
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
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg"
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
