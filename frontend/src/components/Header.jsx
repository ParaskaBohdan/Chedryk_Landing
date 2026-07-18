import React, { useState } from 'react';
import { Phone, Menu, X, Sun, Moon } from 'lucide-react';

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
      isDark ? 'border-slate-800/80 bg-slate-950/90 text-white backdrop-blur-md' : 'border-sky-100/90 bg-white/95 text-slate-900 shadow-xs backdrop-blur-md'
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
            <span className={`text-[10px] sm:text-xs font-semibold whitespace-nowrap ${
              isDark ? 'text-amber-400' : 'text-sky-600'
            }`}>
              Сонячні Станції & Електромонтаж
            </span>
          </div>
        </div>

        {/* Desktop Navigation - Clean Spacing & Whitespace No-wrap */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7 flex-shrink-0">
          <button
            onClick={() => handleNavClick('home', 'services')}
            className={`text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
              isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            Послуги
          </button>
          <button
            onClick={() => handleNavClick('home', 'stats')}
            className={`text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
              isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            Офіційні Дані
          </button>
          <button
            onClick={() => handleNavClick('home', 'deye-legal')}
            className={`text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
              isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            Deye & Зелений Тариф
          </button>
          <button
            onClick={() => handleNavClick('home', 'process')}
            className={`text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
              isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            Етапи Роботи
          </button>
          <button
            onClick={() => handleNavClick('contacts')}
            className={`text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'contacts' 
                ? isDark ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5' : 'text-sky-600 border-b-2 border-sky-600 pb-0.5'
                : isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            Контакти
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 flex-shrink-0">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Змінити тему"
            title={isDark ? "Увімкнути світлу тему" : "Увімкнути темну тему"}
            className={`p-2 rounded-xl border transition-all flex-shrink-0 ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 hover:border-amber-400/40' 
                : 'bg-sky-50 border-sky-200 text-sky-600 hover:bg-sky-100 hover:border-sky-300 shadow-xs'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
          </button>

          {/* Direct Phone Number - visible on 2XL screens to prevent layout crowding */}
          <a 
            href="tel:+380970000000" 
            className={`hidden 2xl:flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl border transition-all whitespace-nowrap ${
              isDark 
                ? 'text-slate-300 hover:text-white bg-slate-900 border-slate-800' 
                : 'text-slate-700 hover:text-slate-900 bg-sky-50/70 border-sky-200 shadow-xs'
            }`}
          >
            <Phone className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-sky-500'}`} />
            <span>+380 (97) 000-00-00</span>
          </a>

          {/* Main CTA Button */}
          <button
            onClick={onOpenConsultation}
            className={`hidden sm:inline-flex font-bold text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
              isDark 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 glow-amber' 
                : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white glow-sky'
            }`}
          >
            Консультація
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border flex-shrink-0 ${
              isDark ? 'text-slate-300 border-slate-800 bg-slate-900' : 'text-slate-700 border-sky-200 bg-sky-50'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t px-4 py-5 space-y-2.5 transition-colors ${
          isDark ? 'bg-slate-950/98 border-slate-800 text-slate-100' : 'bg-white/98 border-sky-100 text-slate-900 shadow-xl'
        }`}>
          <button
            onClick={() => handleNavClick('home', 'services')}
            className={`block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl ${
              isDark ? 'hover:bg-slate-900 text-slate-200' : 'hover:bg-sky-50 text-slate-800'
            }`}
          >
            ☀️ Основні Послуги
          </button>
          <button
            onClick={() => handleNavClick('home', 'stats')}
            className={`block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl ${
              isDark ? 'hover:bg-slate-900 text-slate-200' : 'hover:bg-sky-50 text-slate-800'
            }`}
          >
            📊 Офіційні Дані СЕС
          </button>
          <button
            onClick={() => handleNavClick('home', 'deye-legal')}
            className={`block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl ${
              isDark ? 'hover:bg-slate-900 text-slate-200' : 'hover:bg-sky-50 text-slate-800'
            }`}
          >
            ⚡ Deye & Зелений Тариф
          </button>
          <button
            onClick={() => handleNavClick('home', 'process')}
            className={`block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl ${
              isDark ? 'hover:bg-slate-900 text-slate-200' : 'hover:bg-sky-50 text-slate-800'
            }`}
          >
            🛠️ 5 Етапів Роботи
          </button>
          <button
            onClick={() => handleNavClick('contacts')}
            className={`block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl ${
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
