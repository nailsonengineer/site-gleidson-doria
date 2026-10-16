import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

export const Methodology: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-28 bg-zinc-950 text-white relative overflow-hidden">
      
      {/* Atmosfera de luzes e profundidade imersiva */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute top-10 left-10 w-80 h-80 bg-emerald-600/5 rounded-full blur-[120px]" />
        
        {/* Grid técnico sutil de precisão ao fundo */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabeçalho de Autoridade */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-4 shadow-inner">
            <Activity className="w-3.5 h-3.5 text-emerald-400" /> Método Baseado em Evidências
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6">
            Como funciona a sua <span className="text-emerald-400 underline decoration-emerald-500/30 underline-offset-8">evolução</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Um processo estruturado, seguro e humanizado, desenhado para transformar sua relação com o corpo e garantir resultados consistentes.
          </p>
        </div>

        {/* Layout Dinâmico em Linha do Tempo / Processo Conectado */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Lado Esquerdo: Seletor de Etapas Interativo */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {testimonials.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    isActive 
                      ? 'bg-zinc-900/90 border-emerald-500/60 shadow-xl shadow-emerald-500/5 translate-x-2' 
                      : 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900/70 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <span className={`text-2xl font-black transition-colors ${isActive ? 'text-emerald-400' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                      0{index + 1}
                    </span>
                    <div>
                      <h4 className={`text-base sm:text-lg font-bold transition-colors ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-zinc-500 font-medium mt-0.5">Etapa estratégica do método</p>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isActive ? 'bg-emerald-500 text-zinc-950 scale-110 shadow-lg shadow-emerald-500/30' : 'bg-zinc-800 text-zinc-500'
                  }`}>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-0.5' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lado Direito: Card de Exibição Dinâmica (Destaque do Passo Ativo) */}
          <div className="lg:col-span-7">
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-900 to-zinc-950 border border-emerald-500/30 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden group">
              
              {/* Linha de luz superior animada */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-80" />

              {/* Número grande de fundo estilizado */}
              <div className="absolute right-4 bottom-0 text-[180px] font-black text-emerald-500/[0.04] pointer-events-none select-none leading-none">
                0{activeStep + 1}
              </div>

              <div className="relative z-10 flex flex-col justify-between min-h-[320px]">
                
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-max mb-6">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Passo {activeStep + 1} de {testimonials.length}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
                    {testimonials[activeStep].title}
                  </h3>

                  <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-medium">
                    {testimonials[activeStep].description}
                  </p>
                </div>

                <div className="pt-8 mt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Acompanhamento integrado e individualizado</span>
                  </div>

                  <a 
                    href="#contato" 
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold px-6 py-3 rounded-xl text-xs transition-all duration-300 shadow-xl shadow-emerald-500/20 cursor-pointer"
                  >
                    <span>Iniciar Esta Jornada</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};