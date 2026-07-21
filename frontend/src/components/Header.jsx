import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Sun, Moon, ShieldCheck, Video, Wrench, BarChart2, Zap, Calculator } from 'lucide-react';

function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path fill="currentColor" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-1.42V8.98a6.34 6.34 0 0 0-4.88 6.13 6.34 6.34 0 1 0 11.22-4.14 8.28 8.28 0 0 0 3.77 1.72V9.08a4.83 4.83 0 0 1-.3-.02v-.01a4.83 4.83 0 0 1-.02-2.36z"/>
    </svg>
  );
}

export default function Header({ onOpenConsultation, theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      const headerOffset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (targetPath, sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== targetPath) {
      navigate(targetPath);
      if (sectionId) {
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 150);
      }
    } else if (sectionId) {
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  };

  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
      isDark ? 'border-slate-800/80 bg-slate-950/90 text-white backdrop-blur-md' : 'border-slate-200 bg-slate-100/95 text-slate-800 shadow-xs backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <Link 
          to="/"
          onClick={() => {
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group flex-shrink-0"
        >
          <div className="h-9 sm:h-11 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img 
              src="/logo-icon.png" 
              alt="NOVA ENERGY_UA" 
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="flex flex-col justify-center select-none">
            <span className="font-black text-xl sm:text-2xl tracking-tight leading-none text-amber-500">
              NOVA
            </span>
            <span className={`font-extrabold text-[10px] sm:text-[11px] tracking-[0.22em] leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              ENERGY_UA
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-6 flex-shrink-0">
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
                isActive 
                  ? 'text-amber-500 border-b-2 border-amber-500 pb-0.5' 
                  : isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-700 hover:text-amber-600'
              }`
            }
          >
            Послуги
          </NavLink>
          <NavLink
            to="/equipment"
            className={({ isActive }) =>
              `text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
                isActive 
                  ? 'text-amber-500 border-b-2 border-amber-500 pb-0.5' 
                  : isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-700 hover:text-amber-600'
              }`
            }
          >
            Обладнання
          </NavLink>
          <NavLink
            to="/tariffs"
            className={({ isActive }) =>
              `text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
                isActive 
                  ? 'text-amber-500 border-b-2 border-amber-500 pb-0.5' 
                  : isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-700 hover:text-amber-600'
              }`
            }
          >
            Тарифи
          </NavLink>
          <NavLink
            to="/calculator"
            className={({ isActive }) =>
              `text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
                isActive 
                  ? 'text-amber-500 border-b-2 border-amber-500 pb-0.5' 
                  : isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-700 hover:text-amber-600'
              }`
            }
          >
            Калькулятор
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
                isActive 
                  ? 'text-amber-500 border-b-2 border-amber-500 pb-0.5' 
                  : isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-700 hover:text-amber-600'
              }`
            }
          >
            Контакти
          </NavLink>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          
          <a
            href="https://www.tiktok.com/@novaenergy.ua" 
            target="_blank" 
            rel="noreferrer"
            title="Переглянути TikTok Чедрика Івана"
            className={`flex items-center gap-1.5 h-[38px] px-3 sm:px-3.5 rounded-xl border text-xs font-semibold transition-all flex-shrink-0 ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-400/40' : 'bg-slate-200/70 border-slate-300 text-slate-700 hover:text-amber-600'
            }`}
          >
            <TikTokIcon className="w-3.5 h-3.5 flex-shrink-0 fill-current" />
            <span className="hidden sm:inline">TikTok</span>
          </a>

          <button
            onClick={toggleTheme}
            title={isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'}
            className={`flex items-center justify-center h-[38px] w-[38px] rounded-xl border transition-colors flex-shrink-0 ${
              isDark ? 'text-amber-400 border-slate-800 bg-slate-900 hover:bg-slate-800' : 'text-slate-700 border-slate-300 bg-slate-200/80 hover:bg-slate-200'
            }`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-slate-800" />}
          </button>

          {/* Light Radiant Orange Button -> Leads to Calculator */}
          <Link
            to="/calculator"
            className="hidden sm:inline-flex btn-orange-bright font-extrabold text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap flex-shrink-0 shadow-md hover:shadow-amber-500/20"
          >
            Розрахувати Вартість
          </Link>

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

      {mobileMenuOpen && (
        <div className={`lg:hidden border-t px-4 py-5 space-y-1.5 transition-colors ${
          isDark ? 'bg-slate-950/98 border-slate-800 text-slate-100' : 'bg-slate-100/98 border-slate-200 text-slate-900 shadow-xl'
        }`}>
          <NavLink
            to="/services"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl transition-colors ${
                isActive 
                  ? (isDark ? 'bg-amber-500/15 text-amber-400 font-bold' : 'bg-amber-100 text-amber-600 font-bold')
                  : (isDark ? 'text-slate-200 hover:bg-slate-800/70' : 'text-slate-800 hover:bg-amber-500/10')
              }`
            }
          >
            <Wrench className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Послуги</span>
          </NavLink>

          <NavLink
            to="/equipment"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl transition-colors ${
                isActive 
                  ? (isDark ? 'bg-amber-500/15 text-amber-400 font-bold' : 'bg-amber-100 text-amber-600 font-bold')
                  : (isDark ? 'text-slate-200 hover:bg-slate-800/70' : 'text-slate-800 hover:bg-amber-500/10')
              }`
            }
          >
            <BarChart2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Обладнання</span>
          </NavLink>

          <NavLink
            to="/tariffs"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl transition-colors ${
                isActive 
                  ? (isDark ? 'bg-amber-500/15 text-amber-400 font-bold' : 'bg-amber-100 text-amber-600 font-bold')
                  : (isDark ? 'text-slate-200 hover:bg-slate-800/70' : 'text-slate-800 hover:bg-amber-500/10')
              }`
            }
          >
            <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Тарифи</span>
          </NavLink>

          <NavLink
            to="/calculator"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl transition-colors ${
                isActive 
                  ? (isDark ? 'bg-amber-500/15 text-amber-400 font-bold' : 'bg-amber-100 text-amber-600 font-bold')
                  : (isDark ? 'text-slate-200 hover:bg-slate-800/70' : 'text-slate-800 hover:bg-amber-500/10')
              }`
            }
          >
            <Calculator className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Калькулятор</span>
          </NavLink>

          <NavLink
            to="/contacts"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl transition-colors ${
                isActive 
                  ? (isDark ? 'bg-amber-500/15 text-amber-400 font-bold' : 'bg-amber-100 text-amber-600 font-bold')
                  : (isDark ? 'text-slate-200 hover:bg-slate-800/70' : 'text-slate-800 hover:bg-amber-500/10')
              }`
            }
          >
            <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Контакти</span>
          </NavLink>
          
          <div className="pt-3 flex flex-col gap-2 border-t border-slate-700/40">
            <Link
              to="/calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full btn-orange-bright font-bold py-3 rounded-xl shadow-md text-sm text-center"
            >
              Розрахувати Вартість СЕС
            </Link>
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
