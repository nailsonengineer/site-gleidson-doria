import React, { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Dumbbell, Laptop, BookOpen, Users, Award, ArrowRight, Zap, Target } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  internalLink?: string;
}

interface ServiceGroup {
  category: string;
  items: Service[];
}

// Agrupando os serviços para melhor estrutura
const servicesGroups: ServiceGroup[] = [
  {
    category: "Consultoria & Treinamento",
    items: [
      {
        icon: Dumbbell,
        title: "Consultoria Presencial",
        description: "Acompanhamento individualizado, foco em alta performance e segurança absoluta com correção biomecânica em tempo real."
      },
      {
        icon: Laptop,
        title: "Consultoria Online",
        description: "Treinamento periodizado acessível de qualquer lugar, com suporte contínuo e ajuste de cargas à distância."
      },
    ]
  },
  {
    category: "Performance & Saúde Integrada",
    items: [
      {
        icon: Target,
        title: "Reabilitação & Condicionamento",
        description: "Trabalho técnico integrado para prevenção de lesões e retorno seguro e progressivo às atividades de força."
      },
      {
        icon: Users,
        title: "Avaliação Física & Postural",
        description: "Análise minuciosa dos padrões de movimento para otimizar a execução dos exercícios e prevenir sobrecargas."
      },
    ]
  },
  {
    category: "Carreira & Mentoria",
    items: [
      {
        icon: BookOpen,
        title: "Ler também é um exercício",
        description: "Materiais estratégicos para profissionais que desejam ir além do básico e pessoas que queiram entender mais sobre saúde e qualidade vida.",
        // Link interno para a seção de E-books na mesma página
        internalLink: "#blog"
      },
      {
        icon: Award,
        title: "Cursos & Mentorias",
        description: "Orientações práticas para treinadores que buscam elevar a qualidade do serviço e construir autoridade."
      }
    ]
  }
];

const hoverOnly = '[@media(hover:hover)]'; // evita "hover preso" em telas de toque

const servicesCss = `
  @keyframes sv-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes sv-drift {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50%      { transform: translate3d(30px, -24px, 0) scale(1.12); }
  }
  @keyframes sv-ping {
    0%   { transform: scale(1); opacity: 0.55; }
    80%, 100% { transform: scale(1.18, 1.45); opacity: 0; }
  }
  .sv-ring  { animation: sv-spin 20s linear infinite; }
  .sv-drift { animation: sv-drift 16s ease-in-out infinite; will-change: transform; }
  .sv-ping  { animation: sv-ping 2.6s cubic-bezier(0, 0, 0.2, 1) infinite; }
  @media (prefers-reduced-motion: reduce) {
    .sv-ring, .sv-drift, .sv-ping { animation: none !important; }
    .sv-ping { opacity: 0; }
    .sv-rv, .sv-line, .sv-mark { transition: none !important; }
  }
`;

// Dispara uma vez quando o elemento entra na tela
const useInView = <T extends HTMLElement>(threshold = 0.15) => {
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
      { threshold, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, shown] as const;
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
    className={`sv-rv transition-all duration-700 ease-out ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'} ${className}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

interface ServiceCardProps {
  service: Service;
  whatsappLink: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, whatsappLink }) => {
  const Icon = service.icon;

  // Se tiver internalLink (#blog), usa ele. Senão, usa o WhatsApp.
  const isExternal = !service.internalLink;
  const linkDestination = service.internalLink ?? whatsappLink;

  // Luz que acompanha o mouse dentro do card (só com mouse)
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <article
      onPointerMove={onPointerMove}
      className={`group relative h-full overflow-hidden bg-white border border-zinc-100 rounded-3xl p-6 sm:p-8 lg:p-9 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 ${hoverOnly}:hover:-translate-y-1 ${hoverOnly}:hover:shadow-[0_14px_44px_rgba(0,0,0,0.09)] ${hoverOnly}:hover:border-emerald-500/20 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-5 sm:gap-7 lg:gap-8`}
    >
      {/* Luz que segue o cursor */}
      <span
        className={`pointer-events-none absolute inset-0 opacity-0 ${hoverOnly}:group-hover:opacity-100 transition-opacity duration-500`}
        style={{ background: 'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(16,185,129,0.10), transparent 65%)' }}
        aria-hidden="true"
      />

      {/* Barra lateral de destaque */}
      <span className={`absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 opacity-0 ${hoverOnly}:group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />

      {/* Ícone */}
      <div className="relative shrink-0 self-start">
        <div className={`relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-emerald-50/70 border border-emerald-100 flex items-center justify-center text-emerald-600 transition-all duration-300 ${hoverOnly}:group-hover:scale-105 ${hoverOnly}:group-hover:bg-emerald-500 ${hoverOnly}:group-hover:border-emerald-500 ${hoverOnly}:group-hover:text-white ${hoverOnly}:group-hover:shadow-lg ${hoverOnly}:group-hover:shadow-emerald-500/30`}>
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9" />
        </div>
        <div className={`sv-ring absolute -inset-2 border border-dashed border-emerald-500/30 rounded-full opacity-0 ${hoverOnly}:group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />
      </div>

      {/* Texto e link */}
      <div className="relative flex-grow flex flex-col justify-between min-w-0">
        <div>
          <h4 className={`text-xl sm:text-2xl font-extrabold mb-3 sm:mb-4 text-zinc-950 ${hoverOnly}:group-hover:text-emerald-800 transition-colors leading-tight tracking-tight`}>
            {service.title}
          </h4>
          <p className="text-zinc-600 leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base font-medium">
            {service.description}
          </p>
        </div>

        {/* O link cobre o card inteiro (alvo de toque grande); abre em nova aba só se for externo (WhatsApp) */}
        <a
          href={linkDestination}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-3 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors mt-auto self-start focus-visible:outline-none after:content-[''] after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-2 focus-visible:after:ring-emerald-500 focus-visible:after:ring-inset"
        >
          {/* Muda o texto do link dependendo do serviço */}
          <span>
            {service.internalLink ? "Ver detalhes do E-book" : "Conversar sobre este serviço"}
          </span>
          <span className={`w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center transition-all duration-300 ${hoverOnly}:group-hover:bg-emerald-500 ${hoverOnly}:group-hover:text-white`}>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${hoverOnly}:group-hover:translate-x-0.5`} />
          </span>
        </a>
      </div>
    </article>
  );
};

interface GroupBlockProps {
  group: ServiceGroup;
  number: string;
  whatsappLink: string;
  withDivider: boolean;
}

// Cada grupo: mobile/tablet = título em cima | desktop = título à esquerda, cards à direita
const GroupBlock: React.FC<GroupBlockProps> = ({ group, number, whatsappLink, withDivider }) => {
  const [ref, shown] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 ${withDivider ? 'lg:border-t lg:border-zinc-100 lg:pt-16' : ''}`}
    >
      {/* Título do grupo */}
      <Reveal shown={shown} className="lg:col-span-4">
        <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-5 lg:sticky lg:top-28">
          <span
            className="text-4xl sm:text-5xl lg:text-7xl font-black leading-none tabular-nums text-transparent select-none"
            style={{ WebkitTextStroke: '1.5px rgba(16, 185, 129, 0.4)' }}
            aria-hidden="true"
          >
            {number}
          </span>
          <h3 className="text-xs sm:text-sm lg:text-base font-bold uppercase tracking-widest text-zinc-500 lg:text-zinc-900 lg:leading-snug">
            {group.category}
          </h3>
          <div
            className={`sv-line flex-grow lg:flex-none lg:w-20 h-px bg-gradient-to-r from-emerald-500/60 to-zinc-100 origin-left transition-transform duration-1000 delay-300 ${shown ? 'scale-x-100' : 'scale-x-0'}`}
            aria-hidden="true"
          />
        </div>
      </Reveal>

      {/* Cards: 1 coluna no mobile, 2 no tablet (empilhados), lista única no desktop */}
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-6 lg:gap-6">
        {group.items.map((service, idx) => (
          <Reveal key={service.title} shown={shown} delay={150 + idx * 150} className="h-full">
            <ServiceCard service={service} whatsappLink={whatsappLink} />
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  const phoneNumber = "5571993927472";
  const consultationMessage = encodeURIComponent("Olá! Gostaria de iniciar uma consultoria com o Gleidson Doria e levar meu treinamento para o próximo nível.");
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${consultationMessage}`;

  const [headerRef, headerShown] = useInView<HTMLDivElement>(0.3);
  const [ctaRef, ctaShown] = useInView<HTMLDivElement>(0.25);

  return (
    <section id="servicos" className="py-16 sm:py-20 lg:py-28 bg-white text-zinc-900 relative overflow-hidden border-t border-b border-zinc-100">
      <style>{servicesCss}</style>

      {/* FUNDO: textura minimalista de blueprint + brilhos que flutuam */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.6]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(#e4e4e7 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #f4f4f5 1px, transparent 1px), linear-gradient(to bottom, #f4f4f5 1px, transparent 1px)`,
            backgroundSize: '128px 128px'
          }} />
        </div>
        <div className="sv-drift absolute -top-24 -right-24 sm:-top-40 sm:-right-40 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-emerald-500/[0.05] rounded-full blur-[70px] sm:blur-[100px]" />
        <div className="sv-drift absolute -bottom-24 -left-24 sm:-bottom-40 sm:-left-40 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-emerald-600/[0.05] rounded-full blur-[70px] sm:blur-[100px]" style={{ animationDelay: '-8s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Cabeçalho */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 lg:mb-24">
          <Reveal shown={headerShown}>
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider sm:tracking-widest uppercase text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-3 sm:px-4 py-2 rounded-full mb-5 shadow-inner">
              <Zap className="w-3.5 h-3.5 text-emerald-600" /> Áreas de Atuação
            </span>
          </Reveal>
          <Reveal shown={headerShown} delay={120}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 sm:mb-6 leading-[1.1]">
              Estratégias inteligentes para sua <span className="relative inline-block">
                <span className="relative z-10 text-emerald-600">Evolução</span>
                <span
                  className={`sv-mark absolute bottom-1 left-0 w-full h-2.5 sm:h-3 bg-emerald-500/20 -rotate-1 rounded-sm origin-left transition-transform duration-1000 delay-700 ${headerShown ? 'scale-x-100' : 'scale-x-0'}`}
                  aria-hidden="true"
                />
              </span>
            </h2>
          </Reveal>
          <Reveal shown={headerShown} delay={240}>
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl mx-auto">
              Do treinamento básico à alta performance, ou ao desenvolvimento de carreiras de sucesso no fitness.
            </p>
          </Reveal>
        </div>

        {/* Grupos de serviços */}
        <div className="space-y-14 sm:space-y-20 lg:space-y-16">
          {servicesGroups.map((group, groupIdx) => (
            <GroupBlock
              key={group.category}
              group={group}
              number={String(groupIdx + 1).padStart(2, '0')}
              whatsappLink={whatsappLink}
              withDivider={groupIdx > 0}
            />
          ))}
        </div>

        {/* Chamada final */}
        <div ref={ctaRef} className="mt-16 sm:mt-20 lg:mt-24">
          <Reveal shown={ctaShown}>
            <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] bg-zinc-950 text-white p-8 sm:p-12 lg:p-14 flex flex-col items-center text-center gap-8 lg:flex-row lg:text-left lg:justify-between lg:gap-12 shadow-2xl">

              {/* Detalhes de fundo do painel */}
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="sv-drift absolute -top-24 -left-16 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl" />
                <div className="sv-drift absolute -bottom-28 -right-10 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl" style={{ animationDelay: '-7s' }} />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_30%,transparent_100%)] opacity-40" />
              </div>

              <div className="relative flex flex-col items-center lg:items-start gap-4 sm:gap-5 max-w-xl">
                <Zap className="w-10 h-10 text-emerald-400 bg-emerald-500/10 p-2 rounded-xl" />
                <h4 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Pronto(a) para elevar seu nível?
                </h4>
                <p className="text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed">
                  Entre em contato diretamente com a assessoria e desenhe o plano ideal para seus objetivos, seja no consultório ou na carreira.
                </p>
              </div>

              <div className="relative shrink-0 w-full sm:w-auto">
                <span className="sv-ping absolute inset-0 rounded-xl bg-emerald-500/40" aria-hidden="true" />
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative w-full sm:w-auto min-h-14 inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-sm sm:text-base text-center leading-tight transition-all duration-300 shadow-xl shadow-emerald-500/20 cursor-pointer ${hoverOnly}:hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950`}
                >
                  <span>Iniciar Atendimento via WhatsApp</span>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
};