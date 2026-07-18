import React from 'react';
import { motion } from 'framer-motion';
import { Sun, ShieldCheck, Zap, TrendingUp, Award, MapPin } from 'lucide-react';

export default function Hero({ onOpenConsultation, onOpenCalculator, theme }) {
  const isDark = theme === 'dark';

  const stats = [
    { label: 'Потужність станцій', value: '28 – 60 кВт', desc: 'Для будинків та бізнесу' },
    { label: 'Термін окупності', value: '3 – 4 роки', desc: 'При мережевих та гібридних рішеннях' },
    { label: 'Термін служби панелей', value: '25+ років', desc: 'Офіційна гарантія виробника' },
    { label: 'Зниження витрат', value: 'До 90%', desc: 'На власні потреби та енергію' }
  ];

  return (
    <section id="hero" className="relative py-12 sm:py-20 lg:py-24 overflow-hidden transition-colors duration-300 theme-bg-section theme-text-primary">
      {/* Background Decorative Soft Glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] rounded-full blur-[130px] pointer-events-none transition-all duration-500"
        style={{ background: 'var(--hero-glow)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Main Hero Text */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold theme-badge shadow-xs">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 theme-icon-accent" />
              <span>Закарпатська область • Сертифікований монтаж</span>
            </div>

            <h1 className="text-xl sm:text-4xl lg:text-5xl font-extrabold tracking-normal leading-tight theme-text-primary">
              <span className="block theme-text-accent">Енергонезалежність &</span>
              <span className="block theme-text-accent">Сонячні Електростанції</span>
            </h1>

            <p className="text-sm sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed theme-text-secondary">
              Індивідуальне проектування, професійний монтаж та пусконалагодження СЕС від <strong className="theme-text-primary">Чедрика Івана</strong>. Автономність, джерела резервного живлення EcoFlow та безпечні електромережі для будинку й бізнесу.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={onOpenCalculator}
                className="font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all flex items-center justify-center gap-2.5 theme-btn-primary hover:scale-105"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                <span>Розрахувати Вартість СЕС</span>
              </button>

              <a
                href="#services"
                className="font-semibold text-sm sm:text-base px-6 py-3.5 sm:py-4 rounded-xl border transition-all flex items-center justify-center gap-2 theme-btn-secondary"
              >
                <span>Переглянути Послуги</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t theme-border-subtle grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs font-semibold theme-text-secondary">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 theme-icon-accent" />
                <span>Гарантія на роботи</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Award className="w-4 h-4 flex-shrink-0 theme-icon-accent" />
                <span>Досвід у СЕС 28–60 кВт</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start col-span-2 sm:col-span-1">
                <TrendingUp className="w-4 h-4 flex-shrink-0 theme-icon-accent" />
                <span>Офіційні розрахунки</span>
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
            <div className="glass-panel p-5 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden theme-bg-card theme-border-card">
              <div className="flex items-center justify-between pb-5 border-b theme-border-subtle">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border theme-badge">
                    <Sun className="w-6 h-6 theme-icon-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base theme-text-primary">
                      Сонячні Станції
                    </h3>
                    <p className="text-xs theme-text-muted">Повний цикл під ключ</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-full border theme-badge">
                  Активно 2026
                </span>
              </div>

              <div className="py-5 space-y-4">
                <div className="p-3.5 sm:p-4 rounded-xl border space-y-1.5 theme-bg-card-subtle theme-border-subtle">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="theme-text-secondary">Ефективність інвертора</span>
                    <span className="font-bold theme-progress-text">98.4%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden theme-progress-bg">
                    <div className="h-full w-[98%] theme-progress-fill" />
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl border space-y-1.5 theme-bg-card-subtle theme-border-subtle">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="theme-text-secondary">Економія електроенергії</span>
                    <span className="font-bold theme-progress-text">Максимальна</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden theme-progress-bg">
                    <div className="h-full w-[90%] theme-progress-fill" />
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl border flex items-center gap-3 theme-badge">
                <Zap className="w-5 h-5 flex-shrink-0 theme-icon-accent" />
                <p className="text-xs leading-snug font-medium">
                  Використовуємо лише сертифіковані акумулятори та обладнання провідних брендів.
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
              className="glass-card p-4 sm:p-6 rounded-2xl border transition-all group theme-bg-card theme-border-card"
            >
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider theme-text-muted">
                {item.label}
              </p>
              <p className="text-xl sm:text-3xl font-extrabold mt-1 transition-colors theme-text-primary">
                {item.value}
              </p>
              <p className="text-[11px] sm:text-xs mt-1 theme-text-muted">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
