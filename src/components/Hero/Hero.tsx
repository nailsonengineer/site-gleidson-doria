import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { HealthTipsModal } from '../HealthTipsModal/HealthTipsModal';

// Sugestão: mobile ~900px de largura, desktop ~2200px, qualidade 75-80.
const mobileBg = "https://pub-7baa56ad888f4ca9be47e9a301b4010f.r2.dev/assets/img/trabalhos/fotoentrada.jpeg";
const desktopBg = "https://pub-7baa56ad888f4ca9be47e9a301b4010f.r2.dev/assets/img/perfil/elegante2.png";

// GIF transparente 1x1: evita baixar qualquer foto na faixa do tablet (640px a 1023px)
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

// ---------- TABLET (640px a 1023px) ----------
// Trilhas do circuito (viewBox 1024x768). Cada uma recebe um pulso de energia correndo por ela.
const tabletTraces = [
  { d: "M0 140 H180 L240 200 H420 L470 150 H700", delay: "0s", dur: "4.2s" },
  { d: "M1024 220 H860 L800 280 H640 L600 330 H520", delay: "1.2s", dur: "4.8s" },
  { d: "M0 620 H150 L210 560 H380 L430 610 H600", delay: "2.1s", dur: "5s" },
  { d: "M1024 600 H900 L850 650 H700 L660 600 H560", delay: "0.6s", dur: "4.5s" },
  { d: "M120 0 V90 L160 130 V260", delay: "1.8s", dur: "3.6s" },
  { d: "M880 768 V700 L920 660 V560", delay: "2.8s", dur: "3.8s" },
];

// Pontos de conexão (nós) que pulsam
const tabletNodes = [
  { x: 700, y: 150, delay: "0.4s" },
  { x: 520, y: 330, delay: "1.6s" },
  { x: 600, y: 610, delay: "2.5s" },
  { x: 560, y: 600, delay: "1s" },
  { x: 160, y: 260, delay: "2.2s" },
  { x: 920, y: 560, delay: "0.2s" },
];

// Partículas quadradas que sobem devagar
const tabletParticles = [
  { left: "8%", size: 8, dur: "16s", delay: "0s" },
  { left: "22%", size: 12, dur: "22s", delay: "4s" },
  { left: "38%", size: 6, dur: "18s", delay: "9s" },
  { left: "57%", size: 10, dur: "24s", delay: "2s" },
  { left: "73%", size: 7, dur: "19s", delay: "7s" },
  { left: "88%", size: 12, dur: "21s", delay: "11s" },
];

const tabletCss = `
  @keyframes tb-flow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -1000; } }
  @keyframes tb-drift {
    0%   { transform: translate3d(0, 0, 0) scale(1); }
    100% { transform: translate3d(60px, -40px, 0) scale(1.18); }
  }
  @keyframes tb-scan {
    0%   { transform: translate3d(0, -100%, 0); }
    100% { transform: translate3d(0, 420%, 0); }
  }
  @keyframes tb-rise {
    0%   { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0; }
    12%  { opacity: 0.7; }
    85%  { opacity: 0.5; }
    100% { transform: translate3d(0, -105svh, 0) rotate(180deg); opacity: 0; }
  }
  @keyframes tb-node {
    0%, 100% { transform: scale(1); opacity: 0.55; }
    50%      { transform: scale(1.9); opacity: 1; }
  }
  @keyframes tb-bracket {
    0%, 100% { opacity: 0.35; }
    50%      { opacity: 0.9; }
  }
  .tb-pulse { stroke-dasharray: 90 910; animation: tb-flow linear infinite; filter: drop-shadow(0 0 5px rgba(52, 211, 153, 0.95)); }
  .tb-orb   { animation: tb-drift ease-in-out infinite alternate; will-change: transform; }
  .tb-scan  { animation: tb-scan 8s linear infinite; will-change: transform; }
  .tb-part  { animation: tb-rise linear infinite; will-change: transform, opacity; }
  .tb-node  { transform-box: fill-box; transform-origin: center; animation: tb-node 3s ease-in-out infinite; }
  .tb-brkt  { animation: tb-bracket 4s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    .tb-pulse, .tb-orb, .tb-scan, .tb-part, .tb-node, .tb-brkt { animation: none !important; }
    .tb-pulse { stroke-dasharray: none; opacity: 0.35; }
  }
`;

// ---------- DESKTOP (1024px para cima) ----------
const desktopCss = `
  @keyframes dk-sweep {
    0%   { transform: translate3d(-120%, 0, 0); opacity: 0; }
    15%  { opacity: 1; }
    85%  { opacity: 1; }
    100% { transform: translate3d(520%, 0, 0); opacity: 0; }
  }
  @keyframes dk-line {
    from { transform: scaleY(0); }
    to   { transform: scaleY(1); }
  }
  .dk-sweep { animation: dk-sweep 7s ease-in-out infinite; will-change: transform, opacity; }
  .dk-line  { transform-origin: top; animation: dk-line 1.4s cubic-bezier(.2,.8,.2,1) both; }
  @media (prefers-reduced-motion: reduce) {
    .dk-sweep, .dk-line { animation: none !important; }
    .dk-sweep { opacity: 0; }
  }
`;

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[100svh] w-full flex items-end sm:items-center justify-center bg-zinc-950 overflow-hidden select-none">

      <style>{tabletCss}</style>
      <style>{desktopCss}</style>

      {/* BACKGROUND FIXO (fixed para manter a imagem estática na rolagem) */}
      <div 
        className="fixed inset-0 z-0 w-full h-[100svh] pointer-events-none"
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      >

        {/* Só UMA imagem é baixada, conforme o breakpoint:
            < 640px   -> mobileBg
            640-1023  -> nenhuma (BLANK, a cena animada do tablet cobre)
            >= 1024px -> desktopBg */}
        <picture>
          <source media="(min-width: 1024px)" srcSet={desktopBg} />
          <source media="(min-width: 640px)" srcSet={BLANK} />
          <img
            src={mobileBg}
            alt="Gleidson Doria - Alta Performance"
            fetchPriority="high"
            decoding="async"
            className="absolute left-0 right-0 w-full object-cover max-sm:top-[4.5rem] max-sm:h-[62svh] max-sm:object-[90%_20%] max-sm:[mask-image:linear-gradient(to_bottom,transparent_0,black_12%,black_72%,transparent_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_bottom,transparent_0,black_12%,black_72%,transparent_100%)] sm:top-0 sm:h-full sm:object-[50%_20%] lg:object-[70%_25%]"
          />
        </picture>

        {/* ============================================================
            TABLET (640px até 1023px): cena animada "alta performance"
            ============================================================ */}
        <div className="hidden sm:block lg:hidden absolute inset-0 w-full h-full overflow-hidden bg-zinc-950">

          {/* Brilhos de energia derivando devagar */}
          <div
            className="tb-orb absolute -top-24 -left-24 w-[26rem] h-[26rem] rounded-full bg-emerald-500/20 blur-3xl"
            style={{ animationDuration: '14s' }}
          />
          <div
            className="tb-orb absolute -bottom-32 -right-24 w-[30rem] h-[30rem] rounded-full bg-emerald-400/15 blur-3xl"
            style={{ animationDuration: '19s', animationDelay: '-6s' }}
          />
          <div
            className="tb-orb absolute top-1/3 left-1/2 w-72 h-72 -translate-x-1/2 rounded-full bg-teal-400/10 blur-3xl"
            style={{ animationDuration: '23s', animationDelay: '-10s' }}
          />

          {/* Malha técnica */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_45%,transparent_100%)] opacity-40" />

          {/* Monograma GD gigante, só contorno, bem sutil */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-black leading-none tracking-tighter opacity-60"
              style={{
                fontSize: 'clamp(15rem, 52vw, 30rem)',
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(52, 211, 153, 0.12)',
              }}
            >
              GD
            </span>
          </div>

          {/* Circuito: trilhas + pulsos de corrente + nós */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1024 768"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            aria-hidden="true"
          >
            {tabletTraces.map((t, i) => (
              <g key={i}>
                <path d={t.d} stroke="rgba(52, 211, 153, 0.16)" strokeWidth="1.5" strokeLinejoin="round" />
                <path
                  d={t.d}
                  pathLength={1000}
                  className="tb-pulse"
                  stroke="rgb(110, 231, 183)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animationDuration: t.dur, animationDelay: t.delay }}
                />
              </g>
            ))}
            {tabletNodes.map((n, i) => (
              <g key={i}>
                <circle cx={n.x} cy={n.y} r="9" stroke="rgba(52, 211, 153, 0.3)" strokeWidth="1" />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="3.5"
                  className="tb-node"
                  fill="rgb(52, 211, 153)"
                  style={{ animationDelay: n.delay }}
                />
              </g>
            ))}
          </svg>

          {/* Quadradinhos subindo */}
          {tabletParticles.map((p, i) => (
            <span
              key={i}
              className="tb-part absolute bottom-0 border border-emerald-400/50 bg-emerald-400/10 rounded-[2px]"
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                animationDuration: p.dur,
                animationDelay: p.delay,
              }}
            />
          ))}

          {/* Feixe de luz varrendo a tela */}
          <div
            className="tb-scan absolute left-0 right-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-emerald-400/[0.07] to-transparent"
          />

          {/* Gradiente de ambientação */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/25 via-transparent to-zinc-950/90" />
        </div>

        {/* Escurecimento por overlay (mobile e tablet) */}
        <div className="hidden sm:block lg:hidden absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/30" />
        <div className="hidden sm:block lg:hidden absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(9,9,11,0.7)_100%)]" />

        {/* MOBILE: escurece a base para o texto ler bem, sem apagar os rostos */}
        <div className="sm:hidden absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-transparent" />

        {/* ============================================================
            DESKTOP (1024px para cima): foto em tela cheia + texto à esquerda
            ============================================================ */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden">

          {/* 1. Leitura do texto: escuro e sólido à esquerda, abrindo para a foto à direita */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 via-35% to-zinc-950/10" />

          {/* 2. Funde a base com a próxima seção e escurece o topo (menu) */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />

          {/* 3. Vinheta cinematográfica nas bordas */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,transparent_35%,rgba(9,9,11,0.65)_100%)]" />

          {/* 4. Vazamento de luz esmeralda no canto inferior esquerdo */}
          <div className="absolute -bottom-40 -left-40 w-[46rem] h-[46rem] rounded-full bg-emerald-500/15 blur-3xl" />

          {/* 5. Malha técnica bem discreta, só na metade esquerda */}
          <div className="absolute inset-y-0 left-0 w-3/5 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:linear-gradient(to_right,#000_0%,transparent_100%)] opacity-25" />

          {/* 6. Feixe de luz atravessando devagar */}
          <div className="dk-sweep absolute top-0 bottom-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-emerald-300/[0.06] to-transparent skew-x-[-12deg]" />
        </div>
      </div>

      {/* TABLET: moldura de cantos em volta do conteúdo (some no mobile e no desktop) */}
      <div className="hidden sm:block lg:hidden absolute inset-x-8 inset-y-10 z-10 pointer-events-none" aria-hidden="true">
        <span className="tb-brkt absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-emerald-400/60 rounded-tl-lg" />
        <span className="tb-brkt absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-emerald-400/60 rounded-tr-lg" style={{ animationDelay: '1s' }} />
        <span className="tb-brkt absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-emerald-400/60 rounded-bl-lg" style={{ animationDelay: '2s' }} />
        <span className="tb-brkt absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-emerald-400/60 rounded-br-lg" style={{ animationDelay: '3s' }} />
      </div>

      {/* DESKTOP: trilho vertical à direita (só aparece de 1024px para cima) */}
      <div className="hidden lg:flex absolute right-8 xl:right-12 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-5 pointer-events-none" aria-hidden="true">
        <span className="dk-line block w-px h-24 bg-gradient-to-b from-transparent to-emerald-400/70" />
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.5em] text-emerald-400/80"
          style={{ writingMode: 'vertical-rl' }}
        >
          Saúde & Performance
        </span>
        <span className="dk-line block w-px h-24 bg-gradient-to-t from-transparent to-emerald-400/70" style={{ transformOrigin: 'bottom' }} />
      </div>

      {/* CONTEÚDO CENTRAL */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 flex flex-col items-center text-center w-full sm:my-auto space-y-6 sm:space-y-8 pt-12 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:py-16 lg:max-w-[90rem] lg:items-start lg:text-left lg:space-y-10 lg:py-24">

        {/* Título principal: NOME EM PRIMEIRO ABSOLUTO */}
        <div className="space-y-3 animate-in fade-in zoom-in-95 duration-700 lg:space-y-5 lg:zoom-in-100 lg:slide-in-from-left-8">
          <h1 className="text-[2.5rem] leading-[1.05] sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase drop-shadow-2xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] lg:leading-[0.88]">
            Gleidson <span className="text-emerald-400 inline-block lg:block drop-shadow-[0_0_35px_rgba(52,211,153,0.3)]">Doria</span>
          </h1>
          <h2 className="text-[11px] sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.5em] text-emerald-400/90 uppercase lg:flex lg:items-center lg:gap-5 lg:text-base lg:tracking-[0.45em]">
            <span className="hidden lg:block h-px w-14 bg-emerald-400/70" />
            Personal Trainer e Palestrante
          </h2>
        </div>

        {/* Subtítulo */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-200 max-w-xl font-normal tracking-wide drop-shadow-md leading-relaxed px-2 sm:px-0 lg:text-xl lg:max-w-lg lg:px-0 lg:text-zinc-300">
          Transformando corpos, superando limites e elevando sua rotina através de treinos inteligentes e palestras de alto impacto.
        </p>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full justify-center lg:w-auto lg:justify-start lg:gap-5">
          <a
            href="#planos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-[0.98] lg:px-10 lg:py-5 group"
          >
            <span>Conhecer Planos</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 lg:group-hover:translate-x-1" />
          </a>

          <a
            href="#sobre"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-bold text-sm tracking-wider uppercase transition-all duration-300 backdrop-blur-md active:scale-[0.98] lg:px-10 lg:py-5 lg:bg-transparent lg:border-zinc-600 lg:hover:border-emerald-400/70 lg:hover:text-emerald-300"
          >
            <span>Minha História</span>
          </a>
        </div>

      </div>

      {/* Indicador de rolagem */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden [@media(min-height:700px)]:flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity duration-300 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] lg:left-16 xl:left-24 lg:translate-x-0 lg:items-start">
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">Role para explorar</span>
        <ChevronDown className="w-4 h-4 text-emerald-400 animate-bounce" />
      </div>

      <HealthTipsModal />

    </section>
  );
};