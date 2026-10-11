import React from 'react';
import { plans } from '../../data/plans';
import { paymentLinks } from '../../data/paymentLinks';
import { Check, ShieldCheck, Sparkles, Zap, ArrowRight } from 'lucide-react';

export const Plans: React.FC = () => {
  return (
    <section id="planos" className="py-28 bg-white text-zinc-900 relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px]" />

        <div className="absolute inset-0 opacity-[0.4]" style={{
          backgroundImage: `linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        <svg className="absolute inset-0 w-full h-full text-emerald-500/10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <path d="M-100,150 C400,350 300,650 700,450 C1100,250 1300,650 1600,300" />
          <path d="M-100,500 C300,700 800,200 1200,600 C1400,700 1500,400 1700,450" opacity="0.5" />
        </svg>

        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-emerald-500/30 rounded-tl-lg hidden lg:block" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-emerald-500/30 rounded-tr-lg hidden lg:block" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-4 shadow-inner">
            <Zap className="w-3.5 h-3.5 text-emerald-600" /> Investimento Estratégico
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Escolha como você quer <span className="text-emerald-600 underline decoration-emerald-500/30 underline-offset-8">evoluir</span>
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
            Planos estruturados para garantir acompanhamento de perto, periodização inteligente e resultados consistentes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {plans.map((plan) => {
            const link = paymentLinks[plan.paymentLinkKey];
            const isFeatured = Boolean(plan.badge);

            return (
              <div 
                key={plan.id} 
                className={`relative bg-zinc-50/90 backdrop-blur-md rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group ${
                  isFeatured 
                    ? 'border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 ring-4 ring-emerald-500/10 bg-white' 
                    : 'border border-zinc-200/90 hover:border-emerald-500/50'
                }`}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl" />

                {plan.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-zinc-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 fill-zinc-950" /> {plan.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {plan.name}
                  </h3>
                  
                  <div className="my-6 pb-6 border-b border-zinc-200/80">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-bold text-zinc-500">R$</span>
                      <span className="text-4xl font-black text-zinc-950 tracking-tight">{plan.monthlyPrice}</span>
                      <span className="text-sm font-medium text-zinc-500">/mês</span>
                    </div>
                    {plan.durationMonths > 1 && (
                      <p className="text-xs font-semibold text-emerald-600 mt-2 bg-emerald-500/10 py-1 px-2.5 rounded-md inline-block">
                        Total do período: R$ {plan.totalPrice}
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-zinc-600 leading-relaxed">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-colors">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-full font-bold py-4 rounded-xl text-center transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group/btn ${
                    isFeatured
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-emerald-500/20'
                      : 'bg-zinc-950 hover:bg-emerald-600 text-white'
                  }`}
                >
                  <span>Contratar Plano</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-20 flex items-center justify-center gap-2.5 text-xs font-medium text-zinc-500 bg-zinc-50/80 border border-zinc-200/60 max-w-md mx-auto py-3 px-6 rounded-full shadow-inner">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Pagamento 100% seguro via Mercado Pago • PIX e Cartões</span>
        </div>

      </div>
    </section>
  );
};