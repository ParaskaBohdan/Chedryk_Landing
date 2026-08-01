import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getServiceById } from '../data/servicesData';
import { 
  Sun, BatteryCharging, FileCheck, Home, Zap, 
  ArrowLeft, CheckCircle2, ShieldCheck, Cpu, Layers, FileText,
  ArrowRight, DollarSign, Calculator, Compass
} from 'lucide-react';
import InteractiveSolarSchema from '../components/InteractiveSolarSchema';
import CustomSelect from '../components/CustomSelect';
import SolarPanelCard from '../components/SolarPanelCard';
import SystemFlowDiagram from '../components/SystemFlowDiagram';
import { LiveBadge } from '../components/SolarTech';
import { CountUp, SolarSlider, StepRail } from '../components/SolarControls';
import CalculatorPage from './CalculatorPage';

const iconMap = {
  Sun: Sun,
  BatteryCharging: BatteryCharging,
  FileCheck: FileCheck,
  Home: Home,
  Zap: Zap
};

function SolarSliderCalculator({ isDark, onOpenConsultation, onOpenConfiguration, theme, serviceId }) {
  // States for Simple Calculator (serviceId !== 'roof-installation')
  const [monthlyConsumption, setMonthlyConsumption] = useState(450); // kWh/month
  const [coveragePercent, setCoveragePercent] = useState(100); // %
  const [selectedPanel, setSelectedPanel] = useState({ brand: 'Jinko Solar', watt: 585 });

  const panelOptions = [
    { brand: 'Jinko Solar', watt: 585 },
    { brand: 'JA Solar', watt: 590 },
    { brand: 'Longi Solar', watt: 600 },
    { brand: 'Trina Solar', watt: 615 }
  ];

  // States for Wizard Calculator (serviceId === 'roof-installation')
  const [roofType, setRoofType] = useState('pitched'); // 'pitched' | 'flat'
  const [roofMaterial, setRoofMaterial] = useState(serviceId === 'ses-building' ? 'screw' : 'metal_tile'); // 'metal_tile' | 'tile' | 'corrugated' | 'seam' | 'flat_concrete'
  const [roofAreaSqM, setRoofAreaSqM] = useState(110);
  const [panelBrand, setPanelBrand] = useState('jinko'); // 'jinko' | 'risen' | 'longi'
  const [rowsCount, setRowsCount] = useState(2); // 1 | 2 | 3
  const [hasBattery, setHasBattery] = useState(true);
  const [batteryCapacityKwh, setBatteryCapacityKwh] = useState(10); // 5 | 10 | 15 | 20
  const [step, setStep] = useState(1);

  const panelsData = {
    jinko: { name: 'Jinko Solar', watt: 585, costPerPanel: 125 },
    risen: { name: 'Risen Energy', watt: 550, costPerPanel: 110 },
    longi: { name: 'Longi Solar', watt: 600, costPerPanel: 140 }
  };

  const selectedWizardPanel = panelsData[panelBrand] || panelsData.jinko;
  const selectedPanelWattage = selectedWizardPanel.watt;
  const selectedPanelCost = selectedWizardPanel.costPerPanel;

  // Maximum panels that fit on the specified roof area
  const maxPossiblePanels = Math.max(4, Math.floor(roofAreaSqM / 2.3));

  // Active panel count: now directly matches maxPossiblePanels so the slider isn't capped by rowsCount
  const activePanelCount = maxPossiblePanels;

  const totalKw = ((activePanelCount * selectedPanelWattage) / 1000).toFixed(1);

  // Helper function to calculate estimate cost for a given kw power and number of panels
  const calculateCost = (kw, panels) => {
    const panelsCost = panels * selectedPanelCost;
    const frameCost = panels * 30;
    const invPower = Math.ceil(kw);
    const inverterCost = Math.round(invPower * 180);
    const batteryCost = hasBattery ? Math.round(batteryCapacityKwh * 320) : 0;
    const installationCost = Math.round((panelsCost + frameCost + inverterCost + batteryCost) * 0.15);
    return panelsCost + frameCost + inverterCost + batteryCost + installationCost;
  };

  // Pricing calculations
  const totalEstimateUsd = calculateCost(totalKw, activePanelCount);
  const annualGenKwh = Math.round(totalKw * 1180);
  const inverterPowerKw = Math.ceil(totalKw);

  // Shared Calculations based on consumption sliders
  const effectiveConsumption = (monthlyConsumption * (coveragePercent / 100));
  const recommendedKw = Math.max(3, Math.ceil((effectiveConsumption / 115) * 10) / 10);
  const annualGen = Math.round(recommendedKw * 1180);
  const recommendedPanelCount = Math.ceil((recommendedKw * 1000) / ((serviceId === 'roof-installation' || serviceId === 'ses-building') ? selectedPanelWattage : selectedPanel.watt));
  const roofArea = Math.round(recommendedPanelCount * 2.3);
  const panelCount = recommendedPanelCount;

  // Slider Fill Percentages

  const mountType = serviceId === 'ses-building' ? 'ground' : 'roof';

  const getConfigSummaryText = () => {
    if (mountType === 'ground') {
      return `1) Наземна СЕС: ${roofType === 'pitched' ? 'На схилі' : 'На рівній ділянці'}, ${roofAreaSqM} м²\n2) Панелі: ${activePanelCount} шт. ${panelBrand.toUpperCase()} (${totalKw} кВт) у ${rowsCount} ряди\n3) Інвертор Deye ${inverterPowerKw} кВт ${hasBattery ? `+ АКБ ${batteryCapacityKwh} кВт·год` : ''}\n4) Кошторис: ~$${totalEstimateUsd.toLocaleString()}`;
    }
    return `1) Специфікація Даху: ${roofType === 'pitched' ? 'Скатий' : 'Плоский'}, ${roofAreaSqM} м²\n2) Панелі: ${activePanelCount} шт. ${panelBrand.toUpperCase()} (${totalKw} кВт) у ${rowsCount} ряди\n3) Інвертор Deye ${inverterPowerKw} кВт ${hasBattery ? `+ АКБ ${batteryCapacityKwh} кВт·год` : ''}\n4) Кошторис: ~$${totalEstimateUsd.toLocaleString()}`;
  };

  // -------------------------------------------------------------
  // RENDER PATH 1: Full Step-by-Step Wizard for roof-installation
  // -------------------------------------------------------------
  if (serviceId === 'roof-installation' || serviceId === 'ses-building') {
    return (
      <div className="space-y-6">
        {/* Wizard Step Rail */}
        <div className="max-w-3xl mx-auto mb-8">
          <StepRail
            theme={theme}
            active={step - 1}
            onSelect={(i) => setStep(i + 1)}
            steps={[
              {
                id: 'site',
                label: mountType === 'ground' ? 'Параметри ділянки' : 'Параметри даху',
                icon: mountType === 'ground' ? Compass : Home
              },
              { id: 'panels', label: 'Наповнення панелями', icon: Layers },
              { id: 'inverter', label: 'Інвертор & АКБ', icon: Cpu }
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          {/* Left Column: Form Steps */}
          <div className="lg:col-span-6 flex flex-col h-full">
            
            {/* STEP 1 */}
            {step === 1 && (
              <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 h-full flex flex-col justify-between ${
                isDark ? 'border-slate-700 bg-slate-800/80 text-white' : 'border-slate-200 bg-white shadow-md'
              }`}>
                <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 text-amber-500">
                  <Home className="w-5 h-5" /> {mountType === 'ground' ? 'Крок 1: Оберіть тип конструкції, грунт та споживання' : 'Крок 1: Оберіть тип, покриття та споживання'}
                </h3>

                {/* Roof Shape / Ground Slope */}
                {mountType === 'ground' ? (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Тип ділянки та нахил:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setRoofType('pitched');
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          roofType === 'pitched'
                            ? 'btn-orange-bright shadow-md'
                            : isDark ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        <p className="font-bold text-sm">Південний схил (~15°)</p>
                        <p className="text-[11px] opacity-75 mt-1">Природний кут нахилу конструкції</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setRoofType('flat');
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          roofType === 'flat'
                            ? 'btn-orange-bright shadow-md'
                            : isDark ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        <p className="font-bold text-sm">Рівна ділянка (0°–5°)</p>
                        <p className="text-[11px] opacity-75 mt-1">Вимагає посилених опор стійки</p>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Форма та нахил даху:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setRoofType('pitched');
                          setRoofMaterial('metal_tile');
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          roofType === 'pitched'
                            ? 'btn-orange-bright shadow-md'
                            : isDark ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        <p className="font-bold text-sm">Скатий / Нахилений (~30°)</p>
                        <p className="text-[11px] opacity-75 mt-1">Класичний дах будинку</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setRoofType('flat');
                          setRoofMaterial('flat_concrete');
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          roofType === 'flat'
                            ? 'btn-orange-bright shadow-md'
                            : isDark ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        <p className="font-bold text-sm">Плоский дах (0°–5°)</p>
                        <p className="text-[11px] opacity-75 mt-1">Потребує баластних ферм 15°</p>
                      </button>
                    </div>
                  </div>
                )}

                {/* Roof Material / Ground Foundation */}
                {mountType === 'ground' ? (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Тип грунту (Визначає спосіб монтажу):
                    </label>
                    <CustomSelect
                      value={roofMaterial}
                      onChange={(val) => setRoofMaterial(val)}
                      options={[
                        { value: 'screw', label: 'Геошурупи (Сталеві гвинтові палі)' },
                        { value: 'concrete', label: 'Бетоновані палі (Для кам\'янистих грунтів)' },
                        { value: 'hammered', label: 'Забивні палі (Гаряче цинкування)' }
                      ]}
                      icon={Layers}
                      theme={theme}
                    />
                  </div>
                ) : (
                  roofType === 'pitched' && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Матеріал покриття (Визначає тип кріплення):
                      </label>
                      <CustomSelect
                        value={roofMaterial}
                        onChange={(val) => setRoofMaterial(val)}
                        options={[
                          { value: 'metal_tile', label: 'Металочерепиця (Кронштейни-гачки)' },
                          { value: 'tile', label: 'Натуральна керамічна черепиця (Шпильки M10)' },
                          { value: 'corrugated', label: 'Профнастил (Міні-рейки з ЕПДМ)' },
                          { value: 'seam', label: 'Фальцева покрівля (Безпрокольні затискачі)' }
                        ]}
                        icon={Layers}
                        theme={theme}
                      />
                    </div>
                  )
                )}

                {/* Sliders Block — busbar tracks */}
                <div className={`space-y-5 pt-4 border-t ${isDark ? 'border-slate-700/40' : 'border-slate-200'}`}>
                  <SolarSlider
                    id="sd-consumption"
                    theme={theme}
                    label="Місячне споживання"
                    display={`${monthlyConsumption} кВт·год/міс`}
                    min={100}
                    max={2500}
                    step={25}
                    value={monthlyConsumption}
                    onChange={setMonthlyConsumption}
                  />

                  <SolarSlider
                    id="sd-area"
                    theme={theme}
                    label={mountType === 'ground' ? 'Корисна площа ділянки' : 'Корисна площа даху'}
                    display={`${roofAreaSqM} м²`}
                    min={30}
                    max={300}
                    step={10}
                    value={roofAreaSqM}
                    onChange={setRoofAreaSqM}
                    hint={`Максимально вміщує близько ${maxPossiblePanels} шт. сонячних панелей.`}
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-orange-bright px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Перейти до вибору панелей</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 h-full flex flex-col justify-between ${
                isDark ? 'border-slate-700 bg-slate-800/80 text-white' : 'border-slate-200 bg-white shadow-md'
              }`}>
                <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 text-amber-500">
                  <Layers className="w-5 h-5" /> Крок 2: Наповнення панелями & Кількість рядів
                </h3>

                {/* Panel Brand */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Бренд сонячних фотомодулів (Tier-1):
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'jinko', name: 'Jinko Solar', watt: '585W', desc: 'N-Type ККД 22.6%' },
                      { id: 'risen', name: 'Risen Energy', watt: '550W', desc: 'Titanium Перформанс' },
                      { id: 'longi', name: 'Longi Solar', watt: '600W', desc: 'Hi-MO X6 Топ ККД' }
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setPanelBrand(b.id)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          panelBrand === b.id
                            ? 'btn-orange-bright shadow-md'
                            : isDark ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        <p className="font-bold text-xs sm:text-sm">{b.name}</p>
                        <p className="text-xs text-amber-500 font-extrabold mt-0.5">{b.watt}</p>
                        <p className="text-[10px] opacity-75 mt-1">{b.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rows Layout */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Варіанти розміщення на даху (Кількість рядів):
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { r: 1, title: '1 Ряд', desc: '~12 панелей' },
                      { r: 2, title: '2 Ряди', desc: '~24 панелі' },
                      { r: 3, title: '3-4 Ряди', desc: '~36-48 панелей' }
                    ].map((rowOpt) => (
                      <button
                        key={rowOpt.r}
                        type="button"
                        onClick={() => setRowsCount(rowOpt.r)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          rowsCount === rowOpt.r
                            ? 'btn-orange-bright shadow-md'
                            : isDark ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        <p className="font-bold text-sm">{rowOpt.title}</p>
                        <p className="text-[11px] opacity-75 mt-0.5">{rowOpt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Назад
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="btn-orange-bright px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Перейти до інвертора та АКБ</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 h-full flex flex-col justify-between ${
                isDark ? 'border-slate-700 bg-slate-800/80 text-white' : 'border-slate-200 bg-white shadow-md'
              }`}>
                <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 text-amber-500">
                  <Cpu className="w-5 h-5" /> Крок 3: Гібридний інвертор Deye & Акумулятори
                </h3>

                {/* Battery Toggle */}
                <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                  isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
                }`}>
                  <div>
                    <h4 className="font-bold text-sm">Додати акумуляторний блок резервного живлення?</h4>
                    <p className="text-xs opacity-75">Автоматичний ввід резерву (АВР 4 мс) при відключеннях світла.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHasBattery(!hasBattery)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      hasBattery ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {hasBattery ? 'Так, з АКБ' : 'Ні, лише СЕС'}
                  </button>
                </div>

                {/* Battery Capacity */}
                {hasBattery && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Ємність накопичувачів LiFePO4 Deye / EcoFlow:
                    </label>
                    <div className="grid grid-cols-4 gap-2.5">
                      {[5, 10, 15, 20].map((cap) => (
                        <button
                          key={cap}
                          type="button"
                          onClick={() => setBatteryCapacityKwh(cap)}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            batteryCapacityKwh === cap
                              ? 'btn-orange-bright shadow-md'
                              : isDark ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                          }`}
                        >
                          <p className="font-bold text-sm">{cap} кВт·год</p>
                          <p className="text-[10px] opacity-75">{cap * 2} год резерву</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Назад
                  </button>
                  <button
                    onClick={() => {
                      if (onOpenConfiguration) {
                        onOpenConfiguration(getConfigSummaryText());
                      } else if (onOpenConsultation) {
                        onOpenConsultation(getConfigSummaryText());
                      }
                    }}
                    className="btn-orange-bright px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 glow-amber cursor-pointer"
                  >
                    <span>Надіслати конфігурацію майстру</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Visualizer */}
          <div className="lg:col-span-6 flex flex-col h-full">
            <InteractiveSolarSchema
              roofType={roofType}
              roofMaterial={roofMaterial}
              rowsCount={rowsCount}
              panelBrand={panelBrand}
              panelCount={activePanelCount}
              totalKw={totalKw}
              inverterPowerKw={inverterPowerKw}
              hasBattery={hasBattery}
              batteryCapacityKwh={batteryCapacityKwh}
              theme={theme}
              mountType={mountType}
              hideExtraViews={serviceId === 'roof-installation' || serviceId === 'ses-building'}
            />
          </div>
        </div>

        {/* RESULTS SUMMARY CARD */}
        <SolarPanelCard theme={theme} glow className="p-6 sm:p-7 shadow-xl" contentClassName="space-y-5">
          <div className={`flex flex-wrap justify-between items-center gap-3 border-b pb-3 ${
            isDark ? 'border-slate-700/60' : 'border-slate-200'
          }`}>
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
              <Zap className="w-4 h-4" /> Калькуляція по об'єкту
            </span>
            <LiveBadge theme={theme} label={`${totalKw} кВт · Live`} tone="amber" />
          </div>

          {/* Headline figures — ease to their new values as sliders move */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className={`text-[10px] font-bold telemetry-label ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Встановлена потужність
              </p>
              <p className="text-2xl sm:text-3xl font-black text-amber-500 tabular-nums">
                <CountUp value={totalKw} decimals={1} /> <span className="text-base">кВт</span>
              </p>
            </div>
            <div>
              <p className={`text-[10px] font-bold telemetry-label ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Орієнтовний кошторис
              </p>
              <p className="text-2xl sm:text-3xl font-black text-solar-gradient tabular-nums">
                ~$<CountUp value={totalEstimateUsd} />
              </p>
            </div>
          </div>

          {/* Single-line diagram of exactly what is configured */}
          <div className={`pt-1 pb-1`}>
            <SystemFlowDiagram
              theme={theme}
              panelCount={activePanelCount}
              totalKw={totalKw}
              inverterPowerKw={inverterPowerKw}
              hasBattery={hasBattery}
              batteryCapacityKwh={batteryCapacityKwh}
            />
          </div>

          {/* Desktop Comparative Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700/40 text-amber-500 uppercase tracking-wider font-extrabold text-[10px]">
                  <th className="py-2.5">Параметр системи</th>
                  <th className="py-2.5">Рекомендовано за споживанням</th>
                  <th className="py-2.5">{mountType === 'ground' ? 'Розрахунок за площею ділянки' : 'Розрахунок за площею даху'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/10 font-medium">
                <tr className="hover:bg-slate-50/5 transition-colors">
                  <td className="py-2.5 font-bold opacity-75">Потужність СЕС:</td>
                  <td className="py-2.5 font-extrabold text-sm text-amber-300">{recommendedKw} кВт</td>
                  <td className="py-2.5 font-extrabold text-sm text-amber-300">{totalKw} кВт</td>
                </tr>
                <tr className="hover:bg-slate-50/5 transition-colors">
                  <td className="py-2.5 font-bold opacity-75">Кількість панелей ({selectedPanelWattage}W):</td>
                  <td className="py-2.5 text-sm">{recommendedPanelCount} шт.</td>
                  <td className="py-2.5 text-sm">{activePanelCount} шт.</td>
                </tr>
                <tr className="hover:bg-slate-50/5 transition-colors">
                  <td className="py-2.5 font-bold opacity-75">{mountType === 'ground' ? 'Площа ділянки:' : 'Площа даху:'}</td>
                  <td className="py-2.5 text-sm">{Math.round(recommendedPanelCount * 2.3)} м²</td>
                  <td className="py-2.5 text-sm">{Math.round(activePanelCount * 2.3)} м²</td>
                </tr>
                <tr className="hover:bg-slate-50/5 transition-colors">
                  <td className="py-2.5 font-bold opacity-75">Річна генерація:</td>
                  <td className="py-2.5 text-sm text-emerald-400">~{annualGen.toLocaleString()} кВт·год</td>
                  <td className="py-2.5 text-sm text-emerald-400">~{annualGenKwh.toLocaleString()} кВт·год</td>
                </tr>
                <tr className="hover:bg-slate-50/5 transition-colors">
                  <td className="py-2.5 font-bold opacity-75">Орієнтовна вартість під ключ:</td>
                  <td className="py-2.5 font-extrabold text-sm text-amber-400">~${calculateCost(recommendedKw, recommendedPanelCount).toLocaleString()}</td>
                  <td className="py-2.5 font-extrabold text-sm text-amber-400">~${totalEstimateUsd.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Layout with inline parameters */}
          <div className="md:hidden space-y-6 text-xs border-b border-slate-700/20 pb-4">
            {/* Left: Recommended */}
            <div className="space-y-2 border-b border-slate-700/20 pb-4">
              <h4 className="font-extrabold text-amber-500 uppercase text-[10px] tracking-wider mb-2">Рекомендовано за споживанням:</h4>
              <div className="flex justify-between items-center">
                <span className="opacity-70">Необхідна потужність:</span>
                <span className="font-extrabold text-amber-300">{recommendedKw} кВт</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-70">Кількість панелей ({selectedPanelWattage}W):</span>
                <span className="font-extrabold">{recommendedPanelCount} шт.</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-70">{mountType === 'ground' ? 'Площа ділянки:' : 'Площа даху:'}</span>
                <span className="font-extrabold">{Math.round(recommendedPanelCount * 2.3)} м²</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-70">Річна генерація:</span>
                <span className="font-extrabold text-emerald-400">~{annualGen.toLocaleString()} кВт·год</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-700/10">
                <span className="opacity-70">Орієнтовна вартість:</span>
                <span className="font-extrabold text-amber-400">~${calculateCost(recommendedKw, recommendedPanelCount).toLocaleString()}</span>
              </div>
            </div>

            {/* Right: Calculated by Area */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-amber-500 uppercase text-[10px] tracking-wider mb-2">
                {mountType === 'ground' ? 'Розрахунок за площею ділянки:' : 'Розрахунок за площею даху:'}
              </h4>
              <div className="flex justify-between items-center">
                <span className="opacity-70">Потужність СЕС:</span>
                <span className="font-extrabold text-amber-300">{totalKw} кВт</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-70">Кількість панелей ({selectedPanelWattage}W):</span>
                <span className="font-extrabold">{activePanelCount} шт.</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-70">{mountType === 'ground' ? 'Площа ділянки:' : 'Площа даху:'}</span>
                <span className="font-extrabold">{Math.round(activePanelCount * 2.3)} м²</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-70">Річна генерація:</span>
                <span className="font-extrabold text-emerald-400">~{annualGenKwh.toLocaleString()} кВт·год</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-700/10">
                <span className="opacity-70">Орієнтовна вартість:</span>
                <span className="font-extrabold text-amber-400">~${totalEstimateUsd.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Selected Equipment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs leading-relaxed border-t border-slate-700/10">
            <div>
              <span className="opacity-70 block">Інвертор Deye:</span>
              <span className="font-extrabold text-sm text-sky-400">
                {inverterPowerKw} кВт (3-фази)
              </span>
            </div>
            <div>
              <span className="opacity-70 block">АКБ накопичувач:</span>
              <span className="font-extrabold text-sm text-purple-400">
                {hasBattery ? `${batteryCapacityKwh} кВт·год` : 'Без АКБ'}
              </span>
            </div>
          </div>
        </SolarPanelCard>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER PATH 2: Simple Slider-based Calculator (other services)
  // -------------------------------------------------------------
  return (
    <SolarPanelCard theme={theme} glow className="p-6 sm:p-8 shadow-2xl" contentClassName="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-extrabold text-lg sm:text-xl text-amber-500">
          Інтерактивний Калькулятор Потужності СЕС
        </h3>
        <LiveBadge theme={theme} label="Онлайн розрахунок" tone="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <SolarSlider
            id="p2-consumption"
            theme={theme}
            label="Місячне споживання"
            display={`${monthlyConsumption} кВт·год/міс`}
            min={100}
            max={2500}
            step={25}
            value={monthlyConsumption}
            onChange={setMonthlyConsumption}
          />

          <div className="pt-2 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-500">
              Оберіть модель фотомодулів:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {panelOptions.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedPanel(p)}
                  className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                    selectedPanel.brand === p.brand && selectedPanel.watt === p.watt
                      ? 'border-amber-500 bg-amber-500/20 text-amber-500 font-extrabold shadow-sm'
                      : isDark ? 'border-slate-800 bg-slate-900 text-slate-300' : 'border-slate-300 bg-slate-100 text-slate-700'
                  }`}
                >
                  <p className="text-[11px] font-bold truncate">{p.brand}</p>
                  <p className="text-xs font-black text-amber-500 mt-0.5">{p.watt} W</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl border grid grid-cols-2 gap-4 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="space-y-1">
            <span className="text-[11px] opacity-70 block font-medium">Необхідна потужність СЕС</span>
            <span className="text-xl sm:text-2xl font-black text-amber-500">{recommendedKw} кВт</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] opacity-70 block font-medium">Кількість панелей</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400">{panelCount} шт.</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] opacity-70 block font-medium">Річна генерація</span>
            <span className="text-lg sm:text-xl font-bold text-emerald-400">~{annualGen.toLocaleString()} кВт·год</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] opacity-70 block font-medium">Площа даху</span>
            <span className="text-lg sm:text-xl font-bold">{roofArea} м²</span>
          </div>
        </div>
      </div>
    </SolarPanelCard>
  );
}



export default function ServiceDetailPage({ theme, onOpenConsultation, onOpenConfiguration }) {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const service = getServiceById(serviceId);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (service) {
      document.title = `${service.title} — Nova Energy`;
    }
  }, [serviceId, service]);

  if (!service) {
    return (
      <div className={`py-20 min-h-screen text-center ${isDark ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'}`}>
        <div className="max-w-md mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-bold">Послугу не знайдено</h2>
          <p className="text-sm opacity-80">Запитана послуга відсутня або була змінена.</p>
          <Link to="/services" className="inline-block btn-orange-bright font-bold py-2.5 px-6 rounded-xl">
            Повернутися до Послуг
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[service.iconName] || Sun;

  return (
    <div className={`py-10 sm:py-16 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-slate-100/70 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link & Breadcrumb Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/services')}
            className={`flex items-center gap-2 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
              isDark ? 'border-slate-800 bg-slate-950 text-slate-300 hover:text-amber-400' : 'border-slate-300 bg-white text-slate-700 hover:text-amber-600'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Назад до Послуг</span>
          </button>

          <span className="text-xs opacity-50">/</span>
          <span className="text-xs font-bold text-amber-500 line-clamp-1">{service.title}</span>
        </div>

        {/* Hero Section Banner */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-3xl border ${
          isDark ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-xl'
        }`}>
          
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-md">
                {service.badge}
              </span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${
                isDark ? 'border-slate-800 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-700'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Закарпаття & Франківщина</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {service.fullDescription}
            </p>

            {/* Quick Advantages Badge list */}
            <div className="pt-2 flex flex-wrap gap-3">
              {service.advantages.map((adv, idx) => (
                <div key={idx} className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border ${
                  isDark ? 'border-slate-800 bg-slate-900 text-amber-300' : 'border-amber-200 bg-amber-50 text-amber-900'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>{adv}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => onOpenConsultation(service.title)}
                className="btn-orange-bright font-bold py-3.5 px-8 rounded-xl shadow-lg text-sm transition-transform active:scale-95 cursor-pointer"
              >
                Замовити Безкоштовний Розрахунок
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/40">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/60 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">NOVA ENERGY_UA</p>
                <p className="text-[11px] text-amber-400 font-semibold">Гарантія якості та сервісу</p>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 1: Work Steps (Етапи робіт) */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Етапи Виконання Робіт Під Ключ</h2>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Покроковий інженерний алгоритм від першого виїзду до пусконалагодження</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {service.workSteps.map((step, idx) => (
              <div key={step.step} className="relative">
                {/* Step Card */}
                <div
                  className={`p-5.5 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between h-full ${
                    isDark ? 'bg-slate-800/80 border-slate-700/80 hover:border-amber-400/60' : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  <div>
                    {/* Parallel Circle + Title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                        {step.step < 10 ? `0${step.step}` : step.step}
                      </div>
                      <h3 className="font-bold text-base leading-tight">{step.title}</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Line to the next step */}
                {idx < service.workSteps.length - 1 && (
                  <>
                    {/* Mobile view: Downward arrow */}
                    <div className="absolute -bottom-11 left-1/2 -translate-x-1/2 z-20 md:hidden flex flex-col items-center pointer-events-none">
                      <div className="w-0.5 h-9 bg-gradient-to-b from-amber-400 via-orange-400 to-amber-500" />
                      <div className="w-2 h-2 border-r-2 border-b-2 border-amber-500 rotate-45 -mt-1" />
                    </div>

                    {/* Tablet view (2 columns) */}
                    {/* Point right for odd steps */}
                    {(idx + 1) % 2 !== 0 && (
                      <div className="hidden md:flex lg:hidden absolute top-1/2 -translate-y-1/2 -right-6 w-6 h-0.5 items-center justify-end pointer-events-none z-20">
                        <div className="w-full h-0.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />
                        <div className="w-2 h-2 border-r-2 border-t-2 border-amber-500 rotate-45 -ml-1 flex-shrink-0" />
                      </div>
                    )}
                    {/* Loop back to next row for even steps */}
                    {(idx + 1) % 2 === 0 && (
                      <div className="hidden md:block lg:hidden absolute top-full right-1/2 pointer-events-none z-20" style={{ width: 'calc(100% + 1.5rem)', height: '1.5rem' }}>
                        <div className="w-full h-full border-r-2 border-b-2 border-orange-400 rounded-br-xl" />
                        <div className="absolute top-full left-0 w-0.5 h-[1.5rem] bg-gradient-to-b from-orange-400 to-amber-500">
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-r-2 border-b-2 border-amber-500 rotate-45 translate-y-[2px]" />
                        </div>
                      </div>
                    )}

                    {/* Desktop view (3 columns) */}
                    {/* Point right for col 1 & col 2 */}
                    {(idx + 1) % 3 !== 0 && (
                      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-6 w-6 h-0.5 items-center justify-end pointer-events-none z-20">
                        <div className="w-full h-0.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />
                        <div className="w-2 h-2 border-r-2 border-t-2 border-amber-500 rotate-45 -ml-1 flex-shrink-0" />
                      </div>
                    )}
                    {/* Loop back to next row for col 3 */}
                    {(idx + 1) % 3 === 0 && (
                      <div className="hidden lg:block absolute top-full right-1/2 pointer-events-none z-20" style={{ width: 'calc(200% + 3rem)', height: '1.5rem' }}>
                        <div className="w-full h-full border-r-2 border-b-2 border-orange-400 rounded-br-xl" />
                        <div className="absolute top-full left-0 w-0.5 h-[1.5rem] bg-gradient-to-b from-orange-400 to-amber-500">
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-r-2 border-b-2 border-amber-500 rotate-45 translate-y-[2px]" />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Power Calculations with Interactive Sliders (Інженерний розрахунок потужності) */}
        {service.powerCalculations && (
          <div className="space-y-6 pt-6 border-t border-slate-700/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">{service.powerCalculations.title}</h2>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{service.powerCalculations.intro}</p>
              </div>
            </div>

            {/* Interactive Solar Slider Widget / Calculator */}
            {service.id === 'roof-installation' || service.id === 'ses-building' ? (
              <CalculatorPage
                theme={theme}
                onOpenConsultation={onOpenConsultation}
                onOpenConfiguration={onOpenConfiguration}
                isEmbed={true}
                isGroundOnly={service.id === 'ses-building'}
                isRoofOnly={service.id === 'roof-installation'}
              />
            ) : (
              <SolarSliderCalculator 
                isDark={isDark} 
                onOpenConsultation={onOpenConsultation} 
                onOpenConfiguration={onOpenConfiguration} 
                theme={theme} 
                serviceId={service.id} 
              />
            )}

            {/* Technical points below slider */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {service.powerCalculations.points.map((pt, idx) => (
                <div
                  key={idx}
                  className={`p-4.5 rounded-2xl border space-y-1.5 transition-all duration-300 ${
                    isDark ? 'bg-slate-800/80 border-slate-700/80 hover:border-amber-400/60' : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  <h3 className="font-bold text-sm text-amber-500 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>{pt.name}</span>
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: Battery Setup Details with Interactive Sliders (Акумуляторна частина) */}
        {service.batterySetupDetails && (
          <div className="space-y-6 pt-6 border-t border-slate-700/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">{service.batterySetupDetails.title}</h2>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{service.batterySetupDetails.intro}</p>
              </div>
            </div>



            {/* Technical points below slider */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {service.batterySetupDetails.points.map((pt, idx) => (
                <div
                  key={idx}
                  className={`p-4.5 rounded-2xl border space-y-1.5 transition-all duration-300 ${
                    isDark ? 'bg-slate-800/80 border-slate-700/80 hover:border-amber-400/60' : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  <h3 className="font-bold text-sm text-emerald-500 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>{pt.name}</span>
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Equipment Selection (Підбір найкращого обладнання) */}
        <div className="space-y-6 pt-6 border-t border-slate-700/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Підбір Сертифікованого Обладнання</h2>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Сертифіковані елементи з офіційною гарантією від виробника</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.equipmentSelection.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border space-y-3 transition-all duration-300 ${
                  isDark ? 'bg-slate-800/80 border-slate-700/80 hover:border-amber-400/60' : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 inline-block">
                  {item.highlight}
                </span>
                <h3 className="font-bold text-base">{item.name}</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: Documentation & Permits (Робота з документами) */}
        <div className="space-y-6 pt-6 border-t border-slate-700/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-500">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Робота з Документами та Дозволами</h2>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Повний юридичний супровід та взаємодія з РЕМ / Обленерго</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.documentationProcess.map((doc, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border space-y-2 transition-all duration-300 ${
                  isDark ? 'bg-slate-800/80 border-slate-700/80 hover:border-amber-400/60' : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <h3 className="font-bold text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>{doc.title}</span>
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {doc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: Order CTA Banner */}
        <div className={`p-8 sm:p-10 rounded-3xl border text-center space-y-4 shadow-xl ${
          isDark ? 'border-slate-700 bg-slate-800/80 text-white' : 'border-slate-300 bg-white'
        }`}>
          <h3 className="text-xl sm:text-2xl font-extrabold">Цікавить послуга "{service.title}"?</h3>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Отримайте безкоштовний розрахунок та виїзд інженера на об'єкт.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenConsultation && onOpenConsultation(service.title)}
              className="btn-orange-bright px-8 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Замовити Консультацію</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
