import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getServiceById } from '../data/servicesData';
import ConsultationForm from '../components/ConsultationForm';
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {service.workSteps.map((step) => (
              <div
                key={step.step}
                className={`p-5.5 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                  isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <div>
                  <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-sm mb-4 shadow-sm">
                    {step.step < 10 ? `0${step.step}` : step.step}
                  </div>
                  <h3 className="font-bold text-base mb-2">{step.title}</h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Power Calculations (Інженерний розрахунок потужності) */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.powerCalculations.points.map((pt, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border space-y-2 ${
                    isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  <h3 className="font-bold text-base text-amber-500 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>{pt.name}</span>
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: Battery Setup Details (Акумуляторна частина) */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.batterySetupDetails.points.map((pt, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border space-y-2 ${
                    isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  <h3 className="font-bold text-base text-emerald-500 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{pt.name}</span>
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
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

        {/* SECTION 4: Order Form Container */}
        <div className="pt-10 border-t border-slate-700/60">
          <ConsultationForm selectedServicePrefill={service.title} theme={theme} />
        </div>

      </div>
    </div>
  );
}
