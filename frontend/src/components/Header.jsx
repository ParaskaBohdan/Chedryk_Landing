import React, { useState } from 'react';
import { Phone, Menu, X, Sun, ShieldCheck } from 'lucide-react';

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
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home', 'hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-amber-500/30 p-0.5 bg-slate-900 group-hover:border-amber-400 transition-all duration-300 shadow-md">
            <img 
              src="/logo.png" 
              alt="Чедрик Іван Лого" 
              className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-lg sm:text-xl text-white tracking-wide">
              <span>Чедрик Іван</span>
              <Sun className="w-5 h-5 text-amber-400 animate-spin-slow inline-block" />
            </div>
            <p className="text-xs text-amber-400/90 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Сонячна енергетика & Електромонтаж
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick('home', 'services')}
            className="text-sm font-semibold text-slate-300 hover:text-amber-400 transition-colors"
          >
            Послуги
          </button>
          <button
            onClick={() => handleNavClick('home', 'stats')}
            className="text-sm font-semibold text-slate-300 hover:text-amber-400 transition-colors"
          >
            Офіційні Дані
          </button>
          <button
            onClick={() => handleNavClick('home', 'process')}
            className="text-sm font-semibold text-slate-300 hover:text-amber-400 transition-colors"
          >
            Етапи Роботи
          </button>
          <button
            onClick={() => handleNavClick('contacts')}
            className={`text-sm font-semibold transition-colors ${
              activeTab === 'contacts' ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5' : 'text-slate-300 hover:text-amber-400'
            }`}
          >
            Контакти
          </button>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-4">
          <a 
            href="tel:+380970000000" 
            className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700 hover:border-slate-600 transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>+380 (97) 000-00-00</span>
          </a>
          <button
            onClick={onOpenConsultation}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg glow-amber hover:scale-105 transition-all duration-200"
          >
            Замовити Консультацію
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onOpenConsultation}
            className="bg-amber-500 text-slate-950 font-bold text-xs px-3 py-2 rounded-lg"
          >
            Викликати
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-800 px-4 py-6 space-y-4">
          <button
            onClick={() => handleNavClick('home', 'services')}
            className="block w-full text-left text-base font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800"
          >
            Послуги
          </button>
          <button
            onClick={() => handleNavClick('home', 'stats')}
            className="block w-full text-left text-base font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800"
          >
            Офіційні Дані СЕС
          </button>
          <button
            onClick={() => handleNavClick('home', 'process')}
            className="block w-full text-left text-base font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800"
          >
            Етапи Роботи
          </button>
          <button
            onClick={() => handleNavClick('contacts')}
            className="block w-full text-left text-base font-medium text-amber-400 py-2 border-b border-slate-800"
          >
            Контакти
          </button>
          <a 
            href="tel:+380970000000" 
            className="flex items-center justify-center gap-2 text-slate-200 bg-slate-800 py-3 rounded-xl border border-slate-700 font-semibold"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Зателефонувати майстру</span>
          </a>
        </div>
      )}
    </header>
  );
}
