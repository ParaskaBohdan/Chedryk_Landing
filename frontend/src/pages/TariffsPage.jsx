import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import DeyeAndLegal from '../components/DeyeAndLegal';
import StepProcess from '../components/StepProcess';
import { Zap, FileCheck, Gauge, Leaf, Landmark, Clock, ArrowRight } from 'lucide-react';
import SolarPanelCard from '../components/SolarPanelCard';
import { LiveBadge, EfficiencyMeter, TelemetryChip } from '../components/SolarTech';
import { BusbarDivider, RegistrationMarks } from '../components/SolarDetails';
import {
  BiDirectionalMeterScene,
  EnergySplitScene,
  SettlementScene,
  PermitPipelineScene
} from '../components/TariffIllustrations';

export default function TariffsPage({ theme, onOpenConsultation }) {
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // How the green tariff works, one card per mechanism.
  // Percentages are illustrative profiles, not quoted tariff rates.
  const mechanics = [
    {
      id: 'metering',
      Illustration: BiDirectionalMeterScene,
      badge: 'Bi-Directional Metering',
      tone: 'emerald',
      icon: Gauge,
      title: 'Двонаправлений облік',
      desc: 'Замість звичайного лічильника встановлюється двонаправлений: він окремо рахує спожиту з мережі енергію та надлишок, відданий у мережу вашою станцією.',
      meter: { label: 'Export Accuracy', value: 99.5, tone: 'emerald' },
      chips: [
        { label: 'Клас точності', value: '1.0' },
        { label: 'Облік', value: 'Імпорт + Експорт' }
      ]
    },
    {
      id: 'split',
      Illustration: EnergySplitScene,
      badge: 'Load Profile',
      tone: 'amber',
      icon: Leaf,
      title: 'Власне споживання vs продаж',
      desc: 'Спершу енергія покриває потреби будинку, і лише надлишок іде в мережу. Чим більше споживання вдень — тим швидша окупність станції.',
      meter: { label: 'Export Share', value: 65, tone: 'amber', decimals: 0 },
      chips: [
        { label: 'Власні потреби', value: '35%' },
        { label: 'У мережу', value: '65%' }
      ]
    },
    {
      id: 'settlement',
      Illustration: SettlementScene,
      badge: 'EUR-Indexed',
      tone: 'sky',
      icon: Landmark,
      title: 'Розрахунки за віддану енергію',
      desc: 'Обленерго знімає показники та розраховується за обсяг, відданий у мережу. Пікові надходження припадають на другий і третій квартали.',
      meter: { label: 'Peak Quarter', value: 100, tone: 'sky', decimals: 0 },
      chips: [
        { label: 'Пік сезону', value: 'Q2–Q3' },
        { label: 'Прив’язка', value: 'Курс €' }
      ]
    }
  ];

  // Обленерго permit route. activeStage below marks where a typical project sits.
  const pipeline = [
    { stage: 'Заява та пакет документів', duration: '1–3 дні', status: 'Готово' },
    { stage: 'Технічні умови (ТУ)', duration: '14–25 днів', status: 'Готово' },
    { stage: 'Проєкт та монтаж СЕС', duration: '5–12 днів', status: 'В роботі' },
    { stage: 'Двонаправлений лічильник', duration: '3–5 днів', status: 'Очікує' },
    { stage: 'Договір на продаж', duration: '5–8 днів', status: 'Очікує' }
  ];

  const statusTone = { Готово: 'emerald', 'В роботі': 'amber', Очікує: 'sky' };

  return (
    <div className={`py-12 sm:py-20 min-h-screen relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-slate-100/70 text-slate-900'
    }`}>
      {/* Ambient Solar Lighting */}
      <div className="solar-flare w-[240px] sm:w-[420px] h-[240px] sm:h-[420px] -top-32 left-[10%]" aria-hidden="true" />
      <div className="solar-flare w-[200px] sm:w-[340px] h-[200px] sm:h-[340px] top-[38%] right-[6%]" style={{ animationDelay: '3s' }} aria-hidden="true" />
      <div className="solar-beam hidden sm:block w-[110px] h-[620px] -top-44 right-[22%]" aria-hidden="true" />
      <div className="solar-beam hidden lg:block w-[74px] h-[520px] -top-36 left-[32%]" style={{ animationDelay: '4.6s' }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full border ${
            isDark ? 'bg-amber-500/15 border-[#fbbf24] text-[#fde68a]' : 'bg-amber-50 border-orange-400 text-slate-800'
          }`}>
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Зелений Тариф · Тільки Закарпатська область</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Оформлення <span className="text-solar-gradient">Зеленого Тарифу</span> на Закарпатті
          </h1>
          <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Повний супровід документації в «Закарпаттяобленерго» під ключ. Збільшення дозволеної потужності, ТУ та прямі виплати в євро за згенеровану сонячну енергію.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <LiveBadge theme={theme} label="Найшвидший цикл: 28–50 днів" tone="amber" />
            <LiveBadge theme={theme} label="Виключно Закарпаття" tone="emerald" />
            <LiveBadge theme={theme} label="Bi-Directional Metering" tone="sky" />
          </div>

          {/* Regional note callout */}
          <div className={`mt-4 p-4 rounded-2xl border text-xs sm:text-sm text-left ${
            isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}>
            <p className="font-semibold">
              ℹ️ <strong>Зверніть увагу:</strong> Підключення та виплати за Зеленим Тарифом здійснюються виключно для об'єктів у Закарпатській області. Для клієнтів у Львівській та Івано-Франківській областях ми встановлюємо гібридні станції під власне споживання та Net Billing для максимальної економії за тарифом 6.30 грн/кВт·год та повної автономії.
            </p>
          </div>
        </div>

        <BusbarDivider />

        {/* How the green tariff works */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Як Працює <span className="text-amber-500">Зелений Тариф</span>
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Механіка обліку, розподілу генерації та розрахунків за віддану в мережу електроенергію.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {mechanics.map((item, index) => {
              const Icon = item.icon;
              const Illustration = item.Illustration;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                >
                  <SolarPanelCard
                    theme={theme}
                    className="h-full p-5 sm:p-6"
                    contentClassName="flex flex-col"
                  >
                    <div className="relative rounded-2xl overflow-hidden mb-4">
                      <Illustration theme={theme} />
                      <div className="hidden sm:block absolute top-2.5 left-2.5">
                        <LiveBadge theme={theme} label={item.badge} tone={item.tone} />
                      </div>
                    </div>

                    <div className={`w-11 h-11 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border-2 mb-3 ${
                      isDark ? 'bg-slate-950 border-[#fbbf24] text-[#fbbf24]' : 'bg-white border-orange-500 text-orange-500 shadow-sm'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className={`text-lg sm:text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm sm:text-xs leading-relaxed mb-4 flex-grow font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {item.desc}
                    </p>

                    <div className={`pt-4 border-t space-y-3 ${isDark ? 'border-slate-700/70' : 'border-slate-200'}`}>
                      <EfficiencyMeter
                        theme={theme}
                        label={item.meter.label}
                        value={item.meter.value}
                        tone={item.meter.tone}
                        decimals={item.meter.decimals ?? 1}
                      />
                      <div className="grid grid-cols-2 gap-2.5">
                        {item.chips.map((chip) => (
                          <TelemetryChip key={chip.label} theme={theme} label={chip.label} value={chip.value} />
                        ))}
                      </div>
                    </div>
                  </SolarPanelCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Обленерго permit route */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
        >
          <SolarPanelCard theme={theme} glow className="p-5 sm:p-8">
            <RegistrationMarks />
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Маршрут Оформлення в <span className="text-amber-500">Обленерго</span>
                </h2>
                <p className={`text-sm sm:text-lg font-medium mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  П’ять етапів від подачі заяви до договору на продаж надлишків. Усю бюрократію ведемо ми.
                </p>
              </div>
              <div className="hidden sm:block">
                <LiveBadge theme={theme} label="Pipeline Active" tone="amber" />
              </div>
            </div>

            <div className="hidden lg:block">
              <PermitPipelineScene theme={theme} activeStage={2} stages={pipeline.length} />
            </div>

            {/* Stage captions sit in HTML so they stay legible at any width */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
              {pipeline.map((step, index) => (
                <div
                  key={step.stage}
                  className={`rounded-xl border p-3.5 space-y-2 ${
                    index === 2
                      ? isDark
                        ? 'border-amber-400/50 bg-amber-500/10'
                        : 'border-amber-400 bg-amber-50'
                      : isDark
                        ? 'border-slate-700/70 bg-slate-900/40'
                        : 'border-slate-200 bg-white/70'
                  }`}
                >
                  <p className={`text-xs sm:text-[10px] font-bold telemetry-label ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Етап {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className={`text-sm sm:text-base font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {step.stage}
                  </p>
                  <p className={`text-xs sm:text-[11px] font-medium telemetry-label flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    <Clock className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" />
                    {step.duration}
                  </p>
                  <div className="pt-1">
                    <LiveBadge theme={theme} label={step.status} tone={statusTone[step.status]} />
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-6 pt-5 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isDark ? 'border-slate-700/70' : 'border-slate-200'
            }`}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 flex-1 w-full">
                <TelemetryChip theme={theme} icon={FileCheck} label="Approval Rate" value="99.2%" live />
                <TelemetryChip theme={theme} icon={Clock} label="Найшвидший цикл" value="28–50 днів" />
                <TelemetryChip theme={theme} icon={Gauge} label="Лічильник" value="Двонаправлений" />
                <TelemetryChip theme={theme} icon={Landmark} label="Договір" value="Купівлі-продажу" />
              </div>
              <button
                type="button"
                onClick={() => onOpenConsultation && onOpenConsultation('Оформлення Зеленого Тарифу')}
                className="btn-orange-bright font-bold text-xs px-5 py-3 rounded-xl shadow-lg glow-amber flex items-center gap-2 flex-shrink-0 cursor-pointer"
              >
                <span>Почати оформлення</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </SolarPanelCard>
        </motion.div>

        {/* Deye and Legal Section */}
        <DeyeAndLegal onOpenConsultation={onOpenConsultation} theme={theme} />

        {/* Step Process for Connection */}
        <StepProcess theme={theme} onOpenConsultation={onOpenConsultation} />

        {/* Bottom CTA Banner */}
        <SolarPanelCard theme={theme} glow className="p-8 sm:p-10 shadow-xl" contentClassName="text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <LiveBadge theme={theme} label="Legal Support Included" />
            <LiveBadge theme={theme} label="Тільки Закарпаття" tone="amber" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black" style={{ color: isDark ? '#ffffff' : '#000000' }}>
            Потрібна допомога з Зеленим Тарифом у Закарпатській області?
          </h3>
          <p className="text-xs sm:text-sm font-bold max-w-xl mx-auto" style={{ color: isDark ? '#cbd5e1' : '#000000' }}>
            Юридичний супровід та подача документів в «Закарпаттяобленерго» під ключ (найшвидший цикл 28–50 днів).
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenConsultation && onOpenConsultation('Оформлення Зеленого Тарифу')}
              className="btn-orange-bright px-8 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Отримати Консультацію щодо Документів</span>
            </button>
          </div>
        </SolarPanelCard>

      </div>
    </div>
  );
}
