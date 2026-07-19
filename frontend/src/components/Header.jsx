import React, { useState } from 'react';
import { Phone, Menu, X, Sun, Moon, ShieldCheck, Video } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenConsultation, theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab, sectionId) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (tab === 'home' && sectionId) {
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
      isDark ? 'border-slate-800/80 bg-slate-950/90 text-white backdrop-blur-md' : 'border-slate-200 bg-slate-100/95 text-slate-800 shadow-xs backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Clean Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('home', 'hero')}
          className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img 
              src="/logo.svg" 
              alt="Чедрик Іван Лого" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className={`font-extrabold text-base sm:text-lg tracking-tight leading-tight whitespace-nowrap ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Чедрик Іван
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-amber-500 flex items-center gap-1 whitespace-nowrap">
              <ShieldCheck className="w-3 h-3 text-emerald-500" /> СЕС 5 кВт – 1 МВт • Закарпаття & Франківськ
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-6 flex-shrink-0">
          <button
            onClick={() => handleNavClick('home', 'services')}
            className={`text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
              isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-700 hover:text-amber-600'
            }`}
          >
            Послуги
          </button>
          <button
            onClick={() => handleNavClick('home', 'stats')}
            className={`text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
              isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-700 hover:text-amber-600'
            }`}
          >
            Офіційні Дані
          </button>
          <button
            onClick={() => handleNavClick('home', 'deye-legal')}
            className={`text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
              isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-700 hover:text-amber-600'
            }`}
          >
            Deye & Тариф
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className={`text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'calculator' 
                ? 'text-amber-500 border-b-2 border-amber-500 pb-0.5' 
                : isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-700 hover:text-amber-600'
            }`}
          >
            Калькулятор
          </button>
          <button
            onClick={() => handleNavClick('contacts')}
            className={`text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'contacts' 
                ? 'text-amber-500 border-b-2 border-amber-500 pb-0.5' 
                : isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-700 hover:text-amber-600'
            }`}
          >
            Контакти
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          
          {/* TikTok Badge Link */}
          <a
            href="https://tiktok.com" 
            target="_blank" 
            rel="noreferrer"
            title="Переглянути TikTok Чедрика Івана"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-400/40' : 'bg-slate-200/70 border-slate-300 text-slate-700 hover:text-amber-600'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-amber-500" />
            <span>TikTok</span>
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Змінити тему"
            title={isDark ? "Увімкнути світлу тему" : "Увімкнути темну тему"}
            className={`p-2 rounded-xl border transition-all flex-shrink-0 ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                : 'bg-slate-200/80 border-slate-300 text-amber-600 hover:bg-slate-300/80'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-amber-600" />}
          </button>

          {/* Phone */}
          <a 
            href="tel:+380970000000" 
            className={`hidden 2xl:flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl border transition-all whitespace-nowrap ${
              isDark ? 'text-slate-300 hover:text-white bg-slate-900 border-slate-800' : 'text-slate-700 bg-slate-200/60 border-slate-300'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            <span>+380 (97) 000-00-00</span>
          </a>

          {/* Light Radiant Orange Button -> Leads to Calculator */}
          <button
            onClick={() => handleNavClick('calculator')}
            className="hidden sm:inline-flex btn-orange-bright font-bold text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap flex-shrink-0 glow-amber"
          >
            Розрахувати Вартість
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border flex-shrink-0 ${
              isDark ? 'text-slate-300 border-slate-800 bg-slate-900' : 'text-slate-700 border-slate-300 bg-slate-200/80'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t px-4 py-5 space-y-2.5 transition-colors ${
          isDark ? 'bg-slate-950/98 border-slate-800 text-slate-100' : 'bg-slate-100/98 border-slate-200 text-slate-900 shadow-xl'
        }`}>
          <button
            onClick={() => handleNavClick('home', 'services')}
            className="block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl hover:bg-amber-500/10"
          >
            ☀️ Основні Послуги
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className="block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl hover:bg-amber-500/10 text-amber-500"
          >
            🧮 Калькулятор Вартності СЕС
          </button>
          <button
            onClick={() => handleNavClick('home', 'deye-legal')}
            className="block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl hover:bg-amber-500/10"
          >
            ⚡ Deye & Зелений Тариф
          </button>
          <button
            onClick={() => handleNavClick('contacts')}
            className="block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl hover:bg-amber-500/10"
          >
            📞 Контакти та TikTok
          </button>
          
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('calculator')}
              className="w-full btn-orange-bright font-bold py-3 rounded-xl shadow-md text-sm text-center"
            >
              Розрахувати Вартість СЕС
            </button>
            <a 
              href="tel:+380970000000" 
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold ${
                isDark ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-300 bg-slate-200/80 text-slate-800'
              }`}
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>Зателефонувати +380 (97) 000-00-00</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
