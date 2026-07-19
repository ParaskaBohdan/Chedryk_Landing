import React from 'react';
import { Sun, Phone, MapPin, ArrowUp } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenConsultation }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="/logo.svg" alt="Логотип" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg flex items-center gap-1.5 text-white">
                  Чедрик Іван <Sun className="w-4 h-4 text-amber-400" />
                </h3>
                <p className="text-xs font-semibold text-amber-400">
                  Сонячна Енергетика & Електромонтаж
                </p>
              </div>
            </div>

            <p className="text-xs max-w-sm leading-relaxed text-slate-400">
              Автономність, джерела резервного живлення EcoFlow, будівництво сонячних станцій 28–60 кВт та налагодження електромереж по усій Закарпатській області.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Навігація
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setActiveTab('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-amber-400 transition-colors">
                  Послуги
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('home'); setTimeout(() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-amber-400 transition-colors">
                  Офіційні Дані
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('home'); setTimeout(() => document.getElementById('deye-legal')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-amber-400 transition-colors">
                  Deye & Зелений Тариф
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('home'); setTimeout(() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-amber-400 transition-colors">
                  Етапи Роботи
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contacts')} className="hover:text-amber-400 transition-colors">
                  Контакти
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Контакти
            </h4>
            <div className="space-y-2 text-xs">
              <a href="tel:+380970000000" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+380 (97) 000-00-00</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Закарпатська область</span>
              </div>
              <button
                onClick={onOpenConsultation}
                className="mt-2 text-xs font-bold text-amber-400 hover:underline block"
              >
                → Замовити виїзд майстра
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Чедрик Іван. Усі права захищено. Закарпатська область.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors text-slate-400"
          >
            <span>Нагору</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
