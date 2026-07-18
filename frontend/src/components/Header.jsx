import React, { useState, useRef, useEffect } from 'react';
import { Phone, Menu, X, Sun, Moon, Palette, ChevronDown, Check } from 'lucide-react';

function HeaderSchemePicker({ scheme, setScheme, colorSchemes }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentSchemeObj = colorSchemes.find(s => s.id === (scheme || 'default'));

  return (
    <div ref={containerRef} className="relative flex-shrink-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Вибрати палітру кольорів"
        title={`Палітра: ${currentSchemeObj?.label || 'Колір'}`}
        className="h-9 w-9 sm:w-36 px-2 sm:px-2.5 rounded-xl border transition-all flex items-center justify-center sm:justify-between gap-1 theme-badge shadow-xs hover:scale-105 cursor-pointer select-none"
      >
        <Palette className="w-4 h-4 flex-shrink-0 theme-icon-accent" />
        <span className="text-xs font-bold hidden sm:inline-block truncate flex-grow text-center">
          {currentSchemeObj?.label}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 theme-icon-accent transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[160px] p-1.5 rounded-2xl border shadow-2xl theme-bg-modal theme-border-card backdrop-blur-xl space-y-1">
          {colorSchemes.map((s) => {
            const isSelected = (scheme || 'default') === s.id;
            return (
              <div
                key={s.id}
                onClick={() => {
                  setScheme(s.id);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  isSelected
                    ? 'theme-badge font-bold shadow-xs'
                    : 'theme-text-primary hover:theme-bg-input/80'
                }`}
              >
                <span>{s.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 theme-icon-accent" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Header({ activeTab, setActiveTab, onOpenConsultation, theme, toggleTheme, scheme, setScheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab, sectionId) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (tab === 'home' && sectionId) {
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';

  const colorSchemes = [
    { id: 'default', label: isDark ? '🟡 Жовта' : '🔵 Синя' },
    { id: 'emerald', label: '🟢 Смарагдова' },
    { id: 'violet', label: '🟣 Аметистова' },
    { id: 'amber', label: '🟠 Бурштинова' },
    { id: 'red', label: '🔴 Червона' }
  ];

  return (
    <header className="sticky top-0 z-50 border-b transition-colors duration-300 theme-bg-card theme-border-subtle backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Clean Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('home', 'hero')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group flex-shrink-0"
        >
          <div className="w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img 
              src="/logo.svg" 
              alt="Чедрик Іван Лого" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-extrabold text-sm sm:text-lg tracking-tight leading-tight whitespace-nowrap theme-text-primary">
              Чедрик Іван
            </span>
            <span className="hidden sm:block text-[10px] sm:text-xs font-semibold whitespace-nowrap theme-text-accent">
              Сонячні Станції & Електромонтаж
            </span>
          </div>
        </div>

        {/* Desktop Navigation - Clean Spacing & Whitespace No-wrap */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7 flex-shrink-0">
          <button
            onClick={() => handleNavClick('home', 'services')}
            className="text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors theme-text-secondary hover:theme-text-accent"
          >
            Послуги
          </button>
          <button
            onClick={() => handleNavClick('home', 'stats')}
            className="text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors theme-text-secondary hover:theme-text-accent"
          >
            Офіційні Дані
          </button>
          <button
            onClick={() => handleNavClick('home', 'deye-legal')}
            className="text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors theme-text-secondary hover:theme-text-accent"
          >
            Deye & Зелений Тариф
          </button>
          <button
            onClick={() => handleNavClick('home', 'process')}
            className="text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors theme-text-secondary hover:theme-text-accent"
          >
            Етапи Роботи
          </button>
          <button
            onClick={() => handleNavClick('contacts')}
            className={`text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'contacts' 
                ? 'theme-text-accent border-b-2 border-current pb-0.5' 
                : 'theme-text-secondary hover:theme-text-accent'
            }`}
          >
            Контакти
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          
          {/* Color Scheme Selector Dropdown */}
          <HeaderSchemePicker scheme={scheme} setScheme={setScheme} colorSchemes={colorSchemes} />

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Змінити тему"
            title={isDark ? "Увімкнути світлу тему" : "Увімкнути темну тему"}
            className="p-2 rounded-xl border transition-all flex-shrink-0 theme-badge shadow-xs hover:scale-105"
          >
            {isDark ? <Sun className="w-4 h-4 theme-icon-accent" /> : <Moon className="w-4 h-4 theme-icon-accent" />}
          </button>

          {/* Direct Phone Number - visible on 2XL screens to prevent layout crowding */}
          <a 
            href="tel:+380970000000" 
            className="hidden 2xl:flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl border transition-all whitespace-nowrap theme-badge shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 theme-icon-accent" />
            <span>+380 (97) 000-00-00</span>
          </a>

          {/* Main CTA Button */}
          <button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex font-bold text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all duration-200 whitespace-nowrap flex-shrink-0 theme-btn-primary"
          >
            Консультація
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border flex-shrink-0 theme-badge"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t px-4 py-5 space-y-2.5 transition-colors theme-bg-card theme-border-subtle shadow-xl">
          <button
            onClick={() => handleNavClick('home', 'services')}
            className="block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl theme-text-secondary hover:theme-text-accent"
          >
            ☀️ Основні Послуги
          </button>
          <button
            onClick={() => handleNavClick('home', 'stats')}
            className="block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl theme-text-secondary hover:theme-text-accent"
          >
            📊 Офіційні Дані СЕС
          </button>
          <button
            onClick={() => handleNavClick('home', 'deye-legal')}
            className="block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl theme-text-secondary hover:theme-text-accent"
          >
            ⚡ Deye & Зелений Тариф
          </button>
          <button
            onClick={() => handleNavClick('home', 'process')}
            className="block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl theme-text-secondary hover:theme-text-accent"
          >
            🛠️ 5 Етапів Роботи
          </button>
          <button
            onClick={() => handleNavClick('contacts')}
            className="block w-full text-left text-sm font-semibold py-2.5 px-3 rounded-xl theme-text-accent"
          >
            📞 Контакти та Карта
          </button>
          
          <div className="pt-2 border-t theme-border-subtle flex flex-col gap-2">
            <label className="text-xs font-semibold theme-text-muted flex items-center gap-1.5 px-1">
              <Palette className="w-3.5 h-3.5 theme-icon-accent" />
              <span>Палітра кольорів:</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {colorSchemes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setScheme(s.id)}
                  className={`text-xs font-semibold py-2 px-2.5 rounded-xl border text-center transition-all ${
                    (scheme || 'default') === s.id
                      ? 'theme-badge border-current font-bold shadow-xs'
                      : 'theme-bg-input theme-text-secondary theme-border-subtle'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full font-bold py-3 rounded-xl shadow-md text-sm text-center theme-btn-primary"
            >
              Замовити Консультацію
            </button>
            <a 
              href="tel:+380970000000" 
              className="flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold theme-badge"
            >
              <Phone className="w-4 h-4 theme-icon-accent" />
              <span>Зателефонувати +380 (97) 000-00-00</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
