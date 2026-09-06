import React, { useEffect, useId, useRef } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import SolarPanelCard from './SolarPanelCard';
import { SectionAmbience, SectionHeader } from './SolarDetails';

// The exact questions people type into Google (and that Google's AI Overviews
// / SGE pull answers for). Kept in sync with the FAQPage JSON-LD below —
// schema that doesn't match visible text is against Google's guidelines and
// can get a listing devalued, so the two must never drift apart.
const FAQ_ITEMS = [
  {
    q: 'Скільки коштує сонячна станція (СЕС) під ключ?',
    a: 'Вартість залежить від потужності, типу даху та наявності акумуляторів: мережева станція на 5–10 кВт обходиться дешевше за гібридну систему з АКБ. Точну суму дає безкоштовний виїзд інженера на об\'єкт або наш онлайн-калькулятор — він враховує площу даху, бренд панелей та потрібний запас автономності.'
  },
  {
    q: 'За скільки років окупається сонячна станція в Україні?',
    a: 'При поточних тарифах та Зеленому тарифі більшість станцій потужністю 5 кВт – 1 МВт окупаються за 3.5–4.5 роки. Термін залежить від обраного режиму (продаж за Зеленим тарифом, Net Billing чи власне споживання) та рівня інсоляції в регіоні — Закарпаття входить у число найсприятливіших областей Заходу України.'
  },
  {
    q: 'Як отримати Зелений тариф на сонячну станцію?',
    a: 'Потрібно подати заяву в Обленерго на технічні умови, підготувати сертифікований проєкт СЕС з однолінійними схемами, встановити двонаправлений лічильник і підписати договір з енергопостачальником. Nova Energy бере весь цей процес на себе — від подачі документів до першої виплати за виробленою електроенергією.'
  },
  {
    q: 'Чи можна встановлювати сонячні панелі взимку?',
    a: 'Так. Монтаж металоконструкцій та кабельних трас проводиться незалежно від температури повітря — важливо тільки уникати монтажу під час ожеледі чи сильного снігопаду з міркувань безпеки. Пусконалагодження та вихід станції на повну потужність відбувається одразу після підключення.'
  },
  {
    q: 'Яка гарантія на сонячні панелі та інвертори?',
    a: 'Виробники сонячних панелей (LONGi, Trina Solar, Astra Energy) дають до 25–30 років гарантії на збереження понад 80–85% номінальної потужності. Гібридні інвертори Deye, Solis та Huawei мають заводську гарантію 5–10 років. Усі роботи Nova Energy додатково супроводжуються власною гарантією на монтаж.'
  },
  {
    q: 'У яких областях працює Nova Energy?',
    a: 'Виїжджаємо на об\'єкти в Закарпатській, Івано-Франківській та Львівській областях у радіусі до 200 км від Ужгорода: Мукачево, Хуст, Берегове, Виноградів, Свалява, Івано-Франківськ, Львів та навколишні міста і села.'
  }
];

export function FaqJsonLd() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };

  const ref = useRef(null);
  useEffect(() => {
    let script = document.getElementById('faq-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'faq-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(json);
    ref.current = script;
    return () => {
      // Only the homepage carries FAQ schema — drop it on unmount so it
      // doesn't keep describing a page the visitor has since left.
      script?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

function FaqItem({ item, theme, defaultOpen }) {
  const isDark = theme === 'dark';
  const uid = useId();
  return (
    <details
      className={`group rounded-2xl border overflow-hidden transition-colors ${
        isDark ? 'border-slate-700/70 bg-slate-900/60' : 'border-slate-200 bg-white'
      }`}
      open={defaultOpen}
    >
      <summary
        className={`flex items-center justify-between gap-3 px-4 sm:px-5 py-4 cursor-pointer list-none font-bold text-sm sm:text-base ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}
      >
        <span id={`faq-q-${uid}`}>{item.q}</span>
        <ChevronDown className="w-4 h-4 flex-shrink-0 text-amber-500 transition-transform group-open:rotate-180" />
      </summary>
      <p
        aria-labelledby={`faq-q-${uid}`}
        className={`px-4 sm:px-5 pb-4 sm:pb-5 text-sm leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}
      >
        {item.a}
      </p>
    </details>
  );
}

export default function FaqSection({ theme }) {
  const isDark = theme === 'dark';

  return (
    <section
      id="faq"
      className={`py-16 sm:py-20 relative overflow-hidden transition-colors duration-300 border-t scroll-mt-20 ${
        isDark ? 'bg-slate-900 text-white border-slate-800' : 'bg-white text-slate-900 border-slate-200'
      }`}
    >
      <FaqJsonLd />
      <SectionAmbience flares={false} beams={false} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          theme={theme}
          eyebrow="Питання & Відповіді"
          eyebrowIcon={HelpCircle}
          title="Часті Запитання Про Сонячні Станції"
          lead="Відповіді на те, що найчастіше запитують перед замовленням СЕС у Закарпатській та Івано-Франківській областях."
          className="mb-10 sm:mb-14"
        />

        <SolarPanelCard theme={theme} className="p-3 sm:p-4" contentClassName="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <FaqItem key={item.q} item={item} theme={theme} defaultOpen={index === 0} />
          ))}
        </SolarPanelCard>
      </div>
    </section>
  );
}
