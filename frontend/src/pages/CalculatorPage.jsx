import React, { useState, useEffect } from 'react';
import { Calculator, Sun, Zap, ArrowRight, Home, Layers, Cpu, TrendingUp, BatteryCharging } from 'lucide-react';
import InteractiveSolarSchema from '../components/InteractiveSolarSchema';
import CustomSelect from '../components/CustomSelect';
import ConfigurationForm from '../components/ConfigurationForm';
import SolarPanelCard from '../components/SolarPanelCard';
import SystemFlowDiagram from '../components/SystemFlowDiagram';
import { LiveBadge, TelemetryChip } from '../components/SolarTech';
import { CountUp, SolarSlider, StepRail } from '../components/SolarControls';

export default function CalculatorPage({ theme, onOpenConsultation, onOpenConfiguration }) {
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Configurator State - "Установка панелей на дах"
  const [step, setStep] = useState(1);

  // Step 1: Roof Parameters
  const [roofType, setRoofType] = useState('pitched'); // 'pitched' | 'flat'
  const [roofMaterial, setRoofMaterial] = useState('metal_tile'); // 'metal_tile' | 'tile' | 'corrugated' | 'seam' | 'flat_concrete'
  const [roofAreaSqM, setRoofAreaSqM] = useState(80); // m2

  // Step 2: Panels & Layout
  const [panelBrand, setPanelBrand] = useState('jinko'); // 'risen' | 'jinko' | 'longi'
  const [rowsCount, setRowsCount] = useState(2); // 1 | 2 | 3 | 4

  // Step 3: Inverter & Battery
  const [hasBattery, setHasBattery] = useState(true);
  const [batteryCapacityKwh, setBatteryCapacityKwh] = useState(10); // 5 | 10 | 15 | 20

  // Calculations
  const panelWattages = { risen: 550, jinko: 585, longi: 600 };
  const panelPrices = { risen: 135, jinko: 155, longi: 165 };

  // Calculate max panels based on roof area
  const maxPossiblePanels = Math.floor(roofAreaSqM / 2.2);
  const selectedPanelWattage = panelWattages[panelBrand];
  
  // Panels based on rows Selection
  const activePanelCount = Math.min(
    maxPossiblePanels,
    rowsCount === 1 ? 12 : rowsCount === 2 ? 24 : rowsCount === 3 ? 36 : 48
  );

  const totalKw = parseFloat(((activePanelCount * selectedPanelWattage) / 1000).toFixed(1));
  const inverterPowerKw = totalKw <= 8 ? 8 : totalKw <= 15 ? 15 : totalKw <= 30 ? 30 : 50;

  // Cost estimates
  const panelsCost = activePanelCount * panelPrices[panelBrand];
  const frameCost = Math.round(activePanelCount * (roofType === 'flat' ? 45 : 30));
  const inverterCost = Math.round(inverterPowerKw * 180);
  const batteryCost = hasBattery ? Math.round(batteryCapacityKwh * 320) : 0;
  const installationCost = Math.round((panelsCost + frameCost + inverterCost + batteryCost) * 0.15);

  const totalEstimateUsd = panelsCost + frameCost + inverterCost + batteryCost + installationCost;
  const annualGenKwh = Math.round(totalKw * 1180);

  const getConfigSummaryText = () => {
    return `1) Специфікація Даху: ${roofType === 'pitched' ? 'Скатий' : 'Плоский'}, ${roofAreaSqM} м²\n2) Панелі: ${activePanelCount} шт. ${panelBrand.toUpperCase()} (${totalKw} кВт) у ${rowsCount} ряди\n3) Інвертор Deye ${inverterPowerKw} кВт ${hasBattery ? `+ АКБ ${batteryCapacityKwh} кВт·год` : ''}\n4) Кошторис: ~$${totalEstimateUsd.toLocaleString()}`;
  };

  return (
    <div className={`py-12 sm:py-20 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-slate-100/70 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full border ${
            isDark ? 'border-amber-400/40 bg-amber-500/15 text-amber-300' : 'border-amber-300 bg-amber-100 text-amber-800'
          }`}>
            <Calculator className="w-4 h-4 text-amber-500" />
            <span>Інтерактивний Конфігуратор Панелей на Дах</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            Конструктор & Схема <span className="text-amber-500">Сонячної Станції</span>
          </h1>
          <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Вкажіть параметри даху — наша система підбере тип каркасу, варіанти наповнення панелей та побудує візуалізацію об'єкта в режимі реального часу.
          </p>
        </div>

        {/* Wizard Step Rail */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
          <StepRail
            theme={theme}
            active={step - 1}
            onSelect={(i) => setStep(i + 1)}
            steps={[
              { id: 'roof', label: 'Параметри даху', icon: Home },
              { id: 'panels', label: 'Наповнення панелями', icon: Layers },
              { id: 'inverter', label: 'Інвертор & АКБ', icon: Cpu }
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* LEFT COLUMN: STEPS 1-3 & COST CALCULATION SUMMARY */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* STEP 1: ROOF PARAMETERS */}
            {step === 1 && (
              <SolarPanelCard theme={theme} className="p-6 sm:p-8" contentClassName="space-y-6">
                <h3 className="text-lg font-bold flex items-center gap-2 text-amber-500">
                  <Home className="w-5 h-5" /> Крок 1: Оберіть тип та покриття даху
                </h3>

                {/* Roof Shape */}
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
                      className={`p-4 rounded-2xl border text-left transition-all ${
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
                      className={`p-4 rounded-2xl border text-left transition-all ${
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

                {/* Roof Material */}
                {roofType === 'pitched' && (
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
                )}

                {/* Area Slider */}
                <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
                  <SolarSlider
                    id="roof-area"
                    theme={theme}
                    label="Корисна площа даху"
                    display={`${roofAreaSqM} м²`}
                    min={30}
                    max={300}
                    step={10}
                    value={roofAreaSqM}
                    onChange={setRoofAreaSqM}
                    hint={`Максимально вміщує близько ${maxPossiblePanels} шт. сонячних панелей.`}
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-orange-bright px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2"
                  >
                    <span>Перейти до вибору панелей</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </SolarPanelCard>
            )}

            {/* STEP 2: PANELS & ROWS CONFIGURATION */}
            {step === 2 && (
              <SolarPanelCard theme={theme} className="p-6 sm:p-8" contentClassName="space-y-6">
                <h3 className="text-lg font-bold flex items-center gap-2 text-amber-500">
                  <Layers className="w-5 h-5" /> Крок 2: Наповнення панелями & Кількість рядів
                </h3>

                {/* Panel Brand Selection */}
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
                        className={`p-3 sm:p-4 rounded-2xl border text-left transition-all ${
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

                {/* Rows Layout Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Варіанти розміщення на даху (Кількість рядів):
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { r: 1, title: '1 Ряд', desc: '~12 панелей (Компактно)' },
                      { r: 2, title: '2 Ряди', desc: '~24 панелі (Стандарт)' },
                      { r: 3, title: '3-4 Ряди', desc: '~36-48 панелей (Повне заповнення)' }
                    ].map((rowOpt) => (
                      <button
                        key={rowOpt.r}
                        type="button"
                        onClick={() => setRowsCount(rowOpt.r)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
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

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold"
                  >
                    Назад
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="btn-orange-bright px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2"
                  >
                    <span>Перейти до інвертора та АКБ</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </SolarPanelCard>
            )}

            {/* STEP 3: INVERTER & BATTERY */}
            {step === 3 && (
              <SolarPanelCard theme={theme} className="p-6 sm:p-8" contentClassName="space-y-6">
                <h3 className="text-lg font-bold flex items-center gap-2 text-amber-500">
                  <Cpu className="w-5 h-5" /> Крок 3: Гібридний інвертор Deye & Акумулятори
                </h3>

                {/* Battery Toggle */}
                <div className="p-4 rounded-2xl border border-slate-700 bg-slate-900/60 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm">Додати акумуляторний блок резервного живлення?</h4>
                    <p className="text-xs opacity-75">Автоматичний ввід резерву (АВР 4 мс) при відключеннях світла.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHasBattery(!hasBattery)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      hasBattery ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {hasBattery ? 'Так, з АКБ' : 'Ні, лише СЕС'}
                  </button>
                </div>

                {/* Battery Capacity Selection */}
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
                          className={`p-3 rounded-xl border text-center transition-all ${
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

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold"
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
                    className="btn-orange-bright px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 glow-amber cursor-pointer"
                  >
                    <span>Надіслати конфігурацію майстру</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </SolarPanelCard>
            )}

            {/* LIVE CALCULATION BOARD — readouts ease to their new values as
                the configuration changes, rather than snapping */}
            <SolarPanelCard theme={theme} glow className="p-6 sm:p-7 shadow-xl" contentClassName="space-y-5">
              <div className={`flex flex-wrap justify-between items-center gap-3 border-b pb-3 ${
                isDark ? 'border-slate-700/60' : 'border-slate-200'
              }`}>
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
                  <Zap className="w-4 h-4" /> Калькуляція по об'єкту
                </span>
                <LiveBadge theme={theme} label={`${totalKw} кВт · Live`} tone="amber" />
              </div>

              {/* Headline figures */}
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

              <div className="grid grid-cols-2 gap-2.5">
                <TelemetryChip
                  theme={theme}
                  icon={Sun}
                  label="Панелі"
                  value={`${activePanelCount} шт · ${selectedPanelWattage}W`}
                />
                <TelemetryChip theme={theme} icon={Cpu} label="Інвертор Deye" value={`${inverterPowerKw} кВт`} />
                <TelemetryChip
                  theme={theme}
                  icon={TrendingUp}
                  label="Річна генерація"
                  value={`${annualGenKwh.toLocaleString('uk-UA')} кВт·год`}
                  live
                />
                <TelemetryChip
                  theme={theme}
                  icon={BatteryCharging}
                  label="Резерв"
                  value={hasBattery ? `${batteryCapacityKwh} кВт·год` : 'Без АКБ'}
                />
              </div>

              {/* Single-line diagram of exactly what is configured */}
              <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
                <p className={`text-[10px] font-bold telemetry-label mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Однолінійна схема станції
                </p>
                <SystemFlowDiagram
                  theme={theme}
                  panelCount={activePanelCount}
                  totalKw={totalKw}
                  inverterPowerKw={inverterPowerKw}
                  hasBattery={hasBattery}
                  batteryCapacityKwh={batteryCapacityKwh}
                />
              </div>
            </SolarPanelCard>

          </div>

          {/* RIGHT COLUMN: ENLARGED VISUAL SCHEMA AT TOP RIGHT */}
          <div className="lg:col-span-6 space-y-6">
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
            />
          </div>

        </div>

        {/* FULL WIDTH BOTTOM CONFIGURATION FORM */}
        <div id="calculator-consultation" className="pt-8 border-t border-slate-800">
          <ConfigurationForm 
            configurationSummary={getConfigSummaryText()} 
            theme={theme} 
          />
        </div>

      </div>
    </div>
  );
}
