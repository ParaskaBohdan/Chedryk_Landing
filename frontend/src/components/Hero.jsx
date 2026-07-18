import React from 'react';
import { motion } from 'framer-motion';
import { Sun, ShieldCheck, Zap, TrendingUp, Award, MapPin } from 'lucide-react';

export default function Hero({ onOpenConsultation }) {
  const stats = [
    { label: 'Потужність станцій', value: '28 – 60 кВт', desc: 'Для будинків та бізнесу' },
    { label: 'Термін окупності', value: '3 – 4 роки', desc: 'При мережевих та гібридних рішеннях' },
    { label: 'Термін служби панелей', value: '25+ років', desc: 'Офіційна гарантія виробника' },
    { label: 'Зниження витрат', value: 'До 90%', desc: 'На власні потреби та енергію' }
  ];

  return (
    <section id="hero" className="relative py-16 lg:py-24 overflow-hidden bg-slate-950">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Закарпатська область • Сертифікований монтаж</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Енергонезалежність & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
                Сонячні Електростанції
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Індивідуальне проектування, професійний монтаж та пусконалагодження СЕС від <strong className="text-white">Чедрика Івана</strong>. Автономність, джерела резервного живлення EcoFlow та безпечні електромережі для будинку й бізнесу.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={onOpenConsultation}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-base px-8 py-4 rounded-xl shadow-xl glow-amber hover:scale-105 transition-all flex items-center justify-center gap-3"
              >
                <Zap className="w-5 h-5 fill-current" />
                <span>Розрахувати Вартість СЕС</span>
              </button>

              <a
                href="#services"
                className="glass-card text-white hover:text-amber-400 font-semibold text-base px-6 py-4 rounded-xl border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
              >
                <span>Переглянути Послуги</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Гарантія на роботи</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Досвід у СЕС 28–60 кВт</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start col-span-2 sm:col-span-1">
                <TrendingUp className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>Офіційні розрахунки</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual Card / Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/40">
                    <Sun className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">Сонячні Станції</h3>
                    <p className="text-xs text-slate-400">Повний цикл під ключ</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full">
                  Активно 2026
                </span>
              </div>

              <div className="py-6 space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Ефективність інвертора</span>
                    <span className="text-amber-400 font-bold">98.4%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full w-[98%]" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Економія електроенергії</span>
                    <span className="text-emerald-400 font-bold">Максимальна</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[90%]" />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/30 flex items-center gap-3">
                <Zap className="w-6 h-6 text-amber-400 flex-shrink-0" />
                <p className="text-xs text-slate-200 leading-snug">
                  Використовуємо лише сертифіковані акумулятори та обладнання провідних брендів для тривалої автономності.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((item, index) => (
            <div 
              key={index}
              className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all group"
            >
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1 group-hover:text-amber-400 transition-colors">
                {item.value}
              </p>
              <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
