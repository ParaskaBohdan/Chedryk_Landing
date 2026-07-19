import React, { useState } from 'react';
import { Phone, Menu, X, ShieldCheck } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenConsultation }) {
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

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-900/95 text-white backdrop-blur-md">
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
            <span className="font-extrabold text-base sm:text-lg tracking-tight leading-tight text-white whitespace-nowrap">
              Чедрик Іван
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-amber-400 flex items-center gap-1 whitespace-nowrap">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Сонячні Станції & Електромонтаж
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7 flex-shrink-0">
          <button
            onClick={() => handleNavClick('home', 'services')}
            className="text-xs xl:text-sm font-semibold whitespace-nowrap text-slate-200 hover:text-amber-400 transition-colors"
          >
            Послуги
          </button>
          <button
            onClick={() => handleNavClick('home', 'stats')}
            className="text-xs xl:text-sm font-semibold whitespace-nowrap text-slate-200 hover:text-amber-400 transition-colors"
          >
            Офіційні Дані
          </button>
          <button
            onClick={() => handleNavClick('home', 'deye-legal')}
            className="text-xs xl:text-sm font-semibold whitespace-nowrap text-slate-200 hover:text-amber-400 transition-colors"
          >
            Deye & Зелений Тариф
          </button>
          <button
            onClick={() => handleNavClick('home', 'process')}
            className="text-xs xl:text-sm font-semibold whitespace-nowrap text-slate-200 hover:text-amber-400 transition-colors"
          >
            Етапи Роботи
          </button>
          <button
            onClick={() => handleNavClick('contacts')}
            className={`text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'contacts' 
                ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5' 
                : 'text-slate-200 hover:text-amber-400'
            }`}
          >
            Контакти
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 flex-shrink-0">
          
          {/* Direct Phone Number */}
          <a 
            href="tel:+380970000000" 
            className="hidden 2xl:flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-200 hover:text-white hover:border-slate-600 transition-all whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>+380 (97) 000-00-00</span>
          </a>

          {/* Bright Radiant Orange Button */}
          <button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex btn-orange-bright text-slate-950 font-bold text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap flex-shrink-0 glow-amber"
          >
            Консультація
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-800 bg-slate-800 text-slate-200 flex-shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 px-4 py-5 space-y-2.5 bg-slate-900 text-slate-100">
          <button
            onClick={() => handleNavClick('home', 'services')}
            className="block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl hover:bg-slate-800 text-slate-200"
          >
            ☀️ Основні Послуги
          </button>
          <button
            onClick={() => handleNavClick('home', 'stats')}
            className="block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl hover:bg-slate-800 text-slate-200"
          >
            📊 Офіційні Дані СЕС
          </button>
          <button
            onClick={() => handleNavClick('home', 'deye-legal')}
            className="block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl hover:bg-slate-800 text-slate-200"
          >
            ⚡ Deye & Зелений Тариф
          </button>
          <button
            onClick={() => handleNavClick('home', 'process')}
            className="block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl hover:bg-slate-800 text-slate-200"
          >
            🛠️ 5 Етапів Роботи
          </button>
          <button
            onClick={() => handleNavClick('contacts')}
            className="block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl hover:bg-slate-800 text-amber-400"
          >
            📞 Контакти та Карта
          </button>
          
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full btn-orange-bright font-bold py-3 rounded-xl shadow-md text-sm text-center text-slate-950"
            >
              Замовити Консультацію
            </button>
            <a 
              href="tel:+380970000000" 
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 text-sm font-semibold"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Зателефонувати +380 (97) 000-00-00</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
