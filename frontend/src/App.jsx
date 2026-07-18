import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import StatsSection from './components/StatsSection';
import DeyeAndLegal from './components/DeyeAndLegal';
import StepProcess from './components/StepProcess';
import ConsultationForm from './components/ConsultationForm';
import CalculatorModal from './components/CalculatorModal';
import ContactsPage from './pages/ContactsPage';
import Footer from './components/Footer';
import { X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('chedryk_theme') || 'dark';
  });

  const [scheme, setScheme] = useState(() => {
    return localStorage.getItem('chedryk_scheme') || 'default';
  });

  useEffect(() => {
    localStorage.setItem('chedryk_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('chedryk_scheme', scheme);
    document.documentElement.setAttribute('data-scheme', scheme);
  }, [scheme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenConsultation = (serviceTitle = '') => {
    setPrefilledService(serviceTitle);
    setConsultationModalOpen(true);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${theme} theme-bg-main theme-text-primary`}>
      
      {/* Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenConsultation={() => handleOpenConsultation()} 
        theme={theme}
        toggleTheme={toggleTheme}
        scheme={scheme}
        setScheme={setScheme}
      />

      {/* Main Content Body */}
      <main className="flex-grow">
        {activeTab === 'home' ? (
          <>
            <Hero 
              onOpenConsultation={() => handleOpenConsultation()} 
              onOpenCalculator={() => setCalculatorModalOpen(true)}
              theme={theme} 
            />
            <Services onSelectService={(serviceTitle) => handleOpenConsultation(serviceTitle)} theme={theme} />
            <StatsSection theme={theme} />
            <DeyeAndLegal onOpenConsultation={() => handleOpenConsultation()} theme={theme} />
            <StepProcess onOpenConsultation={() => handleOpenConsultation()} theme={theme} />
            
            {/* Consultation Section on Home Page */}
            <section id="consultation" className="py-16 sm:py-20 transition-colors duration-300 border-t theme-bg-section theme-border-subtle">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ConsultationForm selectedServicePrefill={prefilledService} theme={theme} />
              </div>
            </section>
          </>
        ) : (
          <ContactsPage theme={theme} />
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        onOpenConsultation={() => handleOpenConsultation()} 
        theme={theme}
      />

      {/* Global Consultation Modal */}
      {consultationModalOpen && (
        <div 
          onClick={(e) => { if (e.target === e.currentTarget) setConsultationModalOpen(false); }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-[95%] sm:w-full max-w-xl my-auto max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl">
            <button
              onClick={() => setConsultationModalOpen(false)}
              aria-label="Закрити консультацію"
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 p-2 rounded-full border transition-all theme-badge shadow-xs hover:scale-105"
            >
              <X className="w-5 h-5 theme-icon-accent" />
            </button>
            <ConsultationForm 
              selectedServicePrefill={prefilledService}
              onCloseModal={() => setConsultationModalOpen(false)}
              theme={theme}
            />
          </div>
        </div>
      )}

      {/* Calculator Modal */}
      {calculatorModalOpen && (
        <CalculatorModal 
          onClose={() => setCalculatorModalOpen(false)}
          theme={theme}
        />
      )}

    </div>
  );
}
