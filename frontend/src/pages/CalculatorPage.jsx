import React, { useState, useEffect } from 'react';
import { Calculator, Sun, Zap, ArrowRight, Home, Layers, Cpu, TrendingUp, BatteryCharging, MessageSquare } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';
import ConfigurationForm from '../components/ConfigurationForm';
import SolarPanelCard from '../components/SolarPanelCard';
import SystemFlowDiagram from '../components/SystemFlowDiagram';
import { LiveBadge, TelemetryChip } from '../components/SolarTech';
import { CountUp, SolarSlider } from '../components/SolarControls';

export default function CalculatorPage({ theme, onOpenConsultation, onOpenConfiguration, isEmbed = false, isGroundOnly = false, isRoofOnly = false }) {
  const isDark = theme === 'dark';

  // Configurator State - "Доступна площа під панелі"
  const [roofType, setRoofType] = useState(isGroundOnly ? 'ground' : 'pitched'); // 'pitched' | 'flat' | 'ground'
  const [roofMaterial, setRoofMaterial] = useState('metal_tile'); // 'metal_tile' | 'tile' | 'corrugated' | 'seam' | 'flat_concrete'
  const [roofAreaSqM, setRoofAreaSqM] = useState(80); // m2
  const [targetAnnualGenKwh, setTargetAnnualGenKwh] = useState(10000); // kWh
  const [panelBrand, setPanelBrand] = useState('jinko'); // 'risen' | 'jinko' | 'longi' | 'jasolar'
  const [hasBattery, setHasBattery] = useState(true);
  const [batteryCapacityKwh, setBatteryCapacityKwh] = useState(10); // 5 | 10 | 15 | 20

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

  // Constants
  const panelWattages = { risen: 550, jinko: 585, longi: 600, jasolar: 670 };
  const panelPrices = { risen: 135, jinko: 155, longi: 165, jasolar: 185 };

  // Calculations
  const maxPossiblePanels = Math.floor(roofAreaSqM / 2.2);
  const selectedPanelWattage = panelWattages[panelBrand];
  const requiredKw = targetAnnualGenKwh / 1180;
  const requiredPanelCount = Math.ceil((requiredKw * 1000) / selectedPanelWattage);
  const requiredAreaSqM = parseFloat((requiredPanelCount * 2.2).toFixed(1));
  const activePanelCount = requiredPanelCount;

  const totalKw = parseFloat(((activePanelCount * selectedPanelWattage) / 1000).toFixed(1));
  const inverterPowerKw = totalKw <= 8 ? 8 : totalKw <= 15 ? 15 : totalKw <= 30 ? 30 : 50;

  // Cost estimates
  const panelsCost = activePanelCount * panelPrices[panelBrand];
  const frameCost = Math.round(activePanelCount * (roofType === 'ground' ? 50 : roofType === 'flat' ? 45 : 30));
  const inverterCost = Math.round(inverterPowerKw * 180);
  const batteryCost = hasBattery ? Math.round(batteryCapacityKwh * 320) : 0;
  const installationCost = Math.round((panelsCost + frameCost + inverterCost + batteryCost) * 0.15);

  const totalEstimateUsd = panelsCost + frameCost + inverterCost + batteryCost + installationCost;
  const annualGenKwh = Math.round(totalKw * 1180);

  const getConfigSummaryText = () => {
    const placementText = roofType === 'ground' ? 'Наземна СЕС' : roofType === 'flat' ? 'Плоский дах' : 'Скатий дах';
    return `1) Розміщення: ${placementText}, доступна площа: ${roofAreaSqM} м²\n2) Бажана річна генерація: ${targetAnnualGenKwh} кВт·год (Необхідно панелей: ${requiredPanelCount} шт. ${panelBrand.toUpperCase()} (${totalKw} кВт), площа: ${requiredAreaSqM} м²)\n3) Інвертор Deye ${inverterPowerKw} кВт ${hasBattery ? `+ АКБ ${batteryCapacityKwh} кВт·год` : ''}\n4) Кошторис: ~$${totalEstimateUsd.toLocaleString()}`;
  };

  return (
    <div className={isEmbed ? "w-full" : `py-12 sm:py-20 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-slate-100/70 text-slate-900'
    }`}>
      <div className={isEmbed ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
        
        {/* Page Title */}
        {!isEmbed && (
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full border badge-orange-outline">
              <Calculator className="w-4 h-4" />
              <span>Інтерактивний Конфігуратор СЕС</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              Калькулятор <span className="text-amber-500">Сонячної Станції</span>
            </h1>
            <p className={`text-sm sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Вкажіть параметри вашого об'єкта та бажану генерацію — наша система автоматично розрахує кількість обладнання, площу та детальний кошторис.
            </p>
          </div>
        )}

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
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        roofType === 'pitched'
                          ? 'btn-orange-bright shadow-md text-white'
                          : isDark ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
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
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        roofType === 'flat'
                          ? 'btn-orange-bright shadow-md text-white'
                          : isDark ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
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
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          roofType === 'ground'
                            ? 'btn-orange-bright shadow-md text-white'
                            : isDark ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
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

              {/* 4. Desired Annual Generation Slider */}
              <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
                <SolarSlider
                  id="target-annual-gen"
                  theme={theme}
                  label="Бажана річна генерація"
                  display={`${targetAnnualGenKwh.toLocaleString('uk-UA')} кВт·год`}
                  min={3000}
                  max={50000}
                  step={1000}
                  value={targetAnnualGenKwh}
                  onChange={setTargetAnnualGenKwh}
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
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        panelBrand === b.id
                          ? 'btn-orange-bright shadow-md text-white'
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

              {/* 6. Battery Reserve Options */}
              <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Акумуляторний блок LiFePO4 резервного живлення:
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setHasBattery(false)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      !hasBattery
                        ? 'btn-orange-bright shadow-md text-white'
                        : isDark ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <p className="font-bold text-[10px] sm:text-xs">Без АКБ</p>
                    <p className="text-[9px] opacity-75">Мережева</p>
                  </button>

                  {[5, 10, 15, 20].map((cap) => (
                    <button
                      key={cap}
                      type="button"
                      onClick={() => {
                        setHasBattery(true);
                        setBatteryCapacityKwh(cap);
                      }}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        hasBattery && batteryCapacityKwh === cap
                          ? 'btn-orange-bright shadow-md text-white'
                          : isDark ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <p className="font-bold text-[10px] sm:text-xs">{cap} кВт·г</p>
                      <p className="text-[9px] opacity-75">~{cap * 2} год</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'} flex justify-end`}>
                <button
                  type="button"
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
                {/*<LiveBadge theme={theme} label={`${totalKw} кВт · Розрахунок`} tone="amber" />*/}
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
                  <div className="flex justify-between items-center px-4 py-2.5 rounded-xl bg-slate-800 text-white border-2 border-orange-400 font-bold text-xs uppercase tracking-wider">
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
                  <div className="flex justify-between items-center px-4 py-2.5 rounded-xl bg-slate-800 text-white border-2 border-orange-400 font-bold text-xs uppercase tracking-wider">
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
                  <div className="flex justify-between items-center px-4 py-2.5 rounded-xl bg-slate-800 text-white border-2 border-orange-400 font-bold text-xs uppercase tracking-wider">
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
                  <div className="flex justify-between items-center px-4 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 transition-colors text-white font-black text-sm sm:text-base uppercase tracking-widest shadow-lg">
                    <span>Загальна сума СЕС (під ключ)</span>
                    <span>~${totalEstimateUsd.toLocaleString()}</span>
                  </div>
                </div>

              </div>

              {/* Single-line diagram of exactly what is configured */}
              <div className={`pt-4 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
                <p className={`text-[10px] font-bold telemetry-label mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Схема станції в реальному часі
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

        </div>

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
