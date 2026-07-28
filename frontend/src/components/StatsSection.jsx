import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Sun, DollarSign, Battery, Cpu, ShieldCheck, FileBarChart, TrendingUp, Gauge } from 'lucide-react';
import SolarPanelCard from './SolarPanelCard';
import { LiveBadge, EfficiencyMeter, MonthlyYieldChart, TelemetryChip } from './SolarTech';
import {
  InsolationScene,
  PaybackScene,
  DegradationScene,
  InverterEfficiencyScene
} from './AnalyticsIllustrations';

export default function StatsSection({ theme }) {
  const isDark = theme === 'dark';

  const officialFacts = [
    {
      icon: Sun,
      title: 'Інсоляція регіону',
      stat: '1150–1250 кВт·год/м²',
      desc: 'Закарпатська та Івано-Франківська області є одними з найсприятливіших регіонів Заходу України за сонячною радіацією.',
      Illustration: InsolationScene,
      badge: 'Irradiance Mapped',
      badgeTone: 'amber',
      meter: { label: 'Irradiance Index', value: 84.2, tone: 'amber', live: true },
      tag: 'kWh/m² · year',
      source: 'PVGIS · SARAH-3'
    },
    {
      icon: DollarSign,
      title: 'Середня окупність СЕС',
      stat: '3.5 – 4.5 Років',
      desc: 'При поточних та прогнозованих тарифах мережеві та гібридні станції від 5 кВт до 1 МВт повністю окупають інвестиції.',
      Illustration: PaybackScene,
      badge: 'Break-Even Modelled',
      badgeTone: 'emerald',
      meter: { label: 'ROI Progress', value: 76.5, tone: 'emerald', live: false },
      tag: 'payback · years',
      source: 'НКРЕКП · тариф 2026'
    },
    {
      icon: Battery,
      title: 'Деградація фотомодулів',
      stat: '< 0.55% на рік',
      desc: 'Сучасні N-type Tier-1 сонячні панелі зберігають понад 85% номінальної потужності навіть після 25 років експлуатації.',
      Illustration: DegradationScene,
      badge: '25-Year Warranty',
      badgeTone: 'sky',
      meter: { label: 'Capacity @ 25y', value: 85.4, tone: 'sky', live: false },
      tag: 'n-type · tier-1',
      source: 'IEC 61215 · IEC 61730'
    },
    {
      icon: Cpu,
      title: 'ККД Сучасних Інверторів',
      stat: '98.5% Efficiency',
      desc: 'Використання високочастотних інверторів Deye мінімізує втрати під час конвертації струму та зарядки батарей.',
      Illustration: InverterEfficiencyScene,
      badge: 'Lab Verified',
      badgeTone: 'emerald',
      meter: { label: 'Conversion Efficiency', value: 98.5, tone: 'emerald', live: true },
      tag: 'deye · hf inverter',
      source: 'EN 50530 · Deye datasheet'
    }
  ];

  return (
    <section id="stats" className={`py-16 sm:py-20 relative overflow-hidden transition-colors duration-300 border-y scroll-mt-20 ${
      isDark ? 'bg-slate-900 text-white border-slate-800' : 'bg-amber-50/40 text-slate-900 border-amber-100'
    }`}>
      {/* Ambient Solar Lighting */}
      <div className="solar-flare w-[220px] sm:w-[360px] h-[220px] sm:h-[360px] -top-24 left-[12%]" aria-hidden="true" />
      <div className="solar-flare w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] -bottom-24 right-[10%]" style={{ animationDelay: '3.2s' }} aria-hidden="true" />
      <div className="solar-beam hidden sm:block w-[90px] h-[520px] -top-40 left-[46%]" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full border ${
            isDark ? 'border-amber-400/40 bg-amber-500/15 text-amber-300' : 'border-amber-300 bg-amber-100 text-amber-800'
          }`}>
            <BarChart3 className="w-4 h-4 text-amber-500" />
            <span>Аналітика & Офіційні Дані</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Чому Сонячні Станції 5 кВт – 1 МВт — Вигідне Рішення?
          </h2>
          <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Офіційні фізичні та економічні показники ефективності сонячної енергетики для Закарпаття та Франківщини.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {officialFacts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <SolarPanelCard
                  theme={theme}
                  className="h-full p-5 sm:p-6"
                  contentClassName="flex flex-col justify-between"
                >
                  <div>
                    {/* Data-visualisation scene for the figure this card claims */}
                    <div className="relative rounded-2xl overflow-hidden mb-4">
                      <fact.Illustration theme={theme} />
                      <div className="absolute top-2 left-2">
                        <LiveBadge theme={theme} label={fact.badge} tone={fact.badgeTone} />
                      </div>
                    </div>

                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-500">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[9px] font-bold telemetry-label mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        {fact.tag}
                      </span>
                    </div>
                    <h3 className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {fact.title}
                    </h3>
                    <p className="text-xl sm:text-2xl font-black mb-2 text-amber-500">
                      {fact.stat}
                    </p>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {fact.desc}
                    </p>
                  </div>

                  <div className={`mt-5 pt-4 border-t space-y-3 ${isDark ? 'border-slate-700/70' : 'border-slate-200'}`}>
                    <EfficiencyMeter
                      theme={theme}
                      label={fact.meter.label}
                      value={fact.meter.value}
                      tone={fact.meter.tone}
                      live={fact.meter.live}
                    />
                    <p className={`text-[9px] telemetry-label flex items-center gap-1.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      <FileBarChart className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{fact.source}</span>
                    </p>
                  </div>
                </SolarPanelCard>
              </motion.div>
            );
          })}
        </div>

        {/* Analytics board */}
        <SolarPanelCard theme={theme} glow className="mt-10 sm:mt-12 p-5 sm:p-7">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Annual generation profile */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <LiveBadge theme={theme} label="Dataset 2026" tone="sky" />
                <LiveBadge theme={theme} label="23.8% Efficiency" tone="amber" />
                <LiveBadge theme={theme} label="Uptime 99.94%" />
              </div>
              <MonthlyYieldChart theme={theme} />
            </div>

            {/* Aggregate readouts + compliance */}
            <div className={`lg:w-[330px] lg:border-l lg:pl-8 ${isDark ? 'lg:border-slate-700/70' : 'lg:border-slate-200'}`}>
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                <TelemetryChip theme={theme} icon={Sun} label="Peak Sun Hours" value="3.24 год/добу" />
                <TelemetryChip theme={theme} icon={TrendingUp} label="Perf. Ratio" value="82.5%" live />
                <TelemetryChip theme={theme} icon={Gauge} label="CO₂ Avoided" value="0.71 т/кВт·рік" />
                <TelemetryChip theme={theme} icon={Cpu} label="MPPT Trackers" value="2–4 шт" />
              </div>

              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-500 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Повна відповідність ДБН та стандартам ПУЕ
                  </h4>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Усі роботи Чедрика Івана виконуються за державними стандартами безпеки електроустановок.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SolarPanelCard>

      </div>
    </section>
  );
}
