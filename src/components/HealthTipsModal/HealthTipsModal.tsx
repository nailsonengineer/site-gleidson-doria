import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Lightbulb,
  X,
  Droplets,
  Moon,
  Dumbbell,
  Apple,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

interface Tip {
  icon: LucideIcon;
  title: string;
  description: string;
}

const tips: Tip[] = [
  {
    icon: Droplets,
    title: 'Hidratação',
    description:
      'A água ajuda no transporte de nutrientes e na contração muscular. Beba ao longo do dia, sem esperar a sede chegar. Uma referência comum é de 35 a 40 ml por quilo de peso corporal.',
  },
  {
    icon: Moon,
    title: 'Sono e descanso',
    description:
      'É no descanso que o corpo recupera o músculo e regula os hormônios. Procure dormir de 7 a 8 horas por noite para render mais nos treinos.',
  },
  {
    icon: Dumbbell,
    title: 'Constância nos treinos',
    description:
      'Treinar com regularidade vale mais do que um dia de intensidade máxima. Aprenda a execução correta antes de aumentar a carga para evitar lesões.',
  },
  {
    icon: Apple,
    title: 'Alimentação equilibrada',
    description:
      'Prefira comida de verdade, com proteínas, frutas, legumes e boas fontes de carboidrato. O ideal é montar um plano adequado ao seu objetivo com um profissional.',
  },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const HealthTipsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descId = useId();

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Trava a rolagem do fundo e leva o foco para dentro da janela
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Esc fecha; Tab fica preso dentro da janela
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const items = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  if (typeof document === 'undefined') return null;

  // Portal: a janela e o botão ficam no <body>, fora do overflow-hidden e dos
  // transforms do Hero, e por isso funcionam igual em qualquer tamanho de tela.
  return createPortal(
    <>
      {/* Botão flutuante */}
      {!isOpen && (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-label="Abrir dicas de saúde"
          title="Dicas de saúde"
          className="fixed z-40 right-4 sm:right-6 bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/50 bg-emerald-500 text-zinc-950 shadow-2xl shadow-emerald-500/30 transition-all duration-300 hover:bg-emerald-400 [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-[0.95] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/60 animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <Lightbulb className="h-6 w-6" aria-hidden="true" />
        </button>
      )}

      {/* Janela de dicas: bottom sheet no celular, modal centralizado a partir do tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-zinc-950/80 backdrop-blur-md sm:items-center sm:p-6 animate-in fade-in duration-200"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="relative flex max-h-[88svh] w-full flex-col overflow-hidden rounded-t-3xl border border-zinc-800 bg-zinc-900 text-white shadow-2xl sm:max-h-[85svh] sm:max-w-lg sm:rounded-3xl animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl"
              aria-hidden="true"
            />

            {/* Cabeçalho */}
            <div className="relative flex items-start justify-between gap-4 border-b border-zinc-800 px-5 pb-4 pt-5 sm:px-8 sm:pt-7">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <Lightbulb className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 id={titleId} className="text-lg font-extrabold leading-tight">
                    Dicas de saúde
                  </h2>
                  <p id={descId} className="mt-1 text-sm leading-snug text-zinc-400">
                    Hábitos simples de hidratação, sono, treino e alimentação para
                    aplicar no seu dia a dia.
                  </p>
                </div>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Fechar dicas de saúde"
                className="shrink-0 rounded-xl bg-zinc-800/60 p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Lista de dicas */}
            <ul className="relative flex-1 space-y-3 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8">
              {tips.map(({ icon: TipIcon, title, description }) => (
                <li
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4"
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                    <TipIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="mb-1 text-sm font-bold text-white">{title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-300">{description}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Rodapé */}
            <div className="relative space-y-3 border-t border-zinc-800 px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4 sm:px-8 sm:pb-6">
              <p className="text-xs leading-snug text-zinc-500">
                Conteúdo informativo. Não substitui a orientação de um médico ou
                nutricionista.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#planos"
                  onClick={close}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-extrabold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  Conhecer os planos
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-xl border border-zinc-700 py-3 text-sm font-bold text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:px-6"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};