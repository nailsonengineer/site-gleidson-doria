import React from 'react';
import { trainer } from '../../data/trainer';
import { CheckCircle2, Award, BookOpen, ShieldCheck, TrendingUp } from 'lucide-react';

import gleidsonLivroImg from '../../assets/img/perfil/IMG_5697.PNG';

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      
      {/* Elementos decorativos de fundo sofisticados (Brilho de destaque + Textura sutil) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Imagem com enquadramento superior ajustado */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl">
            <img 
              src={gleidsonLivroImg} 
              alt={trainer.name} 
              className="w-full h-[620px] object-cover object-[center_60%]"
            />
            {/* Gradiente sutil interno na imagem para melhor leitura estética */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
            
            {/* Badge flutuante de autoridade */}
            <div className="absolute bottom-6 left-6 right-6 bg-zinc-900/90 backdrop-blur-md border border-zinc-700/60 p-4 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Excelência & Autoridade</p>
                <p className="text-xs text-zinc-400">Anos de experiência transformando carreiras e corpos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Textos & Pilares Profissionais */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" /> Sobre o Profissional
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Mais do que treinar. <span className="text-emerald-400">Construir valor e evolução real.</span>
          </h2>

          <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
            {trainer.bio}
          </p>

          <p className="text-zinc-400 text-sm leading-relaxed">
            Especialista em unir a ciência do treinamento físico, biomecânica avançada e um atendimento inteiramente humanizado. Meu propósito é ir além do básico — seja otimizando a performance e a saúde de meus alunos ou elevando o padrão de outros profissionais através do e-book estratégico <strong className="text-zinc-200">"Personal Trainer de Valor"</strong>.
          </p>
          
          {/* Lista de Diferenciais Técnicos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 w-full">
            {[
              { text: 'Prescrição baseada em evidências', icon: TrendingUp },
              { text: 'Correção biomecânica rigorosa', icon: CheckCircle2 },
              { text: 'Acompanhamento humanizado', icon: ShieldCheck },
              { text: 'Desenvolvimento e mentoria de valor', icon: BookOpen },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800/80 p-3.5 rounded-xl">
                  <Icon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-zinc-200">{item.text}</span>
                </div>
              );
            })}
          </div>

          {/* Rodapé técnico da seção */}
          <div className="pt-6 border-t border-zinc-800/80 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CREF: <strong className="text-zinc-200">{trainer.cref}</strong></span>
            </div>
            <span>Atuação: <strong className="text-zinc-200">Presencial & Online ({trainer.city})</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
};