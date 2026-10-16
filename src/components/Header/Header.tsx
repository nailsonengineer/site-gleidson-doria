import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell, User, Sparkles } from 'lucide-react';
import { trainer } from '../../data/trainer';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-zinc-950/85 backdrop-blur-xl py-4 border-b border-zinc-800/80 shadow-2xl shadow-black/50' 
        : 'bg-transparent py-6'
    }`}>
      
      {/* Linha de luz superior sutil quando scrolado */}
      {isScrolled && (
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      )}

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logotipo com Ícone Estilizado */}
        <a href="#inicio" className="flex items-center gap-3 text-white font-black text-lg tracking-wider group select-none">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all duration-300 shadow-inner">
            <Dumbbell className="w-5 h-5" />
          </div>
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            {trainer.name.toUpperCase()}
          </span>
        </a>

        {/* Navegação Desktop (Ajustada para o breakpoint de 1920px em harmonia com o Hero) */}
        <nav className="hidden xl:flex items-center gap-7 text-sm font-semibold text-zinc-300">
          <a href="#inicio" className="hover:text-emerald-400 transition-colors relative group py-1">
            Início
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#sobre" className="hover:text-emerald-400 transition-colors relative group py-1">
            Quem sou
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#servicos" className="hover:text-emerald-400 transition-colors relative group py-1">
            Serviços
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#planos" className="hover:text-emerald-400 transition-colors relative group py-1">
            Planos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#blog" className="hover:text-emerald-400 transition-colors relative group py-1">
            Livro / E-Book
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#resultados" className="hover:text-emerald-400 transition-colors relative group py-1">
            Resultados
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#calculadoras" className="hover:text-emerald-400 transition-colors relative group py-1">
            Calculadora
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#contato" className="hover:text-emerald-400 transition-colors relative group py-1">
            Contatos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
          </a>
        </nav>

        {/* Ações Desktop (Área do Aluno) */}
        <div className="hidden lg:flex items-center gap-3">
          <a 
            href="https://client.mfitpersonal.com.br/out/signup-link/MjA5NjI=" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white px-3.5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-emerald-500/50 transition-all duration-300 shadow-inner cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-emerald-400" /> Área do Aluno
          </a>
        </div>

        {/* Botão do Menu Mobile / Tablet */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="xl:hidden text-zinc-300 hover:text-white p-2.5 bg-zinc-900/80 border border-zinc-800 rounded-xl focus:outline-none transition-all duration-300 active:scale-95 cursor-pointer"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-400" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Dropdown Mobile / Tablet */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-950/98 backdrop-blur-2xl border-b border-zinc-800 py-8 px-6 flex flex-col gap-5 shadow-2xl xl:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest pb-2 border-b border-zinc-900">
            <Sparkles className="w-3.5 h-3.5" /> Menu de Navegação
          </div>

          <div className="grid grid-cols-2 gap-3 text-base font-semibold">
            <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-emerald-400 py-2 transition-colors">/ Início</a>
            <a href="#sobre" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-emerald-400 py-2 transition-colors">/ Quem sou</a>
            <a href="#servicos" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-emerald-400 py-2 transition-colors">/ Serviços</a>
            <a href="#planos" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-emerald-400 py-2 transition-colors">/ Planos</a>
            <a href="#blog" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-emerald-400 py-2 transition-colors">/ Livro / E-Book</a>
            <a href="#resultados" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-emerald-400 py-2 transition-colors">/ Resultados</a>
            <a href="#calculadoras" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-emerald-400 py-2 transition-colors">/ Calculadora</a>
            <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-emerald-400 py-2 transition-colors">/ Contatos</a>
          </div>
          
          <div className="pt-6 border-t border-zinc-900 flex flex-col gap-3">
            <a 
              href="https://client.mfitpersonal.com.br/out/signup-link/MjA5NjI=" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center justify-center gap-2 text-sm font-semibold text-zinc-300 py-3.5 border border-zinc-800 rounded-xl bg-zinc-900/60 hover:border-emerald-500/50 transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-emerald-400" /> Área do Aluno
            </a>
          </div>
        </div>
      )}
    </header>
  );
};