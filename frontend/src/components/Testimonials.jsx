import React from 'react';
import { MessageSquareQuote, MapPin } from 'lucide-react';

export default function Testimonials({ theme }) {
  const isDark = theme === 'dark';

  const reviews = [
    {
      id: 1,
      name: 'Михайло Ковач',
      location: 'м. Ужгород',
      system: 'Гібридна СЕС 30 кВт (Deye)',
      rating: 5,
      comment: 'Замовляв у Івана будівництво гібридної СЕС на 30 кВт з інвертором Deye. Все зроблено надзвичайно акуратно, а документи по Зеленому Тарифу він оформив повністю сам, без моїх поїздок по Обленерго. Рекомендую як надійного майстра!'
    },
    {
      id: 2,
      name: 'Василь Степанчук',
      location: 'м. Мукачево',
      system: 'Автономне живлення & LiFePO4',
      rating: 5,
      comment: 'Встановили систему з акумуляторами LiFePO4 та інвертором Deye для будинку. Під час відключень світла резерв вмикається миттєво, навіть чутлива техніка не реагує. Чедрик Іван справжній професіонал.'
    },
    {
      id: 3,
      name: 'Олена & Сергій',
      location: 'м. Берегове',
      system: 'Монтаж панелей на дах (15 кВт)',
      rating: 5,
      comment: 'Монтаж сонячних панелей на черепичний дах провели дуже дбайливо — жодної пошкодженої черепиці, все протестовано на герметичність. Окреме дякую за допомогу у налаштуванні мобільного додатка Deye!'
    },
    {
      id: 4,
      name: 'Ігор Попович',
      location: 'м. Хуст',
      system: 'Електромонтаж & СЕС',
      rating: 5,
      comment: 'Чедрик Іван повністю переробляв електромережу та розподільний щит перед встановленням СЕС. Якість комутації, автоматика і кабельний менеджмент — просто на найвищому рівні.'
    },
    {
      id: 5,
      name: 'Юрій Маркович',
      location: 'м. Виноградів',
      system: 'Гібридна СЕС 20 кВт',
      rating: 5,
      comment: 'Звернулися за порадою сусідів і жодного разу не пошкодували. Іван правильно розрахував навантаження, підібрав обладнання і встановив гібрид під ключ. Все працює стабільно та без збоїв.'
    },
    {
      id: 6,
      name: 'Андрій Габор',
      location: 'м. Свалява',
      system: 'СЕС 28 кВт під Зелений Тариф',
      rating: 5,
      comment: 'Відмінний сервіс та повний супровід від першої консультації до виплати за Зеленим тарифом. Чедрик Іван завжди на зв\'язку та відповідає на будь-які запитання. Рекомендую на 100%!'
    }
  ];

  return (
    <section id="reviews" className={`py-16 sm:py-20 transition-colors duration-300 relative ${
      isDark ? 'bg-slate-900 text-white' : 'bg-amber-50/40 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3 sm:space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold uppercase tracking-widest ${
            isDark ? 'border-amber-400/40 bg-amber-500/15 text-amber-300' : 'border-amber-300 bg-amber-100 text-amber-800'
          }`}>
            <MessageSquareQuote className="w-4 h-4 text-amber-500" />
            <span>Відгуки Наших Клієнтів</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Що Кажуть Про Нашу <span className="text-amber-500">Роботу На Закарпатті</span>
          </h2>
          <p className={`text-xs sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Враження та реальний досвід власників збудованих нами сонячних електростанцій та гібридних систем.
          </p>
        </div>

        {/* Comments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {reviews.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col justify-between p-5 sm:p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isDark ? 'bg-slate-800/80 border-slate-700/80 hover:border-amber-400/60' : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              <div className="space-y-4">
                {/* Photo of the installation */}
                <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-xs border border-slate-700/20">
                  <img
                    src="/review-photo.jpg"
                    alt="Чедрик Іван монтаж СЕС"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Comment Body */}
                <p className={`text-xs sm:text-sm leading-relaxed italic ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  "{item.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className={`pt-4 mt-4 border-t flex items-center justify-between gap-3 ${
                isDark ? 'border-slate-700/60' : 'border-slate-100'
              }`}>
                <div>
                  <h3 className={`font-bold text-xs sm:text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {item.name}
                  </h3>
                  <div className={`flex items-center gap-1 text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <MapPin className="w-3 h-3 text-amber-500 flex-shrink-0" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg block whitespace-nowrap border ${
                    isDark ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' : 'border-amber-300 bg-amber-50 text-amber-900'
                  }`}>
                    {item.system}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
