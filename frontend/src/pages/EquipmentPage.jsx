import React, { useState, useEffect } from 'react';
import { Sun, BatteryCharging, Cpu, Layers, ShieldCheck, CheckCircle2, Zap, Wrench, ArrowRight, MessageSquare } from 'lucide-react';

export default function EquipmentPage({ theme, onOpenConsultation }) {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('panels'); // 'panels' | 'batteries' | 'inverters' | 'mounting'

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = 'Каталог Комплектуючих — Nova Energy';
  }, []);

  // Solar Panels Data
  const solarPanelsData = [
    {
      id: 'jinko-585',
      brand: 'Jinko Solar',
      model: 'Tiger Neo N-Type 585W',
      tech: 'N-Type TOPCon / Bifacial',
      power: '585 Вт',
      efficiency: '22.6%',
      dimensions: '2278 × 1134 × 30 мм',
      weight: '28.0 кг',
      warranty: '25 років продукт / 30 років генерація',
      degradation: '< 0.4% на рік',
      features: ['Низький температурний коефіцієнт (-0.29%/°C)', 'Двостороннє знімання енергії (+15-20%)', 'Скло-Скло захист від граду та снігу'],
      recommendedFor: 'Скаті та плоскі дахи приватних будинків',
      badge: 'ТОП Вибір 2026'
    },
    {
      id: 'risen-550',
      brand: 'Risen Energy',
      model: 'Titanium PERC 550W',
      tech: 'Monocrystalline Half-Cell',
      power: '550 Вт',
      efficiency: '21.3%',
      dimensions: '2279 × 1134 × 35 мм',
      weight: '27.8 кг',
      warranty: '12 років продукт / 25 років генерація',
      degradation: '< 0.55% на рік',
      features: ['Оптимальне співвідношення ціна/якість', 'Високий опір PID та PID-Free', 'Підсилена алюмінієва рама 35 мм'],
      recommendedFor: 'Бюджетні та середні домашні СЕС 10-30 кВт',
      badge: 'Бестселер'
    },
    {
      id: 'longi-600',
      brand: 'LONGi Solar',
      model: 'Hi-MO X6 Max 600W',
      tech: 'HPBC Cell Technology',
      power: '600 Вт',
      efficiency: '22.8%',
      dimensions: '2384 × 1134 × 30 мм',
      weight: '28.5 кг',
      warranty: '25 років продукт / 30 років генерація',
      degradation: '< 0.35% на рік',
      features: ['Максимальний ККД на ринку 22.8%', 'Преміальний чорний дизайн (Full Black)', 'Стійкість до затінення окремих осередків'],
      recommendedFor: "Преміум об'єкти та обмежена площа даху",
      badge: 'Преміум ККД'
    },
    {
      id: 'ja-670',
      brand: 'JA Solar',
      model: 'DeepBlue 4.0 Pro 670W',
      tech: 'N-Type Bifacial Large Format',
      power: '670 Вт',
      efficiency: '22.1%',
      dimensions: '2384 × 1303 × 35 мм',
      weight: '33.5 кг',
      warranty: '12 років продукт / 30 років генерація',
      degradation: '< 0.4% на рік',
      features: ['Максимальна потужність 670 Вт з 1 модуля', 'Економія на кріпильних металоконструкціях', 'Розраховані на промислові навантаження'],
      recommendedFor: 'Комерційні СЕС 50 кВт – 1 МВт та наземні ферми',
      badge: 'Промисловий Гігант'
    }
  ];

  // Battery Energy Storage Systems Data
  const batteriesData = [
    {
      id: 'deye-bos',
      brand: 'Deye',
      series: 'LiFePO4 BOS-G / SE-G5.1',
      chemistry: 'Літій-залізо-фосфат (LiFePO4)',
      capacities: ['5.12 кВт·год', '10.24 кВт·год', '15.36 кВт·год', '20.48 – 61 кВт·год'],
      voltageType: 'Низьковольтні (48V) & Високовольтні (HV 160-600V)',
      cycles: '6000+ циклів (DOD 80%)',
      lifespan: '15+ років активної експлуатації',
      bms: 'Інтелектуальна CAN/RS485 BMS з балансуванням осередків',
      features: [
        'Повна безшовна сумісність з інверторами Deye',
        'Модульна шафа 19" з можливістю гарячого розширення',
        'Вбудований АВР (введення резерву за 4 мілісекунди)',
        'Безпечна хімія: не вибухає та не горить при пробої'
      ],
      badge: 'Флагман Автономії'
    },
    {
      id: 'ecoflow-powerkits',
      brand: 'EcoFlow',
      series: 'Power Kits & DELTA Pro Ultra',
      chemistry: 'LiFePO4 Premium Grade',
      capacities: ['3.6 кВт·год', '7.2 кВт·год', '15 кВт·год', 'до 45 кВт·год'],
      voltageType: 'Plug & Play 48V / 102V Smart System',
      cycles: '3500 – 6500+ циклів',
      lifespan: '10-15 років',
      bms: 'EcoFlow Multi-Protection BMS з додатком для смартфона',
      features: [
        'Компактні рішення Plug-and-Play без зайвої комутації',
        'Швидка зарядка від мережі, сонця та генератора одночасно',
        'Керування та віддалений моніторинг через мобільний додаток',
        'Ідеально для швидкого монтажу в будинках та офісах'
      ],
      badge: 'Мобільність & Смарт'
    },
    {
      id: 'pylontech-us',
      brand: 'Pylontech',
      series: 'US5000 / Force L2',
      chemistry: 'LiFePO4 (LFP)',
      capacities: ['4.8 кВт·год', '9.6 кВт·год', '14.4 кВт·год', 'до 28.8 кВт·год'],
      voltageType: 'Низьковольтні (48V)',
      cycles: '6000+ циклів (DOD 95%)',
      lifespan: '15 років',
      bms: 'Повна автоматична захисна система BMS',
      features: [
        'Світовий стандарт надійності для гібридних СЕС',
        'Глибина розряду DOD до 95% без втрати ресурсу',
        "Сумісність з 99% інверторів на ринку"
      ],
      badge: 'Перевірена Класика'
    },
    {
      id: 'dyness-tower',
      brand: 'Dyness',
      series: 'Tower & Powerbox Pro',
      chemistry: 'LiFePO4 High Safety',
      capacities: ['5.12 кВт·год', '10.24 кВт·год', '15.36 кВт·год', '20.48 кВт·год'],
      voltageType: 'High Voltage / Low Voltage Stackable',
      cycles: '6000+ циклів',
      lifespan: '15 років',
      bms: 'Smart BMS з IP65 вологозахистом',
      features: [
        "Стековий вертикальний дизайн без кабельних з'єднань",
        'Клас захисту IP65 (можна ставити у гаражі або на терасі)',
        'Високий струм розряду для старту потужних насосів/компресорів'
      ],
      badge: 'Захист IP65'
    }
  ];

  // Deye Inverters Data
  const invertersData = [
    {
      power: '5 – 8 кВт (1-фазні)',
      model: 'Deye SUN-5/8K-SG04LP1-EU',
      phases: '1 Фаза (220V)',
      mppt: '2 MPPT трекери (до 10.4 кВт панелей)',
      backupSpeed: '4 мс (АВР)',
      features: ['Підключення бензо/дизель генератора з автозапуском', 'Асиметричний вихід на фази', 'Спеціальний порт Smart Load'],
      idealFor: 'Приватні будинки 100-200 м²'
    },
    {
      power: '8 – 12 кВт (3-фазні)',
      model: 'Deye SUN-8/10/12K-SG04LP3-EU',
      phases: '3 Фази (380V)',
      mppt: '2 MPPT трекери (до 15.6 кВт панелей)',
      backupSpeed: '4 мс (АВР)',
      features: ["100% неспланований вихід по фазах (до 50% номіналу на 1 фазу)", 'Підмішування сонця без скидання у мережу', "Паралельне з'єднання до 16 інверторів"],
      idealFor: 'Великі котеджі, малі готелі та СТО'
    },
    {
      power: '15 – 30 кВт (3-фазні)',
      model: 'Deye SUN-15/20/30K-SG01HP3-EU',
      phases: '3 Фази (Високовольтні HV)',
      mppt: '3-4 MPPT трекери (до 40 кВт панелей)',
      backupSpeed: '4 мс (АВР)',
      features: ['Підтримка високовольтних батарей LiFePO4 (160-800V)', 'Максимальний ККД перетворення 97.6%', 'Промисловий пило-вологозахист IP65'],
      idealFor: 'Комерційні підприємства, склади, цехи'
    },
    {
      power: '50 – 100 кВт (Комерційні СЕС)',
      model: 'Deye SUN-50/100K-SG01HP3-EU-BM4',
      phases: '3 Фази (Промислова мережа)',
      mppt: '4-8 MPPT трекерів (до 150 кВт панелей)',
      backupSpeed: '10 мс',
      features: ['Гібридний режим під Зелений Тариф та власне споживання', 'Моніторинг кожної стринги в реальному часі', 'Вбудовані ПЗІП тип II по DC та AC'],
      idealFor: 'Заводи, виробництва, агрокомплекси'
    }
  ];

  return (
    <div className={`py-12 sm:py-20 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-slate-100/80 text-slate-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-black rounded-full border ${
            isDark ? 'border-amber-400/40 bg-amber-500/15 text-amber-300' : 'border-amber-400 bg-amber-100 text-slate-950'
          }`}>
            <Cpu className="w-4 h-4 text-amber-500" />
            <span>Офіційні Комплектуючі Nova Energy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Каталог Комплектуючих <span className="text-amber-500">Nova Energy</span>
          </h1>
          <p className={`text-sm sm:text-lg font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
            Сертифіковані сонячні панелі, акумулятори, інвертори та монтажні системи від провідних світових брендів Tier-1 з гарантією до 25 років.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 overflow-x-auto pb-2 border-b border-slate-700/40">
          <button
            type="button"
            onClick={() => setActiveTab('panels')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'panels'
                ? isDark
                  ? 'bg-amber-500/25 border-2 border-amber-400 text-amber-300 shadow-md'
                  : 'bg-amber-100 border-2 border-amber-500 text-slate-950 shadow-xs'
                : isDark
                  ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:border-amber-400/60 hover:text-amber-300'
                  : 'bg-white border border-slate-300 text-slate-900 hover:border-amber-500 hover:bg-amber-50'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Сонячні Панелі Tier-1</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('batteries')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'batteries'
                ? isDark
                  ? 'bg-amber-500/25 border-2 border-amber-400 text-amber-300 shadow-md'
                  : 'bg-amber-100 border-2 border-amber-500 text-slate-950 shadow-xs'
                : isDark
                  ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:border-amber-400/60 hover:text-amber-300'
                  : 'bg-white border border-slate-300 text-slate-900 hover:border-amber-500 hover:bg-amber-50'
            }`}
          >
            <BatteryCharging className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Акумулятори LiFePO4</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inverters')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'inverters'
                ? isDark
                  ? 'bg-amber-500/25 border-2 border-amber-400 text-amber-300 shadow-md'
                  : 'bg-amber-100 border-2 border-amber-500 text-slate-950 shadow-xs'
                : isDark
                  ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:border-amber-400/60 hover:text-amber-300'
                  : 'bg-white border border-slate-300 text-slate-900 hover:border-amber-500 hover:bg-amber-50'
            }`}
          >
            <Cpu className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Інвертори Deye</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mounting')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'mounting'
                ? isDark
                  ? 'bg-amber-500/25 border-2 border-amber-400 text-amber-300 shadow-md'
                  : 'bg-amber-100 border-2 border-amber-500 text-slate-950 shadow-xs'
                : isDark
                  ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:border-amber-400/60 hover:text-amber-300'
                  : 'bg-white border border-slate-300 text-slate-900 hover:border-amber-500 hover:bg-amber-50'
            }`}
          >
            <Wrench className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Кріплення & Захист</span>
          </button>
        </div>

        {/* TAB 1: SOLAR PANELS (JINKO, RISEN, LONGI, JA SOLAR) */}
        {activeTab === 'panels' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black flex items-center gap-2 text-slate-950 dark:text-white">
                  <Sun className="w-6 h-6 text-amber-500" />
                  Монокристалічні Сонячні Фотомодулі Tier-1
                </h2>
                <p className={`text-xs sm:text-sm mt-1 font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                  Офіційні прямі поставки з заводів. Технології N-Type TOPCon, Half-Cell та Glass-Glass.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {solarPanelsData.map((panel) => (
                <div
                  key={panel.id}
                  className={`glass-panel p-6 sm:p-7 rounded-3xl border space-y-5 transition-all hover:border-amber-400/50 ${
                    isDark ? 'border-slate-700 bg-slate-800/90 text-white' : 'border-slate-300 bg-white text-slate-950 shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 border-b border-slate-700/60 pb-4">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        {panel.brand}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black mt-0.5 text-slate-950 dark:text-white">{panel.model}</h3>
                      <p className="text-xs font-extrabold text-slate-900 dark:text-slate-300 mt-1">{panel.tech}</p>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-[11px] font-black border whitespace-nowrap ${
                      isDark ? 'border-amber-400/40 bg-amber-500/20 text-amber-300' : 'border-amber-400 bg-amber-100 text-slate-950'
                    }`}>
                      {panel.badge}
                    </span>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-amber-50/60'}`}>
                      <span className="block font-black text-xs text-slate-900 dark:text-slate-300 mb-0.5">Потужність:</span>
                      <span className="font-black text-base text-slate-950 dark:text-amber-400">{panel.power}</span>
                    </div>

                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-amber-50/60'}`}>
                      <span className="block font-black text-xs text-slate-900 dark:text-slate-300 mb-0.5">ККД Модуля:</span>
                      <span className="font-black text-base text-slate-950 dark:text-emerald-400">{panel.efficiency}</span>
                    </div>

                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-amber-50/60'}`}>
                      <span className="block font-black text-xs text-slate-900 dark:text-slate-300 mb-0.5">Габарити (В×Ш×Т):</span>
                      <span className="font-black text-xs text-slate-950 dark:text-white">{panel.dimensions}</span>
                    </div>

                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-amber-50/60'}`}>
                      <span className="block font-black text-xs text-slate-900 dark:text-slate-300 mb-0.5">Вага 1 панелі:</span>
                      <span className="font-black text-xs text-slate-950 dark:text-white">{panel.weight}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-2 border-t border-slate-700/60">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-slate-400 block mb-1">
                      Ключові переваги:
                    </span>
                    {panel.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="font-bold text-slate-950 dark:text-slate-100">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Warranty & Application Footer */}
                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-950 dark:text-slate-200 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-amber-500" />
                      {panel.warranty}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenConsultation && onOpenConsultation(`Розрахунок з панелями ${panel.brand} ${panel.power}`)}
                      className="btn-orange-bright px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Обрати панель</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: BATTERY STORAGE SYSTEMS (DEYE, ECOFLOW, PYLONTECH, DYNESS) */}
        {activeTab === 'batteries' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black flex items-center gap-2 text-slate-950 dark:text-white">
                  <BatteryCharging className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  Системи Накопичення Енергії LiFePO4 (Літій-Залізо-Фосфат)
                </h2>
                <p className={`text-xs sm:text-sm mt-1 font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                  Безпечні акумулятори без ризику займання. Термін служби 6000+ циклів (15+ років).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {batteriesData.map((bat) => (
                <div
                  key={bat.id}
                  className={`glass-panel p-6 sm:p-7 rounded-3xl border space-y-5 transition-all hover:border-emerald-400/50 ${
                    isDark ? 'border-slate-700 bg-slate-800/90 text-white' : 'border-slate-300 bg-white text-slate-950 shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 border-b border-slate-700/60 pb-4">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        {bat.brand}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black mt-0.5 text-slate-950 dark:text-white">{bat.series}</h3>
                      <p className="text-xs font-extrabold text-slate-900 dark:text-slate-300 mt-1">{bat.chemistry}</p>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-[11px] font-black border whitespace-nowrap ${
                      isDark ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-300' : 'border-emerald-400 bg-emerald-100 text-slate-950'
                    }`}>
                      {bat.badge}
                    </span>
                  </div>

                  {/* Available Capacities Badges */}
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-slate-400 block mb-2">
                      Доступна ємність блоків:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {bat.capacities.map((cap, cIdx) => (
                        <span
                          key={cIdx}
                          className={`px-3 py-1 rounded-xl text-xs font-black border ${
                            isDark ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-300' : 'border-slate-300 bg-emerald-50 text-slate-950'
                          }`}
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-amber-50/60'}`}>
                      <span className="block font-black text-xs text-slate-900 dark:text-slate-300 mb-0.5">Ресурс циклів:</span>
                      <span className="font-black text-base text-slate-950 dark:text-emerald-400">{bat.cycles}</span>
                    </div>

                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-amber-50/60'}`}>
                      <span className="block font-black text-xs text-slate-900 dark:text-slate-300 mb-0.5">Термін служби:</span>
                      <span className="font-black text-base text-slate-950 dark:text-amber-400">{bat.lifespan}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-2 border-t border-slate-700/60">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-slate-400 block mb-1">
                      Особливості та захист:
                    </span>
                    {bat.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="font-bold text-slate-950 dark:text-slate-100">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Footer */}
                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-950 dark:text-slate-200 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Гарантія 5–10 років
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenConsultation && onOpenConsultation(`Акумуляторна система ${bat.brand} ${bat.series}`)}
                      className="btn-orange-bright px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Підібрати АКБ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DEYE HYBRID INVERTERS */}
        {activeTab === 'inverters' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black flex items-center gap-2 text-slate-950 dark:text-white">
                  <Cpu className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                  Гібридні Інвертори Deye (Сертифіковано під Обленерго)
                </h2>
                <p className={`text-xs sm:text-sm mt-1 font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                  Найкращі гібридні інвертори з підтримкою генератора, асиметричним виходом та АВР 4 мс.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {invertersData.map((inv, idx) => (
                <div
                  key={idx}
                  className={`glass-panel p-6 sm:p-7 rounded-3xl border space-y-5 transition-all hover:border-sky-400/50 ${
                    isDark ? 'border-slate-700 bg-slate-800/90 text-white' : 'border-slate-300 bg-white text-slate-950 shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 border-b border-slate-700/60 pb-4">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-sky-700 dark:text-sky-400">
                        {inv.power}
                      </span>
                      <h3 className="text-lg font-black mt-0.5 text-slate-950 dark:text-white">{inv.model}</h3>
                      <p className="text-xs font-extrabold text-slate-900 dark:text-amber-400 mt-1">{inv.phases}</p>
                    </div>

                    {/* High-Contrast Pill Badge */}
                    <span className={`px-3.5 py-1.5 rounded-full text-xs font-black border whitespace-nowrap ${
                      isDark 
                        ? 'border-sky-400/50 bg-sky-500/20 text-sky-300' 
                        : 'border-sky-400 bg-sky-100 text-slate-950'
                    }`}>
                      {inv.backupSpeed}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-amber-50/60'}`}>
                      <span className="block font-black text-xs text-slate-900 dark:text-slate-300 mb-0.5">MPPT Контролери:</span>
                      <span className="font-black text-base text-slate-950 dark:text-sky-300">{inv.mppt}</span>
                    </div>

                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-amber-50/60'}`}>
                      <span className="block font-black text-xs text-slate-900 dark:text-slate-300 mb-0.5">Рекомендоване призначення:</span>
                      <span className="font-black text-xs sm:text-sm text-slate-950 dark:text-emerald-400">{inv.idealFor}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-700/60">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-slate-400 block mb-1">
                      Функціональні можливості Deye:
                    </span>
                    {inv.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-0.5" />
                        <span className="font-bold text-slate-950 dark:text-slate-100">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-950 dark:text-slate-200 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      Офіційна гарантія 5 років
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenConsultation && onOpenConsultation(`Інвертор Deye ${inv.power}`)}
                      className="btn-orange-bright px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Обрати інвертор</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MOUNTING & PROTECTION (HARDWARE, CABLES, BREAKERS) */}
        {activeTab === 'mounting' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black flex items-center gap-2 text-slate-950 dark:text-white">
                  <Wrench className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  Кріпильні Системи & Захисна Автоматика DC/AC
                </h2>
                <p className={`text-xs sm:text-sm mt-1 font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                  Німецькі та українські сертифіковані метал-конструкції, сонячні кабелі з подвійною ізоляцією та ПЗІП захист.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className={`glass-panel p-6 rounded-3xl border space-y-4 ${
                isDark ? 'border-slate-700 bg-slate-800/90 text-white' : 'border-slate-300 bg-white text-slate-950 shadow-md'
              }`}>
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-400/40">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-black text-base text-slate-950 dark:text-white">Алюмінієві Профілі & Кронштейни</h3>
                <p className="text-xs font-bold text-slate-950 dark:text-slate-300 leading-relaxed">
                  Первинний алюмінієвий сплав АД31 Т5. Нержавіючі шпильки М10 з ЕПДМ-ущільнювачами AISI 304 для металочерепиці, черепиці, профнастилу та фальцу.
                </p>
              </div>

              <div className={`glass-panel p-6 rounded-3xl border space-y-4 ${
                isDark ? 'border-slate-700 bg-slate-800/90 text-white' : 'border-slate-300 bg-white text-slate-950 shadow-md'
              }`}>
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-400/40">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-black text-base text-slate-950 dark:text-white">Сонячний Кабель Solar 6 мм²</h3>
                <p className="text-xs font-bold text-slate-950 dark:text-slate-300 leading-relaxed">
                  Спеціалізований кабель H1Z2Z2-K з лудженою міддю та подвійною ізоляцією. Стійкий до озону, УФ-випромінювання та перепадів температур від -40°C до +90°C.
                </p>
              </div>

              <div className={`glass-panel p-6 rounded-3xl border space-y-4 ${
                isDark ? 'border-slate-700 bg-slate-800/90 text-white' : 'border-slate-300 bg-white text-slate-950 shadow-md'
              }`}>
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-400/40">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-black text-base text-slate-950 dark:text-white">Щити Захисту DC / AC (ПЗІП)</h3>
                <p className="text-xs font-bold text-slate-950 dark:text-slate-300 leading-relaxed">
                  Окремі герметичні щити IP65 з обмежувачами перенапруги (ПЗІП клас II), постійнострумовими запобіжниками 1000V DC та автоматами Schneider/ETI.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Clean Banner CTA at bottom */}
        <div className={`p-8 sm:p-10 rounded-3xl border text-center space-y-4 shadow-xl ${
          isDark ? 'border-slate-700 bg-slate-800/80 text-white' : 'border-slate-300 bg-white text-slate-950'
        }`}>
          <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">Потрібна допомога з підбором комплектуючих?</h3>
          <p className={`text-xs sm:text-sm font-bold max-w-xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
            Наші інженери підберуть оптимальні сонячні панелі, акумулятори та інвертори під ваші потреби та бюджет.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onOpenConsultation && onOpenConsultation('Підбір обладнання')}
              className="btn-orange-bright px-8 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Отримати Консультацію Фахівця</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
