import React, { useState } from 'react';
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

  const handleOpenConsultation = (serviceTitle = '') => {
    setPrefilledService(serviceTitle);
    setConsultationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      
      {/* Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenConsultation={() => handleOpenConsultation()} 
      />

      {/* Main Content Body */}
      <main className="flex-grow">
        {activeTab === 'home' ? (
          <>
            <Hero onOpenConsultation={() => handleOpenConsultation()} />
            <Services onSelectService={(serviceTitle) => handleOpenConsultation(serviceTitle)} />
            <StatsSection />
            <StepProcess onOpenConsultation={() => handleOpenConsultation()} />
            
            {/* Consultation Section on Home Page */}
            <section id="consultation" className="py-20 bg-slate-950 relative border-t border-slate-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ConsultationForm selectedServicePrefill={prefilledService} />
              </div>
            </section>
          </>
        ) : (
          <ContactsPage />
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        onOpenConsultation={() => handleOpenConsultation()} 
      />

      {/* Global Consultation Modal */}
      {consultationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl my-8">
            <button
              onClick={() => setConsultationModalOpen(false)}
              className="absolute top-4 right-4 z-10 text-slate-400 hover:text-white p-2 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <ConsultationForm 
              selectedServicePrefill={prefilledService}
              onCloseModal={() => setConsultationModalOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
}
