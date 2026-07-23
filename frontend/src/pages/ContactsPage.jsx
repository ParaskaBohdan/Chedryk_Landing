import React, { useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Sun, Video } from 'lucide-react';
import ConsultationForm from '../components/ConsultationForm';

export default function ContactsPage({ theme }) {
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const zakarpattyaCities = [
    'Ужгород', 'Мукачево', 'Хуст', 'Берегове', 
    'Виноградів', 'Свалява', 'Тячів', 'Рахів', 'Перечин'
  ];

  const frankivskCities = [
    'Івано-Франківськ', 'Коломия', 'Калуш', 'Яремче', 'Надвірна', 'Долина'
  ];

  return (
    <div className={`py-12 sm:py-20 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-amber-50/40 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full border ${
            isDark ? 'border-amber-400/40 bg-amber-500/15 text-amber-300' : 'border-amber-300 bg-amber-100 text-amber-800'
          }`}>
            <MessageCircle className="w-4 h-4 text-amber-500" />
            <span>Прямий Зв'язок & Соцмережі</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            Контакти Майстра <span className="text-amber-500">Чедрика Івана</span>
          </h1>
          <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Працюємо по Закарпатській та Івано-Франківській областях. Дивіться наші об'єкти в TikTok та зв'язуйтесь зручним месенджером.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className={`glass-panel p-6 sm:p-8 rounded-3xl border space-y-6 ${
              isDark ? 'border-slate-700 bg-slate-800/90' : 'border-amber-200 bg-white shadow-md'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-500 flex items-center justify-center">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Чедрик Іван</h3>
                  <p className="text-xs text-amber-500 font-semibold">
                    Монтаж СЕС (5 кВт – 1 МВт) • Закарпаття & Франківщина
                  </p>
                </div>
              </div>

              <div className={`space-y-4 pt-4 border-t ${isDark ? 'border-slate-700' : 'border-amber-100'}`}>
                
                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 text-amber-500 ${
                    isDark ? 'border-slate-700 bg-slate-900' : 'border-amber-200 bg-amber-50'
                  }`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium opacity-70">
                      Телефон для консультацій
                    </p>
                    <a href="tel:+380970000000" className="text-lg font-bold hover:text-amber-500 transition-colors">
                      +380 (97) 000-00-00
                    </a>
                  </div>
                </div>

                {/* TikTok & Socials */}
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 text-amber-500 ${
                    isDark ? 'border-slate-700 bg-slate-900' : 'border-amber-200 bg-amber-50'
                  }`}>
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium opacity-70">
                      Наш TikTok (Відеозвіти монтажів)
                    </p>
                    <a 
                      href="https://www.tiktok.com/@novaenergy.ua" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-sm font-bold text-amber-500 hover:underline flex items-center gap-1"
                    >
                      <span>@novaenergy.ua (Дивитися TikTok)</span>
                    </a>
                  </div>
                </div>

                {/* Messengers */}
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 text-sky-500 ${
                    isDark ? 'border-slate-700 bg-slate-900' : 'border-amber-200 bg-amber-50'
                  }`}>
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium opacity-70">
                      Месенджери (Telegram / WhatsApp / Viber)
                    </p>
                    <div className="flex gap-3 mt-1">
                      <a href="https://t.me/" target="_blank" rel="noreferrer" className="text-xs font-bold text-sky-500 hover:underline">
                        Telegram
                      </a>
                      <span className="opacity-40">•</span>
                      <a href="https://wa.me/" target="_blank" rel="noreferrer" className="text-xs font-bold text-emerald-500 hover:underline">
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {/* Coverage */}
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 text-emerald-500 ${
                    isDark ? 'border-slate-700 bg-slate-900' : 'border-amber-200 bg-amber-50'
                  }`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium opacity-70">
                      Області виїзду
                    </p>
                    <p className="text-sm font-semibold">Закарпатська та Івано-Франківська області</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 text-purple-500 ${
                    isDark ? 'border-slate-700 bg-slate-900' : 'border-amber-200 bg-amber-50'
                  }`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium opacity-70">
                      Графік прийому дзвінків
                    </p>
                    <p className="text-sm font-semibold">Пн – Нд: 09:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coverage Cities */}
            <div className={`glass-card p-5 sm:p-6 rounded-3xl border space-y-4 ${
              isDark ? 'border-slate-700 bg-slate-800/90' : 'border-amber-200 bg-white shadow-md'
            }`}>
              <h4 className="font-bold text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                Основні міста виїзду:
              </h4>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-amber-500 mb-1.5">Закарпаття:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {zakarpattyaCities.map((city, idx) => (
                      <span key={idx} className={`px-2.5 py-0.5 border text-xs rounded-lg ${
                        isDark ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-amber-200 bg-amber-50 text-slate-700'
                      }`}>
                        {city}
                      </span>
                    ))}
                    <span className="px-2.5 py-0.5 border border-amber-400/40 bg-amber-500/15 text-amber-500 text-xs font-bold rounded-lg">
                      + Усі села та ОТГ
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-amber-500 mb-1.5">Івано-Франківщина:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {frankivskCities.map((city, idx) => (
                      <span key={idx} className={`px-2.5 py-0.5 border text-xs rounded-lg ${
                        isDark ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-amber-200 bg-amber-50 text-slate-700'
                      }`}>
                        {city}
                      </span>
                    ))}
                    <span className="px-2.5 py-0.5 border border-amber-400/40 bg-amber-500/15 text-amber-500 text-xs font-bold rounded-lg">
                      + Усі села та ОТГ
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-6">
            <ConsultationForm theme={theme} />
          </div>

        </div>

      </div>
    </div>
  );
}
