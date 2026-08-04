import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sun, Home, BatteryCharging, Zap, ArrowRight, CheckCircle2, ChevronRight, ChevronLeft, X, FileText, Calculator } from 'lucide-react';
import SolarPanelCard from './SolarPanelCard';
import { SectionAmbience } from './SolarDetails';
import { LiveBadge, EfficiencyMeter } from './SolarTech';
import {
  SolarFarmScene,
  HybridSystemScene,
  RoofMountScene,
  PermitsScene,
  SwitchboardScene,
  CalculatorScene
} from './ServiceIllustrations';

export default function Services({ onSelectService, theme }) {
  const [selectedModalService, setSelectedModalService] = useState(null);
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchOffsetX, setTouchOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSwipingHorizontally, setIsSwipingHorizontally] = useState(false);
  const [isSwipingVertically, setIsSwipingVertically] = useState(false);
  const isDark = theme === 'dark';

  // НАЛАШТУВАННЯ ЗАДЕРЖОК (в мілісекундах)
  const BUTTON_COOLDOWN = 100; // Нативно швидкий відгук на кнопки
  const SWIPE_COOLDOWN = 50;  // Нативно швидкий відгук на свайпи

  const activeIndex = ((virtualIndex % 6) + 6) % 6;

  const getCardOffset = (itemIndex, vIndex, totalItems = 6) => {
    const activeMod = ((vIndex % totalItems) + totalItems) % totalItems;
    let diff = itemIndex - activeMod;
    const half = totalItems / 2;
    while (diff < -half) diff += totalItems;
    while (diff >= half) diff -= totalItems;
    return diff;
  };

  const handleTouchStart = (e) => {
    if (cooldownActive) return;
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setTouchOffsetX(0);
    setIsDragging(true);
    setIsSwipingHorizontally(false);
    setIsSwipingVertically(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX;
    const diffY = currentY - touchStartY;

    if (!isSwipingHorizontally && !isSwipingVertically) {
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 5) {
        setIsSwipingHorizontally(true);
      } else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 5) {
        setIsSwipingVertically(true);
      }
    }

    if (isSwipingHorizontally) {
      setTouchOffsetX(diffX);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (isSwipingHorizontally) {
      const cardWidth = Math.min(window.innerWidth || 360, 448) - 16;
      let shift = Math.round(touchOffsetX / cardWidth);
      
      if (shift === 0) {
        const flickThreshold = 40;
        if (touchOffsetX < -flickThreshold) {
          shift = -1;
        } else if (touchOffsetX > flickThreshold) {
          shift = 1;
        }
      }

      if (shift !== 0) {
        handleSwipeShift(-shift);
      }
    }
    setTouchOffsetX(0);
    setIsSwipingHorizontally(false);
    setIsSwipingVertically(false);
  };

  const handleSwipeShift = (delta) => {
    if (cooldownActive) return;
    setCooldownActive(true);

    setTimeout(() => {
      setCooldownActive(false);
    }, SWIPE_COOLDOWN);

    setVirtualIndex(prev => prev + delta);
  };

  const handleNext = (source = 'button') => {
    if (cooldownActive) return;
    setCooldownActive(true);

    const delay = source === 'swipe' ? SWIPE_COOLDOWN : BUTTON_COOLDOWN;
    setTimeout(() => {
      setCooldownActive(false);
    }, delay);

    setVirtualIndex(prev => prev + 1);
  };

  const handlePrev = (source = 'button') => {
    if (cooldownActive) return;
    setCooldownActive(true);

    const delay = source === 'swipe' ? SWIPE_COOLDOWN : BUTTON_COOLDOWN;
    setTimeout(() => {
      setCooldownActive(false);
    }, delay);

    setVirtualIndex(prev => prev - 1);
  };

  const handleDotClick = (targetIndex) => {
    if (cooldownActive) return;
    setCooldownActive(true);
    setTimeout(() => setCooldownActive(false), BUTTON_COOLDOWN);

    let diff = targetIndex - activeIndex;
    const half = 6 / 2;
    if (diff > half) diff -= 6;
    if (diff < -half) diff += 6;

    setVirtualIndex(prev => prev + diff);
  };

  const services = [
    {
      id: 'calculator_slide',
      title: 'Розрахунок вартості СЕС та окупності',
      category: 'Калькулятор СЕС',
      icon: Calculator,
      color: 'from-amber-500 to-yellow-500',
      Illustration: CalculatorScene,
      status: 'Interactive Calculator',
      targetUrl: '/calculator',
      specs: [
        { label: 'Calculation time', value: '1 хв' },
        { label: 'Accuracy', value: 'Висока' },
        { label: 'Cost estimate', value: 'Безкоштовно' }
      ],
      meter: { label: 'Calculation Speed', value: 99.9, tone: 'amber', live: false },
      shortDesc: 'Розрахуйте вартість сонячної станції під ключ, необхідну кількість панелей, ємність акумуляторів та термін окупності для вашого будинку.',
      features: [
        'Вибір типу даху та покрівлі',
        'Розрахунок кількості панелей та бренду',
        'Підбір ємності акумуляторів Deye/EcoFlow',
        'Детальний кошторис та окупність СЕС'
      ],
      details: 'Інтерактивний онлайн-калькулятор сонячної електростанції під ключ. Дозволяє за лічені секунди отримати орієнтовну вартість обладнання та монтажу.'
    },
    {
      id: 'solar_plants',
      title: 'Побудова сонячних станцій (5 кВт – 1 МВт)',
      category: 'Енергонезалежність під ключ',
      icon: Sun,
      color: 'from-amber-400 to-orange-500',
      Illustration: SolarFarmScene,
      status: 'Turnkey EPC · 5 kW–1 MW',
      targetUrl: '/services/ses-building',
      specs: [
        { label: 'Peak Output', value: '1 МВт' },
        { label: 'Specific Yield', value: '1 180 кВт·год/кВт' },
        { label: 'Payback', value: '3.5–4.5 років' }
      ],
      meter: { label: 'System Efficiency', value: 23.8, tone: 'amber', live: true },
      shortDesc: 'Проектування, поставка інверторів, панелей, дозволи Обленерго та Зелений тариф для приватних будинків і підприємств.',
      features: [
        'Розрахунок інсоляції та проектування СЕС від 5 кВт до 1 МВт',
        'Супровід документації та отримання дозволів Обленерго',
        'Підключення Зеленого тарифу для продажу надлишків',
        'Пусконалагодження по Закарпатській та Франківській областях'
      ],
      details: 'Повний цикл будівництва сонячних станцій від компактних домашніх (5–15 кВт) до промислових сонячних станцій (до 1 МВт). Підходить для приватних будинків, агрокомплексів, виробництв та об’єктів бізнесу. Беремо на себе розробку ТУ, виїзди та Зелений тариф.'
    },
    {
      id: 'deye_batteries',
      title: 'Гібридні системи Deye та акумулятори',
      category: 'Автономне живлення під ключ',
      icon: BatteryCharging,
      color: 'from-orange-400 to-amber-500',
      Illustration: HybridSystemScene,
      status: 'Hybrid Inverter Ready',
      targetUrl: '/services/hybrid-systems',
      specs: [
        { label: 'Switchover', value: '4 мс' },
        { label: 'Battery Bus', value: 'LiFePO4 · 48 В' },
        { label: 'Power Range', value: '5–50 кВт' }
      ],
      meter: { label: 'Round-Trip Efficiency', value: 96.2, tone: 'emerald', live: true },
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
      Illustration: RoofMountScene,
      status: 'Roof Load Certified',
      targetUrl: '/services/roof-installation',
      specs: [
        { label: 'Tilt Range', value: '15–40°' },
        { label: 'Wind Load', value: 'до 24 м/с' },
        { label: 'Clamps', value: 'Inox A2 · EPDM' }
      ],
      meter: { label: 'Roof Coverage', value: 82.5, tone: 'sky', live: false },
      shortDesc: 'Професійне закріплення панелей на різні типи даху (черепиця, металочерепиця, профнастил, фальцева покрівля) без ризику протікання.',
      features: [
        'Надійні герметичні кріплення (нержавійка/алюміній)',
        'Безпечний підйом та монтаж фотомодулів',
        'Кабельний менеджмент зі стійкістю до УФ-випромінювання',
        'Діагностика цілісності даху до та після встановлення'
      ],
      details: 'Монтаж сонячних панелей проводиться з сувором дотриманням технологічних норм та герметизації покрівлі. Використовуємо спецінструмент для надійної фіксації навіть при сильних вітрових навантаженнях.'
    },
    {
      id: 'legal_tariff',
      title: 'Супровід документації & Зелений Тариф',
      category: 'Юридичні послуги',
      icon: FileText,
      color: 'from-orange-500 to-amber-400',
      Illustration: PermitsScene,
      status: 'Permits Handled',
      targetUrl: '/tariffs',
      specs: [
        { label: 'Docs Handled', value: '100% на нас' },
        { label: 'ТУ Обленерго', value: '14–30 днів' },
        { label: 'Metering', value: 'Bi-directional' }
      ],
      meter: { label: 'Approval Rate', value: 99.2, tone: 'emerald', live: false },
      shortDesc: 'Оформлення дозволів в Обленерго, ТУ, збільшення вхідної потужності та офіційне підключення Зеленого Тарифу без черг.',
      features: [
        'Подача заяви та отримання ТУ від Обленерго',
        'Збільшення дозволеної потужності електромережі',
        'Встановлення двонаправленого лічильника',
        'Підписання договору про продаж електроенергії'
      ],
      details: 'Чедрик Іван бере на себе весь бюрократичний процес. Вам не потрібно самостійно стояти в чергах Обленерго — ми підготуємо повний пакет документів під ключ.'
    },
    {
      id: 'electrical_grids',
      title: 'Налагодження електромереж в будівлях',
      category: 'Електромонтажні роботи',
      icon: Zap,
      color: 'from-amber-500 to-orange-400',
      Illustration: SwitchboardScene,
      status: 'ПУЕ / ДБН Compliant',
      targetUrl: '/services/battery-systems',
      specs: [
        { label: 'Ground Resist.', value: '< 4 Ом' },
        { label: 'Supply', value: '1Ф / 3Ф · 400 В' },
        { label: 'Protection', value: 'ПЗВ 30 мА' }
      ],
      meter: { label: 'Phase Balance', value: 97.6, tone: 'emerald', live: true },
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

  const loopSlides = [
    services[services.length - 2],
    services[services.length - 1],
    ...services,
    services[0],
    services[1]
  ];

  return (
    <section id="services" className={`pt-3 pb-16 md:py-20 transition-colors duration-300 relative border-y scroll-mt-20 ${
      isDark ? 'bg-slate-900 text-white border-slate-800' : 'bg-slate-100/70 text-slate-900 border-slate-200'
    }`}>
      <SectionAmbience flares={false} beams={false} />

      {/* Ambient Solar Lighting (clipped locally so the modal stays unaffected) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="solar-flare w-[220px] sm:w-[380px] h-[220px] sm:h-[380px] -top-28 right-[6%]" />
        <div className="solar-flare w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bottom-[10%] left-[4%]" style={{ animationDelay: '3.6s' }} />
        <div className="solar-beam hidden sm:block w-[100px] h-[600px] -top-44 left-[30%]" />
        <div className="solar-beam hidden lg:block w-[70px] h-[520px] -top-36 right-[26%]" style={{ animationDelay: '5s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="hidden md:block text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold uppercase tracking-widest ${
            isDark ? 'bg-amber-500/15 border-[#fbbf24] text-[#fde68a]' : 'bg-amber-50 border-orange-400 text-slate-800'
          }`}>
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Послуги Чедрика Івана</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Спеціалізовані Рішення з <span className="text-amber-500">Енергозабезпечення</span>
          </h2>
          <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Повний спектр робіт від монтажу дахових батарей (5 кВт – 1 МВт) та систем Deye до Зеленого тарифу в Закарпатській та Івано-Франківській областях.
          </p>
        </div>

        {/* Services Grid (Desktop/Tablet only) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <SolarPanelCard
                  theme={theme}
                  className="h-full p-5 sm:p-7 group shadow-md"
                  contentClassName="flex flex-col justify-between"
                >
                <div>
                  {/* Concept illustration with overlaid status telemetry */}
                  <div className="relative rounded-2xl overflow-hidden mb-5">
                    <service.Illustration theme={theme} />
                    <div className="absolute top-2.5 left-2.5">
                      <LiveBadge theme={theme} label={service.status} tone={index % 2 === 0 ? 'amber' : 'sky'} />
                    </div>
                    <div
                      className={`absolute bottom-2.5 right-2.5 glass-deep rounded-lg px-2 py-1 text-[9px] font-bold telemetry-label ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      SVC {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 flex items-center justify-center shadow-md`}>
                      <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                        isDark ? 'bg-slate-900' : 'bg-white'
                      }`}>
                        <Icon className="w-6 h-6 text-amber-500" />
                      </div>
                    </div>
                    <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${
                      isDark ? 'text-slate-300 bg-slate-800/90 border-slate-700' : 'text-slate-700 bg-slate-100 border-slate-300'
                    }`}>
                      {service.category}
                    </span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold mb-2 transition-colors ${
                    isDark ? 'text-white group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'
                  }`}>
                    {service.title}
                  </h3>

                  <p className={`text-xs leading-relaxed mb-5 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {service.shortDesc}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {service.features.map((feat, i) => (
                      <li key={i} className={`flex items-start gap-2 text-xs ${
                        isDark ? 'text-slate-200' : 'text-slate-700'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-500" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Spec sheet */}
                  <dl className="mb-5">
                    {service.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className={`flex items-baseline justify-between gap-3 py-1.5 border-b border-dashed ${
                          isDark ? 'border-slate-700/60' : 'border-slate-300/70'
                        }`}
                      >
                        <dt className={`text-[10px] font-bold telemetry-label ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {spec.label}
                        </dt>
                        <dd className={`text-[11px] font-black tabular-nums text-right ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Live readout */}
                  <div className="mb-5">
                    <EfficiencyMeter
                      theme={theme}
                      label={service.meter.label}
                      value={service.meter.value}
                      tone={service.meter.tone}
                      live={service.meter.live}
                    />
                  </div>
                </div>

                <div className={`pt-4 border-t flex items-center justify-between gap-3 ${
                  isDark ? 'border-slate-700/80' : 'border-slate-200'
                }`}>
                  <button
                    onClick={() => setSelectedModalService(service)}
                    className={`text-xs font-semibold flex items-center gap-1 transition-colors ${
                      isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <span>Детальніше</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className="btn-orange-bright text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md glow-amber"
                  >
                    <span>Замовити</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                </SolarPanelCard>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Slider (Phones/Mobile only) */}
        {(() => {
          return (
            <div className="md:hidden flex flex-col items-center">
              {/* Slide Wrapper Container */}
              <div 
                className="w-full max-w-md overflow-hidden relative min-h-[425px] h-[425px] mt-2 touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {services.map((service, index) => {
                  const offset = getCardOffset(index, virtualIndex, services.length);
                  const isVisibleRange = Math.abs(offset + (isDragging ? touchOffsetX / 300 : 0)) <= 1.8;
                  const currentPos = `calc(${offset * 100}% + ${isDragging ? touchOffsetX : 0}px)`;

                  return (
                    <div
                      key={service.id}
                      className="absolute top-0 left-0 w-full h-full px-1.5"
                      style={{
                        transform: `translateX(${currentPos})`,
                        transition: isDragging || !isVisibleRange ? 'none' : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        visibility: isVisibleRange ? 'visible' : 'hidden'
                      }}
                    >
                      <SolarPanelCard
                        theme={theme}
                        className="p-5 relative flex flex-col group shadow-lg min-h-[425px] h-[425px]"
                        contentClassName="flex flex-col h-full justify-between"
                      >
                        <div className="flex flex-col h-full justify-between">
                          <div className="flex flex-col">
                            {/* 1. Illustration (Image) at the top */}
                            <div className="relative rounded-2xl overflow-hidden w-full aspect-video flex items-center justify-center bg-slate-950/20 mb-4">
                              <service.Illustration theme={theme} />
                              
                              {/* Status telemetry overlay */}
                              <div className="absolute top-2.5 left-2.5">
                                <LiveBadge theme={theme} label={service.status} tone={index % 2 === 0 ? 'amber' : 'sky'} />
                              </div>
                            </div>

                            {/* 2. Title */}
                            <h3 className={`text-base font-bold transition-colors mb-2 ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}>
                              {service.title}
                            </h3>

                            {/* 3. Short description */}
                            <p className={`text-xs leading-relaxed ${
                              isDark ? 'text-slate-300' : 'text-slate-600'
                            }`}>
                              {service.shortDesc}
                            </p>
                          </div>

                          {/* 4. Button "Детальніше" / "Отримати розрахунок" below the text */}
                          <div className="pt-4">
                            <Link
                              to={service.targetUrl}
                              className="block w-full py-3.5 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest text-center shadow-lg transition-transform active:scale-98 cursor-pointer"
                            >
                              {service.id === 'calculator_slide' ? 'Отримати розрахунок' : 'Детальніше'}
                            </Link>
                          </div>
                        </div>
                      </SolarPanelCard>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between w-full max-w-sm px-6 mt-4">
                <button
                  onClick={() => handlePrev('button')}
                  className={`p-2 rounded-full border transition-colors cursor-pointer ${
                    isDark ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white' : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900 shadow-sm'
                  }`}
                  aria-label="Попередній слайд"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dot Indicators */}
                <div className="flex items-center gap-3.5">
                  {services.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleDotClick(i)}
                      className={`transition-all duration-300 cursor-pointer flex items-center justify-center rounded-full ${
                        activeIndex === i
                          ? 'w-4 h-4 border border-amber-500 bg-transparent'
                          : 'w-2 h-2 ' + (isDark ? 'bg-slate-700' : 'bg-slate-300')
                      }`}
                      aria-label={`Перейти до слайду ${i + 1}`}
                    >
                      {activeIndex === i && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleNext('button')}
                  className={`p-2 rounded-full border transition-colors cursor-pointer ${
                    isDark ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white' : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900 shadow-sm'
                  }`}
                  aria-label="Наступний слайд"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Service Detail Modal */}
      {selectedModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className={`max-w-xl w-full p-6 sm:p-8 rounded-3xl border relative shadow-2xl my-8 space-y-5 transition-colors ${
            isDark ? 'glass-panel border-slate-700 bg-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xl'
          }`}>
            <div className="flex justify-between items-start">
              <h3 className="text-xl sm:text-2xl font-bold pr-6">
                {selectedModalService.title}
              </h3>
              <button
                onClick={() => setSelectedModalService(null)}
                className={`p-1.5 rounded-full ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
              {selectedModalService.details}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500">
                Що входить у вартість:
              </h4>
              <ul className="space-y-2">
                {selectedModalService.features.map((f, idx) => (
                  <li key={idx} className={`flex items-center gap-2 text-xs sm:text-sm ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`pt-4 border-t flex justify-end gap-3 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
              <button
                onClick={() => setSelectedModalService(null)}
                className={`px-4 py-2 text-xs font-semibold ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Закрити
              </button>
              <button
                onClick={() => {
                  const title = selectedModalService.title;
                  setSelectedModalService(null);
                  onSelectService(title);
                }}
                className="btn-orange-bright font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg"
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
