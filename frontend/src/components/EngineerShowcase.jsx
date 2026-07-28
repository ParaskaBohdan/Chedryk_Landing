import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Gauge, Thermometer, Wind, Activity, ArrowRight, Compass } from 'lucide-react';
import SolarPanelCard from './SolarPanelCard';
import {
  EngineerMountingPanel,
  EngineerHoldingPanel,
  EngineerTestingInverter
} from './EngineerIllustrations';
import {
  LiveBadge,
  EfficiencyMeter,
  TiltGauge,
  IrradianceChart,
  TelemetryChip,
  EnergyFlowStrip
} from './SolarTech';

/**
 * "Люди за технологією" — engineer concept blocks with live field telemetry.
 * Illustrations are inline SVG, surfaces are photovoltaic-styled panels.
 */
export default function EngineerShowcase({ theme, onOpenConsultation }) {
  const isDark = theme === 'dark';

  const blocks = [
    {
      badge: 'Field Engineer Verified',
      tone: 'emerald',
      Illustration: EngineerHoldingPanel,
      title: 'Приймання та вхідний контроль модулів',
      desc: 'Кожен фотомодуль проходить візуальний огляд, перевірку напруги холостого ходу та тест на мікротріщини ще до підйому на дах.',
      readout: <EfficiencyMeter theme={theme} label="Panel Efficiency" value={23.8} live />
    },
    {
      badge: 'Panel Mounting in Progress',
      tone: 'amber',
      Illustration: EngineerMountingPanel,
      title: 'Монтаж на алюмінієві рейки',
      desc: 'Кріплення з нержавіючої сталі, розрахунок вітрового навантаження та оптимальний кут нахилу під інсоляцію Закарпаття.',
      readout: <TiltGauge theme={theme} angle={35} label="Tilt Angle" />
    },
    {
      badge: 'Inverter Commissioning',
      tone: 'sky',
      Illustration: EngineerTestingInverter,
      title: 'Пусконалагодження та тестування',
      desc: 'Випробування під навантаженням, перевірка АВР, налаштування мобільного моніторингу та передача станції власнику.',
      readout: <EfficiencyMeter theme={theme} label="Inverter Load" value={92.4} tone="emerald" live />
    }
  ];

  return (
    <section
      id="engineers"
      className={`py-16 sm:py-20 relative overflow-hidden transition-colors duration-300 border-t scroll-mt-20 ${
        isDark ? 'bg-slate-900 text-white border-slate-800' : 'bg-slate-100/70 text-slate-900 border-slate-200'
      }`}
    >
      {/* Ambient lighting */}
      <div className="solar-flare w-[240px] sm:w-[420px] h-[240px] sm:h-[420px] -top-32 left-[8%]" aria-hidden="true" />
      <div className="solar-flare w-[200px] sm:w-[320px] h-[200px] sm:h-[320px] bottom-0 right-[6%]" style={{ animationDelay: '2.4s' }} aria-hidden="true" />
      <div className="solar-beam hidden sm:block w-[120px] h-[560px] -top-40 left-[28%]" aria-hidden="true" />
      <div className="solar-beam hidden sm:block w-[70px] h-[460px] -top-32 right-[24%]" style={{ animationDelay: '3s' }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3 sm:space-y-4">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold uppercase tracking-widest ${
              isDark ? 'bg-amber-500/15 border-amber-400/40 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-800'
            }`}
          >
            <HardHat className="w-4 h-4 text-amber-500" />
            <span>Бригада на об'єкті</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Люди, Які Будують Вашу <span className="text-solar-gradient">Сонячну Станцію</span>
          </h2>
          <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Від вхідного контролю панелей до пусконалагодження інвертора — кожен етап виконує сертифікований монтажник із фіксацією показників.
          </p>
        </div>

        {/* Engineer concept blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {blocks.map((block, index) => {
            const Illustration = block.Illustration;
            return (
              <motion.div
                key={block.badge}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <SolarPanelCard
                  theme={theme}
                  className="h-full p-4 sm:p-5"
                  contentClassName="flex flex-col"
                >
                  {/* Illustration with glass overlay badges */}
                  <div className="relative rounded-2xl overflow-hidden mb-4">
                    <Illustration theme={theme} />
                    <div className="absolute top-2.5 left-2.5">
                      <LiveBadge theme={theme} label={block.badge} tone={block.tone} />
                    </div>
                    <div
                      className={`absolute bottom-2.5 right-2.5 glass-deep rounded-lg px-2 py-1 text-[9px] font-bold telemetry-label ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      ID {String(index + 1).padStart(2, '0')} · Закарпаття
                    </div>
                  </div>

                  <h3 className={`text-base sm:text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {block.title}
                  </h3>
                  <p className={`text-xs leading-relaxed mb-4 flex-grow ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {block.desc}
                  </p>

                  <div className={`pt-4 border-t ${isDark ? 'border-slate-700/70' : 'border-slate-200'}`}>
                    {block.readout}
                  </div>
                </SolarPanelCard>
              </motion.div>
            );
          })}
        </div>

        {/* Live field telemetry board */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-8 sm:mt-10"
        >
          <SolarPanelCard theme={theme} glow className="p-5 sm:p-7">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              {/* Telemetry chips */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <LiveBadge theme={theme} label="Live Grid Active" />
                  <span className={`text-[10px] telemetry-label ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Телеметрія об'єктів · оновлення кожні 3 с
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <TelemetryChip theme={theme} icon={Gauge} label="Efficiency" value="23.8%" live />
                  <TelemetryChip theme={theme} icon={Compass} label="Tilt / Azimuth" value="35° / 182°" />
                  <TelemetryChip theme={theme} icon={Thermometer} label="Cell Temp" value="41.2 °C" live />
                  <TelemetryChip theme={theme} icon={Activity} label="String Voltage" value="612 В" live />
                  <TelemetryChip theme={theme} icon={Wind} label="Wind Load" value="4.2 м/с" />
                  <TelemetryChip theme={theme} icon={Gauge} label="Uptime" value="99.94%" />
                </div>

                <div>
                  <p className={`text-[10px] font-bold telemetry-label mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    DC String → Inverter → Grid
                  </p>
                  <EnergyFlowStrip theme={theme} />
                </div>
              </div>

              {/* Irradiance chart */}
              <div className={`lg:w-[320px] lg:border-l lg:pl-8 ${isDark ? 'lg:border-slate-700/70' : 'lg:border-slate-200'}`}>
                <IrradianceChart theme={theme} />
                <p className={`mt-3 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Профіль сонячної радіації для Закарпатської області у липні. Пікова генерація припадає на 12:00–14:00.
                </p>
                <button
                  onClick={onOpenConsultation}
                  className="btn-orange-bright mt-4 w-full font-bold text-xs px-4 py-3 rounded-xl shadow-lg glow-amber flex items-center justify-center gap-2"
                >
                  <span>Замовити виїзд інженера</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </SolarPanelCard>
        </motion.div>
      </div>
    </section>
  );
}
