import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import StatsSection from './components/StatsSection';
import StepProcess from './components/StepProcess';
import ConsultationForm from './components/ConsultationForm';
import ContactsPage from './pages/ContactsPage';
import Footer from './components/Footer';
import { X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'contacts'
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');
  
  // Theme state: 'dark' or 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('chedryk_theme') || 'dark';
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

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenConsultation = (serviceTitle = '') => {
    setPrefilledService(serviceTitle);
    setConsultationModalOpen(true);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${theme} ${
      isDark ? 'bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950' : 'bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-900'
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
            <Hero onOpenConsultation={() => handleOpenConsultation()} theme={theme} />
            <Services onSelectService={(serviceTitle) => handleOpenConsultation(serviceTitle)} theme={theme} />
            <StatsSection theme={theme} />
            <StepProcess onOpenConsultation={() => handleOpenConsultation()} theme={theme} />
            
            {/* Consultation Section on Home Page */}
            <section id="consultation" className={`py-16 sm:py-20 transition-colors duration-300 border-t ${
              isDark ? 'bg-slate-950 border-slate-900' : 'bg-slate-100 border-slate-200'
            }`}>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl my-6">
            <button
              onClick={() => setConsultationModalOpen(false)}
              className={`absolute top-4 right-4 z-10 p-2 rounded-full border transition-colors ${
                isDark ? 'text-slate-400 hover:text-white bg-slate-900 border-slate-800' : 'text-slate-500 hover:text-slate-900 bg-slate-100 border-slate-200'
              }`}
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
