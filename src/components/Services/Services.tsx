import React from 'react';
import { Dumbbell, Laptop, ShieldCheck, BookOpen, Users, Award, ArrowRight, Zap } from 'lucide-react';

const services = [
  {
    icon: Dumbbell,
    num: "01",
    title: "Consultoria Presencial",
    description: "Acompanhamento individualizado e focado em alta performance, hipertrofia ou emagrecimento com correção biomecânica em tempo real e foco absoluto na segurança."
  },
  {
    icon: Laptop,
    num: "02",
    title: "Consultoria Online",
    description: "Planejamento de treinamento periodizado e acessível de qualquer lugar, com suporte contínuo, ajuste de cargas e avaliação de progresso à distância."
  },
  {
    icon: ShieldCheck,
    num: "03",
    title: "Reabilitação & Condicionamento",
    description: "Trabalho técnico integrado para prevenção e recuperação de lesões, garantindo retorno seguro e progressivo às atividades e treinos de força."
  },
  {
    icon: Users,
    num: "04",
    title: "Avaliação Postural & Biomecânica",
    description: "Análise minuciosa dos padrões de movimento para identificar assimetrias, otimizar a execução dos exercícios e prevenir sobrecargas articulares."
  },
  {
    icon: BookOpen,
    num: "05",
    title: "E-book: Personal de Valor",
    description: "Material estratégico desenvolvido com base em anos de experiência para guiar profissionais que desejam ir além do básico e se destacar no mercado."
  },
  {
    icon: Award,
    num: "06",
    title: "Mentoria & Posicionamento",
    description: "Orientações práticas para treinadores que buscam elevar a qualidade do serviço prestado, construir autoridade e valorizar sua carreira na educação física."
  }
];

export const Services: React.FC = () => {
  const phoneNumber = "5571993927472";
  const message = encodeURIComponent("Olá! Gostaria de iniciar uma consultoria com o Gleidson Doria e levar meu treinamento para o próximo nível.");
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

  return (
    <section id="servicos" className="py-28 bg-white text-zinc-900 relative overflow-hidden">
      
      {/* Fundo Premium Clean (Textura Geométrica Sofisticada + Glows de Profundidade) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[140px]" />

        {/* Grid técnico sutil de precisão */}
        <div className="absolute inset-0 opacity-[0.4]" style={{
          backgroundImage: `linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        {/* Detalhes de moldura técnica nos cantos */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-emerald-500/20 rounded-tl-lg hidden lg:block" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-emerald-500/20 rounded-tr-lg hidden lg:block" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabeçalho de Autoridade */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-4 shadow-inner">
            <Zap className="w-3.5 h-3.5 text-emerald-600" /> Metodologia & Soluções Exclusivas
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Como posso ajudar você a <span className="text-emerald-600 underline decoration-emerald-500/30 underline-offset-8">evoluir</span>
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
            Soluções estruturadas para transformar sua performance física ou elevar o seu nível profissional no mercado fitness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx} 
                className="bg-zinc-50/90 backdrop-blur-md border border-zinc-200/90 p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/50 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all duration-300 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-2xl font-black text-zinc-300 group-hover:text-emerald-600/40 transition-colors tracking-tighter">
                      {service.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-zinc-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-zinc-200/80">
                  <a 
                    href={whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors"
                  >
                    <span>Falar com a Assessoria</span> 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

