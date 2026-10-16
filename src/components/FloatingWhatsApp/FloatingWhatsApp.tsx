import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      // Esconde o botão imediatamente assim que a página começa a rolar
      setIsVisible(false);

      clearTimeout(scrollTimeout);

      // Define um tempo (150ms) após o fim do scroll para reaparecer o botão
      // desde que não haja nenhum modal/janela suspensa aberta
      scrollTimeout = setTimeout(() => {
        const hasOpenModal = document.querySelector('[role="dialog"]') || document.querySelector('.backdrop-blur-md');
        if (!hasOpenModal) {
          setIsVisible(true);
        }
      }, 150);
    };

    // Monitora também cliques para detectar se um modal foi aberto ou fechado
    const handleModalCheck = () => {
      const hasOpenModal = document.querySelector('.fixed.inset-0.z-50');
      if (hasOpenModal) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleModalCheck);
    
    // Observer para detectar mudanças no DOM (caso modais abram/fechem via estado)
    const observer = new MutationObserver(() => {
      const hasOpenModal = document.querySelector('.fixed.inset-0.z-50');
      if (hasOpenModal) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleModalCheck);
      observer.disconnect();
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <a 
      href="#planos"
      className={`fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center border border-emerald-400/50 cursor-pointer group ${
        isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Ver planos"
    >
      <div className="w-6 h-6 rounded-full bg-zinc-950 text-emerald-400 flex items-center justify-center group-hover:rotate-12 transition-transform">
        <DollarSign className="w-4 h-4" />
      </div>
    </a>
  );
};