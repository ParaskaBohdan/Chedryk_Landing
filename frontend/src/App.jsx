import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import MiniRoiCalculator from './components/MiniRoiCalculator';
import StatsSection from './components/StatsSection';
import EngineerShowcase from './components/EngineerShowcase';
import DeyeAndLegal from './components/DeyeAndLegal';
import StepProcess from './components/StepProcess';
import Testimonials from './components/Testimonials';
import ConsultationForm from './components/ConsultationForm';
import ConfigurationForm from './components/ConfigurationForm';
import ContactsPage from './pages/ContactsPage';
import CalculatorPage from './pages/CalculatorPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import EquipmentPage from './pages/EquipmentPage';
import TariffsPage from './pages/TariffsPage';
import ThankYouPage from './pages/ThankYouPage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import CallWidget from './components/CallWidget';
import { X } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const getSystemTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  };

  const [theme, setTheme] = useState(getSystemTheme);

  const [lightVariant, setLightVariant] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nova_light_variant') || '2';
      return saved.charAt(0) || '2';
    }
    return '2';
  });

  const handleSetLightVariant = (variant) => {
    const cleanVariant = variant.charAt(0);
    setLightVariant(cleanVariant);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nova_light_variant', cleanVariant);
    }
  };

  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [modalType, setModalType] = useState('consultation'); // 'consultation' | 'configuration'
  const [prefilledService, setPrefilledService] = useState('');
  const [configSummaryText, setConfigSummaryText] = useState('');

  // Auto sync with system theme changes (dark/light)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light', 'light-v1', 'light-v2', 'light-v3', 'light-v4', 'light-no-grad');
    } else {
      root.classList.add('light');
      root.classList.remove('dark', 'light-v1', 'light-v2', 'light-v3', 'light-v4', 'light-no-grad');
      root.classList.add(`light-v${lightVariant}`);
    }
  }, [theme, lightVariant]);

  const handleOpenConsultation = (serviceTitle = '') => {
    setModalType('consultation');
    setPrefilledService(serviceTitle);
    setConsultationModalOpen(true);
  };

  const handleOpenConfigurationModal = (summaryText = '') => {
    setModalType('configuration');
    setConfigSummaryText(summaryText);
    setConsultationModalOpen(true);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-amber-400 selection:text-slate-950 ${
      isDark ? 'bg-slate-900 text-slate-100 dark' : 'bg-[var(--bg-app,#e2e8f0)] text-slate-900 light'
    }`}>
      <ScrollToTop />
      
      {/* Navigation Header */}
      <Header 
        onOpenConsultation={() => handleOpenConsultation()} 
        theme={theme}
        lightVariant={lightVariant}
        onSetLightVariant={handleSetLightVariant}
      />

      {/* Main Content Body with React Router Routes.
          Keyed on pathname so each navigation replays the enter animation. */}
      <main className="flex-grow route-enter" key={pathname}>
        <Routes>
          <Route path="/" element={
            <>
              <Hero 
                theme={theme} 
              />
              <MiniRoiCalculator 
                theme={theme} 
              />
              <Services 
                onSelectService={(serviceTitle) => handleOpenConsultation(serviceTitle)} 
                theme={theme} 
              />
              <StatsSection theme={theme} />
              <EngineerShowcase
                theme={theme}
                onOpenConsultation={() => handleOpenConsultation()}
              />
              <DeyeAndLegal
                onOpenConsultation={() => handleOpenConsultation()} 
                theme={theme} 
              />
              <Testimonials theme={theme} />
              <StepProcess 
                onOpenConsultation={() => handleOpenConsultation()} 
                theme={theme} 
              />
              
              {/* Consultation Section on Home Page */}
              <section id="consultation" className={`py-16 sm:py-20 border-t scroll-mt-20 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-amber-100'
              }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <ConsultationForm selectedServicePrefill={prefilledService} theme={theme} />
                </div>
              </section>
            </>
          } />

          <Route path="/services" element={
            <ServicesPage 
              theme={theme} 
              onOpenConsultation={(title) => handleOpenConsultation(title)} 
            />
          } />

          <Route path="/services/:serviceId" element={
            <ServiceDetailPage 
              theme={theme} 
              onOpenConsultation={(title) => handleOpenConsultation(title)} 
              onOpenConfiguration={(summaryText) => handleOpenConfigurationModal(summaryText)}
            />
          } />

          <Route path="/equipment" element={
            <EquipmentPage 
              theme={theme} 
              onOpenConsultation={() => handleOpenConsultation()} 
            />
          } />

          <Route path="/tariffs" element={
            <TariffsPage 
              theme={theme} 
              onOpenConsultation={() => handleOpenConsultation()} 
            />
          } />
          
          <Route path="/calculator" element={
            <CalculatorPage 
              theme={theme} 
              onOpenConsultation={(pref) => handleOpenConsultation(pref)} 
              onOpenConfiguration={(summaryText) => handleOpenConfigurationModal(summaryText)}
            />
          } />
          
          <Route path="/contacts" element={
            <ContactsPage theme={theme} />
          } />

          <Route path="/thank-you" element={
            <ThankYouPage theme={theme} />
          } />

          {/* Catch-all: an unknown URL previously rendered header + empty main */}
          <Route path="*" element={
            <NotFoundPage theme={theme} />
          } />
        </Routes>
      </main>

      {/* Footer */}
      <Footer 
        onOpenConsultation={() => handleOpenConsultation()} 
        theme={theme}
      />

      <ScrollToTopButton theme={theme} />
      <CallWidget />

      {/* Global Consultation / Configuration Modal */}
      {consultationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl my-6">
            <button
              onClick={() => setConsultationModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            {modalType === 'configuration' ? (
              <ConfigurationForm 
                configurationSummary={configSummaryText}
                onCloseModal={() => setConsultationModalOpen(false)}
                theme={theme}
              />
            ) : (
              <ConsultationForm 
                selectedServicePrefill={prefilledService}
                onCloseModal={() => setConsultationModalOpen(false)}
                theme={theme}
              />
            )}
          </div>
        </div>
      )}

    </div>
  );
}
