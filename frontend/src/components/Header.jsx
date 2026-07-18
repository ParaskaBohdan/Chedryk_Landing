import React, { useState } from 'react';
import { Phone, Menu, X, Sun, Moon, ShieldCheck } from 'lucide-react';

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
    <header className={`sticky top-0 z-50 glass-panel border-b transition-colors duration-300 ${
      isDark ? 'border-slate-800/80 bg-slate-950/80 text-white' : 'border-sky-100 bg-white/95 text-slate-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Clean SVG without background */}
        <div 
          onClick={() => handleNavClick('home', 'hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm">
            <img 
              src="/logo.svg" 
              alt="Чедрик Іван Лого" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-base sm:text-xl tracking-wide">
              <span className={isDark ? 'text-white' : 'text-slate-900'}>Чедрик Іван</span>
              <Sun className={`w-4 h-4 sm:w-5 sm:h-5 animate-spin-slow inline-block ${isDark ? 'text-amber-400' : 'text-sky-500'}`} />
            </div>
            <p className={`text-[10px] sm:text-xs font-semibold flex items-center gap-1 ${
              isDark ? 'text-amber-400' : 'text-sky-600'
            }`}>
              <ShieldCheck className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isDark ? 'text-emerald-400' : 'text-sky-500'}`} /> Сонячні Станції & Електромонтаж
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => handleNavClick('home', 'services')}
            className={`text-sm font-semibold transition-colors ${
              isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            Послуги
          </button>
          <button
            onClick={() => handleNavClick('home', 'stats')}
            className={`text-sm font-semibold transition-colors ${
              isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            Офіційні Дані
          </button>
          <button
            onClick={() => handleNavClick('home', 'deye-legal')}
            className={`text-sm font-semibold transition-colors ${
              isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            Deye & Зелений Тариф
          </button>
          <button
            onClick={() => handleNavClick('home', 'process')}
            className={`text-sm font-semibold transition-colors ${
              isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            Етапи Роботи
          </button>
          <button
            onClick={() => handleNavClick('contacts')}
            className={`text-sm font-semibold transition-colors ${
              activeTab === 'contacts' 
                ? isDark ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5' : 'text-sky-600 border-b-2 border-sky-600 pb-0.5'
                : isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            Контакти
          </button>
        </nav>

        {/* Action Buttons & Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Змінити тему"
            title={isDark ? "Увімкнути світлу небесну тему" : "Увімкнути темну тему"}
            className={`p-2 sm:p-2.5 rounded-xl border transition-all ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 hover:border-amber-400/40' 
                : 'bg-sky-50 border-sky-200 text-sky-600 hover:bg-sky-100 hover:border-sky-300 shadow-sm'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600" />}
          </button>

          <a 
            href="tel:+380970000000" 
            className={`hidden lg:flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl border transition-all ${
              isDark 
                ? 'text-slate-300 hover:text-white bg-slate-900 border-slate-800 hover:border-slate-700' 
                : 'text-slate-700 hover:text-slate-900 bg-sky-50/70 border-sky-200 hover:border-sky-300 shadow-sm'
            }`}
          >
            <Phone className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-sky-500'}`} />
            <span>+380 (97) 000-00-00</span>
          </a>

          <button
            onClick={onOpenConsultation}
            className={`hidden sm:inline-flex font-bold text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-xl shadow-lg hover:scale-105 transition-all duration-200 ${
              isDark 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 glow-amber' 
                : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white glow-sky'
            }`}
          >
            Консультація
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl border ${
              isDark ? 'text-slate-300 border-slate-800 bg-slate-900' : 'text-slate-700 border-sky-200 bg-sky-50'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t px-4 py-6 space-y-3 transition-colors ${
          isDark ? 'bg-slate-950/95 border-slate-800 text-slate-100' : 'bg-white/98 border-sky-100 text-slate-900 shadow-xl'
        }`}>
          <button
            onClick={() => handleNavClick('home', 'services')}
            className={`block w-full text-left text-base font-semibold py-2.5 px-3 rounded-xl ${
              isDark ? 'hover:bg-slate-900 text-slate-200' : 'hover:bg-sky-50 text-slate-800'
            }`}
          >
            ☀️ Основні Послуги
          </button>
          <button
            onClick={() => handleNavClick('home', 'stats')}
            className={`block w-full text-left text-base font-semibold py-2.5 px-3 rounded-xl ${
              isDark ? 'hover:bg-slate-900 text-slate-200' : 'hover:bg-sky-50 text-slate-800'
            }`}
          >
            📊 Офіційні Дані СЕС
          </button>
          <button
            onClick={() => handleNavClick('home', 'deye-legal')}
            className={`block w-full text-left text-base font-semibold py-2.5 px-3 rounded-xl ${
              isDark ? 'hover:bg-slate-900 text-slate-200' : 'hover:bg-sky-50 text-slate-800'
            }`}
          >
            ⚡ Deye & Зелений Тариф
          </button>
          <button
            onClick={() => handleNavClick('home', 'process')}
            className={`block w-full text-left text-base font-semibold py-2.5 px-3 rounded-xl ${
              isDark ? 'hover:bg-slate-900 text-slate-200' : 'hover:bg-sky-50 text-slate-800'
            }`}
          >
            🛠️ 5 Етапів Роботи
          </button>
          <button
            onClick={() => handleNavClick('contacts')}
            className={`block w-full text-left text-base font-semibold py-2.5 px-3 rounded-xl ${
              isDark ? 'hover:bg-slate-900 text-amber-400' : 'hover:bg-sky-50 text-sky-600'
            }`}
          >
            📞 Контакти та Карта
          </button>
          
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className={`w-full font-bold py-3 rounded-xl shadow-md text-sm text-center ${
                isDark 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950' 
                  : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white'
              }`}
            >
              Замовити Консультацію
            </button>
            <a 
              href="tel:+380970000000" 
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-sky-50 border-sky-200 text-sky-900'
              }`}
            >
              <Phone className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-sky-500'}`} />
              <span>Зателефонувати +380 (97) 000-00-00</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
