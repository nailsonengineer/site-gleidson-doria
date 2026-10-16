import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import { PrivacyPolicy } from '../pages/Privacy/PrivacyPolicy';
import { TermsOfUse } from '../pages/Terms/TermsOfUse'; // Importe os Termos de Uso aqui

type ModalType = 'policy' | 'terms' | null;

interface ModalContextData {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext({} as ModalContextData);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setActiveModal(type);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'unset';
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'policy':
        return <PrivacyPolicy onClose={closeModal} />;
      case 'terms':
        return <TermsOfUse onClose={closeModal} />; // Renderiza o componente real de Termos
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl h-[85vh] bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">
            {renderModalContent()}
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
      `}</style>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);