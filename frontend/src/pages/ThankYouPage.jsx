import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Phone, Video, Home, Calculator, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ThankYouPage({ theme }) {
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = 'Дякуємо за заявку — Nova Energy';

    // Trigger Meta Pixel Lead Conversion Event safely
    if (window.fbq) {
      window.fbq('track', 'Lead');
    }
  }, []);

  return (
    <div className={`py-12 sm:py-20 min-h-screen flex items-center justify-center transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-amber-50/40 text-slate-900'
    }`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-8">
        
        {/* Animated Success Badge */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center border border-emerald-400/40 shadow-2xl animate-bounce">
            <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16" />
          </div>
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-2xl -z-10" />
        </div>

        {/* Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 text-emerald-400 text-xs sm:text-sm font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Заявку Прийнято в Обробку</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Дякуємо за звернення до <span className="text-amber-500">Nova Energy</span>!
          </h1>

          <p className={`text-base sm:text-xl max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Наш фахівець зв'яжеться з вами **у вибраний вами зручний день та час** для детальної консультації та розрахунку сонячної станції.
          </p>
        </div>

        {/* Content Box */}
        <div className={`glass-panel p-6 sm:p-8 rounded-3xl border text-left space-y-6 shadow-2xl ${
          isDark ? 'border-slate-700 bg-slate-800/90' : 'border-amber-200 bg-white shadow-amber-500/10'
        }`}>
          <h3 className="text-lg font-bold flex items-center gap-2 text-amber-500 border-b border-slate-700/60 pb-3">
            <Phone className="w-5 h-5" /> Що відбувається далі?
          </h3>

          <ul className="space-y-4 text-xs sm:text-sm">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 font-extrabold flex items-center justify-center flex-shrink-0 text-xs mt-0.5 border border-amber-400/40">1</span>
              <div>
                <strong className="block font-bold">Узгодження деталей об'єкта</strong>
                <span className="opacity-80">Ми зателефонуємо у заброньований вами час та уточнимо тип даху, потужність та ваші побажання щодо обладнання Deye / LiFePO4.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 font-extrabold flex items-center justify-center flex-shrink-0 text-xs mt-0.5 border border-amber-400/40">2</span>
              <div>
                <strong className="block font-bold">Безкоштовний виїзд інженера</strong>
                <span className="opacity-80">За потреби виїжджаємо на об'єкт по Закарпатській та Івано-Франківській областях для замірів та аудіту електромережі.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 font-extrabold flex items-center justify-center flex-shrink-0 text-xs mt-0.5 border border-amber-400/40">3</span>
              <div>
                <strong className="block font-bold">Монтаж & Документи під ключ</strong>
                <span className="opacity-80">Доставка обладнання, професійний монтаж та супровід оформлення Зеленого Тарифу в Обленерго.</span>
              </div>
            </li>
          </ul>

          {/* TikTok & Direct Call Social Block */}
          <div className="pt-4 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://www.tiktok.com/@novaenergy.ua"
              target="_blank"
              rel="noreferrer"
              className={`p-4 rounded-2xl border transition-all flex items-center gap-3 text-left group ${
                isDark
                  ? 'border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-white'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-900 shadow-sm'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-amber-500/20 text-amber-400 border border-amber-400/30' : 'bg-amber-50 text-amber-600 border border-amber-200'
              }`}>
                <Video className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-xs font-bold group-hover:underline ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>Наш TikTok @novaenergy.ua</p>
                <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Дивіться реальні відеозвіти з монтажів СЕС</p>
              </div>
            </a>

            <a
              href="tel:+380970000000"
              className={`p-4 rounded-2xl border transition-all flex items-center gap-3 text-left group ${
                isDark
                  ? 'border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-white'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-900 shadow-sm'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-amber-500/20 text-amber-400 border border-amber-400/30' : 'bg-amber-50 text-amber-600 border border-amber-200'
              }`}>
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-xs font-bold group-hover:underline ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>Термінове запитання?</p>
                <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Телефонуйте прямо зараз: +380 (97) 000-00-00</p>
              </div>
            </a>
          </div>

        </div>

        {/* Bottom Actions Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
          <Link
            to="/"
            className="btn-orange-bright px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg glow-amber"
          >
            <Home className="w-4 h-4" />
            <span>На Головну Сторінку</span>
          </Link>

          <Link
            to="/calculator"
            className={`px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm border transition-all flex items-center gap-2 ${
              isDark ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700' : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-500" />
            <span>Розрахувати іншу СЕС</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
