import React from 'react';
import { motion } from 'framer-motion';
import { Sun, ShieldCheck, Zap, TrendingUp, Award, MapPin, Calculator, Compass, Thermometer } from 'lucide-react';

import { Link } from 'react-router-dom';
import { SectionAmbience } from './SolarDetails';
import SolarPanelCard from './SolarPanelCard';
import { LiveBadge, EfficiencyMeter, TiltGauge, IrradianceChart, TelemetryChip } from './SolarTech';

export default function Hero({ theme }) {
  const isDark = theme === 'dark';

  const stats = [
    { label: 'Потужність станцій', value: '5 кВт – 1 МВт', desc: 'Для будинків, підприємств та СЕС' },
    { label: 'Термін окупності', value: '3 – 4 роки', desc: 'При мережевих та гібридних рішеннях' },
    { label: 'Досвід та довіра', value: '700+', desc: 'задоволених клієнтів' },
    { label: 'Зниження витрат', value: 'До 90%', desc: 'На власні потреби та енергію' }
  ];

  return (
    <section id="hero" className={`relative py-8 md:py-20 lg:py-24 overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-slate-100/80 text-slate-900'
    }`}>
      {/* Background Decorative Glowing Blobs */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] rounded-full blur-[140px] pointer-events-none ${
        isDark ? 'bg-amber-500/15' : 'bg-amber-400/15'
      }`} />
      <div className={`absolute top-1/3 right-5 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full blur-[130px] pointer-events-none ${
        isDark ? 'bg-orange-500/15' : 'bg-orange-400/15'
      }`} />

      <SectionAmbience flares={false} beams={false} />

      {/* Ambient Solar Lighting — flares & light beams */}
      <div className="solar-flare w-[280px] sm:w-[460px] h-[280px] sm:h-[460px] -top-24 right-[4%]" aria-hidden="true" />
      <div className="solar-flare w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bottom-[-60px] left-[2%]" style={{ animationDelay: '2.8s' }} aria-hidden="true" />
      <div className="solar-beam hidden sm:block w-[110px] h-[620px] -top-48 right-[18%]" aria-hidden="true" />
      <div className="solar-beam hidden sm:block w-[64px] h-[520px] -top-40 right-[34%]" style={{ animationDelay: '4s' }} aria-hidden="true" />
      <div className="solar-beam hidden lg:block w-[80px] h-[480px] -top-36 left-[12%]" style={{ animationDelay: '6s' }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Mobile View: Render only title, description, and the 4 stats blocks */}
        <div className="block md:hidden space-y-6 text-center">
          <div className="space-y-4">
            <h1 className={`text-3xl font-extrabold tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Енергонезалежність & <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Сонячні Електростанції
              </span>
            </h1>

            <p className={`text-sm font-normal leading-relaxed px-2 ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}>
              Індивідуальне проектирування, професійний монтаж та пусконалагодження СЕС <strong className={isDark ? 'text-white' : 'text-slate-900'}>від 5 кВт до 1 МВт</strong> від <strong className={isDark ? 'text-white' : 'text-slate-900'}>Чедрика Івана</strong>. Гібридні системи Deye, автономне живлення EcoFlow та безпечний електромонтаж.
            </p>
          </div>

          {/* Stats blocks (2x2 Grid) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {stats.map((item, index) => (
              <div
                key={index}
                className={`glass-card pv-shell pv-texture py-2 px-3 rounded-xl border text-left ${
                  isDark
                    ? 'border-slate-800 bg-slate-800/60'
                    : 'border-slate-200 bg-white shadow-xs'
                }`}
              >
                <span className="pv-sheen" aria-hidden="true" />
                <div className="pv-content">
                  <p className={`text-[8px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {item.label}
                  </p>
                  <p className={`text-base font-black mt-0 ${isDark ? 'text-amber-400' : 'text-orange-500'}`}>
                    {item.value}
                  </p>
                  <p className={`text-[9px] mt-0 leading-tight ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View: Main Grid & Stats Bar */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Main Hero Text */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left"
            >
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold ${
                isDark ? 'bg-amber-500/15 border-[#fbbf24] text-[#fde68a]' : 'bg-amber-50 border-orange-400 text-slate-800'
              }`}>
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                <span>Закарпатська & Івано-Франківська області</span>
              </div>

              <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Енергонезалежність & <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Сонячні Електростанції
                </span>
              </h1>

              <p className={`text-sm sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed ${
                isDark ? 'text-slate-200' : 'text-slate-700'
              }`}>
                Індивідуальне проектирування, професійний монтаж та пусконалагодження СЕС <strong className={isDark ? 'text-white' : 'text-slate-900'}>від 5 кВт до 1 МВт</strong> від <strong className={isDark ? 'text-white' : 'text-slate-900'}>Чедрика Івана</strong>. Гібридні системи Deye, автономне живлення EcoFlow та безпечний електромонтаж.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2">
                <Link
                  to="/calculator"
                  className="btn-orange-bright font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2.5 glow-amber"
                >
                  <Calculator className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <span>Розрахувати Вартість СЕС</span>
                </Link>

                <a
                  href="#services"
                  className={`glass-card font-semibold text-sm sm:text-base px-6 py-3.5 sm:py-4 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                    isDark 
                      ? 'text-white hover:text-amber-400 border-slate-700 hover:border-amber-400' 
                      : 'text-slate-800 hover:text-amber-600 border-slate-300 hover:border-slate-400 shadow-xs'
                  }`}
                >
                  <span>Переглянути Послуги</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className={`pt-6 border-t grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs font-semibold ${
                isDark ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'
              }`}>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Гарантія на роботи</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>СЕС від 5 кВт до 1 МВт</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start col-span-2 sm:col-span-1">
                  <TrendingUp className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Зелений тариф під ключ</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Visual Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="hidden lg:block lg:col-span-5 relative"
            >
              <SolarPanelCard theme={theme} glow className="p-5 sm:p-8 shadow-2xl">
                <div className={`flex items-center justify-between pb-5 border-b ${
                  isDark ? 'border-slate-700' : 'border-slate-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 ${
                      isDark ? 'bg-slate-950 border-[#fbbf24] text-[#fbbf24]' : 'bg-white border-orange-500 text-orange-500'
                    }`}>
                      <Sun className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-sm sm:text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Сонячні Станції
                      </h3>
                      <p className="text-xs text-slate-400">Від 5 кВт до 1 МВт під ключ</p>
                    </div>
                  </div>
                  <LiveBadge theme={theme} label="Live Grid Active" />
                </div>

                <div className="py-5 space-y-4">
                  <div className={`p-3.5 sm:p-4 rounded-xl border space-y-3.5 ${
                    isDark ? 'border-slate-700 bg-slate-900/70' : 'border-slate-200 bg-slate-50/80'
                  }`}>
                    <EfficiencyMeter theme={theme} label="Inverter Efficiency" value={98.4} tone="emerald" live />
                    <EfficiencyMeter theme={theme} label="Panel Efficiency" value={23.8} live />
                  </div>

                  <div className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between gap-3 ${
                    isDark ? 'border-slate-700 bg-slate-900/70' : 'border-slate-200 bg-slate-50/80'
                  }`}>
                    <TiltGauge theme={theme} angle={35} label="Tilt Angle" />
                    <div className="space-y-2 min-w-0">
                      <TelemetryChip theme={theme} icon={Compass} label="Azimuth" value="182°" />
                      <TelemetryChip theme={theme} icon={Thermometer} label="Cell Temp" value="41.2 °C" live />
                    </div>
                  </div>

                  <div className={`p-3.5 sm:p-4 rounded-xl border ${
                    isDark ? 'border-slate-700 bg-slate-900/70' : 'border-slate-200 bg-slate-50/80'
                  }`}>
                    <IrradianceChart theme={theme} />
                  </div>
                </div>

                <div className={`p-3.5 rounded-2xl border border-amber-400/30 flex items-center gap-3 ${
                  isDark ? 'bg-amber-500/15 text-slate-200' : 'bg-slate-100 text-slate-800'
                }`}>
                  <Zap className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <p className="text-xs leading-snug font-medium">
                    Офіційний монтаж у Закарпатській та Івано-Франківській областях.
                  </p>
                </div>
              </SolarPanelCard>
            </motion.div>

          </div>

          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
          >
            {stats.map((item, index) => (
              <div
                key={index}
                className={`glass-card pv-shell pv-texture solar-hover p-4 sm:p-6 rounded-2xl border group ${
                  isDark
                    ? 'border-slate-700/80 bg-slate-800/80 hover:border-amber-400/60'
                    : 'border-slate-200 bg-white hover:border-amber-400 shadow-xs'
                }`}
              >
                <span className="pv-sheen" aria-hidden="true" />
                <div className="pv-content">
                  <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {item.label}
                  </p>
                  <p className={`text-xl sm:text-3xl font-extrabold mt-1 group-hover:text-amber-500 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {item.value}
                  </p>
                  <p className={`text-[11px] sm:text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
