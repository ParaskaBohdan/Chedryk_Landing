import React, { useState } from 'react';
import { TrendingUp, Clock, DollarSign, PiggyBank, Sparkles } from 'lucide-react';
import { SolarSlider } from './SolarControls';
import SolarPanelCard from './SolarPanelCard';
import { LiveBadge } from './SolarTech';
import { SectionAmbience, RegistrationMarks } from './SolarDetails';

export default function MiniRoiCalculator({ theme }) {
  const isDark = theme === 'dark';

  // Configurator States (matching screenshot default values)
  const [powerKw, setPowerKw] = useState(14);
  const [consumptionKwh, setConsumptionKwh] = useState(325);
  const [gridPriceUah, setGridPriceUah] = useState(6.3); // грн за кВт·год

  // Calculations
  const usdToUah = 41.5;
  const investmentUsd = powerKw * 850;

  const annualIncomeGenKwh = Math.round(powerKw * 1180);
  const annualConsumptionKwh = consumptionKwh * 12;

  const annualGridExportKwh = Math.max(0, annualIncomeGenKwh - annualConsumptionKwh);
  const annualSelfCoverageKwh = Math.min(annualIncomeGenKwh, annualConsumptionKwh);

  // Green Tariff net rate (0.163 EUR ≈ 0.18 USD)
  const greenTariffRateUsd = 0.18;
  // Grid electricity price dynamically converted to USD
  const gridTariffRateUsd = gridPriceUah / usdToUah;

  const annualGreenIncomeUsd = Math.round(annualGridExportKwh * greenTariffRateUsd);
  const annualElectricitySavingsUsd = Math.round(annualSelfCoverageKwh * gridTariffRateUsd);
  const totalAnnualBenefitUsd = annualGreenIncomeUsd + annualElectricitySavingsUsd;

  const paybackYears = totalAnnualBenefitUsd > 0 
    ? parseFloat((investmentUsd / totalAnnualBenefitUsd).toFixed(1)) 
    : 0;

  return (
    <section className={`py-12 sm:py-16 relative overflow-hidden border-b transition-colors duration-300 ${
      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-amber-50/40 border-amber-100 text-slate-900'
    }`}>
      <SectionAmbience flares={true} beams={true} />

      {/* Ambient Solar Lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="solar-flare w-[240px] sm:w-[380px] h-[240px] sm:h-[380px] -top-20 right-[5%] opacity-60" />
        <div className="solar-flare w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] -bottom-20 left-[5%] opacity-50" style={{ animationDelay: '2.5s' }} />
        <div className="solar-beam hidden sm:block w-[80px] h-[550px] -top-36 left-[25%] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Component Header (Optional but good for layout on landing) */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Оцініть <span className="text-amber-500">Фінансову Ефективність</span> вашої СЕС
          </h2>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Вкажіть параметри вашого будинку та дізнайтеся термін окупності та річний дохід.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: ROI INPUT SLIDERS */}
          <div className="lg:col-span-6">
            <SolarPanelCard theme={theme} className="p-4 sm:p-8" contentClassName="space-y-4 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 text-amber-500">
                <TrendingUp className="w-5 h-5" /> Параметри для розрахунку окупності
              </h3>

              {/* 1. Station Power Slider */}
              <div className="pt-2">
                <SolarSlider
                  id="home-income-power"
                  theme={theme}
                  label="Потужність станції (СЕС)"
                  display={`${powerKw} кВт`}
                  min={5}
                  max={50}
                  step={1}
                  value={powerKw}
                  onChange={setPowerKw}
                  hint={`Середня річна генерація: ~${annualIncomeGenKwh.toLocaleString()} кВт·год/рік.`}
                />
              </div>

              {/* 2. Monthly Consumption Slider */}
              <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
                <SolarSlider
                  id="home-monthly-consumption"
                  theme={theme}
                  label="Середньомісячне споживання будинку"
                  display={`${consumptionKwh} кВт·год/міс`}
                  min={100}
                  max={1000}
                  step={25}
                  value={consumptionKwh}
                  onChange={setConsumptionKwh}
                  hint={`Річне власне споживання об'єкта: ~${annualConsumptionKwh.toLocaleString()} кВт·год.`}
                />
              </div>
 
              {/* 3. Grid Electricity Price Slider */}
              <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
                <SolarSlider
                  id="home-grid-price-uah"
                  theme={theme}
                  label="Тариф за електроенергію з мережі"
                  display={`${gridPriceUah.toString().replace('.', ',')} грн`}
                  min={2.0}
                  max={15.0}
                  step={0.1}
                  value={gridPriceUah}
                  onChange={setGridPriceUah}
                  hint="Вартість 1 кВт·год споживання для розрахунку окупності."
                />
              </div>
            </SolarPanelCard>
          </div>

          {/* RIGHT COLUMN: FINANCIAL DISPLAY METRIC CARDS */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Payback Hero Banner Card */}
            <SolarPanelCard theme={theme} glow className="p-4 sm:p-8 shadow-xl" contentClassName="space-y-3 sm:space-y-5">
              <RegistrationMarks />
              
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
                  <Clock className="w-4 h-4" /> Прогноз окупності інвестицій
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-center pt-1 sm:pt-2">
                <div className={`p-3 sm:p-5 rounded-2xl border text-center ${
                  isDark ? 'bg-amber-500/10 border-amber-400/50' : 'bg-orange-500/10 border-orange-400/30'
                }`}>
                  <p className={`text-[10px] sm:text-xs uppercase font-bold tracking-wider ${isDark ? 'text-amber-300' : 'text-orange-700'}`}>
                    Термін повного повернення
                  </p>
                  <p className="text-3xl sm:text-5xl font-black text-amber-500 mt-1">
                    {paybackYears} <span className="text-base sm:text-lg font-bold">років</span>
                  </p>
                  <p className={`hidden sm:block text-[10px] mt-1 font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Чистий прибуток після {paybackYears} років
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 sm:gap-0 sm:space-y-3">
                  <div className={`p-2.5 sm:p-3 rounded-xl border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase">Загальна річна вигода</p>
                    <p className="text-[13px] sm:text-xl font-extrabold text-emerald-500 mt-0.5">
                      +${totalAnnualBenefitUsd.toLocaleString()} / рік
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-slate-400">
                      ~{Math.round(totalAnnualBenefitUsd * usdToUah).toLocaleString()} грн/рік
                    </p>
                  </div>

                  <div className={`p-2.5 sm:p-3 rounded-xl border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase">Середній дохід на місяць</p>
                    <p className="text-[13px] sm:text-lg font-extrabold text-amber-500 mt-0.5">
                      +${Math.round(totalAnnualBenefitUsd / 12).toLocaleString()} / міс
                    </p>
                  </div>
                </div>
              </div>
            </SolarPanelCard>

            {/* Income Breakdown Cards (Network Sales & Savings) */}
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* 1. Green Tariff Sales */}
              <div className={`p-5 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div className="flex items-center gap-2 text-amber-500 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <h4 className="font-extrabold text-xs sm:text-sm">Продаж у мережу</h4>
                </div>
                <p className="text-2xl font-black text-amber-500">${annualGreenIncomeUsd.toLocaleString()}</p>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  ~{Math.round(annualGreenIncomeUsd * usdToUah).toLocaleString()} грн / рік
                </p>
                <div className={`mt-3 pt-3 border-t text-[10px] sm:text-[11px] ${isDark ? 'border-slate-700/60 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
                  Обсяг експорту: <span className="font-bold text-slate-300">{annualGridExportKwh.toLocaleString()} кВт·год</span>
                </div>
              </div>

              {/* 2. Self Consumption Savings */}
              <div className={`p-5 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div className="flex items-center gap-2 text-emerald-500 mb-2">
                  <PiggyBank className="w-5 h-5" />
                  <h4 className="font-extrabold text-xs sm:text-sm">Економія на рахунках</h4>
                </div>
                <p className="text-2xl font-black text-emerald-500">${annualElectricitySavingsUsd.toLocaleString()}</p>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  ~{Math.round(annualElectricitySavingsUsd * usdToUah).toLocaleString()} грн / рік
                </p>
                <div className={`mt-3 pt-3 border-t text-[10px] sm:text-[11px] ${isDark ? 'border-slate-700/60 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
                  Власне покриття: <span className="font-bold text-slate-300">{annualSelfCoverageKwh.toLocaleString()} кВт·год</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
