import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getServiceById } from '../data/servicesData';
import { 
  Sun, BatteryCharging, FileCheck, Home, Zap, 
  ArrowLeft, CheckCircle2, ShieldCheck, Cpu, Layers, FileText 
} from 'lucide-react';

const iconMap = {
  Sun: Sun,
  BatteryCharging: BatteryCharging,
  FileCheck: FileCheck,
  Home: Home,
  Zap: Zap
};

function SolarSliderCalculator({ isDark }) {
  const [monthlyConsumption, setMonthlyConsumption] = useState(450); // kWh/month
  const [coveragePercent, setCoveragePercent] = useState(100); // %
  const [selectedPanel, setSelectedPanel] = useState({ brand: 'Jinko Solar', watt: 585 });

  const panelOptions = [
    { brand: 'Jinko Solar', watt: 585 },
    { brand: 'JA Solar', watt: 590 },
    { brand: 'Longi Solar', watt: 600 },
    { brand: 'Trina Solar', watt: 615 }
  ];

  // Calculations
  const effectiveConsumption = (monthlyConsumption * (coveragePercent / 100));
  const recommendedKw = Math.max(3, Math.ceil((effectiveConsumption / 115) * 10) / 10);
  const annualGen = Math.round(recommendedKw * 1180);
  const roofArea = Math.round(recommendedKw * 4.8);
  const annualSavingsUah = Math.round(annualGen * 4.32);
  const panelCount = Math.ceil((recommendedKw * 1000) / selectedPanel.watt);

  // Slider Fill Percentages
  const pctCons = ((monthlyConsumption - 100) / (2500 - 100)) * 100;
  const pctCov = ((coveragePercent - 50) / (150 - 50)) * 100;
  const trackBg = isDark ? '#334155' : '#cbd5e1';

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
      isDark ? 'bg-slate-950/90 border-slate-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
    }`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-extrabold text-lg sm:text-xl text-amber-500">
          Інтерактивний Калькулятор Потужності СЕС
        </h3>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
          Онлайн Розрахунок
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm font-bold">
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Місячне споживання електроенергії:</span>
              <span className="text-amber-500 font-extrabold text-base">{monthlyConsumption} кВт·год/міс</span>
            </div>
            <input
              type="range"
              min="100"
              max="2500"
              step="25"
              value={monthlyConsumption}
              onChange={(e) => setMonthlyConsumption(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${pctCons}%, ${trackBg} ${pctCons}%, ${trackBg} 100%)`
              }}
              className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-amber-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm font-bold">
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Цільовий рівень компенсації мережі:</span>
              <span className="text-amber-500 font-extrabold text-base">{coveragePercent}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              step="5"
              value={coveragePercent}
              onChange={(e) => setCoveragePercent(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${pctCov}%, ${trackBg} ${pctCov}%, ${trackBg} 100%)`
              }}
              className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-amber-500 transition-all"
            />
          </div>

          <div className="pt-2 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-500">
              Оберіть модель фотомодулів:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {panelOptions.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedPanel(p)}
                  className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                    selectedPanel.brand === p.brand && selectedPanel.watt === p.watt
                      ? 'border-amber-500 bg-amber-500/20 text-amber-500 font-extrabold shadow-sm'
                      : isDark ? 'border-slate-800 bg-slate-900 text-slate-300' : 'border-slate-300 bg-slate-100 text-slate-700'
                  }`}
                >
                  <p className="text-[11px] font-bold truncate">{p.brand}</p>
                  <p className="text-xs font-black text-amber-500 mt-0.5">{p.watt} W</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl border grid grid-cols-2 gap-4 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="space-y-1">
            <span className="text-[11px] opacity-70 block font-medium">Необхідна потужність СЕС</span>
            <span className="text-xl sm:text-2xl font-black text-amber-500">{recommendedKw} кВт</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] opacity-70 block font-medium">Кількість панелей</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400">{panelCount} шт.</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] opacity-70 block font-medium">Річна генерація</span>
            <span className="text-lg sm:text-xl font-bold text-emerald-400">~{annualGen.toLocaleString()} кВт·год</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] opacity-70 block font-medium">Площа даху</span>
            <span className="text-lg sm:text-xl font-bold">{roofArea} м²</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BatterySliderCalculator({ isDark }) {
  const [loadWatts, setLoadWatts] = useState(750);
  const [backupHours, setBackupHours] = useState(16);
  const totalKwhRequired = ((loadWatts * backupHours) / 1000).toFixed(1);
  const batteryAh48V = Math.ceil((loadWatts * backupHours) / 48);
  const chargeTimeHours = (totalKwhRequired / (5 * 0.85)).toFixed(1);
  const pctLoad = ((loadWatts - 200) / (4000 - 200)) * 100;
  const pctHours = ((backupHours - 4) / (72 - 4)) * 100;
  const trackBg = isDark ? '#334155' : '#cbd5e1';

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
      isDark ? 'bg-slate-950/90 border-slate-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
    }`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-extrabold text-lg sm:text-xl text-emerald-500">
          Інтерактивний Калькулятор АКБ Резерву
        </h3>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          LiFePO4 Розрахунок
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm font-bold">
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Середнє навантаження будинку:</span>
              <span className="text-emerald-500 font-extrabold text-base">{loadWatts} Вт</span>
            </div>
            <input type="range" min="200" max="4000" step="50" value={loadWatts} onChange={(e) => setLoadWatts(Number(e.target.value))} style={{ background: `linear-gradient(to right, #10b981 0%, #10b981 ${pctLoad}%, ${trackBg} ${pctLoad}%, ${trackBg} 100%)` }} className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm font-bold">
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Необхідний час автономності:</span>
              <span className="text-emerald-500 font-extrabold text-base">{backupHours} годин</span>
            </div>
            <input type="range" min="4" max="72" step="2" value={backupHours} onChange={(e) => setBackupHours(Number(e.target.value))} style={{ background: `linear-gradient(to right, #10b981 0%, #10b981 ${pctHours}%, ${trackBg} ${pctHours}%, ${trackBg} 100%)` }} className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all" />
          </div>
        </div>
        <div className={`p-6 rounded-2xl border grid grid-cols-2 gap-4 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="space-y-1">
            <span className="text-[11px] opacity-70 block font-medium">Необхідна ємність АКБ</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400">{totalKwhRequired} кВт·год</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] opacity-70 block font-medium">Конфігурація 48V</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400">~{batteryAh48V} Ah</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] opacity-70 block font-medium">Час повної зарядки</span>
            <span className="text-base sm:text-lg font-bold">~{chargeTimeHours} год (0.5C)</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] opacity-70 block font-medium">Гарантований ресурс</span>
            <span className="text-base sm:text-lg font-bold text-emerald-400">6000+ циклів</span>
          </div>
          <div className="col-span-2 pt-2 border-t border-slate-700/40 flex items-center justify-between">
            <span className="text-xs font-semibold">Рекомендована батарея:</span>
            <span className="text-xs font-extrabold text-emerald-400">LiFePO4 Smart BMS 48V</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiceDetailPage({ theme, onOpenConsultation }) {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const service = getServiceById(serviceId);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [serviceId]);

  if (!service) {
    return (
      <div className={`py-20 min-h-screen text-center ${isDark ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'}`}>
        <div className="max-w-md mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-bold">Послугу не знайдено</h2>
          <p className="text-sm opacity-80">Запитана послуга відсутня або була змінена.</p>
          <Link to="/services" className="inline-block btn-orange-bright font-bold py-2.5 px-6 rounded-xl">
            Повернутися до Послуг
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[service.iconName] || Sun;

  return (
    <div className={`py-10 sm:py-16 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-slate-100/70 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link & Breadcrumb Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/services')}
            className={`flex items-center gap-2 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
              isDark ? 'border-slate-800 bg-slate-950 text-slate-300 hover:text-amber-400' : 'border-slate-300 bg-white text-slate-700 hover:text-amber-600'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Назад до Послуг</span>
          </button>

          <span className="text-xs opacity-50">/</span>
          <span className="text-xs font-bold text-amber-500 line-clamp-1">{service.title}</span>
        </div>

        {/* Hero Section Banner */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-3xl border ${
          isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white border-slate-200 shadow-xl'
        }`}>
          
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-md">
                {service.badge}
              </span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${
                isDark ? 'border-slate-800 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-700'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Закарпаття & Франківщина</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {service.fullDescription}
            </p>

            {/* Quick Advantages Badge list */}
            <div className="pt-2 flex flex-wrap gap-3">
              {service.advantages.map((adv, idx) => (
                <div key={idx} className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border ${
                  isDark ? 'border-slate-800 bg-slate-900 text-amber-300' : 'border-amber-200 bg-amber-50 text-amber-900'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>{adv}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => onOpenConsultation(service.title)}
                className="btn-orange-bright font-bold py-3.5 px-8 rounded-xl shadow-lg text-sm transition-transform active:scale-95 cursor-pointer"
              >
                Замовити Безкоштовний Розрахунок
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/40">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/60 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">NOVA ENERGY_UA</p>
                <p className="text-[11px] text-amber-400 font-semibold">Гарантія якості та сервісу</p>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 1: Work Steps (Етапи робіт) */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Етапи Виконання Робіт Під Ключ</h2>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Покроковий інженерний алгоритм від першого виїзду до пусконалагодження</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {service.workSteps.map((step, idx) => (
              <div key={step.step} className="relative">
                {/* Step Card */}
                <div
                  className={`p-5.5 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between h-full ${
                    isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  <div>
                    {/* Parallel Circle + Title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                        {step.step < 10 ? `0${step.step}` : step.step}
                      </div>
                      <h3 className="font-bold text-base leading-tight">{step.title}</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Line to the next step */}
                {idx < service.workSteps.length - 1 && (
                  <>
                    {/* Mobile view: Downward arrow */}
                    <div className="absolute -bottom-11 left-1/2 -translate-x-1/2 z-20 md:hidden flex flex-col items-center pointer-events-none">
                      <div className="w-0.5 h-9 bg-gradient-to-b from-amber-400 via-orange-400 to-amber-500" />
                      <div className="w-2 h-2 border-r-2 border-b-2 border-amber-500 rotate-45 -mt-1" />
                    </div>

                    {/* Tablet view (2 columns) */}
                    {/* Point right for odd steps */}
                    {(idx + 1) % 2 !== 0 && (
                      <div className="hidden md:flex lg:hidden absolute top-1/2 -translate-y-1/2 -right-6 w-6 h-0.5 items-center justify-end pointer-events-none z-20">
                        <div className="w-full h-0.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />
                        <div className="w-2 h-2 border-r-2 border-t-2 border-amber-500 rotate-45 -ml-1 flex-shrink-0" />
                      </div>
                    )}
                    {/* Loop back to next row for even steps */}
                    {(idx + 1) % 2 === 0 && (
                      <div className="hidden md:block lg:hidden absolute top-full right-1/2 pointer-events-none z-20" style={{ width: 'calc(100% + 1.5rem)', height: '1.5rem' }}>
                        <div className="w-full h-full border-r-2 border-b-2 border-orange-400 rounded-br-xl" />
                        <div className="absolute top-full left-0 w-0.5 h-[1.5rem] bg-gradient-to-b from-orange-400 to-amber-500">
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-r-2 border-b-2 border-amber-500 rotate-45 translate-y-[2px]" />
                        </div>
                      </div>
                    )}

                    {/* Desktop view (3 columns) */}
                    {/* Point right for col 1 & col 2 */}
                    {(idx + 1) % 3 !== 0 && (
                      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-6 w-6 h-0.5 items-center justify-end pointer-events-none z-20">
                        <div className="w-full h-0.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />
                        <div className="w-2 h-2 border-r-2 border-t-2 border-amber-500 rotate-45 -ml-1 flex-shrink-0" />
                      </div>
                    )}
                    {/* Loop back to next row for col 3 */}
                    {(idx + 1) % 3 === 0 && (
                      <div className="hidden lg:block absolute top-full right-1/2 pointer-events-none z-20" style={{ width: 'calc(200% + 3rem)', height: '1.5rem' }}>
                        <div className="w-full h-full border-r-2 border-b-2 border-orange-400 rounded-br-xl" />
                        <div className="absolute top-full left-0 w-0.5 h-[1.5rem] bg-gradient-to-b from-orange-400 to-amber-500">
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-r-2 border-b-2 border-amber-500 rotate-45 translate-y-[2px]" />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Power Calculations with Interactive Sliders (Інженерний розрахунок потужності) */}
        {service.powerCalculations && (
          <div className="space-y-6 pt-6 border-t border-slate-700/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">{service.powerCalculations.title}</h2>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{service.powerCalculations.intro}</p>
              </div>
            </div>

            {/* Interactive Solar Slider Widget */}
            <SolarSliderCalculator isDark={isDark} />

            {/* Technical points below slider */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {service.powerCalculations.points.map((pt, idx) => (
                <div
                  key={idx}
                  className={`p-4.5 rounded-2xl border space-y-1.5 ${
                    isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  <h3 className="font-bold text-sm text-amber-500 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>{pt.name}</span>
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: Battery Setup Details with Interactive Sliders (Акумуляторна частина) */}
        {service.batterySetupDetails && (
          <div className="space-y-6 pt-6 border-t border-slate-700/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">{service.batterySetupDetails.title}</h2>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{service.batterySetupDetails.intro}</p>
              </div>
            </div>

            {/* Interactive Battery Slider Widget */}
            <BatterySliderCalculator isDark={isDark} />

            {/* Technical points below slider */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {service.batterySetupDetails.points.map((pt, idx) => (
                <div
                  key={idx}
                  className={`p-4.5 rounded-2xl border space-y-1.5 ${
                    isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  <h3 className="font-bold text-sm text-emerald-500 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>{pt.name}</span>
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Equipment Selection (Підбір найкращого обладнання) */}
        <div className="space-y-6 pt-6 border-t border-slate-700/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Підбір Сертифікованого Обладнання</h2>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Сертифіковані елементи з офіційною гарантією від виробника</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.equipmentSelection.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 inline-block">
                  {item.highlight}
                </span>
                <h3 className="font-bold text-base">{item.name}</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: Documentation & Permits (Робота з документами) */}
        <div className="space-y-6 pt-6 border-t border-slate-700/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-500">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Робота з Документами та Дозволами</h2>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Повний юридичний супровід та взаємодія з РЕМ / Обленерго</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.documentationProcess.map((doc, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <h3 className="font-bold text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>{doc.title}</span>
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {doc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: Order CTA Banner */}
        <div className={`p-8 sm:p-10 rounded-3xl border text-center space-y-4 shadow-xl ${
          isDark ? 'border-slate-800 bg-slate-950/80' : 'border-amber-200 bg-white'
        }`}>
          <h3 className="text-xl sm:text-2xl font-extrabold">Цікавить послуга "{service.title}"?</h3>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Отримайте безкоштовний розрахунок та виїзд інженера на об'єкт.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenConsultation && onOpenConsultation(service.title)}
              className="btn-orange-bright px-8 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Замовити Консультацію</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
