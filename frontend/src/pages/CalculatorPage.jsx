import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Sun, 
  Zap, 
  Home, 
  Layers, 
  Cpu, 
  TrendingUp, 
  BatteryCharging, 
  MessageSquare,
  DollarSign,
  PiggyBank,
  Clock,
  Leaf,
  RotateCcw,
  Sparkles,
  Coins
} from 'lucide-react';
import CustomSelect from '../components/CustomSelect';
import ConfigurationForm from '../components/ConfigurationForm';
import SolarPanelCard from '../components/SolarPanelCard';
import SystemFlowDiagram from '../components/SystemFlowDiagram';
import { LiveBadge, TelemetryChip } from '../components/SolarTech';
import { CountUp, SolarSlider } from '../components/SolarControls';
import { SectionAmbience, RegistrationMarks } from '../components/SolarDetails';

export default function CalculatorPage({ theme, onOpenConsultation, onOpenConfiguration, isEmbed = false, isGroundOnly = false, isRoofOnly = false }) {
  const isDark = theme === 'dark';

  // Calculator Mode Switcher: 'cost' (Equipment & Installation Cost) | 'income' (ROI & Green Tariff Income)
  const [calcMode, setCalcMode] = useState('cost');

  const getOptionClass = (isActive) => {
    if (isActive) {
      return isDark
        ? 'btn-orange-selected-no-hover shadow-md text-white'
        : 'border-orange-500 bg-amber-500/12 text-slate-900 font-bold shadow-xs';
    }
    return isDark
      ? 'border-slate-700 bg-slate-900 text-slate-300 btn-inactive-option'
      : 'border-slate-300 bg-slate-100/90 text-slate-800 btn-inactive-option hover:bg-slate-200';
  };

  // Configurator 1 State - "Розрахунок вартості СЕС"
  const [roofType, setRoofType] = useState(isGroundOnly ? 'ground' : 'pitched'); // 'pitched' | 'flat' | 'ground'
  const [roofMaterial, setRoofMaterial] = useState('metal_tile'); // 'metal_tile' | 'tile' | 'corrugated' | 'seam' | 'flat_concrete'
  const [roofAreaSqM, setRoofAreaSqM] = useState(80); // m2
  const [targetSystemPowerKw, setTargetSystemPowerKw] = useState(15); // kW
  const [panelBrand, setPanelBrand] = useState('longi615'); // 'longi615' | 'trina455' | 'astra465' | 'longi630'
  const [hasBattery, setHasBattery] = useState(true);
  const [batteryCapacityKwh, setBatteryCapacityKwh] = useState(10); // 5 | 10 | 15 | 20
  const [loadWatts, setLoadWatts] = useState(625);
  const [backupHours, setBackupHours] = useState(16);

  // Configurator 2 State - "Прогноз доходу та окупності"
  const [incomePowerKw, setIncomePowerKw] = useState(15);
  const [monthlyConsumptionKwh, setMonthlyConsumptionKwh] = useState(250);
  const [gridPriceUah, setGridPriceUah] = useState(6.3); // сталий тариф 6.30 грн за кВт·год

  useEffect(() => {
    if (!isEmbed) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.title = 'Калькулятор СЕС — Nova Energy';
    }
  }, [isEmbed]);

  useEffect(() => {
    if (isGroundOnly) {
      setRoofType('ground');
    }
  }, [isGroundOnly]);

  // Cost Calculator Constants & Calculations
  const panelWattages = { longi615: 615, trina455: 455, astra465: 465, longi630: 630 };
  const panelPrices = { longi615: 155, trina455: 115, astra465: 120, longi630: 165 };

  const maxPossiblePanels = Math.floor(roofAreaSqM / 2.2);
  const selectedPanelWattage = panelWattages[panelBrand];
  const requiredPanelCount = Math.ceil((targetSystemPowerKw * 1000) / selectedPanelWattage);
  const requiredAreaSqM = parseFloat((requiredPanelCount * 2.2).toFixed(1));
  const activePanelCount = requiredPanelCount;

  const totalKw = parseFloat(((activePanelCount * selectedPanelWattage) / 1000).toFixed(1));
  const inverterPowerKw = totalKw <= 8 ? 8 : totalKw <= 15 ? 15 : totalKw <= 30 ? 30 : 50;

  const panelsCost = activePanelCount * panelPrices[panelBrand];
  const frameCost = Math.round(activePanelCount * (roofType === 'ground' ? 50 : roofType === 'flat' ? 45 : 30));
  const inverterCost = Math.round(inverterPowerKw * 180);
  const batteryCost = hasBattery ? Math.round(batteryCapacityKwh * 320) : 0;
  const installationCost = Math.round((panelsCost + frameCost + inverterCost + batteryCost) * 0.15);

  const totalEstimateUsd = panelsCost + frameCost + inverterCost + batteryCost + installationCost;
  const annualGenKwh = Math.round(totalKw * 1180);

  // ROI / Income Calculator Calculations
  const usdToUah = 41.5;
  const currentInvestmentUsd = Math.round(incomePowerKw * 850);

  const annualIncomeGenKwh = Math.round(incomePowerKw * 1180);
  const annualConsumptionKwh = monthlyConsumptionKwh * 12;

  const annualGridExportKwh = Math.max(0, annualIncomeGenKwh - annualConsumptionKwh);
  const annualSelfCoverageKwh = Math.min(annualIncomeGenKwh, annualConsumptionKwh);

  // Green Tariff net rate (0.163 EUR ≈ 0.18 USD)
  const greenTariffRateUsd = 0.18;
  // Grid electricity price for households (converted dynamically)
  const gridTariffRateUsd = gridPriceUah / usdToUah;

  const annualGreenIncomeUsd = Math.round(annualGridExportKwh * greenTariffRateUsd);
  const annualElectricitySavingsUsd = Math.round(annualSelfCoverageKwh * gridTariffRateUsd);
  const totalAnnualBenefitUsd = annualGreenIncomeUsd + annualElectricitySavingsUsd;

  const paybackYears = totalAnnualBenefitUsd > 0 
    ? parseFloat((currentInvestmentUsd / totalAnnualBenefitUsd).toFixed(1)) 
    : 0;

  const co2SavingsTons = parseFloat((annualIncomeGenKwh * 0.0006).toFixed(1));

  const getConfigSummaryText = () => {
    if (calcMode === 'cost') {
      const placementText = roofType === 'ground' ? 'Наземна СЕС' : roofType === 'flat' ? 'Плоский дах' : 'Скатий дах';
      return `1) Розміщення: ${placementText}, доступна площа: ${roofAreaSqM} м²\n2) Потужність СЕС: ${targetSystemPowerKw} кВт (${activePanelCount} шт. ${panelBrand.toUpperCase()} (${totalKw} кВт), площа: ${requiredAreaSqM} м²)\n3) Інвертор Deye ${inverterPowerKw} кВт ${hasBattery ? `+ АКБ ${batteryCapacityKwh} кВт·год (навантаження: ${loadWatts} Вт, час: ${backupHours} год)` : ''}\n4) Орієнтовна річна генерація: ~${annualGenKwh.toLocaleString()} кВт·год/рік\n5) Орієнтовний річний дохід: ~+$${Math.round((annualGenKwh * 0.8 * 0.18) + (annualGenKwh * 0.2 * (gridPriceUah / usdToUah))).toLocaleString()}/рік (~${Math.round(((annualGenKwh * 0.8 * 0.18) + (annualGenKwh * 0.2 * (gridPriceUah / usdToUah))) * usdToUah).toLocaleString()} грн)`;
    } else {
      return `1) Прогноз для СЕС: ${incomePowerKw} кВт (Річна генерація: ~${annualIncomeGenKwh.toLocaleString()} кВт·год)\n2) Споживання будинку: ${monthlyConsumptionKwh} кВт·год/міс (~${annualConsumptionKwh.toLocaleString()} кВт·год/рік)\n3) Фінансовий розрахунок:\n - Дохід від Зеленого тарифу: ~$${annualGreenIncomeUsd.toLocaleString()}/рік (~${Math.round(annualGreenIncomeUsd * usdToUah).toLocaleString()} грн)\n - Економія на власній електриці: ~$${annualElectricitySavingsUsd.toLocaleString()}/рік (~${Math.round(annualElectricitySavingsUsd * usdToUah).toLocaleString()} грн)\n - Загальний орієнтовний річний дохід: ~+$${totalAnnualBenefitUsd.toLocaleString()}/рік (~${Math.round(totalAnnualBenefitUsd * usdToUah).toLocaleString()} грн)\n - Очікувана окупність: ~${paybackYears} років`;
    }
  };

  return (
    <div className={isEmbed ? "w-full" : `py-12 sm:py-20 min-h-screen relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-slate-100/70 text-slate-900'
    }`}>
      {!isEmbed && <SectionAmbience variant="c" />}

      <div className={isEmbed ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"}>
        
        {/* Page Header */}
        {!isEmbed && (
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full border ${
              isDark ? 'bg-amber-500/10 border-amber-400/60 text-amber-400' : 'bg-amber-50 border-orange-400 text-slate-800'
            }`}>
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>Калькулятор Доходності СЕС</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              Калькулятор <span className="text-amber-500">Доходу СЕС</span>
            </h1>
            <p className={`text-sm sm:text-lg font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Розрахуйте орієнтовний річний дохід від генерації сонячної електростанції, виплати за Зеленим Тарифом та термін окупності під ваш будинок або бізнес.
            </p>
          </div>
        )}

        {/* Mode Switcher Tabs - Vertical on mobile, horizontal on sm+ */}
        <div className="flex justify-center mb-8 sm:mb-10 w-full px-2 sm:px-0">
          <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-2 sm:p-1.5 rounded-2xl border shadow-md w-full sm:w-auto ${
            isDark ? 'bg-slate-800/90 border-slate-700/80' : 'bg-slate-200/90 border-slate-300'
          }`}>
            <button
              type="button"
              onClick={() => setCalcMode('cost')}
              className={`flex items-center justify-center gap-2.5 px-4 sm:px-6 py-3.5 sm:py-3 rounded-xl text-sm font-extrabold transition-all duration-300 cursor-pointer w-full sm:w-auto ${
                calcMode === 'cost'
                  ? isDark
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sun className="w-4.5 h-4.5 flex-shrink-0" />
              <span>1. Дохід за параметрами даху</span>
            </button>

            <button
              type="button"
              onClick={() => setCalcMode('income')}
              className={`flex items-center justify-center gap-2.5 px-4 sm:px-6 py-3.5 sm:py-3 rounded-xl text-sm font-extrabold transition-all duration-300 cursor-pointer w-full sm:w-auto ${
                calcMode === 'income'
                  ? isDark
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-4.5 h-4.5 flex-shrink-0" />
              <span>2. Прогноз доходу та окупності</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODE 1: EQUIPMENT & INSTALLATION COST CALCULATOR */}
        {/* ========================================================================= */}
        {calcMode === 'cost' && (
          <>
            {/* Real-time system diagram placed as a top banner */}
            <SolarPanelCard
              theme={theme}
              glow
              className="p-4 sm:p-5 mb-8 shadow-xl w-full"
              contentClassName="space-y-3"
            >
              <RegistrationMarks />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Схема СЕС в реальному часі
                </p>
                <LiveBadge theme={theme} label={`${totalKw} кВт · Live`} tone="amber" />
              </div>
              <SystemFlowDiagram
                theme={theme}
                panelCount={activePanelCount}
                totalKw={totalKw}
                inverterPowerKw={inverterPowerKw}
                hasBattery={hasBattery}
                batteryCapacityKwh={batteryCapacityKwh}
              />
            </SolarPanelCard>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
              
              {/* LEFT COLUMN: INPUT CONFIGURATOR */}
              <div className="lg:col-span-6">
                <SolarPanelCard theme={theme} className="p-6 sm:p-8" contentClassName="space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-amber-500">
                    <Calculator className="w-5 h-5" /> Параметри сонячної системи
                  </h3>

                  {/* 1. Placement Type */}
                  {!isGroundOnly && (
                    <div>
                      <label className={`block text-xs sm:text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Тип розміщення станції:
                      </label>
                      <div className={`grid ${isRoofOnly ? 'grid-cols-2' : 'grid-cols-3'} gap-2`}>
                        <button
                          type="button"
                          onClick={() => {
                            setRoofType('pitched');
                            setRoofMaterial('metal_tile');
                          }}
                          className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${getOptionClass(roofType === 'pitched')}`}
                        >
                          <p className="font-bold text-xs sm:text-sm">Скатний дах</p>
                          <p className="text-xs opacity-80 mt-0.5">Нахил ~30°</p>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setRoofType('flat');
                            setRoofMaterial('flat_concrete');
                          }}
                          className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${getOptionClass(roofType === 'flat')}`}
                        >
                          <p className="font-bold text-xs sm:text-sm">Плоский дах</p>
                          <p className="text-xs opacity-80 mt-0.5">Ферми 15°</p>
                        </button>

                        {!isRoofOnly && (
                          <button
                            type="button"
                            onClick={() => {
                              setRoofType('ground');
                              setRoofMaterial('screw');
                            }}
                            className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${getOptionClass(roofType === 'ground')}`}
                          >
                            <p className="font-bold text-xs sm:text-sm">Наземна СЕС</p>
                            <p className="text-xs opacity-80 mt-0.5">На ґрунті</p>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 2. Roof Material */}
                  {roofType === 'pitched' && (
                    <div>
                      <label className={`block text-xs sm:text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
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
                        variant="orange-outline"
                      />
                    </div>
                  )}

                  {/* 3. Available Area Slider */}
                  <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
                    <SolarSlider
                      id="roof-area"
                      theme={theme}
                      label="Доступна площа під панелі"
                      display={`${roofAreaSqM} м²`}
                      min={30}
                      max={300}
                      step={10}
                      value={roofAreaSqM}
                      onChange={setRoofAreaSqM}
                      hint={`Максимально вміщує близько ${maxPossiblePanels} шт. сонячних панелей.`}
                    />
                  </div>

                  {/* 4. Desired System Power Slider */}
                  <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
                    <SolarSlider
                      id="target-system-power"
                      theme={theme}
                      label="Бажана потужність станції"
                      display={`${targetSystemPowerKw} кВт`}
                      min={5}
                      max={50}
                      step={1}
                      value={targetSystemPowerKw}
                      onChange={setTargetSystemPowerKw}
                      hint={`Необхідно орієнтовно ${requiredPanelCount} панелей потужністю ${selectedPanelWattage} Вт.`}
                    />
                  </div>

                  {/* 5. Panel Brand Selection */}
                  <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
                    <label className={`block text-xs sm:text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Бренд сонячних фотомодулів:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'longi615', name: 'LONGi Solar', watt: '615W', desc: 'Hi-MO X6 Флагман' },
                        { id: 'trina455', name: 'Trina Solar', watt: '455W', desc: 'Vertex S для дахів' },
                        { id: 'astra465', name: 'Astra Energy', watt: '465W', desc: 'Half-Cut Оптимум' },
                        { id: 'longi630', name: 'LONGi Solar', watt: '630W', desc: 'Hi-MO 7 Двосторонній' }
                      ].map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setPanelBrand(b.id)}
                          className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${getOptionClass(panelBrand === b.id)}`}
                        >
                          <p className="font-bold text-xs sm:text-sm">{b.name}</p>
                          <p className="text-xs sm:text-sm text-amber-500 font-black mt-0.5">{b.watt}</p>
                          <p className="text-xs opacity-75 mt-1">{b.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 6. Battery Reserve Options */}
                  <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
                    <label className={`block text-xs sm:text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Акумуляторний блок LiFePO4 резервного живлення:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setHasBattery(false)}
                        className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${getOptionClass(!hasBattery)}`}
                      >
                        <p className="font-bold text-xs sm:text-sm">Без АКБ</p>
                        <p className="text-xs opacity-80 mt-0.5">Мережева СЕС</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setHasBattery(true)}
                        className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${getOptionClass(hasBattery)}`}
                      >
                        <p className="font-bold text-xs sm:text-sm">З АКБ</p>
                        <p className="text-xs opacity-80 mt-0.5">Гібридна СЕС</p>
                      </button>
                    </div>
                  </div>

                  {/* 7. Battery Calculator Sliders */}
                  {hasBattery && (
                    <div className="space-y-4 pt-4 border-t border-slate-700/60">
                      <SolarSlider
                        id="load-watts"
                        theme={theme}
                        label="Середнє навантаження будинку"
                        display={`${loadWatts} Вт`}
                        min={200}
                        max={4000}
                        step={50}
                        value={loadWatts}
                        onChange={(val) => {
                          setLoadWatts(val);
                          const calculatedKwh = (val * backupHours) / 1000;
                          const stepKwh = Math.max(5, Math.ceil(calculatedKwh / 5) * 5);
                          setBatteryCapacityKwh(stepKwh);
                        }}
                        hint="Потужність приладів, які працюватимуть одночасно під час відключення."
                      />

                      <SolarSlider
                        id="backup-hours"
                        theme={theme}
                        label="Необхідний час автономності"
                        display={`${backupHours} ${
                          backupHours % 100 >= 11 && backupHours % 100 <= 19
                            ? 'годин'
                            : backupHours % 10 === 1
                            ? 'година'
                            : backupHours % 10 >= 2 && backupHours % 10 <= 4
                            ? 'години'
                            : 'годин'
                        }`}
                        min={4}
                        max={72}
                        step={2}
                        value={backupHours}
                        onChange={(val) => {
                          setBackupHours(val);
                          const calculatedKwh = (loadWatts * val) / 1000;
                          const stepKwh = Math.max(5, Math.ceil(calculatedKwh / 5) * 5);
                          setBatteryCapacityKwh(stepKwh);
                        }}
                        hint={`Розрахункова ємність резерву: ${((loadWatts * backupHours) / 1000).toFixed(1)} кВт·год.`}
                      />
                    </div>
                  )}

                  <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenConfiguration) {
                          onOpenConfiguration(getConfigSummaryText());
                        } else if (onOpenConsultation) {
                          onOpenConsultation(getConfigSummaryText());
                        }
                      }}
                      className="w-full flex justify-center items-center px-4 py-4 rounded-xl btn-orange-bright font-black text-sm sm:text-base uppercase tracking-wider hover:-translate-y-0.5 active:translate-y-0 cursor-pointer transition-all duration-300"
                    >
                      Надіслати конфігурацію майстру
                    </button>
                  </div>
                </SolarPanelCard>
              </div>

              {/* RIGHT COLUMN: CALCULATION BOARD TABLE */}
              <div className="lg:col-span-6">
                <SolarPanelCard theme={theme} glow className="p-6 sm:p-8 shadow-xl" contentClassName="space-y-6">
                  <div className={`flex flex-wrap justify-between items-center gap-3 border-b pb-3 ${
                    isDark ? 'border-slate-700/60' : 'border-slate-200'
                  }`}>
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
                      <TrendingUp className="w-4 h-4" /> Прогноз генерації та доходу СЕС
                    </span>
                    <LiveBadge theme={theme} label={`${totalKw} кВт · 1180 год/кВт`} tone="amber" />
                  </div>

                  {/* Table of income and generation components */}
                  <div className="space-y-6 text-xs sm:text-sm">
                    
                    {/* 1. Generation Metrics */}
                    <div className="space-y-2">
                      <h4 className={`text-sm sm:text-base font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-950'}`}>
                        1. Продуктивність та генерація
                      </h4>
                      <div className={`border-t ${isDark ? 'border-slate-700/50' : 'border-slate-300'} divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-200'}`}>
                        <div className="flex justify-between items-start py-3 gap-3">
                          <span className={`text-xs sm:text-sm font-bold leading-snug ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                            1.1 Розрахункова потужність СЕС
                          </span>
                          <span className="font-black text-sm sm:text-base text-amber-500 tabular-nums shrink-0">{totalKw} кВт</span>
                        </div>
                        <div className="flex justify-between items-start py-3 gap-3">
                          <span className={`text-xs sm:text-sm font-bold leading-snug ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                            1.2 Очікувана річна генерація (Закарпаття/Прикарпаття)
                          </span>
                          <div className="text-right shrink-0">
                            <div className="font-black text-sm sm:text-base text-emerald-600 dark:text-emerald-400 tabular-nums leading-tight">
                              {annualGenKwh.toLocaleString('uk-UA')}
                            </div>
                            <div className={`text-[11px] font-bold mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              кВт·год / рік
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-start py-3 gap-3">
                          <span className={`text-xs sm:text-sm font-bold leading-snug ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                            1.3 Продаж у мережу за Зеленим тарифом (~80%)
                          </span>
                          <div className="text-right shrink-0">
                            <div className={`font-black text-sm sm:text-base tabular-nums leading-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                              ~{Math.round(annualGenKwh * 0.8).toLocaleString('uk-UA')}
                            </div>
                            <div className={`text-[11px] font-bold mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              кВт·год / рік
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-start py-3 gap-3">
                          <span className={`text-xs sm:text-sm font-bold leading-snug ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                            1.4 Власне покриття споживання об'єкта (~20%)
                          </span>
                          <div className="text-right shrink-0">
                            <div className={`font-black text-sm sm:text-base tabular-nums leading-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                              ~{Math.round(annualGenKwh * 0.2).toLocaleString('uk-UA')}
                            </div>
                            <div className={`text-[11px] font-bold mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              кВт·год / рік
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Financial Benefit & Green Tariff Income */}
                    <div className="space-y-2">
                      <h4 className={`text-sm sm:text-base font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-950'}`}>
                        2. Очікуваний дохід та вигода
                      </h4>
                      <div className={`border-t ${isDark ? 'border-slate-700/50' : 'border-slate-300'} divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-200'}`}>
                        <div className="flex justify-between items-start py-3 gap-3">
                          <span className={`text-xs sm:text-sm font-bold leading-snug ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                            2.1 Виплати за Зеленим тарифом (0.163 € ≈ $0.18/кВт·год)
                          </span>
                          <div className="text-right shrink-0">
                            <div className="font-black text-sm sm:text-base text-amber-500 tabular-nums leading-tight">
                              +${Math.round(annualGenKwh * 0.8 * 0.18).toLocaleString()} / рік
                            </div>
                            <div className={`text-[11px] font-bold mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              (~{Math.round(annualGenKwh * 0.8 * 0.18 * usdToUah).toLocaleString()} грн)
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-start py-3 gap-3">
                          <span className={`text-xs sm:text-sm font-bold leading-snug ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                            2.2 Економія на власному споживанні
                          </span>
                          <div className="text-right shrink-0">
                            <div className="font-black text-sm sm:text-base text-emerald-600 dark:text-emerald-400 tabular-nums leading-tight">
                              +${Math.round(annualGenKwh * 0.2 * (gridPriceUah / usdToUah)).toLocaleString()} / рік
                            </div>
                            <div className={`text-[11px] font-bold mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              (~{Math.round(annualGenKwh * 0.2 * gridPriceUah).toLocaleString()} грн)
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-start py-3 gap-3">
                          <span className={`text-xs sm:text-sm font-bold leading-snug ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                            2.3 Середньомісячний фінансовий дохід
                          </span>
                          <div className="text-right shrink-0">
                            <div className="font-black text-sm sm:text-base text-amber-500 tabular-nums leading-tight">
                              +${Math.round(((annualGenKwh * 0.8 * 0.18) + (annualGenKwh * 0.2 * (gridPriceUah / usdToUah))) / 12).toLocaleString()} / міс
                            </div>
                            <div className={`text-[11px] font-bold mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              (~{Math.round((((annualGenKwh * 0.8 * 0.18) + (annualGenKwh * 0.2 * (gridPriceUah / usdToUah))) * usdToUah) / 12).toLocaleString()} грн)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. Technical Parameters */}
                    <div className="space-y-2">
                      <h4 className={`text-sm sm:text-base font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-950'}`}>
                        3. Технічні параметри системи
                      </h4>
                      <div className={`border-t ${isDark ? 'border-slate-700/50' : 'border-slate-300'} divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-200'}`}>
                        <div className="flex justify-between items-start py-3 gap-3">
                          <span className={`text-xs sm:text-sm font-bold leading-snug ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                            3.1 Сонячні панелі {panelBrand.toUpperCase()} ({selectedPanelWattage} Вт)
                          </span>
                          <span className={`font-black text-sm sm:text-base tabular-nums shrink-0 ${isDark ? 'text-white' : 'text-slate-950'}`}>{activePanelCount} шт.</span>
                        </div>
                        <div className="flex justify-between items-start py-3 gap-3">
                          <span className={`text-xs sm:text-sm font-bold leading-snug ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                            3.2 Необхідна площа під фотомодулі
                          </span>
                          <div className="text-right shrink-0">
                            <div className={`font-black text-sm sm:text-base tabular-nums leading-tight ${requiredAreaSqM > roofAreaSqM ? 'text-rose-500' : isDark ? 'text-white' : 'text-slate-950'}`}>
                              {requiredAreaSqM} м²
                            </div>
                            <div className={`text-[11px] font-bold mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              (з доступних {roofAreaSqM} м²)
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-start py-3 gap-3">
                          <span className={`text-xs sm:text-sm font-bold leading-snug ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                            3.3 Гібридний інвертор Deye
                          </span>
                          <span className={`font-black text-sm sm:text-base tabular-nums shrink-0 ${isDark ? 'text-white' : 'text-slate-950'}`}>{inverterPowerKw} кВт</span>
                        </div>
                        {hasBattery && (
                          <div className="flex justify-between items-start py-3 gap-3">
                            <span className={`text-xs sm:text-sm font-bold leading-snug ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                              3.4 Акумулятори LiFePO4 (автономність)
                            </span>
                            <div className="text-right shrink-0">
                              <div className="font-black text-sm sm:text-base text-emerald-600 dark:text-emerald-400 tabular-nums leading-tight">
                                {batteryCapacityKwh} кВт·год
                              </div>
                              <div className={`text-[11px] font-bold mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                (~{backupHours} год)
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Warning message if required area exceeds available area */}
                    {requiredAreaSqM > roofAreaSqM && (
                      <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 font-semibold text-xs leading-relaxed text-center animate-pulse">
                        ⚠️ Потрібна площа під панелі ({requiredAreaSqM} м²) перевищує доступну площу даху ({roofAreaSqM} м²)! Збільшіть доступну площу або оберіть більш потужні панелі.
                      </div>
                    )}

                    {/* Final Annual Income Highlight Banner */}
                    <div className="pt-2">
                      <div className={`p-5 sm:p-6 rounded-2xl border text-center transition-all duration-300 ${
                        isDark
                          ? 'bg-gradient-to-br from-amber-500/10 via-slate-900 to-emerald-500/10 border-amber-500/30 shadow-lg shadow-black/20'
                          : 'bg-gradient-to-br from-amber-500/[0.06] via-slate-50 to-emerald-500/[0.06] border-amber-300/80 shadow-md'
                      }`}>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-black uppercase tracking-wider mb-2.5">
                          <Coins className="w-3.5 h-3.5 text-amber-500" />
                          <span>Орієнтовний Річний Дохід СЕС</span>
                        </div>
                        
                        <div className="text-3xl sm:text-4xl font-black tracking-tight text-emerald-600 dark:text-emerald-400 tabular-nums">
                          +${Math.round((annualGenKwh * 0.8 * 0.18) + (annualGenKwh * 0.2 * (gridPriceUah / usdToUah))).toLocaleString()}
                          <span className="text-sm sm:text-base font-bold text-slate-500 dark:text-slate-400 ml-1">/ рік</span>
                        </div>

                        <div className={`text-xs sm:text-sm font-bold mt-1.5 tabular-nums ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          (~{Math.round(((annualGenKwh * 0.8 * 0.18) + (annualGenKwh * 0.2 * (gridPriceUah / usdToUah))) * usdToUah).toLocaleString()} грн / рік)
                        </div>

                        <div className={`pt-3 mt-3 border-t text-[11px] sm:text-xs leading-relaxed ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600 font-medium'}`}>
                          Виплати за Зеленим тарифом + 100% економія на власних рахунках за електроенергію
                        </div>
                      </div>
                    </div>

                  </div>

                </SolarPanelCard>
              </div>

            </div>
          </>
        )}

        {/* ========================================================================= */}
        {/* MODE 2: ROI & GREEN TARIFF INCOME CALCULATOR */}
        {/* ========================================================================= */}
        {calcMode === 'income' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            
            {/* LEFT COLUMN: ROI INPUT SLIDERS */}
            <div className="lg:col-span-6">
              <SolarPanelCard theme={theme} className="p-6 sm:p-8" contentClassName="space-y-6">
                <h3 className="text-lg font-bold flex items-center gap-2 text-amber-500">
                  <TrendingUp className="w-5 h-5" /> Параметри для розрахунку окупності
                </h3>

                {/* 1. Station Power */}
                <div className="pt-2">
                  <SolarSlider
                    id="income-power"
                    theme={theme}
                    label="Потужність станції (СЕС)"
                    display={`${incomePowerKw} кВт`}
                    min={5}
                    max={50}
                    step={1}
                    value={incomePowerKw}
                    onChange={setIncomePowerKw}
                    hint={`Очікувана річна генерація для Закарпаття/Прикарпаття: ~${annualIncomeGenKwh.toLocaleString()} кВт·год/рік.`}
                  />
                </div>

                {/* 2. Monthly House Consumption */}
                <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
                  <SolarSlider
                    id="monthly-consumption"
                    theme={theme}
                    label="Середньомісячне споживання будинку"
                    display={`${monthlyConsumptionKwh} кВт·год/міс`}
                    min={100}
                    max={1000}
                    step={25}
                    value={monthlyConsumptionKwh}
                    onChange={setMonthlyConsumptionKwh}
                    hint={`Річне власне споживання об'єкта: ~${annualConsumptionKwh.toLocaleString()} кВт·год.`}
                  />
                </div>

                {/* 3. Grid Electricity Price UAH/kWh */}
                <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Яка у вас ціна за кВт зараз, грн?
                  </label>
                  <SolarSlider
                    id="grid-price-uah"
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



                {/* Info Card: Tariffs Used */}
                <div className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
                  isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-transparent border-[var(--border-card-shell,#cbd5e1)] text-slate-800'
                }`}>
                  <div className={`flex items-center justify-between font-bold border-b pb-2 ${isDark ? 'border-slate-700/40' : 'border-[var(--border-subcard,#cbd5e1)]'}`}>
                    <span className="flex items-center gap-1.5 text-amber-500">
                      <Sparkles className="w-4 h-4" /> Діючі тарифні ставки (2025–2026)
                    </span>
                    <LiveBadge theme={theme} label="UA Rates" tone="amber" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <p className="opacity-75">Зелений тариф (чистий):</p>
                      <p className="font-extrabold text-amber-500">0.163 €/кВт·год (~$0.18)</p>
                      <p className="text-[10px] opacity-65">з урахуванням податків 19.5%</p>
                    </div>
                    <div>
                      <p className="opacity-75">Ваш поточний тариф:</p>
                      <p className="font-extrabold text-emerald-500">{gridPriceUah.toString().replace('.', ',')} грн/кВт·год (~${gridTariffRateUsd.toFixed(3)})</p>
                      <p className="text-[10px] opacity-65">використовується для економії</p>
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenConfiguration) {
                        onOpenConfiguration(getConfigSummaryText());
                      } else if (onOpenConsultation) {
                        onOpenConsultation(getConfigSummaryText());
                      }
                    }}
                    className="w-full flex justify-center items-center px-4 py-4 rounded-xl btn-orange-bright font-black text-sm sm:text-base uppercase tracking-wider hover:-translate-y-0.5 active:translate-y-0 cursor-pointer transition-all duration-300"
                  >
                    Отримати детальну фінансову модель
                  </button>
                </div>

              </SolarPanelCard>
            </div>

            {/* RIGHT COLUMN: FINANCIAL DISPLAY METRICS */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Payback Hero Banner Card */}
              <SolarPanelCard theme={theme} glow className="p-6 sm:p-8 shadow-xl" contentClassName="space-y-5">
                <RegistrationMarks />
                
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
                    <Clock className="w-4 h-4" /> Прогноз окупності інвестицій
                  </span>
                  <LiveBadge theme={theme} label="Фінансова Модель" tone="amber" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                  <div className={`p-5 rounded-2xl border text-center ${
                    isDark ? 'bg-amber-500/10 border-amber-400/50' : 'bg-orange-500/10 border-orange-400'
                  }`}>
                    <p className={`text-xs uppercase font-bold tracking-wider ${isDark ? 'text-amber-300' : 'text-orange-700'}`}>
                      Термін повного повернення
                    </p>
                    <p className="text-4xl sm:text-5xl font-black text-amber-500 mt-1">
                      {paybackYears} <span className="text-lg font-bold">років</span>
                    </p>
                    <p className={`text-[11px] mt-1 font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Чистий прибуток після {paybackYears} років
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-transparent border-[var(--border-subcard,#cbd5e1)]'}`}>
                      <p className={`text-[11px] font-extrabold uppercase ${isDark ? 'text-slate-400' : 'text-slate-800'}`}>Загальна річна вигода</p>
                      <p className="text-xl font-extrabold text-emerald-500 mt-0.5">
                        +${totalAnnualBenefitUsd.toLocaleString()} / рік
                      </p>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-700 font-semibold'}`}>
                        ~{Math.round(totalAnnualBenefitUsd * usdToUah).toLocaleString()} грн/рік
                      </p>
                    </div>

                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-transparent border-[var(--border-subcard,#cbd5e1)]'}`}>
                      <p className={`text-[11px] font-extrabold uppercase ${isDark ? 'text-slate-400' : 'text-slate-800'}`}>Середній дохід на місяць</p>
                      <p className="text-lg font-extrabold text-amber-500 mt-0.5">
                        +${Math.round(totalAnnualBenefitUsd / 12).toLocaleString()} / міс
                      </p>
                    </div>
                  </div>
                </div>
              </SolarPanelCard>

              {/* Income Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. Green Tariff Sales */}
                <div className={`p-5 rounded-2xl border transition-all ${
                  isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-[var(--bg-card-shell,#f1f5f9)] border-[var(--border-card-shell,#cbd5e1)] shadow-md'
                }`}>
                  <div className="flex items-center gap-2 text-amber-500 mb-2">
                    <DollarSign className="w-5 h-5" />
                    <h4 className="font-extrabold text-sm">Продаж у мережу</h4>
                  </div>
                  <p className="text-2xl font-black text-amber-500">${annualGreenIncomeUsd.toLocaleString()}</p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-700 font-semibold'}`}>
                    ~{Math.round(annualGreenIncomeUsd * usdToUah).toLocaleString()} грн / рік
                  </p>
                  <div className={`mt-3 pt-3 border-t text-[11px] ${isDark ? 'border-slate-700/60 text-slate-400' : 'border-[var(--border-subcard,#cbd5e1)] text-slate-700 font-medium'}`}>
                    Обсяг експорту: <span className={isDark ? 'font-bold text-slate-300' : 'font-extrabold text-slate-900'}>{annualGridExportKwh.toLocaleString()} кВт·год</span>
                  </div>
                </div>

                {/* 2. Self Consumption Savings */}
                <div className={`p-5 rounded-2xl border transition-all ${
                  isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-[var(--bg-card-shell,#f1f5f9)] border-[var(--border-card-shell,#cbd5e1)] shadow-md'
                }`}>
                  <div className="flex items-center gap-2 text-emerald-500 mb-2">
                    <PiggyBank className="w-5 h-5" />
                    <h4 className="font-extrabold text-sm">Економія на рахунках</h4>
                  </div>
                  <p className="text-2xl font-black text-emerald-500">${annualElectricitySavingsUsd.toLocaleString()}</p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-700 font-semibold'}`}>
                    ~{Math.round(annualElectricitySavingsUsd * usdToUah).toLocaleString()} грн / рік
                  </p>
                  <div className={`mt-3 pt-3 border-t text-[11px] ${isDark ? 'border-slate-700/60 text-slate-400' : 'border-[var(--border-subcard,#cbd5e1)] text-slate-700 font-medium'}`}>
                    Власне покриття: <span className={isDark ? 'font-bold text-slate-300' : 'font-extrabold text-slate-900'}>{annualSelfCoverageKwh.toLocaleString()} кВт·год</span>
                  </div>
                </div>

              </div>

              {/* Seasonal Generation Distribution */}
              <SolarPanelCard theme={theme} className="p-6" contentClassName="space-y-4">
                <div className={`flex justify-between items-center border-b pb-3 ${isDark ? 'border-slate-700/40' : 'border-slate-200'}`}>
                  <h4 className={`font-black text-sm sm:text-base uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    <Sun className="w-4.5 h-4.5 text-amber-500" /> Сезонний розподіл генерації
                  </h4>
                  <span className="text-xs sm:text-sm font-black text-amber-500">
                    {annualIncomeGenKwh.toLocaleString()} кВт·год/рік
                  </span>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  {/* Summer */}
                  <div>
                    <div className="flex justify-between mb-1.5 font-bold">
                      <span className="flex items-center gap-1.5 text-amber-500">☀️ Літо (Червень – Серпень) — 45%</span>
                      <span className={isDark ? 'text-white' : 'text-slate-900'}>{Math.round(annualIncomeGenKwh * 0.45).toLocaleString()} кВт·год</span>
                    </div>
                    <div className={`w-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'} h-2.5 rounded-full overflow-hidden`}>
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>

                  {/* Spring */}
                  <div>
                    <div className="flex justify-between mb-1.5 font-bold">
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">🌱 Весна (Березень – Травень) — 30%</span>
                      <span className={isDark ? 'text-white' : 'text-slate-900'}>{Math.round(annualIncomeGenKwh * 0.30).toLocaleString()} кВт·год</span>
                    </div>
                    <div className={`w-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'} h-2.5 rounded-full overflow-hidden`}>
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>

                  {/* Autumn */}
                  <div>
                    <div className="flex justify-between mb-1.5 font-bold">
                      <span className="flex items-center gap-1.5 text-orange-500">🍂 Осінь (Вересень – Листопад) — 18%</span>
                      <span className={isDark ? 'text-white' : 'text-slate-900'}>{Math.round(annualIncomeGenKwh * 0.18).toLocaleString()} кВт·год</span>
                    </div>
                    <div className={`w-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'} h-2.5 rounded-full overflow-hidden`}>
                      <div className="bg-orange-400 h-full rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>

                  {/* Winter */}
                  <div>
                    <div className="flex justify-between mb-1.5 font-bold">
                      <span className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400">❄️ Зима (Грудень – Лютий) — 7%</span>
                      <span className={isDark ? 'text-white' : 'text-slate-900'}>{Math.round(annualIncomeGenKwh * 0.07).toLocaleString()} кВт·год</span>
                    </div>
                    <div className={`w-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'} h-2.5 rounded-full overflow-hidden`}>
                      <div className="bg-sky-400 h-full rounded-full" style={{ width: '7%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Eco footprint metric */}
                <div className={`mt-4 p-3.5 rounded-xl flex items-center justify-between text-xs sm:text-sm border ${
                  isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                }`}>
                  <span className="flex items-center gap-2 font-bold">
                    <Leaf className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Зменшення викидів CO₂ на рік:
                  </span>
                  <span className="font-black text-sm sm:text-base">~{co2SavingsTons} тонн</span>
                </div>

              </SolarPanelCard>

            </div>

          </div>
        )}

        {/* FULL WIDTH BOTTOM CONFIGURATION FORM */}
        {!isEmbed && (
          <div id="calculator-consultation" className="pt-8 border-t border-slate-800">
            <ConfigurationForm 
              configurationSummary={getConfigSummaryText()} 
              theme={theme} 
            />
          </div>
        )}

      </div>
    </div>
  );
}

