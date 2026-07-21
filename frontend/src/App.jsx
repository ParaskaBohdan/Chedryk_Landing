import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import StatsSection from './components/StatsSection';
import DeyeAndLegal from './components/DeyeAndLegal';
import StepProcess from './components/StepProcess';
import ConsultationForm from './components/ConsultationForm';
import ConfigurationForm from './components/ConfigurationForm';
import ContactsPage from './pages/ContactsPage';
import CalculatorPage from './pages/CalculatorPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import EquipmentPage from './pages/EquipmentPage';
import TariffsPage from './pages/TariffsPage';
import Footer from './components/Footer';
import { X } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('chedryk_theme') || 'dark';
  });

  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [modalType, setModalType] = useState('consultation'); // 'consultation' | 'configuration'
  const [prefilledService, setPrefilledService] = useState('');
  const [configSummaryText, setConfigSummaryText] = useState('');

  useEffect(() => {
    localStorage.setItem('chedryk_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

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
      isDark ? 'bg-slate-900 text-slate-100 dark' : 'bg-amber-50/20 text-slate-900 light'
    }`}>
      <ScrollToTop />
      
      {/* Navigation Header */}
      <Header 
        onOpenConsultation={() => handleOpenConsultation()} 
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Body with React Router Routes */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Hero 
                theme={theme} 
              />
              <Services 
                onSelectService={(serviceTitle) => handleOpenConsultation(serviceTitle)} 
                theme={theme} 
              />
              <StatsSection theme={theme} />
              <DeyeAndLegal 
                onOpenConsultation={() => handleOpenConsultation()} 
                theme={theme} 
              />
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
        </Routes>
      </main>

      {/* Footer */}
      <Footer 
        onOpenConsultation={() => handleOpenConsultation()} 
        theme={theme}
      />

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
