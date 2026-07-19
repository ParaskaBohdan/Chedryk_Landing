import React from 'react';
import { Star, MessageSquareQuote, UserCheck, MapPin } from 'lucide-react';

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
    <div id="reviews" className="py-12 sm:py-16 transition-colors duration-300 relative theme-bg-section border-t theme-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs sm:text-sm font-semibold theme-badge">
            <MessageSquareQuote className="w-4 h-4 theme-icon-accent" />
            <span>Відгуки Наших Клієнтів</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-normal theme-text-primary">
            Що Кажуть Про Нашу <span className="theme-text-accent">Роботу На Закарпатті</span>
          </h2>
          <p className="text-xs sm:text-base theme-text-secondary leading-relaxed">
            Враження та реальний досвід власників збудованих нами сонячних електростанцій та гібридних систем.
          </p>
        </div>

        {/* Comments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-5 sm:p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl theme-bg-card theme-border-card"
            >
              <div className="space-y-3.5">
                {/* Top Bar: Stars & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border theme-badge opacity-90">
                    <UserCheck className="w-3.5 h-3.5 theme-icon-accent" />
                    <span>Клієнт</span>
                  </div>
                </div>

                {/* Comment Body */}
                <p className="text-xs sm:text-sm leading-relaxed theme-text-secondary italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 mt-4 border-t theme-border-subtle flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm theme-text-primary">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] theme-text-muted mt-0.5">
                    <MapPin className="w-3 h-3 theme-icon-accent flex-shrink-0" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg theme-badge block whitespace-nowrap">
                    {item.system}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
