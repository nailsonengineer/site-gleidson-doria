import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, BookOpen, ShoppingBag, BookMarked, Truck, Award, Users, Dumbbell } from 'lucide-react';

const formatBRL = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Atalhos de navegação dentro da seção
const quickLinks = [
  { id: 'ebooks', label: 'E-books', icon: BookOpen },
  { id: 'livro', label: 'Livro físico', icon: BookMarked },
  { id: 'mentorias', label: 'Mentorias', icon: Award },
];

// Estilos repetidos
const hoverOnly = '[@media(hover:hover)]'; // evita "hover preso" em telas de toque
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50';

interface BlockHeadingProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  dark?: boolean;
}

// Cabeçalho de cada bloco (ícone + título + subtítulo)
const BlockHeading: React.FC<BlockHeadingProps> = ({ icon: Icon, title, subtitle, dark = false }) => (
  <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
    <div
      className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
        dark ? 'bg-zinc-900 text-emerald-400' : 'bg-emerald-500/10 text-emerald-600'
      }`}
    >
      <Icon className="w-5 h-5" />
    </div>
    <div className="min-w-0">
      <h3 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight leading-tight">{title}</h3>
      <p className="text-sm text-zinc-500 mt-0.5">{subtitle}</p>
    </div>
  </div>
);

export const Ebook: React.FC = () => {
  const digitalBooks = [
    {
      title: 'Prescrição de Treinamento para Emagrecimento',
      category: 'E-book Digital • Acesso Imediato',
      summary: 'Metodologia avançada e baseada em evidências científicas para otimizar a perda de gordura, controle de cargas e prescrição eficiente de exercícios.',
      image: 'https://pub-7baa56ad888f4ca9be47e9a301b4010f.r2.dev/assets/img/livros/Profissional%20de%20Valor_%20Guia%20Pr%C3%A1tico.png',
      price: 39.90,
      hotmartLink: 'https://profissionaldevalor10.hotmart.host/prescricao-de-exercicio-para-o-emagrecimento-72968942-e4e8-4cd1-863c-8f79e07b46aa',
      badge: 'Foco em Emagrecimento'
    },
    {
      title: 'Seja um Personal Trainer de Valor',
      category: 'E-book Digital • Acesso Imediato',
      summary: 'Guia definitivo para profissionais que buscam autoridade, alta retenção de alunos, posicionamento de mercado e faturamento escalável na educação física.',
      image: 'https://pub-7baa56ad888f4ca9be47e9a301b4010f.r2.dev/assets/img/livros/ebook.png',
      price: 29.90,
      hotmartLink: 'https://gleidsondoria88.hotmart.host/seja-um-personal-trainer-de-valor-f82583c2-905f-4b8b-aeab-fafaaeb479d8',
      badge: 'Carreira & Autoridade'
    }
  ];

  const physicalBook = {
    title: 'Musculação: O Caos Perfeito',
    category: 'Livro Físico Especializado',
    summary: 'Convida o leitor a ampliar seu olhar sobre a musculação e a importância de um trabalho conduzido com conhecimento, critério e propósito. Uma leitura para profissionais, estudantes e apaixonados que desejam refletir sobre a prática e os pilares para a construção de resultados.',
    image: 'https://pub-7baa56ad888f4ca9be47e9a301b4010f.r2.dev/assets/img/livros/Muscula%C3%A7%C3%A3o_%20O%20Caos%20Perfeito.png',
    price: 79.90,
    stock: 12,
    hotmartLink: 'https://profissionaldevalor10.hotmart.host/musculacao-o-caos-perfeito-900fd965-c0eb-497c-b278-2d0c1b364dd7'
  };

  const mentorships = [
    {
      title: 'Atendimento ao Cliente na Academia',
      category: 'Curso & Mentoria Profissional',
      summary: 'O curso integra conhecimento técnico e relacionamento com o cliente, abordando comunicação e acolhimento dentro da academia. A mentoria aprofunda esse aprendizado, orientando sua aplicação aos desafios da prática profissional.',
      icon: Users,
      badge: 'Relacionamento & Retenção',
      actionText: 'Quero Participar da Mentoria',
      link: '#contato'
    },
    {
      title: 'Prescrição de Exercício Avançada',
      category: 'Curso & Mentoria Profissional',
      summary: 'O curso integra conhecimento técnico relacionado a estratégias para planejar e ajustar o treinamento conforme as necessidades, objetivos e a realidade de cada aluno. A mentoria aprofunda a aplicação prática no ambiente da academia.',
      icon: Dumbbell,
      badge: 'Metodologia & Planejamento',
      actionText: 'Garantir Minha Vaga',
      link: '#contato'
    }
  ];

  return (
    <section id="blog" className="py-16 sm:py-20 lg:py-28 bg-white text-zinc-900 relative overflow-hidden border-t border-b border-zinc-200">

      {/* Background claro texturizado & glows suaves (menores e mais leves no mobile) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <div className="absolute top-20 sm:top-1/4 left-1/2 -translate-x-1/2 w-[320px] h-[320px] sm:w-[900px] sm:h-[600px] bg-emerald-500/5 rounded-full blur-[80px] sm:blur-[150px]" />
        <div className="absolute bottom-0 right-0 sm:bottom-10 sm:right-10 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-emerald-600/5 rounded-full blur-[80px] sm:blur-[130px]" />

        {/* Grid técnico sutil de fundo claro */}
        <div className="absolute inset-0 opacity-[0.4]" style={{
          backgroundImage: `linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Cabeçalho principal da seção */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider sm:tracking-widest uppercase text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-3 sm:px-4 py-2 rounded-full mb-5 shadow-inner max-w-full">
            <BookOpen className="w-4 h-4 shrink-0 text-emerald-600" />
            <span className="text-balance">Publicações, E-books & Mentorias Oficiais</span>
          </span>
          <h2 className="text-[1.75rem] sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.15]">
            Conhecimento prático para <span className="text-emerald-600 underline decoration-emerald-500/30 underline-offset-8">transformar resultados</span>
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
            Explore os e-books digitais de acesso imediato, o livro físico especializado e os programas avançados de mentoria profissional.
          </p>
        </div>

        {/* Atalhos: rolam na horizontal no mobile e ficam centralizados no tablet/desktop */}
        <nav
          aria-label="Atalhos da seção"
          className="-mx-4 px-4 sm:mx-0 sm:px-0 mb-12 sm:mb-16 lg:mb-20 flex gap-2.5 sm:justify-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {quickLinks.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 border border-zinc-200 text-xs sm:text-sm font-semibold text-zinc-700 transition-colors duration-300 ${hoverOnly}:hover:border-emerald-500/50 ${hoverOnly}:hover:text-emerald-700 active:bg-emerald-50 ${focusRing}`}
            >
              <Icon className="w-4 h-4 text-emerald-600" />
              {label}
            </a>
          ))}
        </nav>

        {/* BLOCO 1: E-BOOKS DIGITAIS (Hotmart) */}
        <div id="ebooks" className="mb-14 sm:mb-20 scroll-mt-24">
          <BlockHeading
            icon={BookOpen}
            title="E-books Digitais (Hotmart)"
            subtitle="Conteúdos estratégicos em PDF com leitura e acesso instantâneos."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {digitalBooks.map((ebook) => (
              <article
                key={ebook.title}
                className={`bg-zinc-50 border border-zinc-200/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group ${hoverOnly}:hover:-translate-y-1`}
              >
                <div>
                  <div className="h-60 sm:h-72 overflow-hidden relative bg-zinc-950 flex items-center justify-center p-5 sm:p-6">
                    <img
                      src={ebook.image}
                      alt={`Capa do e-book ${ebook.title}`}
                      loading="lazy"
                      decoding="async"
                      className={`max-h-full w-auto object-contain ${hoverOnly}:group-hover:scale-105 transition-transform duration-700 shadow-2xl rounded-lg`}
                    />
                    <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-emerald-600 text-white text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                      {ebook.badge}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 mb-3">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-500/10 px-3 py-1 rounded-md">
                        {ebook.category}
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-emerald-600 whitespace-nowrap">
                        {formatBRL(ebook.price)}
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-extrabold text-zinc-900 group-hover:text-emerald-600 transition-colors mb-3 leading-snug">
                      {ebook.title}
                    </h4>

                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {ebook.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                  <a
                    href={ebook.hotmartLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full min-h-12 bg-zinc-900 hover:bg-emerald-600 text-white font-bold py-3.5 px-5 sm:px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm text-center leading-tight shadow-md group-hover:shadow-emerald-500/20 cursor-pointer ${focusRing}`}
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>Garantir E-book na Hotmart</span>
                    <ArrowRight className={`w-4 h-4 shrink-0 ${hoverOnly}:group-hover:translate-x-1 transition-transform`} />
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* BLOCO 2: LIVRO FÍSICO ESPECIALIZADO ("O Caos Perfeito")
            Mobile: empilhado | Tablet: capa à esquerda, texto e compra à direita | Desktop: 3 colunas */}
        <div id="livro" className="mb-14 sm:mb-20 scroll-mt-24">
          <BlockHeading
            icon={BookMarked}
            title="Livro Físico Especializado"
            subtitle="Obra impressa com tiragem limitada e envio para sua casa."
            dark
          />

          <article className={`bg-zinc-50 border border-zinc-200/90 rounded-2xl overflow-hidden shadow-lg hover:border-emerald-500/50 hover:shadow-xl transition-all duration-500 flex flex-col md:grid md:grid-cols-[13rem_1fr] lg:grid-cols-[17rem_1fr_16rem] group`}>

            {/* Capa */}
            <div className="relative bg-zinc-950 flex items-center justify-center p-5 h-60 md:h-auto md:row-span-2 lg:row-span-1">
              <img
                src={physicalBook.image}
                alt={`Capa do livro ${physicalBook.title}`}
                loading="lazy"
                decoding="async"
                className={`max-h-48 md:max-h-56 lg:max-h-60 w-auto object-contain ${hoverOnly}:group-hover:scale-105 transition-transform duration-500 shadow-xl rounded`}
              />
              <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Frete Grátis SSA
              </span>
            </div>

            {/* Conteúdo */}
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
                <span className="text-xs font-semibold text-zinc-600 bg-zinc-200/80 px-2.5 py-0.5 rounded">
                  {physicalBook.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                  <Truck className="w-3.5 h-3.5" /> Entrega Rápida
                </div>
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-zinc-900 group-hover:text-emerald-600 transition-colors mb-3 leading-tight">
                {physicalBook.title}
              </h4>

              <p className="text-sm text-zinc-600 leading-relaxed">
                {physicalBook.summary}
              </p>
            </div>

            {/* Preço e botão */}
            <div className="p-6 sm:p-8 bg-zinc-100/60 border-t lg:border-t-0 lg:border-l border-zinc-200 flex flex-col items-stretch sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-stretch lg:justify-center gap-4 sm:gap-6 lg:gap-4">
              <div>
                <span className="text-xs text-zinc-500 uppercase tracking-wider block font-semibold">Valor do Livro</span>
                <span className="text-3xl font-black text-emerald-600 whitespace-nowrap">{formatBRL(physicalBook.price)}</span>
              </div>

              <a
                href={physicalBook.hotmartLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto lg:w-full min-h-12 bg-zinc-900 hover:bg-emerald-600 text-white font-bold py-3 px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-md group-hover:shadow-emerald-500/20 cursor-pointer text-center leading-tight ${focusRing}`}
              >
                <BookMarked className="w-4 h-4 shrink-0" />
                <span>Comprar Livro Físico</span>
                <ArrowRight className={`w-4 h-4 shrink-0 ${hoverOnly}:group-hover:translate-x-1 transition-transform`} />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </div>

          </article>
        </div>

        {/* BLOCO 3: CURSOS & MENTORIAS PROFISSIONAIS */}
        <div id="mentorias" className="scroll-mt-24">
          <BlockHeading
            icon={Award}
            title="Cursos & Mentorias Profissionais"
            subtitle="Capacitação avançada integrando teoria técnica e aplicação prática na academia."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {mentorships.map((item) => {
              const IconComponent = item.icon;
              return (
                <article
                  key={item.title}
                  className={`bg-zinc-50 border border-zinc-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg sm:shadow-xl hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group ${hoverOnly}:hover:-translate-y-1`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-500/10 px-3 py-1 rounded-md">
                        {item.badge}
                      </span>
                      <div className={`shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-zinc-900 text-emerald-400 flex items-center justify-center shadow-lg ${hoverOnly}:group-hover:scale-105 transition-transform`}>
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>

                    <h4 className="text-xl sm:text-2xl font-black text-zinc-900 group-hover:text-emerald-600 transition-colors mb-3 sm:mb-4 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6 sm:mb-8">
                      {item.summary}
                    </p>
                  </div>

                  <a
                    href={item.link}
                    className={`w-full min-h-12 bg-zinc-900 hover:bg-emerald-600 text-white font-bold py-3.5 px-5 sm:px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm text-center leading-tight shadow-md group-hover:shadow-emerald-500/20 cursor-pointer ${focusRing}`}
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className={`w-4 h-4 shrink-0 ${hoverOnly}:group-hover:translate-x-1 transition-transform`} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};