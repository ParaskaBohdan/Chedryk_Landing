import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { Sun, BatteryCharging, FileCheck, Home, Zap, ArrowRight, CheckCircle2, Wrench } from 'lucide-react';

const iconMap = {
  Sun: Sun,
  BatteryCharging: BatteryCharging,
  FileCheck: FileCheck,
  Home: Home,
  Zap: Zap
};

export default function ServicesPage({ theme, onOpenConsultation }) {
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className={`py-12 sm:py-20 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-slate-100/70 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full border ${
            isDark ? 'border-amber-400/40 bg-amber-500/15 text-amber-300' : 'border-amber-300 bg-amber-100 text-amber-800'
          }`}>
            <Wrench className="w-4 h-4 text-amber-500" />
            <span>Каталог Послуг Чедрика Івана • NOVA ENERGY_UA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Спеціалізовані Послуги з <span className="text-amber-500">Енергозабезпечення</span>
          </h1>
          <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Повний комплекс інженерних робіт у Закарпатській та Івано-Франківській областях: будівництво СЕС, резервне живлення, документація та монтаж під ключ.
          </p>
        </div>

        {/* 4 Core Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.iconName] || Sun;

            return (
              <div
                key={service.id}
                className={`group flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 ${
                  isDark 
                    ? 'bg-slate-950/80 border-slate-800 hover:border-amber-500/50' 
                    : 'bg-white border-slate-200 hover:border-amber-500/50'
                }`}
              >
                {/* Card Top Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Badge & Icon Floating Overlay: Icon Left, Badge Right */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                    <div className="w-9 h-9 rounded-full bg-slate-950/85 backdrop-blur-md flex items-center justify-center text-amber-400 border border-amber-400/40 shadow-lg">
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-md">
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <h3 className={`text-xl sm:text-2xl font-bold transition-colors ${
                      isDark ? 'text-white group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'
                    }`}>
                      {service.title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Key Advantages Checklist */}
                  <div className="pt-3 space-y-2 border-t border-slate-700/30">
                    {service.advantages.map((adv, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium opacity-90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{adv}</span>
                      </div>
                    ))}
                  </div>

                  {/* Dual Action Buttons: Детальніше (Left) + Замовити (Right) */}
                  <div className="pt-4 grid grid-cols-2 gap-3">
                    <Link
                      to={`/services/${service.id}`}
                      className={`font-bold py-3 px-4 text-xs sm:text-sm rounded-xl border text-center transition-colors flex items-center justify-center gap-2 ${
                        isDark 
                          ? 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:border-amber-400/40 hover:text-amber-400' 
                          : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200 hover:border-amber-500 hover:text-amber-600'
                      }`}
                    >
                      <span>Детальніше</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => onOpenConsultation(service.title)}
                      className={`font-bold py-3 px-4 text-xs sm:text-sm rounded-xl text-center border shadow-xs transition-all duration-200 active:scale-95 cursor-pointer ${
                        isDark
                          ? 'bg-amber-500/15 border-amber-400/60 text-amber-300 hover:bg-gradient-to-r hover:from-amber-600 hover:to-amber-500 hover:text-white hover:border-transparent hover:shadow-md hover:shadow-amber-500/25'
                          : 'bg-amber-100/80 border-amber-400/80 text-amber-900 hover:bg-gradient-to-r hover:from-amber-600 hover:to-amber-500 hover:text-white hover:border-transparent hover:shadow-md hover:shadow-amber-500/25'
                      }`}
                    >
                      Замовити
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className={`mt-16 p-8 sm:p-10 rounded-3xl border text-center space-y-4 shadow-xl ${
          isDark ? 'border-slate-800 bg-slate-950/80' : 'border-amber-200 bg-white'
        }`}>
          <h3 className="text-xl sm:text-2xl font-extrabold">Бажаєте замовити інженерні послуги?</h3>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Отримайте кваліфіковану відповідь інженера щодо монтажу СЕС, підключення Deye або Зеленого Тарифу.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenConsultation && onOpenConsultation('Замовлення послуг')}
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
