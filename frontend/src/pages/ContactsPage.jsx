import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Mail, Sun } from 'lucide-react';
import ConsultationForm from '../components/ConsultationForm';

export default function ContactsPage() {
  const cities = [
    'Ужгород', 'Мукачево', 'Хуст', 'Берегове', 
    'Виноградів', 'Свалява', 'Тячів', 'Рахів', 'Перечин'
  ];

  return (
    <div className="py-16 lg:py-24 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-400 font-semibold text-xs sm:text-sm uppercase tracking-widest px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
            Прямий Зв'язок
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Контакти Майстра <span className="text-amber-400">Чедрика Івана</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg">
            Працюємо по всій території Закарпатської області. Зв'яжіться зручним для вас способом для консультації чи виїзду на об'єкт.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-6 space-y-8">
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                  <Sun className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Чедрик Іван</h3>
                  <p className="text-xs text-amber-400 font-semibold">Сертифікований Електромонтажник & СЕС Спеціаліст</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-4 text-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Телефон для консультацій</p>
                    <a href="tel:+380970000000" className="text-lg font-bold text-white hover:text-amber-400 transition-colors">
                      +380 (97) 000-00-00
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Месенджери (Telegram / WhatsApp / Viber)</p>
                    <div className="flex gap-3 mt-1">
                      <a href="https://t.me/" target="_blank" rel="noreferrer" className="text-xs font-bold text-sky-400 hover:underline">
                        Telegram
                      </a>
                      <span className="text-slate-600">•</span>
                      <a href="https://wa.me/" target="_blank" rel="noreferrer" className="text-xs font-bold text-emerald-400 hover:underline">
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Регіон виїзду</p>
                    <p className="text-sm font-semibold text-white">Всі райони Закарпатської області</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Графік прийому дзвінків</p>
                    <p className="text-sm font-semibold text-white">Пн – Нд: 08:00 – 20:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coverage Cities */}
            <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="text-white font-bold text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                Міста та райони виїзду на Закарпатті:
              </h4>
              <div className="flex flex-wrap gap-2">
                {cities.map((city, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-lg">
                    {city}
                  </span>
                ))}
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-lg">
                  + Усі села та ОТГ області
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-6">
            <ConsultationForm />
          </div>

        </div>

      </div>
    </div>
  );
}
