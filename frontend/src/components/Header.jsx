import React, { useEffect, useState } from 'react';
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

  // Generation busbar under the nav, filled by scroll depth. Reads through a
  // rAF gate so a fast scroll can't queue layout work per event.
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    let frame = null;
    const measure = () => {
      frame = null;
      const doc = document.documentElement;
      const travel = doc.scrollHeight - doc.clientHeight;
      setScrollPct(travel > 0 ? Math.min(1, doc.scrollTop / travel) : 0);
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

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
          <div className="relative h-9 sm:h-11 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            {/* Ambient glow that lifts on hover, as if the mark were lit */}
            <span
              className="absolute inset-0 -m-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none blur-lg bg-amber-400/40"
              aria-hidden="true"
            />
            <img
              src="/logo-icon.png"
              alt="NOVA ENERGY_UA"
              className="relative h-full w-auto object-contain"
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
                  ? 'text-amber-500 border-b-2 border-amber-500 pb-0.5 [text-shadow:0_0_14px_rgba(251,191,36,0.55)]' 
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
                  ? 'text-amber-500 border-b-2 border-amber-500 pb-0.5 [text-shadow:0_0_14px_rgba(251,191,36,0.55)]' 
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
                  ? 'text-amber-500 border-b-2 border-amber-500 pb-0.5 [text-shadow:0_0_14px_rgba(251,191,36,0.55)]' 
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
                  ? 'text-amber-500 border-b-2 border-amber-500 pb-0.5 [text-shadow:0_0_14px_rgba(251,191,36,0.55)]' 
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
                  ? 'text-amber-500 border-b-2 border-amber-500 pb-0.5 [text-shadow:0_0_14px_rgba(251,191,36,0.55)]' 
                  : isDark ? 'text-slate-300 hover:text-amber-400' : 'text-slate-700 hover:text-amber-600'
              }`
            }
          >
            Контакти
          </NavLink>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          


          <button
            onClick={toggleTheme}
            title={isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'}
            className={`group relative flex items-center justify-center h-[38px] w-[38px] rounded-xl border transition-colors flex-shrink-0 overflow-hidden ${
              isDark ? 'text-amber-400 border-slate-800 bg-slate-900 hover:bg-slate-800' : 'text-slate-700 border-slate-300 bg-slate-200/80 hover:bg-slate-200'
            }`}
          >
            {/* Sun and moon cross-fade and rotate through each other */}
            <Sun
              className={`absolute w-5 h-5 transition-all duration-500 ${
                isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              }`}
            />
            <Moon
              className={`absolute w-5 h-5 text-slate-800 transition-all duration-500 ${
                isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`}
            />
            <span
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-amber-400/30 pointer-events-none"
              aria-hidden="true"
            />
          </button>

          {/* Light Radiant Orange Button -> Leads to Calculator */}
          <button
            onClick={() => onOpenConsultation && onOpenConsultation('Замовити безкоштовну консультацію')}
            className="hidden sm:inline-flex btn-orange-bright font-extrabold text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap flex-shrink-0 shadow-md hover:shadow-amber-500/20 cursor-pointer"
          >
            Замовити послугу
          </button>

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
              `flex items-center gap-3 w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl transition-all border ${
                isActive 
                  ? (isDark ? 'bg-amber-500/15 text-[#fde68a] font-bold border-[#fbbf24]/40' : 'bg-amber-50 text-orange-600 font-bold border-orange-400')
                  : (isDark ? 'text-slate-200 hover:bg-slate-800/70 border-transparent' : 'text-slate-800 hover:bg-amber-500/10 border-transparent')
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
              `flex items-center gap-3 w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl transition-all border ${
                isActive 
                  ? (isDark ? 'bg-amber-500/15 text-[#fde68a] font-bold border-[#fbbf24]/40' : 'bg-amber-50 text-orange-600 font-bold border-orange-400')
                  : (isDark ? 'text-slate-200 hover:bg-slate-800/70 border-transparent' : 'text-slate-800 hover:bg-amber-500/10 border-transparent')
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
              `flex items-center gap-3 w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl transition-all border ${
                isActive 
                  ? (isDark ? 'bg-amber-500/15 text-[#fde68a] font-bold border-[#fbbf24]/40' : 'bg-amber-50 text-orange-600 font-bold border-orange-400')
                  : (isDark ? 'text-slate-200 hover:bg-slate-800/70 border-transparent' : 'text-slate-800 hover:bg-amber-500/10 border-transparent')
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
              `flex items-center gap-3 w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl transition-all border ${
                isActive 
                  ? (isDark ? 'bg-amber-500/15 text-[#fde68a] font-bold border-[#fbbf24]/40' : 'bg-amber-50 text-orange-600 font-bold border-orange-400')
                  : (isDark ? 'text-slate-200 hover:bg-slate-800/70 border-transparent' : 'text-slate-800 hover:bg-amber-500/10 border-transparent')
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
              `flex items-center gap-3 w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl transition-all border ${
                isActive 
                  ? (isDark ? 'bg-amber-500/15 text-[#fde68a] font-bold border-[#fbbf24]/40' : 'bg-amber-50 text-orange-600 font-bold border-orange-400')
                  : (isDark ? 'text-slate-200 hover:bg-slate-800/70 border-transparent' : 'text-slate-800 hover:bg-amber-500/10 border-transparent')
              }`
            }
          >
            <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Контакти</span>
          </NavLink>
          
          <div className="pt-3 flex flex-col gap-2 border-t border-slate-700/40">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation && onOpenConsultation('Замовити безкоштовну консультацію');
              }}
              className="w-full btn-orange-bright font-bold py-3 rounded-xl shadow-md text-sm text-center cursor-pointer"
            >
              Замовити послугу
            </button>
          </div>
        </div>
      )}

      {/* Generation busbar: scroll progress as a charge level */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="scroll-busbar h-full w-full transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollPct})` }}
        />
      </div>
    </header>
  );
}
