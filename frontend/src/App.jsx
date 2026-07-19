import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import StatsSection from './components/StatsSection';
import DeyeAndLegal from './components/DeyeAndLegal';
import StepProcess from './components/StepProcess';
import ConsultationForm from './components/ConsultationForm';
import ContactsPage from './pages/ContactsPage';
import CalculatorPage from './pages/CalculatorPage';
import Footer from './components/Footer';
import { X } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('chedryk_theme') || 'dark';
  });

  const [activeTab, setActiveTab] = useState('home');
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');

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
    setPrefilledService(serviceTitle);
    setConsultationModalOpen(true);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-amber-400 selection:text-slate-950 ${
      isDark ? 'bg-slate-900 text-slate-100 dark' : 'bg-amber-50/20 text-slate-900 light'
    }`}>
      
      {/* Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenConsultation={() => handleOpenConsultation()} 
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Body */}
      <main className="flex-grow">
        {activeTab === 'home' ? (
          <>
            <Hero 
              onNavigateCalculator={() => setActiveTab('calculator')} 
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
            <section id="consultation" className={`py-16 sm:py-20 border-t ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-amber-100'
            }`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ConsultationForm selectedServicePrefill={prefilledService} theme={theme} />
              </div>
            </section>
          </>
        ) : activeTab === 'calculator' ? (
          <CalculatorPage 
            theme={theme} 
            onOpenConsultation={(pref) => handleOpenConsultation(pref)} 
          />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl my-6">
            <button
              onClick={() => setConsultationModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <ConsultationForm 
              selectedServicePrefill={prefilledService}
              onCloseModal={() => setConsultationModalOpen(false)}
              theme={theme}
            />
          </div>
        </div>
      )}

    </div>
  );
}
