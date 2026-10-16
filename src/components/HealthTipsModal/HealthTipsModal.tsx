import React, { useState } from 'react';
import { Lightbulb, X, Droplets, HeartPulse, Dumbbell, Sparkles } from 'lucide-react';

export const HealthTipsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const tips = [
    {
      icon: Droplets,
      title: "Hidratação Inteligente",
      description: "A água é essencial para o transporte de nutrientes e contração muscular. Beba regularmente ao longo do dia, não apenas quando sentir sede. A regra geral é de cerca de 35ml a 40ml por quilo corporal."
    },
    {
      icon: HeartPulse,
      title: "Saúde e Descanso",
      description: "O verdadeiro ganho de massa muscular e a queima de gordura ocorrem durante o repouso. Garanta de 7 a 8 horas de sono de qualidade para otimizar a sua recuperação hormonal e física."
    },
    {
      icon: Dumbbell,
      title: "Constância nos Exercícios",
      description: "Mais importante do que treinar com intensidade máxima apenas um dia é manter a constância semanal. Priorize a execução correta (biomecânica) antes de subir as cargas para evitar lesões."
    }
  ];

  return (
    <>
      {/* Botão Flutuante de Dicas (Visível em todas as telas) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold px-5 py-3.5 rounded-full shadow-2xl shadow-emerald-500/40 border border-emerald-400/50 transition-all duration-300 hover:scale-105 cursor-pointer"
          title="Dicas de Saúde & Performance"
        >
          <Lightbulb className="w-5 h-5 text-zinc-950 animate-bounce" />
          <span className="text-sm tracking-wide">Dicas Express</span>
        </button>
      </div>

      {/* Janela Suspensa (Modal) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-300">
          
          <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden">
            
            {/* Elemento decorativo de fundo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Cabeçalho do Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">Dicas de Performance</h3>
                  <p className="text-xs text-zinc-400">Orientações rápidas para o seu dia a dia</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white p-2 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lista de Dicas */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {tips.map((tip, idx) => {
                const TipIcon = tip.icon;
                return (
                  <div key={idx} className="bg-zinc-950/60 border border-zinc-800/80 p-4 rounded-2xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                      <TipIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{tip.title}</h4>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rodapé do Modal */}
            <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold py-3 rounded-xl text-sm transition-all shadow-lg cursor-pointer"
              >
                Entendido, vamos treinar!
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};