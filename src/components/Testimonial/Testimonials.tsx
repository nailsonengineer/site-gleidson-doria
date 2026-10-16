import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Sparkles, ChevronLeft, ChevronRight, Star, Heart, MessageSquareQuote, Quote, Users, Laptop, X, Maximize2,
} from 'lucide-react';

type Modality = 'Presencial' | 'On-line';

interface Testimonial {
  name: string;
  modality: Modality;
  age: number;
  comment: string;
  avatar: string;
  rating: number;
  objectPosition: string;
  highlight?: string; // destaque tirado do próprio texto do depoimento (opcional)
}

const testimonialsData: Testimonial[] = [
  {
    name: "Tatiane Santos",
    modality: "Presencial",
    age: 43,
    highlight: "13 anos de parceria",
    comment: "Com o Gleidson são 13 anos de uma história que vai muito além dos treinos. Vivemos gestação, cirurgias e muitas superações. Você se tornou muito mais que meu personal: é amigo, conselheiro e incentivador. Sou muito grata por nunca deixar de acreditar em mim!",
    avatar: "https://pub-d76a70826e904e309b25729e5e73488e.r2.dev/assets/img/clientes/tatiane-santos.jpeg",
    rating: 5,
    objectPosition: "object-top"
  },
  {
    name: "Igor Leite",
    modality: "On-line",
    age: 32,
    highlight: "+10 anos de treino",
    comment: "Treino com o Gleidson há mais de 10 anos (hoje na consultoria online). Seu atendimento se diferencia pela atenção técnica, baseada na ciência e adaptada às necessidades de cada um. Minha confiança é tanta que ele hoje atende minha mãe e meu irmão!",
    avatar: "https://pub-d76a70826e904e309b25729e5e73488e.r2.dev/assets/img/clientes/igor-leite.png",
    rating: 5,
    objectPosition: "object-top"
  },
  {
    name: "Vanessa Nichetti",
    modality: "Presencial",
    age: 38,
    comment: "Permanecer anos com um profissional fala sobre confiança e conexão. Além de muito competente e dedicado, ele tem um olhar atento que respeita nossos limites. O treino se tornou um momento leve, agradável, de boas conversas e amizade.",
    avatar: "https://pub-d76a70826e904e309b25729e5e73488e.r2.dev/assets/img/clientes/vanessa-nichetti.jpeg",
    rating: 5,
    objectPosition: "object-[center_25%]"
  },
  {
    name: "Larissa Dorea",
    modality: "On-line",
    age: 43,
    highlight: "Resultado em 60 dias",
    comment: "A consultoria é realmente diferenciada! O cuidado e a atenção à execução fazem toda a diferença. O processo é constante e, em apenas 60 dias, meu corpo já está muito mais bonito e torneado. Estou satisfeitíssima!",
    avatar: "https://pub-d76a70826e904e309b25729e5e73488e.r2.dev/assets/img/clientes/larissa-dorea.jpeg",
    rating: 5,
    objectPosition: "object-top"
  },
  {
    name: "Líliane Bamberg",
    modality: "Presencial",
    age: 53,
    highlight: "5 anos com a família",
    comment: "Há 5 anos o Gleidson conquistou nossa família! O que admiro nele vai muito além do treino: é a capacidade de enxergar cada pessoa de forma única, transformando tudo em saúde e evolução. Você não treina apenas corpos, transforma vidas. Que sorte a nossa!",
    avatar: "https://pub-d76a70826e904e309b25729e5e73488e.r2.dev/assets/img/clientes/liliane-bamberg.jpeg",
    rating: 5,
    objectPosition: "object-[center_25%]"
  },
  {
    name: "Cinde Moane",
    modality: "On-line",
    age: 37,
    comment: "Entrar na consultoria foi a melhor escolha que poderia fazer. O diferencial é o acompanhamento humano: tem cuidado, atenção e cobrança na medida certa. Não é só treino, é um suporte que me faz mais forte, confiante e com o corpo evoluindo. Gratidão!",
    avatar: "https://pub-d76a70826e904e309b25729e5e73488e.r2.dev/assets/img/clientes/cinde-moane.PNG",
    rating: 5,
    objectPosition: "object-center"
  }
];

type Filter = 'Todos' | Modality;
const filters: Filter[] = ['Todos', 'Presencial', 'On-line'];

const AUTOPLAY_MS = 7000;
const hoverOnly = '[@media(hover:hover)]'; // evita "hover preso" em telas de toque
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

const resultsCss = `
  @keyframes rs-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes rs-pop {
    0%   { transform: scale(0.4) rotate(-20deg); opacity: 0; }
    70%  { transform: scale(1.2) rotate(6deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  @keyframes rs-drift {
    0%, 100% { transform: translate3d(0, 0, 0) rotate(var(--r, 0deg)); }
    50%      { transform: translate3d(0, -14px, 0) rotate(var(--r, 0deg)); }
  }
  @keyframes rs-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes rs-rise {
    from { opacity: 0; transform: translate3d(0, 16px, 0) scale(0.97); }
    to   { opacity: 1; transform: none; }
  }
  .rs-progress { transform-origin: left center; animation: rs-progress ${AUTOPLAY_MS}ms linear forwards; }
  .rs-star     { opacity: 0; animation: rs-pop 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.3) forwards; }
  .rs-drift    { animation: rs-drift 9s ease-in-out infinite; }
  .rs-fade     { animation: rs-fade 0.25s ease-out both; }
  .rs-rise     { animation: rs-rise 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
  @media (prefers-reduced-motion: reduce) {
    .rs-progress { animation: none; display: none; }
    .rs-star { animation: none; opacity: 1; }
    .rs-drift, .rs-fade, .rs-rise { animation: none; }
    .rs-rv, .rs-slide { transition: none !important; }
  }
`;

// Variável CSS tipada (rotação usada pela animação de flutuar)
const rot = (deg: string): React.CSSProperties => ({ '--r': deg } as React.CSSProperties);

const initialsOf = (name: string) =>
  name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase();

// Foto com fallback de iniciais caso a imagem falhe
const Avatar: React.FC<{ src: string; name: string; objectPosition: string; className?: string }> = ({
  src, name, objectPosition, className = '',
}) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-black ${className}`} aria-label={name}>
        {initialsOf(name)}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${objectPosition} ${className}`}
    />
  );
};

// Observa a seção: "seen" dispara uma vez (animações de entrada), "inView" acompanha a tela (autoplay)
const useVisibility = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView, seen };
};

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  return reduced;
};

interface RevealProps {
  shown: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

// Entrada suave (fade + deslize) com atraso escalonado
const Reveal: React.FC<RevealProps> = ({ shown, delay = 0, className = '', children }) => (
  <div
    className={`rs-rv transition-all duration-700 ease-out ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

export const Results: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('Todos');
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [docHidden, setDocHidden] = useState(false);

  const { ref: sectionRef, inView, seen } = useVisibility<HTMLElement>();
  const reducedMotion = usePrefersReducedMotion();

  const visible = filter === 'Todos' ? testimonialsData : testimonialsData.filter((t) => t.modality === filter);
  const total = visible.length;
  const current = visible[Math.min(index, total - 1)];

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  const changeFilter = (f: Filter) => {
    setFilter(f);
    setIndex(0);
  };

  // Pausa o autoplay quando a aba fica em segundo plano
  useEffect(() => {
    const onVis = () => setDocHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Modal: Esc fecha, setas navegam, trava a rolagem e foca o botão de fechar
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [isModalOpen, next, prev]);

  // Autoplay com barra de progresso (CSS): termina a animação -> próximo depoimento
  const autoplay = !reducedMotion && total > 1;
  const playing = autoplay && inView && !hovered && !focused && !docHidden && !isModalOpen;

  // Deslizar no toque
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    touchStart.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) next();
      else prev();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  const countOf = (f: Filter) => (f === 'Todos' ? testimonialsData.length : testimonialsData.filter((t) => t.modality === f).length);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section
      ref={sectionRef}
      id="resultados"
      className="py-16 sm:py-20 lg:py-28 bg-white text-zinc-900 relative overflow-hidden"
    >
      <style>{resultsCss}</style>

      {/* FUNDO: aspas e balões de fala flutuando devagar */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/20 to-white" />

        <div className="rs-drift absolute top-4 left-4 sm:left-6 text-emerald-500/[0.05] text-[140px] sm:text-[220px] font-serif leading-none" style={rot('0deg')}>“</div>
        <div className="rs-drift absolute top-1/3 right-4 sm:right-8 text-emerald-500/[0.05] text-[180px] sm:text-[280px] font-serif leading-none" style={{ ...rot('0deg'), animationDelay: '-3s' }}>”</div>
        <div className="rs-drift absolute bottom-10 left-1/4 text-emerald-500/[0.04] text-[140px] sm:text-[200px] font-serif leading-none" style={{ ...rot('0deg'), animationDelay: '-6s' }}>“</div>

        <div className="rs-drift absolute top-12 right-[20%] opacity-[0.06] text-emerald-600 hidden sm:block" style={rot('12deg')}>
          <MessageSquareQuote className="w-36 h-36" />
        </div>
        <div className="rs-drift absolute bottom-16 left-[12%] opacity-[0.05] text-emerald-600 hidden sm:block" style={{ ...rot('-12deg'), animationDelay: '-4s' }}>
          <MessageSquareQuote className="w-44 h-44" />
        </div>

        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #059669 1.5px, transparent 0)`,
          backgroundSize: '52px 52px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Cabeçalho de autoridade */}
        <Reveal shown={seen} className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider sm:tracking-widest uppercase text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-3 sm:px-4 py-2 rounded-full mb-5 shadow-inner">
            <Heart className="w-3.5 h-3.5 fill-emerald-600/20 text-emerald-600" /> Palavra de quem treina
          </span>
          <h2 className="text-[1.75rem] sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.15]">
            Histórias que inspiram <span className="text-emerald-600 underline decoration-emerald-500/30 underline-offset-8">resultados</span>
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
            O impacto real do método na vida, na saúde e na performance de quem confia no trabalho.
          </p>
        </Reveal>

        {/* Filtros */}
        <Reveal shown={seen} delay={150} className="flex justify-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-zinc-100/90 border border-zinc-200" role="group" aria-label="Filtrar depoimentos">
            {filters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => changeFilter(f)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${focusRing} ${
                    active ? 'bg-zinc-900 text-white shadow-md' : `text-zinc-600 ${hoverOnly}:hover:text-zinc-900`
                  }`}
                >
                  {f === 'Presencial' && <Users className="w-3.5 h-3.5" />}
                  {f === 'On-line' && <Laptop className="w-3.5 h-3.5" />}
                  {f}
                  <span className={`text-[10px] sm:text-xs font-black px-1.5 py-0.5 rounded-full ${active ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-200 text-zinc-600'}`}>
                    {countOf(f)}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Carrossel */}
        <Reveal shown={seen} delay={300}>
          <div
            className="max-w-4xl mx-auto relative mb-10 sm:mb-14"
            role="region"
            aria-roledescription="carrossel"
            aria-label="Depoimentos de alunos"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            {/* Camadas atrás do card (efeito de pilha de cartões) */}
            <div className="hidden sm:block absolute inset-x-6 top-3 -bottom-3 rounded-3xl bg-zinc-100 border border-zinc-200" aria-hidden="true" />
            <div className="hidden sm:block absolute inset-x-12 top-6 -bottom-6 rounded-3xl bg-zinc-50 border border-zinc-200/70" aria-hidden="true" />

            {/* Setas laterais (desktop) */}
            <button
              type="button"
              onClick={prev}
              className={`hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 lg:-translate-x-1/2 xl:-translate-x-[70%] z-20 w-12 h-12 rounded-full bg-white border border-zinc-200/90 shadow-xl items-center justify-center text-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 hover:border-emerald-500 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ${focusRing}`}
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={next}
              className={`hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 lg:translate-x-1/2 xl:translate-x-[70%] z-20 w-12 h-12 rounded-full bg-white border border-zinc-200/90 shadow-xl items-center justify-center text-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 hover:border-emerald-500 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ${focusRing}`}
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Card principal */}
            <div
              className="relative z-10 bg-white border border-zinc-200/90 rounded-3xl shadow-2xl overflow-hidden touch-pan-y"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => { touchStart.current = null; }}
            >
              {/* Linha de luz superior */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-80" />

              {/* Aspas decorativas */}
              <Quote className="absolute top-6 right-5 sm:top-8 sm:right-8 w-16 h-16 sm:w-24 sm:h-24 text-emerald-500/[0.07]" aria-hidden="true" />

              {/* Slides empilhados: a altura é a do maior, então nada "pula" ao trocar */}
              <div className="relative grid p-6 sm:p-10 lg:p-12 pb-5 sm:pb-6 lg:pb-6" aria-live={playing ? 'off' : 'polite'}>
                {visible.map((t, i) => {
                  const offset = (i - index + total) % total;
                  const active = offset === 0;
                  const state = active
                    ? 'opacity-100 translate-x-0'
                    : offset === total - 1
                      ? 'opacity-0 -translate-x-10 invisible'
                      : 'opacity-0 translate-x-10 invisible';

                  return (
                    <article
                      key={t.name}
                      aria-hidden={!active}
                      aria-label={`Depoimento ${i + 1} de ${total}`}
                      className={`rs-slide col-start-1 row-start-1 flex flex-col transition-all duration-700 ease-out ${state}`}
                    >
                      {/* Cabeçalho do aluno */}
                      <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(true)}
                          tabIndex={active ? 0 : -1}
                          title="Clique para ampliar a foto"
                          aria-label={`Ampliar foto de ${t.name}`}
                          className={`relative shrink-0 group/avatar cursor-pointer rounded-full ${focusRing}`}
                        >
                          <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500 via-emerald-400 to-emerald-600 rounded-full blur-[6px] opacity-60 group-hover/avatar:opacity-100 transition duration-300" />
                          <Avatar
                            src={t.avatar}
                            name={t.name}
                            objectPosition={t.objectPosition}
                            className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white shadow-md transition-transform duration-500 ${hoverOnly}:group-hover/avatar:scale-105`}
                          />
                          <span className="absolute inset-0 rounded-full bg-black/45 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Maximize2 className="w-5 h-5 text-emerald-300" />
                          </span>
                        </button>

                        <div className="min-w-0">
                          <h3 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight leading-tight">{t.name}</h3>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mt-1.5">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                              {t.modality === 'Presencial' ? <Users className="w-3 h-3" /> : <Laptop className="w-3 h-3" />}
                              Consultoria {t.modality}
                            </span>
                            <span className="text-xs font-semibold text-zinc-500">{t.age} anos</span>
                          </div>
                        </div>
                      </div>

                      {/* Estrelas (pulam ao entrar) e destaque */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                        <div className="flex gap-1" aria-label={`Avaliação ${t.rating} de 5`}>
                          {[...Array(t.rating)].map((_, s) => (
                            <Star
                              key={s}
                              className={`w-4 h-4 sm:w-5 sm:h-5 fill-emerald-500 text-emerald-500 ${active ? 'rs-star' : ''}`}
                              style={active ? { animationDelay: `${250 + s * 90}ms` } : undefined}
                            />
                          ))}
                        </div>
                        {t.highlight && (
                          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-700 bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-full">
                            <Sparkles className="w-3 h-3 text-emerald-600" /> {t.highlight}
                          </span>
                        )}
                      </div>

                      {/* Depoimento */}
                      <blockquote className="text-base sm:text-lg lg:text-xl text-zinc-700 italic leading-relaxed font-medium whitespace-pre-line">
                        “{t.comment}”
                      </blockquote>
                    </article>
                  );
                })}
              </div>

              {/* Rodapé: contador + controles (mobile/tablet) */}
              <div className="relative flex items-center justify-between gap-4 px-6 sm:px-10 lg:px-12 py-4 sm:py-5 border-t border-zinc-200/80 bg-zinc-50/60">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-black text-zinc-900 tabular-nums">{pad(Math.min(index, total - 1) + 1)}</span>
                  <span className="text-xs font-semibold text-zinc-400 tabular-nums">/ {pad(total)}</span>
                  <span className="hidden [@media(hover:none)]:inline text-[11px] font-semibold text-zinc-400 uppercase tracking-wider ml-2">
                    Deslize para o lado
                  </span>
                </div>

                <div className="flex lg:hidden gap-2.5">
                  <button
                    type="button"
                    onClick={prev}
                    className={`w-11 h-11 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center text-zinc-800 active:scale-95 active:bg-emerald-500 transition-all cursor-pointer ${focusRing}`}
                    aria-label="Depoimento anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className={`w-11 h-11 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center text-zinc-800 active:scale-95 active:bg-emerald-500 transition-all cursor-pointer ${focusRing}`}
                    aria-label="Próximo depoimento"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <span className="hidden lg:inline text-xs text-zinc-400 font-semibold tracking-wider uppercase">
                  Depoimento {Math.min(index, total - 1) + 1} de {total}
                </span>
              </div>

              {/* Barra de progresso do autoplay */}
              {autoplay && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500/10" aria-hidden="true">
                  <div
                    key={`${filter}-${index}`}
                    className="rs-progress h-full w-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                    style={{ animationPlayState: playing ? 'running' : 'paused' }}
                    onAnimationEnd={next}
                  />
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* Navegação por fotos */}
        <Reveal shown={seen} delay={450}>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto sm:pt-2" role="group" aria-label="Escolher depoimento por aluno">
            {visible.map((t, i) => {
              const active = i === Math.min(index, total - 1);
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ver depoimento de ${t.name}`}
                  aria-current={active}
                  title={t.name}
                  className={`relative rounded-full transition-all duration-300 cursor-pointer ${focusRing} ${
                    active ? 'scale-110 ring-2 ring-emerald-500 ring-offset-2 ring-offset-white' : `opacity-60 grayscale ${hoverOnly}:hover:opacity-100 ${hoverOnly}:hover:grayscale-0`
                  }`}
                >
                  <Avatar
                    src={t.avatar}
                    name={t.name}
                    objectPosition={t.objectPosition}
                    className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-sm text-sm"
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

      </div>

      {/* Modal de retrato (abre ao clicar na foto) */}
      {isModalOpen && current && (
        <div
          className="rs-fade fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Foto de ${current.name}`}
        >
          <div
            className="rs-rise relative max-w-sm w-full bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 z-20 bg-zinc-900/90 hover:bg-emerald-500 hover:text-zinc-950 text-white w-10 h-10 rounded-full flex items-center justify-center border border-zinc-700 transition-all duration-300 shadow-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative">
              <Avatar
                key={current.name}
                src={current.avatar}
                name={current.name}
                objectPosition={current.objectPosition}
                className="rs-fade w-full aspect-[4/5] rounded-2xl text-6xl"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-950/80 to-transparent rounded-b-2xl pointer-events-none" />

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-emerald-500 hover:text-zinc-950 text-white border border-zinc-700 flex items-center justify-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-emerald-500 hover:text-zinc-950 text-white border border-zinc-700 flex items-center justify-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    aria-label="Próxima foto"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="p-5 text-center bg-zinc-950 text-white">
              <h4 className="text-xl font-extrabold">{current.name}</h4>
              <p className="text-xs font-semibold text-emerald-400 mt-1">
                Consultoria {current.modality} • {current.age} anos
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};