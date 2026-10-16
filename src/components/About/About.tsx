import React, { useEffect, useRef, useState } from 'react';
import { trainer } from '../../data/trainer';
import { Award, ShieldCheck, ArrowRight, Activity, Quote, MapPin, BadgeCheck } from 'lucide-react';

// Foto da seção (troque para .webp quando converter)
const aboutImage = "https://pub-d76a70826e904e309b25729e5e73488e.r2.dev/assets/img/perfil/IMG_5697.PNG";

// Pilares tirados do próprio texto da seção
const pillars = [
  'Biomecânica precisa',
  'Individualidade biológica',
  'Longevidade',
  'Postura',
  'Resiliência física',
];

const hoverOnly = '[@media(hover:hover)]'; // evita "hover preso" em telas de toque
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

const aboutCss = `
  @keyframes ab-float {
    0%, 100% { transform: translate3d(0, 0, 0); }
    50%      { transform: translate3d(0, -6px, 0); }
  }
  @keyframes ab-ecg { to { stroke-dashoffset: -1000; } }
  @keyframes ab-breathe {
    0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.03; }
    50%      { transform: translateY(-50%) scale(1.06); opacity: 0.055; }
  }
  @keyframes ab-shimmer {
    0%   { transform: translate3d(-130%, 0, 0) skewX(-20deg); }
    55%  { transform: translate3d(260%, 0, 0) skewX(-20deg); }
    100% { transform: translate3d(260%, 0, 0) skewX(-20deg); }
  }
  .ab-float   { animation: ab-float 5s ease-in-out infinite; will-change: transform; }
  .ab-ecg     { stroke-dasharray: 140 860; animation: ab-ecg 6s linear infinite; }
  .ab-breathe { animation: ab-breathe 8s ease-in-out infinite; }
  .ab-shimmer { animation: ab-shimmer 5s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    .ab-float, .ab-ecg, .ab-breathe, .ab-shimmer { animation: none !important; }
    .ab-ecg { stroke-dasharray: none; opacity: 0.4; }
    .ab-rv { transition: none !important; }
  }
`;

// Dispara uma vez quando a seção entra na tela
const useInView = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, shown] as const;
};

interface RevealProps {
  shown: boolean;
  delay?: number;
  from?: 'up' | 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

// Entrada suave (fade + deslize) com atraso escalonado
const Reveal: React.FC<RevealProps> = ({ shown, delay = 0, from = 'up', className = 'w-full', children }) => {
  const hidden =
    from === 'left' ? 'opacity-0 -translate-x-8' : from === 'right' ? 'opacity-0 translate-x-8' : 'opacity-0 translate-y-6';
  return (
    <div
      className={`ab-rv transition-all duration-700 ease-out ${shown ? 'opacity-100 translate-x-0 translate-y-0' : hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const About: React.FC = () => {
  const [sectionRef, shown] = useInView<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="pt-16 pb-6 sm:pt-20 sm:pb-8 lg:pt-28 lg:pb-10 bg-white text-zinc-900 relative overflow-hidden border-t border-b border-zinc-200"
    >
      <style>{aboutCss}</style>

      {/* FUNDO: eixos biomecânicos & malha de identidade */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">

        {/* Glows difusos (menores e mais leves no mobile) */}
        <div className="absolute top-20 sm:top-1/4 left-0 sm:left-1/4 sm:-translate-x-1/2 w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] bg-emerald-500/[0.05] rounded-full blur-[80px] sm:blur-[150px]" />
        <div className="absolute bottom-0 right-0 sm:bottom-10 sm:right-10 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] bg-emerald-600/[0.05] rounded-full blur-[80px] sm:blur-[130px]" />

        {/* Malha de pontos */}
        <div className="absolute inset-0 opacity-[0.5]" style={{
          backgroundImage: `radial-gradient(#d4d4d8 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }} />

        {/* Linhas de alinhamento estrutural quase invisíveis */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, #059669 1px, transparent 1px), linear-gradient(to bottom, #059669 1px, transparent 1px)`,
          backgroundSize: '192px 192px'
        }} />

        {/* Marca d'água de atividade humana, "respirando" */}
        <div className="ab-breathe absolute right-[-5%] top-1/2 text-emerald-900 hidden lg:block">
          <Activity className="w-[600px] h-[600px]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">

        {/* ============ FOTO (mobile e tablet: centralizada | desktop: coluna esquerda) ============ */}
        <Reveal shown={shown} from="left" className="lg:col-span-5 relative w-full max-w-md sm:max-w-lg mx-auto lg:max-w-none">

          {/* Brilho atrás da foto */}
          <div className="absolute -inset-6 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" aria-hidden="true" />

          {/* Moldura deslocada de contorno */}
          <div className="hidden sm:block absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border-2 border-emerald-500/30 pointer-events-none" aria-hidden="true" />

          {/* Pontilhado decorativo */}
          <div
            className="hidden sm:block absolute -top-6 -left-6 w-28 h-28 opacity-70 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#10b981 1.5px, transparent 1.5px)', backgroundSize: '14px 14px' }}
            aria-hidden="true"
          />

          <div className="relative rounded-3xl overflow-hidden border border-zinc-200 shadow-2xl group aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] bg-zinc-100">
            <img
              src={aboutImage}
              alt={trainer.name}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover object-[center_25%] ${hoverOnly}:group-hover:scale-105 transition-transform duration-700`}
            />

            {/* Gradiente inferior para o badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-80" />

            {/* Badge flutuante */}
            <div className="ab-float absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md border border-zinc-200 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 sm:gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black text-zinc-900 leading-tight">Referência em Salvador & Região</p>
                <p className="text-xs text-zinc-600 font-medium">Ciência do movimento e resultados reais</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ============ TEXTOS ============ */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6 text-left">

          <Reveal shown={shown} delay={100}>
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider sm:tracking-widest uppercase text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-3 sm:px-4 py-2 rounded-full shadow-inner">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Trajetória & Visão
            </span>
          </Reveal>

          <Reveal shown={shown} delay={200}>
            <h2 className="text-[1.75rem] sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.15]">
              Mais do que prescrever treinos. <span className="text-emerald-600 underline decoration-emerald-500/30 underline-offset-8">Construir autonomia e valor.</span>
            </h2>
          </Reveal>

          <Reveal shown={shown} delay={300}>
            <div className="space-y-4 text-zinc-600 text-base sm:text-lg leading-relaxed">
              <p>
                {trainer.bio}
              </p>
              <p className="text-sm sm:text-base text-zinc-600">
                Minha trajetória é marcada pelo compromisso inegociável com a biomecânica precisa e a individualidade biológica. Acreditamos que a musculação não é apenas estética, mas a principal ferramenta para longevidade, postura e resiliência física.
              </p>
            </div>
          </Reveal>

          {/* Pilares */}
          <Reveal shown={shown} delay={400}>
            <ul className="flex flex-wrap gap-2" aria-label="Pilares da metodologia">
              {pillars.map((item) => (
                <li
                  key={item}
                  className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-700 bg-white/80 border border-zinc-200 px-3 py-1.5 rounded-full transition-colors duration-300 ${hoverOnly}:hover:border-emerald-500/50 ${hoverOnly}:hover:text-emerald-700`}
                >
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Citação editorial */}
          <Reveal shown={shown} delay={500}>
            <figure className="relative w-full overflow-hidden bg-emerald-50/60 rounded-r-2xl rounded-l-sm pl-6 pr-5 sm:pl-8 sm:pr-8 py-5 sm:py-6">
              <span
                className={`absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 origin-top transition-transform duration-1000 delay-700 ${shown ? 'scale-y-100' : 'scale-y-0'}`}
                aria-hidden="true"
              />
              <Quote className="absolute right-4 top-3 w-10 h-10 sm:w-14 sm:h-14 text-emerald-500/10" aria-hidden="true" />
              <blockquote className="relative text-sm sm:text-base font-bold text-zinc-800 italic leading-relaxed">
                "O verdadeiro profissional de educação física transforma a relação do aluno com o próprio corpo, unindo embasamento científico rigoroso e atendimento humanizado."
              </blockquote>
              <figcaption className="relative block text-xs font-semibold text-emerald-700 mt-3 uppercase tracking-wider">— {trainer.name}</figcaption>
            </figure>
          </Reveal>

          {/* Credenciais */}
          <Reveal shown={shown} delay={600}>
            <div className="pt-5 sm:pt-6 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold text-zinc-700">
              <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>CREF: <strong className="text-zinc-900">{trainer.cref}</strong></span>
              </div>
              <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-600">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Atuação: <strong className="text-zinc-900">Presencial & Online ({trainer.city})</strong></span>
              </div>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal shown={shown} delay={700}>
            <a
              href="#planos"
              className={`relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-emerald-600 text-white font-extrabold px-6 sm:px-8 py-4 min-h-12 rounded-xl text-sm text-center leading-tight transition-all duration-300 shadow-xl cursor-pointer group ${hoverOnly}:hover:-translate-y-0.5 active:scale-[0.98] ${focusRing}`}
            >
              <span className="ab-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />
              <span className="relative">Conheça Nossos Planos e Metodologia</span>
              <ArrowRight className={`relative w-4 h-4 shrink-0 ${hoverOnly}:group-hover:translate-x-1 transition-transform`} />
            </a>
          </Reveal>

        </div>

      </div>

      {/* Faixa de batimento (ECG): fica abaixo do conteúdo, em fluxo normal, sem cobrir o botão */}
      <div className="relative z-0 w-full mt-10 sm:mt-14 lg:mt-16 h-12 sm:h-16 lg:h-20 pointer-events-none select-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none">
          <path
            d="M0 60 H300 L330 60 L350 20 L380 100 L405 40 L425 60 H700 L730 60 L750 15 L785 105 L810 45 L830 60 H1200"
            stroke="rgba(16, 185, 129, 0.12)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 60 H300 L330 60 L350 20 L380 100 L405 40 L425 60 H700 L730 60 L750 15 L785 105 L810 45 L830 60 H1200"
            pathLength={1000}
            className="ab-ecg"
            stroke="rgba(16, 185, 129, 0.55)"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </section>
  );
};