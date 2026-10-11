import React, { useState, useEffect } from 'react';
import { Sparkles, Quote, ChevronLeft, ChevronRight, Star, Zap } from 'lucide-react';
import tatianeFoto from '../../assets/img/clientes/tatiane-santos.jpeg';
import vanessaFoto from '../../assets/img/clientes/vanessa-nichetti.jpeg';
import lilianeFoto from '../../assets/img/clientes/liliane-bamberg.jpeg';
import igorFoto from '../../assets/img/clientes/igor-leite.png';
import larissaFoto from '../../assets/img/clientes/larissa-dorea.jpeg';
import cindeFoto from '../../assets/img/clientes/cinde-moane.PNG';

const testimonialsData = [
  {
    name: "Tatiane Santos",
    role: "Consultoria Presencial • 43 anos",
    comment: "Com o Gleidson são 13 anos de uma história que vai muito além dos treinos. Vivemos gestação, cirurgias e muitas superações. Você se tornou muito mais que meu personal: é amigo, conselheiro e incentivador. Sou muito grata por nunca deixar de acreditar em mim!",
    avatar: tatianeFoto,
    rating: 5,
    objectPosition: "object-top"
  },
  {
    name: "Vanessa Nichetti",
    role: "Consultoria Presencial • 38 anos",
    comment: "Permanecer anos com um profissional fala sobre confiança e conexão. Além de muito competente e dedicado, ele tem um olhar atento que respeita nossos limites. O treino se tornou um momento leve, agradável, de boas conversas e amizade.",
    avatar: vanessaFoto,
    rating: 5,
    objectPosition: "object-[center_25%]"
  },
  {
    name: "Líliane Bamberg",
    role: "Consultoria Presencial • 53 anos",
    comment: "Há 5 anos o Gleidson conquistou nossa família! O que admiro nele vai muito além do treino: é a capacidade de enxergar cada pessoa de forma única, transformando tudo em saúde e evolução. Você não treina apenas corpos, transforma vidas. Que sorte a nossa!",
    avatar: lilianeFoto,
    rating: 5,
    objectPosition: "object-[center_25%]"
  },
  {
    name: "Igor Leite",
    role: "Consultoria On-line • 32 anos",
    comment: "Treino com o Gleidson há mais de 10 anos (hoje na consultoria online). Seu atendimento se diferencia pela atenção técnica, baseada na ciência e adaptada às necessidades de cada um. Minha confiança é tanta que ele hoje atende minha mãe e meu irmão!",
    avatar: igorFoto,
    rating: 5,
    objectPosition: "object-top"
  },
  {
    name: "Larissa Dorea",
    role: "Consultoria On-line • 43 anos",
    comment: "A consultoria é realmente diferenciada! O cuidado e a atenção à execução fazem toda a diferença. O processo é constante e, em apenas 60 dias, meu corpo já está muito mais bonito e torneado. Estou satisfeitíssima!",
    avatar: larissaFoto,
    rating: 5,
    objectPosition: "object-top"
  },
  {
    name: "Cinde Moane",
    role: "Consultoria • 37 anos",
    comment: "Entrar na consultoria foi a melhor escolha que poderia fazer. O diferencial é o acompanhamento humano: tem cuidado, atenção e cobrança na medida certa. Não é só treino, é um suporte que me faz mais forte, confiante e com o corpo evoluindo. Gratidão!",
    avatar: cindeFoto,
    rating: 5,
    objectPosition: "object-center" 
  }
];

export const Results: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Carrossel automático a cada 6 segundos (pausa se o modal estiver aberto)
  useEffect(() => {
    if (isModalOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isModalOpen]);

  const current = testimonialsData[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  return (
    <section id="resultados" className="py-28 bg-white text-zinc-900 relative overflow-hidden">
      
      {/* Atmosfera e Iluminação Surreal de Fundo (bg-white puro) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glows radiais nas diagonais */}
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px]" />

        {/* Grid técnico sutil de precisão */}
        <div className="absolute inset-0 opacity-[0.4]" style={{
          backgroundImage: `linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        {/* Molduras de Canto Técnicas */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-emerald-500/30 rounded-tl-lg hidden lg:block" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-emerald-500/30 rounded-tr-lg hidden lg:block" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabeçalho de Autoridade */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-4 shadow-inner">
            <Zap className="w-3.5 h-3.5 text-emerald-600" /> Prova Social & Histórias Reais
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Histórias que inspiram <span className="text-emerald-600 underline decoration-emerald-500/30 underline-offset-8">resultados</span>
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
            O impacto real do método na vida, na saúde e na performance de quem confia no trabalho.
          </p>
        </div>

        {/* Card Principal do Carrossel */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Botões de Navegação Lateral Externa */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 z-20 w-12 h-12 rounded-full bg-white border border-zinc-200/90 shadow-xl flex items-center justify-center text-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 hover:border-emerald-500 transition-all duration-300 cursor-pointer hidden sm:flex"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 z-20 w-12 h-12 rounded-full bg-white border border-zinc-200/90 shadow-xl flex items-center justify-center text-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 hover:border-emerald-500 transition-all duration-300 cursor-pointer hidden sm:flex"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Caixa Central do Testemunho */}
          <div className="bg-zinc-50/90 backdrop-blur-md border border-zinc-200/90 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden group">
            
            {/* Linha de luz superior no hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-80" />

            {/* Ícone de Citação Grande em Marca d'água */}
            <div className="absolute top-6 right-8 text-emerald-500/10 pointer-events-none">
              <Quote className="w-24 h-24" />
            </div>

            <div className="relative z-10 flex flex-col justify-between min-h-[380px]">
              
              <div>
                {/* Cabeçalho do Aluno (Avatar com borda brilhante e zoom) */}
                <div className="flex items-center gap-5 mb-8">
                  <div 
                    className="relative group/avatar cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                    title="Clique para ver em formato retrato"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full blur opacity-70 group-hover/avatar:opacity-100 transition duration-300" />
                    <img 
                      src={current.avatar} 
                      alt={current.name} 
                      className={`relative w-20 h-20 object-cover rounded-full border-2 border-white shadow-md transition-transform duration-500 group-hover/avatar:scale-105 ${current.objectPosition}`} 
                    />
                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-zinc-900 tracking-tight">{current.name}</h3>
                    <p className="text-sm font-bold text-emerald-600 mt-0.5">{current.role}</p>
                  </div>
                </div>

                {/* Avaliação em Estrelas e Depoimento */}
                <div className="mb-8">
                  <div className="flex gap-1 mb-4 text-emerald-500">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>
                  <p className="text-base sm:text-lg text-zinc-700 italic leading-relaxed whitespace-pre-line font-medium">
                    "{current.comment}"
                  </p>
                </div>
              </div>

              {/* Rodapé Interno com Controles Mobile e Bolinhas */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-200/80">
                <div className="flex justify-center items-center gap-2">
                  {testimonialsData.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentIndex === idx ? 'w-10 bg-emerald-500 shadow-md shadow-emerald-500/20' : 'w-2.5 bg-zinc-300 hover:bg-zinc-400'
                      }`}
                      aria-label={`Ir para depoimento ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Setas Mobile */}
                <div className="flex sm:hidden gap-3">
                  <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-800 cursor-pointer">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={handleNext} className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-800 cursor-pointer">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-xs text-zinc-400 font-semibold tracking-wider uppercase">
                  Depoimento {currentIndex + 1} de {testimonialsData.length}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Modal de Retrato (Abre ao clicar na foto) com Estilo Cinematográfico */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative max-w-sm w-full bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de Fechar */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 z-20 bg-zinc-900/90 hover:bg-emerald-500 hover:text-zinc-950 text-white w-10 h-10 rounded-full flex items-center justify-center border border-zinc-700 transition-all duration-300 shadow-xl cursor-pointer"
              aria-label="Fechar"
            >
              ✕
            </button>

            {/* Imagem em tamanho de retrato otimizada */}
            <img 
              src={current.avatar} 
              alt={current.name} 
              className={`w-full h-[420px] object-cover rounded-2xl ${current.objectPosition}`} 
            />

            {/* Informações do Aluno no Modal */}
            <div className="p-6 text-center bg-zinc-950 text-white">
              <h4 className="text-xl font-extrabold">{current.name}</h4>
              <p className="text-xs font-semibold text-emerald-400 mt-1">{current.role}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};