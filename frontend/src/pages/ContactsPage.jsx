import React, { useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Sun } from 'lucide-react';
import ConsultationForm from '../components/ConsultationForm';

export default function ContactsPage({ theme }) {
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const cities = [
    'Ужгород', 'Мукачево', 'Хуст', 'Берегове', 
    'Виноградів', 'Свалява', 'Тячів', 'Рахів', 'Перечин'
  ];

  return (
    <div className="py-12 sm:py-20 min-h-screen transition-colors duration-300 theme-bg-main theme-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="font-semibold text-xs sm:text-sm uppercase tracking-widest px-3 py-1 rounded-full border theme-badge">
            Прямий Зв'язок
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-normal theme-text-primary">
            Контакти Майстра <span className="theme-text-accent">Чедрика Івана</span>
          </h1>
          <p className="text-sm sm:text-lg theme-text-secondary">
            Працюємо по всій території Закарпатської області. Зв'яжіться зручним для вас способом для консультації чи виїзду на об'єкт.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border space-y-6 transition-colors theme-bg-card theme-border-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center border theme-badge">
                  <Sun className="w-6 h-6 theme-icon-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold theme-text-primary">Чедрик Іван</h3>
                  <p className="text-xs font-semibold theme-text-accent">
                    Сертифікований Електромонтажник & СЕС Спеціаліст
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t theme-border-subtle">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 theme-badge">
                    <Phone className="w-5 h-5 theme-icon-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium theme-text-muted">
                      Телефон для консультацій
                    </p>
                    <a href="tel:+380970000000" className="text-lg font-bold transition-colors theme-text-primary hover:theme-text-accent">
                      +380 (97) 000-00-00
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 theme-badge">
                    <MessageCircle className="w-5 h-5 theme-icon-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium theme-text-muted">
                      Месенджери (Telegram / WhatsApp / Viber)
                    </p>
                    <div className="flex gap-3 mt-1">
                      <a href="https://t.me/" target="_blank" rel="noreferrer" className="text-xs font-bold theme-text-accent hover:underline">
                        Telegram
                      </a>
                      <span className="theme-text-muted">•</span>
                      <a href="https://wa.me/" target="_blank" rel="noreferrer" className="text-xs font-bold theme-progress-text hover:underline">
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 theme-badge">
                    <MapPin className="w-5 h-5 theme-icon-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium theme-text-muted">
                      Регіон виїзду
                    </p>
                    <p className="text-sm font-semibold theme-text-primary">Всі райони Закарпатської області</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 theme-badge">
                    <Clock className="w-5 h-5 theme-icon-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium theme-text-muted">
                      Графік прийому дзвінків
                    </p>
                    <p className="text-sm font-semibold theme-text-primary">Пн – Нд: 08:00 – 20:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coverage Cities */}
            <div className="glass-card p-5 sm:p-6 rounded-3xl border space-y-4 theme-bg-card theme-border-card">
              <h4 className="font-bold text-sm flex items-center gap-2 theme-text-primary">
                <MapPin className="w-4 h-4 theme-icon-accent" />
                Міста та райони виїзду на Закарпатті:
              </h4>
              <div className="flex flex-wrap gap-2">
                {cities.map((city, idx) => (
                  <span key={idx} className="px-3 py-1 border text-xs rounded-lg theme-badge">
                    {city}
                  </span>
                ))}
                <span className="px-3 py-1 border text-xs font-semibold rounded-lg theme-badge">
                  + Усі села та ОТГ області
                </span>
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
