import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import StatsSection from './components/StatsSection';
import DeyeAndLegal from './components/DeyeAndLegal';
import StepProcess from './components/StepProcess';
import ConsultationForm from './components/ConsultationForm';
import ContactsPage from './pages/ContactsPage';
import Footer from './components/Footer';
import { X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');

  const handleOpenConsultation = (serviceTitle = '') => {
    setPrefilledService(serviceTitle);
    setConsultationModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-900 text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      
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
            <DeyeAndLegal onOpenConsultation={() => handleOpenConsultation()} />
            <StepProcess onOpenConsultation={() => handleOpenConsultation()} />
            
            {/* Consultation Section on Home Page */}
            <section id="consultation" className="py-16 sm:py-20 bg-slate-900 border-t border-slate-800">
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
            />
          </div>
        </div>
      )}

    </div>
  );
}
