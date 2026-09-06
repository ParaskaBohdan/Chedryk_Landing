import React, { useState, useEffect } from 'react';
import { Sun, BatteryCharging, Cpu, Layers, ShieldCheck, CheckCircle2, Zap, Wrench, ArrowRight, MessageSquare, ExternalLink } from 'lucide-react';
import SolarPanelCard from '../components/SolarPanelCard';
import { LiveBadge, EfficiencyMeter, TelemetryChip } from '../components/SolarTech';
import { BusbarDivider, RegistrationMarks } from '../components/SolarDetails';
import useSeo from '../hooks/useSeo';
import {
  PanelModuleScene,
  BatteryStackScene,
  InverterUnitScene,
  MountingHardwareScene,
  SolarCableScene,
  ProtectionBoxScene
} from '../components/EquipmentIllustrations';

export default function EquipmentPage({ theme, onOpenConsultation }) {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('panels'); // 'panels' | 'batteries' | 'inverters' | 'mounting'

  useSeo({
    title: 'Каталог Обладнання для СЕС — Панелі, Інвертори, АКБ | Nova Energy',
    description: 'Сонячні панелі LONGi, Trina Solar, Astra Energy, інвертори Deye, Solis, Huawei та акумулятори LiFePO4 для мережевих і гібридних станцій. Пряма поставка сертифікованого обладнання по Закарпаттю та Прикарпаттю.',
    path: '/equipment',
    breadcrumb: [{ name: 'Головна', path: '/' }, { name: 'Обладнання', path: '/equipment' }]
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Solar Panels Data
  const solarPanelsData = [
    {
      id: 'longi-615',
      brand: 'LONGi Solar',
      model: 'Hi-MO X6 615W',
      tech: 'Технологія HPBC / Монокристал',
      power: '615 Вт',
      efficiency: '22.8%',
      dimensions: '2382 × 1134 × 30 мм',
      weight: '28.5 кг',
      warranty: '25 років на виріб / 30 років на генерацію',
      degradation: '< 0.35% на рік',
      features: ['Передова HPBC технологія осередків', 'Високий коефіцієнт генерації при розсіяному світлі', 'Посилена рама з анодованого алюмінію'],
      recommendedFor: 'Приватні та комерційні станції найвищої продуктивності',
      badge: 'Флагман 615W',
      image: '/images/equipment/panel-longi-615.png',
      status: 'Високоефективний HPBC',
      effValue: 22.8,
      metrics: [
        { label: 'Темп. коеф.', value: '−0.29 %/°C' },
        { label: 'Тип осередків', value: 'HPBC Моно' }
      ]
    },
    {
      id: 'trina-455',
      brand: 'Trina Solar',
      model: 'Vertex S 455W',
      tech: 'Напівосередкова монокристалічна панель Half-Cell',
      power: '455 Вт',
      efficiency: '21.5%',
      dimensions: '1762 × 1134 × 30 мм',
      weight: '21.8 кг',
      warranty: '15 років на виріб / 25 років на генерацію',
      degradation: '< 0.55% на рік',
      features: ['Компактний розмір: ідеально під складні дахи', 'Висока механічна стійкість (до 6000 Па сніг)', 'Multi-Busbar для мінімізації мікротріщин'],
      recommendedFor: 'Приватні будинки зі скатними дахами складної форми',
      badge: 'Бестселер для дахів',
      image: '/images/equipment/panel-trina-455.png',
      status: 'Напівосередок Vertex S',
      effValue: 21.5,
      metrics: [
        { label: 'Розміри', value: '1762×1134 мм' },
        { label: 'Навантаження', value: '6000 Па' }
      ]
    },
    {
      id: 'astra-465',
      brand: 'Astra Energy',
      model: 'Astra 465W Monocrystalline',
      tech: 'Технологія Half-Cut / Монокристал',
      power: '465 Вт',
      efficiency: '21.3%',
      dimensions: '1909 × 1134 × 30 мм',
      weight: '23.5 кг',
      warranty: '12 років на виріб / 25 років на генерацію',
      degradation: '< 0.50% на рік',
      features: ['Надійні осередки Half-Cut зі стійкістю до затінення', 'Оптимальна вартість за 1 ват встановленої потужності', 'Повний захист від PID та сольового туману'],
      recommendedFor: 'Оптимальні бюджетні та середні СЕС',
      badge: 'Оптимальний вибір',
      image: '/images/equipment/panel-astra-465.png',
      status: 'Монокристал HC',
      effValue: 21.3,
      metrics: [
        { label: 'Захист PID', value: '100%' },
        { label: 'Гарантія', value: '25 років' }
      ]
    },
    {
      id: 'longi-630',
      brand: 'LONGi Solar',
      model: 'Hi-MO 7 630W Bifacial',
      tech: 'N-Type HPDC / Двостороннє скло Glass-Glass',
      power: '630 Вт',
      efficiency: '23.3%',
      dimensions: '2382 × 1134 × 30 мм',
      weight: '33.5 кг',
      warranty: '25 років на виріб / 30 років на генерацію',
      degradation: '< 0.40% на рік',
      features: ['Двостороннє знімання енергії Glass-Glass (+10–25% бонус)', 'Максимальна потужність 630 Вт', 'Низька деградація N-Type HPDC структури'],
      recommendedFor: 'Наземні конструкції, плоскі дахи та комерційні СЕС до 1 МВт',
      badge: 'Максимальна потужність',
      image: '/images/equipment/panel-longi-630.png',
      status: 'Двосторонній Hi-MO 7',
      effValue: 23.3,
      metrics: [
        { label: 'Приріст генерації', value: '+15–25%' },
        { label: 'Технологія', value: 'N-Type HPDC' }
      ]
    }
  ];

  // Battery Energy Storage Systems Data
  // Battery Energy Storage Systems Data
  const batteriesData = [
    {
      id: 'felicity',
      brand: 'Felicity Solar',
      series: 'Серія LPBA48100-OL / Система живлення LiFePO4',
      chemistry: 'Літій-залізо-фосфат (LiFePO4)',
      capacities: ['5.12 кВт·год', '10.24 кВт·год', '15.36 кВт·год', 'до 40 кВт·год'],
      voltageType: 'Низьковольтні (48V / 51.2V)',
      cycles: '6000+ циклів (DOD 80%)',
      lifespan: '15+ років',
      bms: 'Вбудована інтелектуальна BMS з LED/LCD дисплеєм',
      features: [
        'Вбудований цифровий екран контролю заряду та напруги',
        'Автоматичний вимикач DC breaker на корпусі',
        'Ідеальна ціна/якість для домашніх систем резервування'
      ],
      badge: 'Популярний вибір',
      image: '/images/equipment/battery-felicity.png',
      status: 'Настінний монтаж 48В',
      dod: 85,
      metrics: [
        { label: 'Ресурс циклів', value: '6000+' },
        { label: 'Робоча напруга', value: '51.2 В' }
      ]
    },
    {
      id: 'deye-bat',
      brand: 'Deye',
      series: 'Серія LiFePO4 SE-G5.1 / Високовольтна BOS-G',
      chemistry: 'Літій-залізо-фосфат (LiFePO4)',
      capacities: ['5.12 кВт·год', '10.24 кВт·год', '15.36 кВт·год', 'до 61 кВт·год'],
      voltageType: 'Низьковольтні 48В та високовольтні (до 800В)',
      cycles: '6000+ циклів (DOD 90%)',
      lifespan: '15+ років активної експлуатації',
      bms: 'Фірмова CAN/RS485 BMS Deye з балансуванням осередків',
      features: [
        'Повна 100% безшовна інтеграція з інверторами Deye',
        'Модульне нарощування ємності без складних налаштувань',
        'Підтримка високих струмів заряду/розряду 1C'
      ],
      badge: 'Нативна сумісність',
      image: '/images/equipment/battery-deye.png',
      status: 'Фірмова BMS Deye',
      dod: 90,
      metrics: [
        { label: 'Ресурс циклів', value: '6000+' },
        { label: 'Сумісність', value: 'Deye 100%' }
      ]
    },
    {
      id: 'livoltek-bat',
      brand: 'Livoltek',
      series: 'Акумуляторна система зберігання енергії Livoltek',
      chemistry: 'Осередки LiFePO4 вищого ґатунку Grade-A',
      capacities: ['5.12 кВт·год', '10.24 кВт·год', '15.36 кВт·год', 'до 25.6 кВт·год'],
      voltageType: 'Низьковольтні 51.2В / Високовольтна колона',
      cycles: '6000+ циклів',
      lifespan: '15 років',
      bms: 'Розумна хмарна BMS з моніторингом через додаток',
      features: [
        'Елегантний стековий модульний корпус без зовнішніх кабелів',
        'Ступінь захисту IP65 для розміщення у будь-яких приміщеннях',
        'Робота в тандемі з інверторами Livoltek та Deye'
      ],
      badge: 'Преміум Дизайн',
      image: '/images/equipment/battery-livoltek.jpg',
      status: 'Стековий захист IP65',
      dod: 90,
      metrics: [
        { label: 'Клас захисту', value: 'IP65' },
        { label: 'Конструкція', value: 'Стекова' }
      ]
    },
    {
      id: 'huawei-bat',
      brand: 'Huawei',
      series: 'Розумна система зберігання LUNA2000',
      chemistry: 'LiFePO4 з оптимізатором на рівні кожного модуля',
      capacities: ['5 кВт·год', '10 кВт·год', '15 кВт·год', 'до 30 кВт·год'],
      voltageType: 'Високовольтна розумна лінійка (360-600В)',
      cycles: '6500+ циклів',
      lifespan: '15+ років',
      bms: 'Багаторівневий інтелектуальний захист Huawei AI BMS',
      features: [
        '100% корисна ємність завдяки модульній оптимізації',
        'Автономне відключення дефектного блоку без зупинки системи',
        'Ультратонкий корпус преміального сегменту'
      ],
      badge: 'Технологічний ТОП',
      image: '/images/equipment/battery-huawei.png',
      status: 'Високовольтна система',
      dod: 100,
      metrics: [
        { label: 'Ресурс циклів', value: '6500+' },
        { label: 'Корисна ємність', value: '100% глибина' }
      ]
    }
  ];

  // Inverters Data (Deye, Solis, Livoltek, Huawei)
  const invertersData = [
    {
      id: 'deye-inv',
      brand: 'Deye',
      type: 'Гібридний інвертор',
      model: 'Deye SUN-5/6/8/10/12/15K-SG Hybrid',
      power: '5 – 15 кВт (1Ф та 3Ф)',
      phases: '1Ф (230V) / 3Ф (400V)',
      mppt: '2–3 MPPT трекери',
      backupSpeed: '4 мс (миттєвий АВР)',
      features: [
        'Підтримка бензо/дизель генератора з автоматичним запуском',
        '100% незбалансований вихід по фазах для 3-фазних моделей',
        'Зручний кольоровий сенсорний LCD екран для налаштування'
      ],
      idealFor: 'Приватні котеджі та комерційні об’єкти з резервним живленням',
      badge: 'Гібридний хіт',
      image: '/images/equipment/inverter-deye.png',
      status: 'Гібрид Deye',
      effValue: 97.6,
      metrics: [
        { label: 'Час перемикання', value: '4 мс' },
        { label: 'Генератор', value: 'Автозапуск' }
      ]
    },
    {
      id: 'solis-inv',
      brand: 'Solis',
      type: 'Мережевий інвертор',
      model: 'Solis 3P 10–33K-5G Grid-Tied',
      power: '10 – 33 кВт (3-фазні)',
      phases: '3 Фази (380/400V)',
      mppt: '2–4 незалежні MPPT',
      backupSpeed: 'Мережева синхронізація',
      features: [
        'Лідер надійності серед мережевих станцій під Зелений Тариф та Net Billing',
        'Широкий робочий діапазон напруги MPPT від 160V до 1000V',
        'Вбудований AFCI захист від електричної дуги'
      ],
      idealFor: 'Мережеві СЕС під Зелений Тариф (Закарпаття) та підприємства',
      badge: 'Мережевий лідер',
      image: '/images/equipment/inverter-solis.png',
      status: 'Мережевий Solis',
      effValue: 98.7,
      metrics: [
        { label: 'Макс. ККД', value: '98.7%' },
        { label: 'Захист від дуги', value: 'Вбудовано' }
      ]
    },
    {
      id: 'livoltek-inv',
      brand: 'Livoltek',
      type: 'Гібридний мережевий інвертор',
      model: 'Livoltek Hyper-S Hybrid Grid',
      power: '5 – 10 кВт (1Ф / 3Ф)',
      phases: 'Гібридний мережевий режим',
      mppt: '2 MPPT трекери',
      backupSpeed: '10 мс АВР',
      externalUrl: 'https://livoltekua.com.ua/',
      features: [
        'Повна інтеграція сонячної генерації, мережі та батарейного резерву',
        'Сучасний смарт-додаток Livoltek для віддаленого моніторингу',
        'Офіційна українська підтримка та дистрибуція'
      ],
      idealFor: 'Сучасні автономні та мережеві станції з можливістю генерації в мережу',
      badge: 'Гібридний мережевий',
      image: '/images/equipment/inverter-livoltek.png',
      status: 'Livoltek Україна',
      effValue: 98.2,
      metrics: [
        { label: 'Мобільний додаток', value: 'iOS / Android' },
        { label: 'Офіційний сайт', value: 'livoltekua.com.ua' }
      ]
    },
    {
      id: 'huawei-inv',
      brand: 'Huawei',
      type: 'Мережевий інвертор',
      model: 'Huawei SUN2000-10/15/20/30/50KTL',
      power: '10 – 50 кВт (3-фазні)',
      phases: '3 Фази (Промислова та побутова)',
      mppt: 'До 4 MPPT з інтелектуальним моніторингом ланцюгів',
      backupSpeed: 'Мережевий',
      features: [
        'Штучний інтелект AI AFCI для безпечного відключення дуги за 0.5 с',
        'Природне охолодження без шумних вентиляторів',
        'Найвища ефективність перетворення на ринку 98.6%'
      ],
      idealFor: 'Мережеві СЕС для приватних домогосподарств і великих виробництв',
      badge: 'Еталон надійності',
      image: '/images/equipment/inverter-huawei.png',
      status: 'Мережевий Huawei',
      effValue: 98.6,
      metrics: [
        { label: 'Макс. ККД', value: '98.6%' },
        { label: 'Охолодження', value: 'Безшумне' }
      ]
    }
  ];

  // Mounting hardware & protection gear
  const mountingData = [
    {
      id: 'german-cable',
      icon: Zap,
      iconClass: 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-400/40',
      status: 'Німецька якість · H1Z2Z2-K',
      tone: 'amber',
      image: '/images/equipment/cable-german.png',
      title: 'Solar Кабель Німецької Якості (6 мм²)',
      desc: 'Преміальний сонячний кабель стандарту Німеччини (KBE / Lapp Helukabel H1Z2Z2-K) з лудженою міддю та посиленою подвійною безгалогенною ізоляцією. 100% стійкість до УФ-випромінювання, озону, вологи та морозів від -40°C до +120°C.',
      specs: [
        { label: 'Якість', value: 'Німецький стандарт' },
        { label: 'Переріз', value: '6,0 мм²' },
        { label: 'Провідник', value: 'Лужена мідь' }
      ],
      meter: { label: 'Стійкість до УФ та погодних умов', value: 99.5, tone: 'amber', unit: '%' }
    },
    {
      id: 'mounting-rails',
      icon: Layers,
      iconClass: 'bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-400/40',
      status: 'Анодований алюміній та сталь',
      tone: 'sky',
      image: '/images/equipment/mounting-system.jpg',
      title: 'Системи Кріплень на Дах та Ґрунт',
      desc: 'Надійні монтажні системи з анодованого алюмінію АД31 Т5 та гарячеоцинкованої сталі. Посилені покрівельні кронштейни з EPDM ущільнювачами для металочерепиці, бітумної черепиці, профнастилу, фальцю та наземних столів.',
      specs: [
        { label: 'Матеріал', value: 'Анодований Al / Inox' },
        { label: 'Вітрове навант.', value: 'до 38 м/с' },
        { label: 'Типи даху', value: 'Скатні, плоскі, ґрунт' }
      ],
      meter: { label: 'Механічна стійкість конструкції', value: 98, tone: 'sky', unit: '%' }
    },
    {
      id: 'protection-boxes',
      icon: ShieldCheck,
      iconClass: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-400/40',
      status: 'ПЗІП Клас II · IP65',
      tone: 'emerald',
      image: '/images/equipment/protection-box.png',
      title: 'Щити Захисту DC / AC (ПЗІП)',
      desc: 'Герметичні щити IP65 з обмежувачами імпульсних перенапруг (ПЗІП клас II), постійнострумовими запобіжниками 1000V DC та автоматами Schneider/ETI для повної безпеки будинку.',
      specs: [
        { label: 'Захист', value: 'IP65 герметичний' },
        { label: 'ПЗІП', value: 'Клас II (DC/AC)' },
        { label: 'Автоматика', value: 'Schneider / ETI' }
      ],
      meter: { label: 'Захист від перенапруг', value: 99, tone: 'emerald', unit: '%' }
    }
  ];

  return (
    <div className={`py-12 sm:py-20 min-h-screen relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-950'
    }`}>
      {/* Ambient Solar Lighting */}
      <div className="solar-flare w-[240px] sm:w-[420px] h-[240px] sm:h-[420px] -top-32 right-[8%]" aria-hidden="true" />
      <div className="solar-flare w-[200px] sm:w-[340px] h-[200px] sm:h-[340px] top-[45%] left-[4%]" style={{ animationDelay: '3.4s' }} aria-hidden="true" />
      <div className="solar-beam hidden sm:block w-[110px] h-[620px] -top-44 left-[26%]" aria-hidden="true" />
      <div className="solar-beam hidden lg:block w-[74px] h-[520px] -top-36 right-[30%]" style={{ animationDelay: '5s' }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full border ${
            isDark ? 'bg-amber-500/15 border-[#fbbf24] text-[#fde68a]' : 'bg-slate-200/90 border-slate-300 text-slate-800 shadow-xs'
          }`}>
            <Cpu className="w-4 h-4 text-amber-500" />
            <span>Офіційні Комплектуючі Nova Energy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Каталог Комплектуючих <span className="text-amber-500">Nova Energy</span>
          </h1>
          <p className="text-sm sm:text-lg font-bold" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
            Сертифіковані сонячні панелі, акумулятори, інвертори та монтажні системи від провідних світових брендів з гарантією до 25 років.
          </p>
        </div>

        <BusbarDivider />

        {/* Category Tabs */}
        <div className="grid grid-cols-2 md:flex md:flex-row md:items-center gap-2.5 sm:gap-4 pb-3 border-b border-slate-700/40 w-full justify-center px-2 sm:px-0">
          <button
            type="button"
            onClick={() => setActiveTab('panels')}
            className={`flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer w-full md:w-auto justify-center ${
              activeTab === 'panels'
                ? isDark
                  ? 'bg-amber-500/15 border-2 border-[#fbbf24] text-[#fde68a]'
                  : 'bg-slate-200/90 border-2 border-orange-500 text-orange-800 shadow-xs'
                : isDark
                  ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:border-amber-400/60 hover:text-amber-300'
                  : 'bg-white/90 border border-slate-300 text-slate-800 hover:border-orange-500 hover:bg-slate-100'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Сонячні Панелі</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('batteries')}
            className={`flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer w-full md:w-auto justify-center ${
              activeTab === 'batteries'
                ? isDark
                  ? 'bg-amber-500/15 border-2 border-[#fbbf24] text-[#fde68a]'
                  : 'bg-slate-200/90 border-2 border-orange-500 text-orange-800 shadow-xs'
                : isDark
                  ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:border-amber-400/60 hover:text-amber-300'
                  : 'bg-white/90 border border-slate-300 text-slate-800 hover:border-orange-500 hover:bg-slate-100'
            }`}
          >
            <BatteryCharging className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>Акумулятори LiFePO4</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inverters')}
            className={`flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer w-full md:w-auto justify-center ${
              activeTab === 'inverters'
                ? isDark
                  ? 'bg-amber-500/15 border-2 border-[#fbbf24] text-[#fde68a]'
                  : 'bg-slate-200/90 border-2 border-orange-500 text-orange-800 shadow-xs'
                : isDark
                  ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:border-amber-400/60 hover:text-amber-300'
                  : 'bg-white/90 border border-slate-300 text-slate-800 hover:border-orange-500 hover:bg-slate-100'
            }`}
          >
            <Cpu className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0" />
            <span>Інвертори (Deye, Solis, Livoltek, Huawei)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mounting')}
            className={`flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer w-full md:w-auto justify-center ${
              activeTab === 'mounting'
                ? isDark
                  ? 'bg-amber-500/15 border-2 border-[#fbbf24] text-[#fde68a]'
                  : 'bg-slate-200/90 border-2 border-orange-500 text-orange-800 shadow-xs'
                : isDark
                  ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:border-amber-400/60 hover:text-amber-300'
                  : 'bg-white/90 border border-slate-300 text-slate-800 hover:border-orange-500 hover:bg-slate-100'
            }`}
          >
            <Wrench className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
            <span>Кріплення & Німецький Solar Кабель</span>
          </button>
        </div>

        {/* TAB 1: SOLAR PANELS (LONGI, TRINA, ASTRA ENERGY) */}
        {activeTab === 'panels' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black flex items-center gap-2" style={{ color: isDark ? '#ffffff' : '#000000' }}>
                  <Sun className="w-6 h-6 text-amber-500" />
                  Монокристалічні Сонячні Фотомодулі (Longi, Trina, Astra Energy)
                </h2>
                <p className="text-xs sm:text-sm mt-1 font-bold" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                  Офіційні прямі поставки з заводів: Longi 615W, Trina 455W, Astra Energy 465W та Longi 630W.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {solarPanelsData.map((panel) => (
                <SolarPanelCard
                  key={panel.id}
                  theme={theme}
                  className="h-full p-6 sm:p-7"
                  contentClassName="space-y-5"
                >
                  {/* Real high-resolution product photograph */}
                  <div className="relative rounded-2xl overflow-hidden h-64 sm:h-72 bg-gradient-to-b from-slate-900/40 to-slate-950/90 flex items-center justify-center p-4 group shadow-inner border border-slate-700/40">
                    <img 
                      src={panel.image} 
                      alt={`${panel.brand} ${panel.model}`}
                      className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="hidden sm:block absolute top-2.5 left-2.5">
                      <LiveBadge theme={theme} label={panel.status} tone="amber" />
                    </div>
                    <div className={`hidden sm:block absolute bottom-2.5 right-2.5 glass-deep rounded-lg px-2.5 py-1 text-[10px] font-bold telemetry-label ${
                      isDark ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      {panel.power}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3 border-b border-slate-700/60 pb-4">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        {panel.brand}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black mt-0.5" style={{ color: isDark ? '#ffffff' : '#000000' }}>
                        {panel.model}
                      </h3>
                      <p className="text-xs font-extrabold mt-1" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
                        {panel.tech}
                      </p>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-[11px] font-black border whitespace-nowrap ${
                      isDark ? 'border-amber-400/60 bg-amber-500/10 text-amber-200' : 'border-slate-300 bg-slate-100 text-slate-800'
                    }`}>
                      {panel.badge}
                    </span>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-slate-100/90'}`}>
                      <span className="block font-black text-xs mb-0.5" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                        Потужність:
                      </span>
                      <span className="font-black text-base text-amber-600 dark:text-amber-400">{panel.power}</span>
                    </div>

                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-slate-100/90'}`}>
                      <span className="block font-black text-xs mb-0.5" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                        ККД Модуля:
                      </span>
                      <span className="font-black text-base text-emerald-700 dark:text-emerald-400">{panel.efficiency}</span>
                    </div>

                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-slate-100/90'}`}>
                      <span className="block font-black text-xs mb-0.5" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                        Габарити (В×Ш×Т):
                      </span>
                      <span className="font-black text-xs" style={{ color: isDark ? '#ffffff' : '#475569' }}>
                        {panel.dimensions}
                      </span>
                    </div>

                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-slate-100/90'}`}>
                      <span className="block font-black text-xs mb-0.5" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                        Вага 1 панелі:
                      </span>
                      <span className="font-black text-xs" style={{ color: isDark ? '#ffffff' : '#475569' }}>
                        {panel.weight}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-2 border-t border-slate-700/60">
                    <span className="text-xs font-black uppercase tracking-wider block mb-1" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
                      Ключові переваги:
                    </span>
                    {panel.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="font-bold" style={{ color: isDark ? '#f8fafc' : '#475569' }}>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Live readouts */}
                  <div className="pt-2 border-t border-slate-700/60 space-y-3">
                    <EfficiencyMeter theme={theme} label="ККД модуля" value={panel.effValue} live />
                    <div className="grid grid-cols-2 gap-2.5">
                      {panel.metrics.map((m) => (
                        <TelemetryChip key={m.label} theme={theme} label={m.label} value={m.value} />
                      ))}
                    </div>
                    <p className={`text-[9px] telemetry-label ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      Деградація {panel.degradation} · {panel.recommendedFor}
                    </p>
                  </div>

                  {/* Warranty & Application Footer */}
                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                    <span className="font-black flex items-center gap-1" style={{ color: isDark ? '#e2e8f0' : '#475569' }}>
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

                </SolarPanelCard>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: BATTERY STORAGE SYSTEMS (FELICITY, DEYE, LIVOLTEK, HUAWEI) */}
        {activeTab === 'batteries' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black flex items-center gap-2" style={{ color: isDark ? '#ffffff' : '#000000' }}>
                  <BatteryCharging className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  Системи Накопичення Енергії LiFePO4 (Felicity, Deye, Livoltek, Huawei)
                </h2>
                <p className="text-xs sm:text-sm mt-1 font-bold" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                  Безпечні акумулятори без ризику займання. Термін служби 6000+ циклів (15+ років).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {batteriesData.map((bat) => (
                <SolarPanelCard
                  key={bat.id}
                  theme={theme}
                  className="h-full p-6 sm:p-7"
                  contentClassName="space-y-5"
                >
                  {/* Real high-resolution product photograph */}
                  <div className="relative rounded-2xl overflow-hidden h-64 sm:h-72 bg-gradient-to-b from-slate-900/40 to-slate-950/90 flex items-center justify-center p-4 group shadow-inner border border-slate-700/40">
                    <img 
                      src={bat.image} 
                      alt={`${bat.brand} ${bat.series}`}
                      className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="hidden sm:block absolute top-2.5 left-2.5">
                      <LiveBadge theme={theme} label={bat.status} tone="emerald" />
                    </div>
                    <div className={`hidden sm:block absolute bottom-2.5 right-2.5 glass-deep rounded-lg px-2.5 py-1 text-[10px] font-bold telemetry-label ${
                      isDark ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      {bat.capacities[0]}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3 border-b border-slate-700/60 pb-4">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        {bat.brand}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black mt-0.5" style={{ color: isDark ? '#ffffff' : '#000000' }}>
                        {bat.series}
                      </h3>
                      <p className="text-xs font-extrabold mt-1" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                        {bat.chemistry}
                      </p>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-[11px] font-black border whitespace-nowrap ${
                      isDark ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-200' : 'border-emerald-500/60 bg-emerald-50/60 text-slate-800'
                    }`}>
                      {bat.badge}
                    </span>
                  </div>

                  {/* Available Capacities Badges */}
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider block mb-2" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                      Доступна ємність блоків:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {bat.capacities.map((cap, cIdx) => (
                        <span
                          key={cIdx}
                          className={`px-3 py-1 rounded-xl text-xs font-black border ${
                            isDark ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-300' : 'border-emerald-400 bg-emerald-50 text-black'
                          }`}
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-slate-100/90'}`}>
                      <span className="block font-black text-xs mb-0.5" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                        Ресурс циклів:
                      </span>
                      <span className="font-black text-base text-emerald-700 dark:text-emerald-400">{bat.cycles}</span>
                    </div>

                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-slate-100/90'}`}>
                      <span className="block font-black text-xs mb-0.5" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                        Термін служби:
                      </span>
                      <span className="font-black text-base text-amber-600 dark:text-amber-400">{bat.lifespan}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-2 border-t border-slate-700/60">
                    <span className="text-xs font-black uppercase tracking-wider block mb-1" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
                      Особливості та захист:
                    </span>
                    {bat.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="font-bold" style={{ color: isDark ? '#f8fafc' : '#475569' }}>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Live readouts */}
                  <div className="pt-2 border-t border-slate-700/60 space-y-3">
                    <EfficiencyMeter theme={theme} label="Корисна ємність" value={bat.dod} tone="emerald" decimals={0} />
                    <div className="grid grid-cols-2 gap-2.5">
                      {bat.metrics.map((m) => (
                        <TelemetryChip key={m.label} theme={theme} label={m.label} value={m.value} />
                      ))}
                    </div>
                    <p className={`text-[9px] telemetry-label ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      {bat.voltageType}
                    </p>
                  </div>

                  {/* CTA Footer */}
                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                    <span className="font-black flex items-center gap-1" style={{ color: isDark ? '#e2e8f0' : '#475569' }}>
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

                </SolarPanelCard>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: HYBRID & GRID INVERTERS (DEYE, SOLIS, LIVOLTEK, HUAWEI) */}
        {activeTab === 'inverters' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black flex items-center gap-2" style={{ color: isDark ? '#ffffff' : '#000000' }}>
                  <Cpu className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                  Гібридні & Мережеві Інвертори (Deye, Solis, Livoltek, Huawei)
                </h2>
                <p className="text-xs sm:text-sm mt-1 font-bold" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                  Надійне перетворення сонячної енергії: гібридні рішення Deye та Livoltek для автономії, мережеві станції Solis та Huawei для Зеленого тарифу й бізнесу.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {invertersData.map((inv) => (
                <SolarPanelCard
                  key={inv.id}
                  theme={theme}
                  className="h-full p-6 sm:p-7"
                  contentClassName="space-y-5"
                >
                  {/* Real high-resolution product photograph */}
                  <div className="relative rounded-2xl overflow-hidden h-64 sm:h-72 bg-gradient-to-b from-slate-900/40 to-slate-950/90 flex items-center justify-center p-4 group shadow-inner border border-slate-700/40">
                    <img 
                      src={inv.image} 
                      alt={`${inv.brand} ${inv.model}`}
                      className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="hidden sm:block absolute top-2.5 left-2.5">
                      <LiveBadge theme={theme} label={inv.status} tone="sky" />
                    </div>
                    <div className={`hidden sm:block absolute bottom-2.5 right-2.5 glass-deep rounded-lg px-2.5 py-1 text-[10px] font-bold telemetry-label ${
                      isDark ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      {inv.type}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3 border-b border-slate-700/60 pb-4">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-sky-700 dark:text-sky-400">
                        {inv.brand} · {inv.type}
                      </span>
                      <h3 className="text-lg font-black mt-0.5" style={{ color: isDark ? '#ffffff' : '#000000' }}>{inv.model}</h3>
                      <p className="text-xs font-extrabold text-amber-600 dark:text-amber-400 mt-1">{inv.power} · {inv.phases}</p>
                    </div>

                    <span className={`px-3.5 py-1.5 rounded-full text-xs font-black border whitespace-nowrap ${
                      isDark 
                        ? 'border-sky-400/50 bg-sky-500/20 text-sky-300' 
                        : 'border-sky-400 bg-sky-100 text-black'
                    }`}>
                      {inv.badge}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-slate-100/90'}`}>
                      <span className="block font-black text-xs mb-0.5" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                        MPPT Контролери:
                      </span>
                      <span className="font-black text-base" style={{ color: isDark ? '#7dd3fc' : '#475569' }}>{inv.mppt}</span>
                    </div>

                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-slate-100/90'}`}>
                      <span className="block font-black text-xs mb-0.5" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                        Рекомендоване призначення:
                      </span>
                      <span className="font-black text-xs sm:text-sm" style={{ color: isDark ? '#34d399' : '#475569' }}>{inv.idealFor}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-700/60">
                    <span className="text-xs font-black uppercase tracking-wider block mb-1" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
                      Особливості та переваги:
                    </span>
                    {inv.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-0.5" />
                        <span className="font-bold" style={{ color: isDark ? '#f8fafc' : '#475569' }}>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* External site link for Livoltek */}
                  {inv.externalUrl && (
                    <div className="pt-2 border-t border-slate-700/60">
                      <a
                        href={inv.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-500 hover:text-sky-400 underline underline-offset-4"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Офіційний сайт Livoltek Україна: {inv.externalUrl.replace('https://', '').replace('/', '')}</span>
                      </a>
                    </div>
                  )}

                  {/* Live readouts */}
                  <div className="pt-2 border-t border-slate-700/60 space-y-3">
                    <EfficiencyMeter theme={theme} label="Максимальний ККД" value={inv.effValue} tone="sky" live />
                    <div className="grid grid-cols-2 gap-2.5">
                      {inv.metrics.map((m) => (
                        <TelemetryChip key={m.label} theme={theme} label={m.label} value={m.value} />
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                    <span className="font-black flex items-center gap-1" style={{ color: isDark ? '#e2e8f0' : '#475569' }}>
                      <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      Офіційна гарантія 5–10 років
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenConsultation && onOpenConsultation(`Інвертор ${inv.brand} ${inv.model}`)}
                      className="btn-orange-bright px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Обрати інвертор</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </SolarPanelCard>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MOUNTING & PROTECTION (HARDWARE, CABLES, BREAKERS) */}
        {activeTab === 'mounting' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black flex items-center gap-2" style={{ color: isDark ? '#ffffff' : '#000000' }}>
                  <Wrench className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  Німецький Solar Кабель, Кріплення & Захисна Автоматика DC/AC
                </h2>
                <p className="text-xs sm:text-sm mt-1 font-bold" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                  Спеціалізований сонячний кабель німецької якості (KBE / Lapp Helukabel), алюмінієві системи під будь-який дах та ґрунт і щити захисту.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mountingData.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <SolarPanelCard
                    key={item.id}
                    theme={theme}
                    className="h-full p-6"
                    contentClassName="flex flex-col space-y-4"
                  >
                    {item.image ? (
                      <div className="relative rounded-2xl overflow-hidden h-64 bg-gradient-to-b from-slate-900/40 to-slate-950/90 flex items-center justify-center p-4 group shadow-inner border border-slate-700/40">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <LiveBadge theme={theme} label={item.status} tone={item.tone} />
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-2xl overflow-hidden h-64 bg-slate-950 flex items-center justify-center">
                        <ProtectionBoxScene theme={theme} />
                        <div className="absolute top-2.5 left-2.5">
                          <LiveBadge theme={theme} label={item.status} tone={item.tone} />
                        </div>
                      </div>
                    )}

                    <div className={`w-10 h-10 rounded-2xl ${item.iconClass} flex items-center justify-center border`}>
                      <ItemIcon className="w-5 h-5" />
                    </div>

                    <h3 className="font-black text-base" style={{ color: isDark ? '#ffffff' : '#000000' }}>{item.title}</h3>
                    <p className="text-xs font-bold leading-relaxed flex-grow" style={{ color: isDark ? '#e2e8f0' : '#475569' }}>
                      {item.desc}
                    </p>

                    {/* Spec sheet */}
                    <dl className="pt-1">
                      {item.specs.map((spec) => (
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

                    <EfficiencyMeter
                      theme={theme}
                      label={item.meter.label}
                      value={item.meter.value}
                      unit={item.meter.unit}
                      tone={item.meter.tone}
                      decimals={0}
                    />
                  </SolarPanelCard>
                );
              })}
            </div>
          </div>
        )}

        {/* Clean Banner CTA at bottom */}
        <SolarPanelCard theme={theme} glow className="p-8 sm:p-10 shadow-xl" contentClassName="text-center space-y-4">
          <RegistrationMarks />
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <LiveBadge theme={theme} label="Офіційні прямі поставки" />
            <LiveBadge theme={theme} label="Гарантія до 30 років" tone="amber" />
            <LiveBadge theme={theme} label="В наявності на складі" tone="sky" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black" style={{ color: isDark ? '#ffffff' : '#000000' }}>Потрібна допомога з підбором комплектуючих?</h3>
          <p className="text-xs sm:text-sm font-bold max-w-xl mx-auto" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
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
        </SolarPanelCard>

      </div>
    </div>
  );
}
