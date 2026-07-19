import React from 'react';
import { motion } from 'framer-motion';
import { Sun, ShieldCheck, Zap, TrendingUp, Award, MapPin, Calculator } from 'lucide-react';

import { Link } from 'react-router-dom';

export default function Hero({ theme }) {
  const isDark = theme === 'dark';

  const stats = [
    { label: 'Потужність станцій', value: '5 кВт – 1 МВт', desc: 'Для будинків, підприємств та СЕС' },
    { label: 'Термін окупності', value: '3 – 4 роки', desc: 'При мережевих та гібридних рішеннях' },
    { label: 'Термін служби панелей', value: '25+ років', desc: 'Офіційна гарантія виробника' },
    { label: 'Зниження витрат', value: 'До 90%', desc: 'На власні потреби та енергію' }
  ];

  return (
    <section id="hero" className={`relative py-12 sm:py-20 lg:py-24 overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-slate-100/80 text-slate-900'
    }`}>
      {/* Background Decorative Glowing Blobs */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] rounded-full blur-[140px] pointer-events-none ${
        isDark ? 'bg-amber-500/15' : 'bg-amber-400/15'
      }`} />
      <div className={`absolute top-1/3 right-5 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full blur-[130px] pointer-events-none ${
        isDark ? 'bg-orange-500/15' : 'bg-orange-400/15'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Main Hero Text */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left"
          >
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold ${
              isDark ? 'bg-amber-500/15 border-amber-400/40 text-amber-300' : 'bg-slate-200/80 border-slate-300 text-slate-800'
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
            className="lg:col-span-5 relative"
          >
            <div className={`glass-panel p-5 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden ${
              isDark ? 'border-slate-700/80 bg-slate-800/90' : 'border-slate-200 bg-white/95 shadow-md'
            }`}>
              <div className={`flex items-center justify-between pb-5 border-b ${
                isDark ? 'border-slate-700' : 'border-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-400/40 text-amber-500">
                    <Sun className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm sm:text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Сонячні Станції
                    </h3>
                    <p className="text-xs text-slate-400">Від 5 кВт до 1 МВт під ключ</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-full border bg-emerald-500/15 border-emerald-400/40 text-emerald-500">
                  Активно 2026
                </span>
              </div>

              <div className="py-5 space-y-4">
                <div className={`p-3.5 sm:p-4 rounded-xl border space-y-1.5 ${
                  isDark ? 'border-slate-700 bg-slate-900/90' : 'border-slate-200 bg-slate-50'
                }`}>
                  <div className="flex justify-between text-xs font-medium">
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Ефективність інвертора</span>
                    <span className="text-amber-500 font-bold">98.4%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div className="h-full w-[98%] bg-gradient-to-r from-amber-400 to-emerald-400" />
                  </div>
                </div>

                <div className={`p-3.5 sm:p-4 rounded-xl border space-y-1.5 ${
                  isDark ? 'border-slate-700 bg-slate-900/90' : 'border-slate-200 bg-slate-50'
                }`}>
                  <div className="flex justify-between text-xs font-medium">
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Економія електроенергії</span>
                    <span className="text-emerald-500 font-bold">Максимальна</span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div className="h-full w-[90%] bg-emerald-400" />
                  </div>
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
            </div>
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
              className={`glass-card p-4 sm:p-6 rounded-2xl border transition-all group ${
                isDark 
                  ? 'border-slate-700/80 bg-slate-800/80 hover:border-amber-400/60' 
                  : 'border-slate-200 bg-white hover:border-amber-400 shadow-xs'
              }`}
            >
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}
