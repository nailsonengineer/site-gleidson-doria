import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Globe,
  Loader2,
  Maximize,
  Pause,
  Play,
  User,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react';
import { trainer } from '../../data/trainer';

interface LandingProfileProps {
  onEnterSite: () => void;
  onOpenAbout: () => void;
  videoSrc?: string;
}

const PROFILE_IMG =
  'https://pub-d76a70826e904e309b25729e5e73488e.r2.dev/assets/img/perfil/elegante3.png';
const TRAINER_FIRST_NAME = 'Gleidson';
const TRAINER_LAST_NAME = 'Doria';

type FsVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

const formatTime = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

/* ------------------------------------------------------------------ */
/*  Ícones de marca (SVG inline)                                       */
/* ------------------------------------------------------------------ */

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.148-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Campo de energia (canvas): grade de pontos com pulsos de onda      */
/*  que reage ao ponteiro e ao toque                                   */
/* ------------------------------------------------------------------ */

const EnergyField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const GAP = 34;
    const PULSE_SPEED = 280; // px/s
    const PULSE_LIFE = 3.6; // s
    const PULSE_BAND = 70; // px

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    let nextPulseIn = 0.4;
    const pointer = { x: -9999, y: -9999 };
    let pulses: { x: number; y: number; age: number }[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      const offX = (w - (cols - 1) * GAP) / 2;
      const offY = (h - (rows - 1) * GAP) / 2;

      for (let i = 0; i < cols; i++) {
        const x = offX + i * GAP;
        for (let j = 0; j < rows; j++) {
          const y = offY + j * GAP;
          let boost = 0;

          for (const p of pulses) {
            const radius = p.age * PULSE_SPEED;
            const d = Math.hypot(x - p.x, y - p.y);
            const ring = Math.abs(d - radius);
            if (ring < PULSE_BAND) {
              boost += (1 - ring / PULSE_BAND) * (1 - p.age / PULSE_LIFE);
            }
          }

          const pd = Math.hypot(x - pointer.x, y - pointer.y);
          if (pd < 190) boost += (1 - pd / 190) * 0.9;

          const alpha = Math.min(1, 0.14 + boost * 0.85);
          const r = 1 + Math.min(boost, 1.2) * 1.5;
          ctx.fillStyle = `rgba(52, 211, 153, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      nextPulseIn -= dt;
      if (nextPulseIn <= 0 && pulses.length < 4) {
        pulses.push({ x: Math.random() * w, y: Math.random() * h, age: 0 });
        nextPulseIn = 1.6 + Math.random() * 1.8;
      }
      pulses = pulses.filter((p) => (p.age += dt) < PULSE_LIFE);

      draw();
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onDown = (e: PointerEvent) => {
      if (pulses.length < 6) pulses.push({ x: e.clientX, y: e.clientY, age: 0 });
    };

    resize();
    window.addEventListener('resize', resize);

    if (!reduceMotion) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onDown, { passive: true });
      document.addEventListener('pointerleave', onLeave);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        WebkitMaskImage: 'radial-gradient(ellipse at center, #000 25%, transparent 78%)',
        maskImage: 'radial-gradient(ellipse at center, #000 25%, transparent 78%)',
      }}
    />
  );
};

/* ------------------------------------------------------------------ */
/*  Cartão de link                                                     */
/* ------------------------------------------------------------------ */

interface LinkCardProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  primary?: boolean;
  delay: number;
}

const LinkCard: React.FC<LinkCardProps> = ({ onClick, icon, title, subtitle, primary, delay }) => (
  <button
    type="button"
    onClick={onClick}
    style={{ ['--d' as string]: `${delay}ms` }}
    className={[
      'lp-in group relative flex w-full cursor-pointer items-center gap-4 overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 active:scale-[0.985] sm:p-5',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090a]',
      primary
        ? 'bg-emerald-400 text-zinc-950 shadow-[0_10px_40px_-8px_rgba(16,185,129,0.55)] hover:bg-emerald-300 hover:shadow-[0_14px_50px_-6px_rgba(16,185,129,0.75)]'
        : 'border border-white/10 bg-white/[0.04] text-white backdrop-blur-md hover:border-emerald-400/50 hover:bg-white/[0.07]',
    ].join(' ')}
  >
    {/* brilho que atravessa o cartão no hover */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[300%]"
    />

    <span
      className={[
        'relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14',
        primary
          ? 'border border-zinc-950/15 bg-zinc-950/10 text-zinc-950'
          : 'border border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
      ].join(' ')}
    >
      {icon}
    </span>

    <span className="relative min-w-0 flex-1">
      <span
        className={[
          'block text-[15px] font-bold leading-tight sm:text-base',
          primary ? 'text-zinc-950' : 'text-white',
        ].join(' ')}
      >
        {title}
      </span>
      <span
        className={[
          'mt-0.5 block text-xs leading-snug sm:text-[13px]',
          primary ? 'text-zinc-900/75' : 'text-zinc-400',
        ].join(' ')}
      >
        {subtitle}
      </span>
    </span>

    <ArrowRight
      aria-hidden="true"
      className={[
        'relative h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1',
        primary ? 'text-zinc-950' : 'text-emerald-300',
      ].join(' ')}
    />
  </button>
);

/* ------------------------------------------------------------------ */
/*  Página principal                                                   */
/* ------------------------------------------------------------------ */

export const LandingProfile: React.FC<LandingProfileProps> = ({
  onEnterSite,
  onOpenAbout,
  videoSrc = 'https://pub-d76a70826e904e309b25729e5e73488e.r2.dev/videos/gleidsonapresentacao.mp4',
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const scrubbing = useRef(false);

  /* ---------- controles do vídeo ---------- */

  const closeVideo = useCallback(() => {
    videoRef.current?.pause();
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => undefined);
    }
    setIsVideoModalOpen(false);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setHasError(false);
    setIsLoading(true);
    triggerRef.current?.focus();
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => undefined);
    } else {
      v.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = playerRef.current;
    const v = videoRef.current as FsVideo | null;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => undefined);
    } else if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => undefined);
    } else if (v?.webkitEnterFullscreen) {
      v.webkitEnterFullscreen(); // iOS Safari
    }
  }, []);

  const seekToRatio = useCallback((ratio: number) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration) || v.duration <= 0) return;
    const r = clamp(ratio, 0, 1);
    v.currentTime = r * v.duration;
    setProgress(r * 100);
    setCurrentTime(v.currentTime);
  }, []);

  const seekFromPointer = (clientX: number) => {
    const bar = barRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    seekToRatio((clientX - rect.left) / rect.width);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || scrubbing.current) return;
    setCurrentTime(v.currentTime);
    if (Number.isFinite(v.duration) && v.duration > 0) {
      setProgress((v.currentTime / v.duration) * 100);
    }
  };

  const handleBarKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration)) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      seekToRatio((v.currentTime + 5) / v.duration);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      seekToRatio((v.currentTime - 5) / v.duration);
    } else if (e.key === 'Home') {
      e.preventDefault();
      seekToRatio(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      seekToRatio(1);
    }
  };

  /* ---------- efeitos do modal ---------- */

  // Inicia a reprodução ao abrir (com fallback mudo se o navegador bloquear o áudio)
  useEffect(() => {
    if (!isVideoModalOpen) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => undefined);
    });
    closeBtnRef.current?.focus();
  }, [isVideoModalOpen]);

  // Trava o scroll do fundo
  useEffect(() => {
    if (!isVideoModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isVideoModalOpen]);

  // Teclado: Esc fecha, Espaço alterna, Tab fica preso no modal
  useEffect(() => {
    if (!isVideoModalOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeVideo();
        return;
      }
      if (e.key === ' ' || e.code === 'Space') {
        const t = e.target as HTMLElement | null;
        if (t && (t.tagName === 'BUTTON' || t === barRef.current)) return;
        e.preventDefault();
        togglePlay();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const lastEl = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isVideoModalOpen, closeVideo, togglePlay]);

  /* ---------- render ---------- */

  return (
    <main className="lp-root relative min-h-[100dvh] w-full overflow-x-hidden bg-[#07090a] text-white selection:bg-emerald-400/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');

        .lp-root { font-family: 'Sora', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }

        @keyframes lp-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        @keyframes lp-pop  { from { opacity: 0; transform: translateY(10px) scale(.96); } to { opacity: 1; transform: none; } }
        @keyframes lp-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lp-spin { to { transform: rotate(360deg); } }
        @keyframes lp-halo { 0% { transform: scale(1); opacity: .45; } 100% { transform: scale(1.6); opacity: 0; } }
        @keyframes lp-glow { 0%,100% { opacity: .55; } 50% { opacity: .95; } }

        .lp-in    { opacity: 0; animation: lp-rise .85s cubic-bezier(.2,.7,.2,1) forwards; animation-delay: var(--d, 0ms); }
        .lp-ring  { animation: lp-spin 7s linear infinite; }
        .lp-halo  { animation: lp-halo 3.4s ease-out infinite; }
        .lp-glow  { animation: lp-glow 6s ease-in-out infinite; }
        .lp-modal-bg { animation: lp-fade .25s ease-out both; }
        .lp-modal    { animation: lp-pop .35s cubic-bezier(.2,.7,.2,1) both; }

        .lp-player:fullscreen { max-width: none; width: 100%; height: 100%; border-radius: 0; border: 0; }
        .lp-player:fullscreen .lp-stage { aspect-ratio: auto; flex: 1 1 auto; }
        .lp-player:-webkit-full-screen { max-width: none; width: 100%; height: 100%; border-radius: 0; border: 0; }
        .lp-player:-webkit-full-screen .lp-stage { aspect-ratio: auto; flex: 1 1 auto; }

        @media (prefers-reduced-motion: reduce) {
          .lp-in { animation: none; opacity: 1; }
          .lp-ring, .lp-halo, .lp-glow { animation: none; }
          .lp-halo { opacity: 0; }
          .lp-modal, .lp-modal-bg { animation: none; }
        }
      `}</style>

      {/* ============ FUNDO ============ */}
      <EnergyField />
      <div
        aria-hidden="true"
        className="lp-glow pointer-events-none absolute left-1/2 top-[22%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[120px] sm:h-[520px] sm:w-[520px] lg:left-[27%] lg:top-1/2 lg:h-[640px] lg:w-[640px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#07090a_100%)]"
      />

      {/* ============ CONTEÚDO ============ */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-8 lg:px-12">
        <div className="grid flex-1 grid-cols-1 items-center gap-8 py-6 sm:gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 xl:gap-24">
          {/* ---------- FOTO ---------- */}
          <section
            className="lp-in flex flex-col items-center lg:items-center"
            style={{ ['--d' as string]: '0ms' }}
          >
            <div className="relative h-32 w-32 min-[400px]:h-36 min-[400px]:w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-72 lg:w-72 xl:h-80 xl:w-80">
              {/* ondas de energia */}
              <span aria-hidden="true" className="lp-halo absolute inset-0 rounded-full border border-emerald-400/50" />
              <span
                aria-hidden="true"
                className="lp-halo absolute inset-0 rounded-full border border-emerald-400/40"
                style={{ animationDelay: '1.7s' }}
              />

              {/* anel de energia girando */}
              <span
                aria-hidden="true"
                className="lp-ring absolute -inset-[9px] rounded-full"
                style={{
                  background:
                    'conic-gradient(from 0deg, rgba(16,185,129,0) 0deg, #10b981 110deg, #a7f3d0 180deg, rgba(16,185,129,0) 250deg, rgba(16,185,129,0) 360deg)',
                }}
              />

              {/* foto */}
              <div className="relative h-full w-full overflow-hidden rounded-full bg-zinc-900 shadow-2xl ring-4 ring-[#07090a]">
                {imgFailed ? (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-4xl font-extrabold text-emerald-400 lg:text-6xl">
                    {TRAINER_FIRST_NAME[0]}
                    {TRAINER_LAST_NAME[0]}
                  </div>
                ) : (
                  <img
                    src={PROFILE_IMG}
                    alt={`${TRAINER_FIRST_NAME} ${TRAINER_LAST_NAME}`}
                    decoding="async"
                    onError={() => setImgFailed(true)}
                    className="h-full w-full scale-150 rounded-full object-cover object-[85%_25%] contrast-110 brightness-125 grayscale"
                  />
                )}
              </div>

              {/* selo */}
              <span
                aria-hidden="true"
                className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 text-zinc-950 shadow-[0_0_24px_rgba(52,211,153,0.8)] ring-4 ring-[#07090a] lg:bottom-3 lg:right-3 lg:h-12 lg:w-12"
              >
                <Zap className="h-4 w-4 fill-zinc-950 lg:h-5 lg:w-5" />
              </span>
            </div>
          </section>

          {/* ---------- TEXTO + LINKS ---------- */}
          <section className="mx-auto flex w-full max-w-md flex-col items-center text-center md:max-w-lg lg:mx-0 lg:max-w-xl lg:items-start lg:text-left">
            <header>
              <h1
                className="lp-in text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
                style={{ ['--d' as string]: '120ms' }}
              >
                <span className="block bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-transparent">
                  {TRAINER_FIRST_NAME}
                </span>
                <span className="block bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-transparent">
                  {TRAINER_LAST_NAME}
                </span>
              </h1>

              <p
                className="lp-in mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 sm:text-sm"
                style={{ ['--d' as string]: '220ms' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Personal Trainer
              </p>
            </header>

            <nav aria-label="Acessos principais" className="mt-8 flex w-full flex-col gap-3 sm:gap-3.5 lg:mt-10">
              <LinkCard
                delay={320}
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setIsVideoModalOpen(true);
                }}
                icon={<Play className="h-5 w-5 fill-current sm:h-6 sm:w-6" />}
                title="Vídeo de Apresentação"
                subtitle="Conheça a metodologia por dentro"
              />
              <LinkCard
                delay={420}
                primary
                onClick={onEnterSite}
                icon={<Globe className="h-5 w-5 sm:h-6 sm:w-6" />}
                title="Entrar no Site Completo"
                subtitle="Planos, treinos, calculadoras e mais"
              />
              <LinkCard
                delay={520}
                onClick={onOpenAbout}
                icon={<User className="h-5 w-5 sm:h-6 sm:w-6" />}
                title="Sobre o Treinador"
                subtitle="História, formação e trajetória"
              />
            </nav>

            <div
              className="lp-in mt-6 flex w-full items-center justify-center gap-3 lg:justify-start"
              style={{ ['--d' as string]: '640ms' }}
            >
              <a
                href={trainer.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group flex h-12 items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-zinc-200 backdrop-blur-md transition-all hover:border-emerald-400/50 hover:bg-white/[0.08] hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090a]"
              >
                <InstagramIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
                Instagram
              </a>
              <a
                href={trainer.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="group flex h-12 items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-zinc-200 backdrop-blur-md transition-all hover:border-emerald-400/50 hover:bg-white/[0.08] hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090a]"
              >
                <WhatsAppIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
                WhatsApp
              </a>
            </div>
          </section>
        </div>

        <footer
          className="lp-in pt-4 text-center text-[11px] text-zinc-500 lg:text-left"
          style={{ ['--d' as string]: '760ms' }}
        >
          {trainer.brand} © {new Date().getFullYear()} — Todos os direitos reservados.
        </footer>
      </div>

      {/* ============ MODAL DO VÍDEO ============ */}
      {isVideoModalOpen && (
        <div
          className="lp-modal-bg fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-xl sm:p-6"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeVideo();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Vídeo de apresentação"
            className="lp-modal w-full max-w-4xl"
          >
            <div
              ref={playerRef}
              className="lp-player flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_30px_120px_-20px_rgba(16,185,129,0.35)] sm:rounded-3xl"
            >
              {/* topo */}
              <div className="flex items-center justify-between border-b border-white/10 bg-zinc-950/80 px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-xs font-bold text-emerald-300 sm:text-sm">Apresentação oficial</span>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closeVideo}
                  aria-label="Fechar vídeo"
                  className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* vídeo */}
              <div className="lp-stage relative flex aspect-video w-full items-center justify-center bg-black">
                <video
                  ref={videoRef}
                  src={videoSrc}
                  playsInline
                  preload="auto"
                  className="h-full w-full cursor-pointer object-contain"
                  onClick={togglePlay}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                  onLoadedData={() => setIsLoading(false)}
                  onCanPlay={() => setIsLoading(false)}
                  onWaiting={() => setIsLoading(true)}
                  onPlaying={() => setIsLoading(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  onVolumeChange={(e) => setIsMuted(e.currentTarget.muted)}
                  onError={() => {
                    setHasError(true);
                    setIsLoading(false);
                  }}
                />

                {isLoading && !hasError && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40">
                    <Loader2 className="h-10 w-10 animate-spin text-emerald-400" aria-label="Carregando vídeo" />
                  </div>
                )}

                {hasError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black px-6 text-center">
                    <p className="text-sm font-bold text-white">Não foi possível carregar o vídeo.</p>
                    <p className="text-xs text-zinc-400">Verifique sua conexão e tente abrir novamente.</p>
                  </div>
                )}

                {!isPlaying && !isLoading && !hasError && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label="Reproduzir"
                    className="absolute inset-0 m-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-emerald-400 text-zinc-950 shadow-[0_0_40px_rgba(52,211,153,0.6)] transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-20 sm:w-20"
                  >
                    <Play className="h-7 w-7 translate-x-0.5 fill-zinc-950 sm:h-8 sm:w-8" />
                  </button>
                )}
              </div>

              {/* controles */}
              <div className="space-y-1 border-t border-white/10 bg-zinc-950 px-4 pb-3 pt-1 sm:px-6 sm:pb-4">
                {/* barra de progresso */}
                <div
                  ref={barRef}
                  role="slider"
                  tabIndex={0}
                  aria-label="Progresso do vídeo"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress)}
                  aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`}
                  onKeyDown={handleBarKey}
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId);
                    scrubbing.current = true;
                    seekFromPointer(e.clientX);
                  }}
                  onPointerMove={(e) => {
                    if (scrubbing.current) seekFromPointer(e.clientX);
                  }}
                  onPointerUp={(e) => {
                    scrubbing.current = false;
                    e.currentTarget.releasePointerCapture(e.pointerId);
                  }}
                  onPointerCancel={() => {
                    scrubbing.current = false;
                  }}
                  className="group flex h-7 w-full cursor-pointer touch-none items-center focus-visible:outline-none"
                >
                  <div className="relative h-1.5 w-full rounded-full bg-white/10 transition-all group-hover:h-2.5 group-focus-visible:h-2.5 group-focus-visible:ring-2 group-focus-visible:ring-emerald-300">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.7)]"
                      style={{ width: `${progress}%` }}
                    />
                    <div
                      className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-emerald-200 shadow-lg transition-transform group-hover:scale-100 group-focus-visible:scale-100"
                      style={{ left: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
                      className="flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-emerald-400 px-4 text-xs font-extrabold text-zinc-950 shadow-md transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 sm:text-sm"
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4 fill-zinc-950" />
                      ) : (
                        <Play className="h-4 w-4 fill-zinc-950" />
                      )}
                      {isPlaying ? 'Pausar' : 'Reproduzir'}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4 text-amber-400" />
                      ) : (
                        <Volume2 className="h-4 w-4 text-emerald-400" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs tabular-nums text-zinc-400">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      aria-label="Tela cheia"
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                    >
                      <Maximize className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};