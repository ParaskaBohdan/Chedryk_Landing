import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Phone, MapPin, ArrowUp, Video } from 'lucide-react';

export default function Footer({ onOpenConsultation, theme }) {
  const isDark = theme === 'dark';
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
    if (location.pathname !== targetPath) {
      navigate(targetPath);
      if (sectionId) {
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 150);
      }
    } else if (sectionId) {
      scrollToSection(sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t py-10 sm:py-12 transition-colors duration-300 ${
      isDark ? 'border-slate-800 bg-slate-950 text-slate-400' : 'border-amber-200 bg-amber-50/70 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={`grid grid-cols-1 min-[340px]:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pb-10 border-b ${
          isDark ? 'border-slate-800' : 'border-amber-200'
        }`}>
          
          {/* Brand Col */}
          <div className="col-span-1 min-[340px]:col-span-2 md:col-span-2 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="/logo.svg" alt="Логотип" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className={`font-bold text-base sm:text-lg flex items-center gap-1.5 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Чедрик Іван <Sun className="w-4 h-4 text-amber-500" />
                </h3>
                <p className="text-xs font-semibold text-amber-500">
                  Сонячна Енергетика & Електромонтаж (5 кВт – 1 МВт)
                </p>
              </div>
            </div>

            <p className="text-xs max-w-sm leading-relaxed opacity-80">
              Автономність, резервне живлення EcoFlow, будівництво сонячних станцій 5 кВт – 1 МВт та налагодження електромереж у Закарпатській та Івано-Франківській областях.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Навігація
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNavClick('/', 'services')} className="hover:text-amber-500 transition-colors cursor-pointer">
                  Послуги
                </button>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-amber-500 transition-colors">
                  Калькулятор Вартності СЕС
                </Link>
              </li>
              <li>
                <button onClick={() => handleNavClick('/', 'deye-legal')} className="hover:text-amber-500 transition-colors cursor-pointer">
                  Deye & Зелений Тариф
                </button>
              </li>
              <li>
                <Link to="/contacts" className="hover:text-amber-500 transition-colors">
                  Контакти & TikTok
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Contact & TikTok */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Контакти & Соцмережі
            </h4>
            <div className="space-y-2 text-xs">
              <a href="tel:+380970000000" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>+380 (97) 000-00-00</span>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                <Video className="w-3.5 h-3.5 text-amber-500" />
                <span>TikTok Чедрика Івана</span>
              </a>
              <div className="flex items-center gap-2 opacity-80">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>Закарпатська & Франківська обл.</span>
              </div>
              <button
                onClick={onOpenConsultation}
                className="mt-2 text-xs font-bold text-amber-500 hover:underline block"
              >
                → Замовити виїзд майстра
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs opacity-70 gap-3">
          <p>© {new Date().getFullYear()} Чедрик Іван. Усі права захищено. Закарпаття & Івано-Франківщина.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-amber-500 transition-colors"
          >
            <span>Нагору</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
