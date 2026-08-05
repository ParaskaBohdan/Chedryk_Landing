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
  Sparkles
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
        : 'border-orange-400 bg-amber-50 text-slate-700';
    }
    return isDark
      ? 'border-slate-700 bg-slate-900 text-slate-300 btn-inactive-option'
      : 'border-slate-200 bg-slate-50 text-slate-700 btn-inactive-option';
  };

  // Configurator 1 State - "Розрахунок вартості СЕС"
  const [roofType, setRoofType] = useState(isGroundOnly ? 'ground' : 'pitched'); // 'pitched' | 'flat' | 'ground'
  const [roofMaterial, setRoofMaterial] = useState('metal_tile'); // 'metal_tile' | 'tile' | 'corrugated' | 'seam' | 'flat_concrete'
  const [roofAreaSqM, setRoofAreaSqM] = useState(80); // m2
  const [targetSystemPowerKw, setTargetSystemPowerKw] = useState(15); // kW
  const [panelBrand, setPanelBrand] = useState('jinko'); // 'risen' | 'jinko' | 'longi' | 'jasolar'
  const [hasBattery, setHasBattery] = useState(true);
  const [batteryCapacityKwh, setBatteryCapacityKwh] = useState(10); // 5 | 10 | 15 | 20
  const [loadWatts, setLoadWatts] = useState(625);
  const [backupHours, setBackupHours] = useState(16);

  // Configurator 2 State - "Прогноз доходу та окупності"
  const [incomePowerKw, setIncomePowerKw] = useState(15);
  const [monthlyConsumptionKwh, setMonthlyConsumptionKwh] = useState(250);
  const [gridPriceUah, setGridPriceUah] = useState(4.32); // грн за кВт·год

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
  const panelWattages = { risen: 550, jinko: 585, longi: 600, jasolar: 670 };
  const panelPrices = { risen: 135, jinko: 155, longi: 165, jasolar: 185 };

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
      return `1) Розміщення: ${placementText}, доступна площа: ${roofAreaSqM} м²\n2) Бажана потужність СЕС: ${targetSystemPowerKw} кВт (Необхідно панелей: ${requiredPanelCount} шт. ${panelBrand.toUpperCase()} (${totalKw} кВт), площа: ${requiredAreaSqM} м²)\n3) Інвертор Deye ${inverterPowerKw} кВт ${hasBattery ? `+ АКБ ${batteryCapacityKwh} кВт·год (навантаження: ${loadWatts} Вт, час: ${backupHours} год)` : ''}\n4) Кошторис: ~$${totalEstimateUsd.toLocaleString()}`;
    } else {
      return `1) Прогноз для СЕС: ${incomePowerKw} кВт (Річна генерація: ~${annualIncomeGenKwh.toLocaleString()} кВт·год)\n2) Споживання будинку: ${monthlyConsumptionKwh} кВт·год/міс (~${annualConsumptionKwh.toLocaleString()} кВт·год/рік)\n3) Орієнтовні інвестиції: ~$${currentInvestmentUsd.toLocaleString()}\n4) Фінансовий розрахунок:\n - Дохід від Зеленого тарифу: ~$${annualGreenIncomeUsd.toLocaleString()}/рік (~${Math.round(annualGreenIncomeUsd * usdToUah).toLocaleString()} грн)\n - Економія на власній електриці: ~$${annualElectricitySavingsUsd.toLocaleString()}/рік (~${Math.round(annualElectricitySavingsUsd * usdToUah).toLocaleString()} грн)\n - Загальна річна вигода: ~$${totalAnnualBenefitUsd.toLocaleString()}/рік\n - Очікувана окупність: ~${paybackYears} років`;
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
              <Calculator className="w-4 h-4 text-amber-500" />
              <span>Інтерактивний Конфігуратор СЕС</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              Калькулятор <span className="text-amber-500">Сонячної Станції</span>
            </h1>
            <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Розрахуйте вартість обладнання та монтажу під ключ або оцініть очікуваний дохід від Зеленого Тарифу та термін окупності інвестицій.
            </p>
          </div>
        )}

        {/* Mode Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className={`inline-flex p-1.5 rounded-2xl border shadow-lg ${
            isDark ? 'bg-slate-800/90 border-slate-700/80' : 'bg-white border-slate-200'
          }`}>
            <button
              type="button"
              onClick={() => setCalcMode('cost')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                calcMode === 'cost'
                  ? isDark
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>1. Розрахунок вартості СЕС</span>
            </button>

            <button
              type="button"
              onClick={() => setCalcMode('income')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                calcMode === 'income'
                  ? isDark
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
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
              className="p-4 sm:p-5 mb-8 shadow-xl"
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
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
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
                          <p className="font-bold text-xs">Скатий дах</p>
                          <p className="text-[10px] opacity-75 mt-0.5">Нахил ~30°</p>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setRoofType('flat');
                            setRoofMaterial('flat_concrete');
                          }}
                          className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${getOptionClass(roofType === 'flat')}`}
                        >
                          <p className="font-bold text-xs">Плоский дах</p>
                          <p className="text-[10px] opacity-75 mt-0.5">Ферми 15°</p>
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
                            <p className="font-bold text-xs">Наземна СЕС</p>
                            <p className="text-[10px] opacity-75 mt-0.5">На ґрунті</p>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 2. Roof Material */}
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Бренд сонячних фотомодулів (Tier-1):
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'jinko', name: 'Jinko Solar', watt: '585W', desc: 'N-Type ККД 22.6%' },
                        { id: 'risen', name: 'Risen Energy', watt: '550W', desc: 'Titanium Перформанс' },
                        { id: 'longi', name: 'Longi Solar', watt: '600W', desc: 'Hi-MO X6 Топ ККД' },
                        { id: 'jasolar', name: 'JA Solar', watt: '670W', desc: 'DeepBlue Гігант' }
                      ].map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setPanelBrand(b.id)}
                          className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${getOptionClass(panelBrand === b.id)}`}
                        >
                          <p className="font-bold text-xs sm:text-sm">{b.name}</p>
                          <p className="text-xs text-amber-500 font-extrabold mt-0.5">{b.watt}</p>
                          <p className="text-[10px] opacity-75 mt-1">{b.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 6. Battery Reserve Options */}
                  <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Акумуляторний блок LiFePO4 резервного живлення:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setHasBattery(false)}
                        className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${getOptionClass(!hasBattery)}`}
                      >
                        <p className="font-bold text-xs sm:text-sm">Без АКБ</p>
                        <p className="text-[10px] opacity-75 mt-0.5">Мережева СЕС</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setHasBattery(true)}
                        className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${getOptionClass(hasBattery)}`}
                      >
                        <p className="font-bold text-xs sm:text-sm">З АКБ</p>
                        <p className="text-[10px] opacity-75 mt-0.5">Гібридна СЕС</p>
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
                        display={`${backupHours} ${backupHours === 4 ? 'години' : backupHours % 10 >= 2 && backupHours % 10 <= 4 && (backupHours < 10 || backupHours > 20) ? 'години' : 'годин'}`}
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
                      className="w-full flex justify-center items-center px-4 py-4 rounded-xl btn-orange-bright font-black text-xs sm:text-sm uppercase tracking-widest hover:-translate-y-0.5 active:translate-y-0 cursor-pointer transition-all duration-300"
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
                      <Zap className="w-4 h-4" /> Детальна калькуляція СЕС
                    </span>
                  </div>

                  {/* Table of cost components */}
                  <div className="space-y-6 text-xs sm:text-sm">
                    
                    {/* 1. Solar Hardware */}
                    <div className="space-y-2">
                      <h4 className={`font-black uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                        1. Сонячне обладнання
                      </h4>
                      <div className={`border-t ${isDark ? 'border-slate-700/50' : 'border-slate-200'} divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
                        <div className="flex justify-between py-2.5">
                          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                            1.1 Сонячні панелі {panelBrand.toUpperCase()} ({activePanelCount} шт. × ${panelPrices[panelBrand]})
                          </span>
                          <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>${panelsCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2.5">
                          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                            1.2 Металоконструкція та кріплення ({
                              roofType === 'ground' ? 'наземна СЕС' :
                              roofType === 'flat' ? 'плоский дах' : 'скатий дах'
                            })
                          </span>
                          <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>${frameCost.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className={`flex justify-between items-center px-4 py-2.5 rounded-xl bg-slate-800 text-white border-2 font-bold text-xs uppercase tracking-wider ${
                        isDark ? 'border-amber-400/80' : 'border-orange-400'
                      }`}>
                        <span>Сума обладнання</span>
                        <span>${(panelsCost + frameCost).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* 2. Power Systems & Batteries */}
                    <div className="space-y-2">
                      <h4 className={`font-black uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                        2. Системи живлення & АКБ
                      </h4>
                      <div className={`border-t ${isDark ? 'border-slate-700/50' : 'border-slate-200'} divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
                        <div className="flex justify-between py-2.5">
                          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                            2.1 Гібридний інвертор Deye ({inverterPowerKw} кВт)
                          </span>
                          <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>${inverterCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2.5">
                          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                            2.2 Акумулятори LiFePO4 {hasBattery ? `(${batteryCapacityKwh} кВт·год)` : '(без АКБ)'}
                          </span>
                          <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>${batteryCost.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className={`flex justify-between items-center px-4 py-2.5 rounded-xl bg-slate-800 text-white border-2 font-bold text-xs uppercase tracking-wider ${
                        isDark ? 'border-amber-400/80' : 'border-orange-400'
                      }`}>
                        <span>Сума систем живлення</span>
                        <span>${(inverterCost + batteryCost).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* 3. Works & Setup */}
                    <div className="space-y-2">
                      <h4 className={`font-black uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                        3. Роботи та запуск
                      </h4>
                      <div className={`border-t ${isDark ? 'border-slate-700/50' : 'border-slate-200'} divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
                        <div className="flex justify-between py-2.5">
                          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                            3.1 Доставка, монтаж та пусконалагодження СЕС під ключ (15%)
                          </span>
                          <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>${installationCost.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className={`flex justify-between items-center px-4 py-2.5 rounded-xl bg-slate-800 text-white border-2 font-bold text-xs uppercase tracking-wider ${
                        isDark ? 'border-amber-400/80' : 'border-orange-400'
                      }`}>
                        <span>Сума робіт</span>
                        <span>${installationCost.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* 4. Technical Indicators */}
                    <div className="space-y-2">
                      <h4 className={`font-black uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                        4. Технічні показники
                      </h4>
                      <div className={`border-t ${isDark ? 'border-slate-700/50' : 'border-slate-200'} divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
                        <div className="flex justify-between py-2.5">
                          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                            4.1 Необхідна кількість панелей
                          </span>
                          <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{activePanelCount} шт.</span>
                        </div>
                        <div className="flex justify-between py-2.5">
                          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                            4.2 Необхідна площа під панелі
                          </span>
                          <span className={`font-bold ${requiredAreaSqM > roofAreaSqM ? 'text-rose-500' : isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                            {requiredAreaSqM} м²
                          </span>
                        </div>
                        <div className="flex justify-between py-2.5">
                          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                            4.3 Максимальна вмістимість панелей
                          </span>
                          <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{maxPossiblePanels} шт.</span>
                        </div>
                        <div className="flex justify-between py-2.5">
                          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                            4.4 Розрахункова потужність станції
                          </span>
                          <span className="font-bold text-amber-500">{totalKw} кВт</span>
                        </div>
                        <div className="flex justify-between py-2.5">
                          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                            4.5 Очікувана річна генерація
                          </span>
                          <span className="font-bold text-emerald-500">{annualGenKwh.toLocaleString('uk-UA')} кВт·год</span>
                        </div>
                        {hasBattery && (
                          <>
                            <div className="flex justify-between py-2.5">
                              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                                4.6 Середнє навантаження будинку
                              </span>
                              <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{loadWatts} Вт</span>
                            </div>
                            <div className="flex justify-between py-2.5">
                              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                                4.7 Час автономності резерву
                              </span>
                              <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{backupHours} год</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Warning message if required area exceeds available area */}
                    {requiredAreaSqM > roofAreaSqM && (
                      <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 font-semibold text-xs leading-relaxed text-center animate-pulse">
                        ⚠️ Потрібна площа під панелі ({requiredAreaSqM} м²) перевищує доступну площу даху ({roofAreaSqM} м²)! Збільшіть доступну площу або оберіть більш потужні панелі.
                      </div>
                    )}

                    {/* Final Total Cost Row */}
                    <div className="pt-2">
                      <div className={`flex justify-between items-center px-4 py-4 rounded-xl font-black text-sm sm:text-base uppercase tracking-widest border-2 ${
                        isDark
                          ? 'bg-amber-500/10 border-amber-400 text-amber-400 shadow-none'
                          : 'bg-orange-500 border-orange-500 text-white shadow-lg'
                      }`}>
                        <span>Загальна сума СЕС (під ключ)</span>
                        <span>~${totalEstimateUsd.toLocaleString()}</span>
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
                  isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-amber-50/70 border-amber-200 text-slate-700'
                }`}>
                  <div className="flex items-center justify-between font-bold border-b pb-2 border-slate-700/40">
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
                    className="w-full flex justify-center items-center px-4 py-4 rounded-xl btn-orange-bright font-black text-xs sm:text-sm uppercase tracking-widest hover:-translate-y-0.5 active:translate-y-0 cursor-pointer transition-all duration-300"
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
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                      <p className="text-[11px] text-slate-400 font-bold uppercase">Загальна річна вигода</p>
                      <p className="text-xl font-extrabold text-emerald-500 mt-0.5">
                        +${totalAnnualBenefitUsd.toLocaleString()} / рік
                      </p>
                      <p className="text-[11px] text-slate-400">
                        ~{Math.round(totalAnnualBenefitUsd * usdToUah).toLocaleString()} грн/рік
                      </p>
                    </div>

                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                      <p className="text-[11px] text-slate-400 font-bold uppercase">Середній дохід на місяць</p>
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
                  isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200 shadow-md'
                }`}>
                  <div className="flex items-center gap-2 text-amber-500 mb-2">
                    <DollarSign className="w-5 h-5" />
                    <h4 className="font-extrabold text-sm">Продаж у мережу</h4>
                  </div>
                  <p className="text-2xl font-black text-amber-500">${annualGreenIncomeUsd.toLocaleString()}</p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    ~{Math.round(annualGreenIncomeUsd * usdToUah).toLocaleString()} грн / рік
                  </p>
                  <div className={`mt-3 pt-3 border-t text-[11px] ${isDark ? 'border-slate-700/60 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
                    Обсяг експорту: <span className="font-bold text-slate-300">{annualGridExportKwh.toLocaleString()} кВт·год</span>
                  </div>
                </div>

                {/* 2. Self Consumption Savings */}
                <div className={`p-5 rounded-2xl border transition-all ${
                  isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200 shadow-md'
                }`}>
                  <div className="flex items-center gap-2 text-emerald-500 mb-2">
                    <PiggyBank className="w-5 h-5" />
                    <h4 className="font-extrabold text-sm">Економія на рахунках</h4>
                  </div>
                  <p className="text-2xl font-black text-emerald-500">${annualElectricitySavingsUsd.toLocaleString()}</p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    ~{Math.round(annualElectricitySavingsUsd * usdToUah).toLocaleString()} грн / рік
                  </p>
                  <div className={`mt-3 pt-3 border-t text-[11px] ${isDark ? 'border-slate-700/60 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
                    Власне покриття: <span className="font-bold text-slate-300">{annualSelfCoverageKwh.toLocaleString()} кВт·год</span>
                  </div>
                </div>

              </div>

              {/* Seasonal Generation Distribution */}
              <SolarPanelCard theme={theme} className="p-6" contentClassName="space-y-4">
                <div className="flex justify-between items-center border-b pb-3 border-slate-700/40">
                  <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-500" /> Сезонний розподіл генерації
                  </h4>
                  <span className="text-xs font-bold text-amber-500">
                    {annualIncomeGenKwh.toLocaleString()} кВт·год/рік
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Summer */}
                  <div>
                    <div className="flex justify-between mb-1 font-semibold">
                      <span className="flex items-center gap-1.5 text-amber-400">☀️ Літо (Червень – Серпень) — 45%</span>
                      <span>{Math.round(annualIncomeGenKwh * 0.45).toLocaleString()} кВт·год</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>

                  {/* Spring */}
                  <div>
                    <div className="flex justify-between mb-1 font-semibold">
                      <span className="flex items-center gap-1.5 text-emerald-400">🌱 Весна (Березень – Травень) — 30%</span>
                      <span>{Math.round(annualIncomeGenKwh * 0.30).toLocaleString()} кВт·год</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>

                  {/* Autumn */}
                  <div>
                    <div className="flex justify-between mb-1 font-semibold">
                      <span className="flex items-center gap-1.5 text-orange-400">🍂 Осінь (Вересень – Листопад) — 18%</span>
                      <span>{Math.round(annualIncomeGenKwh * 0.18).toLocaleString()} кВт·год</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-orange-400 h-full rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>

                  {/* Winter */}
                  <div>
                    <div className="flex justify-between mb-1 font-semibold">
                      <span className="flex items-center gap-1.5 text-sky-400">❄️ Зима (Грудень – Лютий) — 7%</span>
                      <span>{Math.round(annualIncomeGenKwh * 0.07).toLocaleString()} кВт·год</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-sky-400 h-full rounded-full" style={{ width: '7%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Eco footprint metric */}
                <div className={`mt-4 p-3 rounded-xl flex items-center justify-between text-xs border ${
                  isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}>
                  <span className="flex items-center gap-2 font-semibold">
                    <Leaf className="w-4 h-4 text-emerald-500" /> Зменшення викидів CO₂ на рік:
                  </span>
                  <span className="font-extrabold text-sm">~{co2SavingsTons} тонн</span>
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

