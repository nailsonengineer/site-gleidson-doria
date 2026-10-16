import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  SkipForward,
  LoaderCircle,
  Volume2,
  VolumeX,
} from 'lucide-react';

import { trainer } from '../data/trainer';

interface IntroVideoProps {
  onComplete: () => void;
  videoSrc?: string;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({
  onComplete,
  videoSrc = 'https://pub-d76a70826e904e309b25729e5e73488e.r2.dev/videos/gleidsonapresentacao.mp4',
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Iniciado com o som desativado
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFadeOutAndComplete = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  }, [onComplete]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = true;
      videoElement.play().catch(() => {
        console.log('Autoplay impedido pelo navegador.');
      });
    }
  }, []);

  const handleVideoEnded = () => {
    handleFadeOutAndComplete();
  };

  const toggleAudio = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoElement.muted = nextMuted;

    // Garante que o vídeo continue a reproduzir sem pausas indesejadas ao alternar o som
    if (videoElement.paused) {
      videoElement.play().catch(() => {});
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden transition-opacity duration-1000 ease-in-out pb-safe ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-label="Apresentação do treinador"
      aria-modal="true"
    >
      {/* Camada translúcida escura com desfoque */}
      <div 
        className={`absolute inset-0 z-0 bg-black/75 backdrop-blur-md transition-opacity duration-1000 ease-in-out ${
          isExiting ? 'opacity-0' : 'opacity-100'
        }`} 
      />

      {/* Cabeçalho Customizado */}
      <header className={`relative z-30 mx-auto flex w-full max-w-5xl items-center justify-between p-4 sm:px-6 sm:pt-6 transition-opacity duration-700 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Lado Esquerdo: Marca (GD + Nome) */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/20 text-xs sm:text-sm font-bold text-emerald-400 shadow-lg backdrop-blur-md">
            GD
          </div>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-white drop-shadow-md">
            {trainer.brand}
          </span>
        </div>

        {/* Lado Direito (Apenas visível no Desktop/Tablet) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Botão de Som */}
          <button
            type="button"
            onClick={toggleAudio}
            aria-label={isMuted ? 'Ativar som' : 'Silenciar som'}
            title={isMuted ? 'Ativar som' : 'Silenciar som'}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/80 text-zinc-200 shadow-2xl backdrop-blur-lg transition hover:border-emerald-400 hover:bg-emerald-500 hover:text-zinc-950 cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-amber-400" />
            ) : (
              <Volume2 className="h-4 w-4 text-emerald-400" />
            )}
          </button>

          {/* Botão Pular Apresentação */}
          <button
            type="button"
            onClick={handleFadeOutAndComplete}
            className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/80 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-200 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500 hover:text-zinc-950"
          >
            <span>Pular</span>
            <SkipForward className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </header>

      {/* Container de Cinema Centralizado */}
      <main className={`relative z-10 w-full max-w-4xl px-4 sm:px-6 my-auto transition-all duration-1000 ease-in-out ${isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-700/60 bg-zinc-950 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)]" style={{ aspectRatio: '16/9' }}>
          
          {isLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <LoaderCircle className="h-8 w-8 animate-spin text-emerald-400" />
                <span className="text-xs font-semibold tracking-wider text-zinc-300">
                  A CARREGAR CINEMA
                </span>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            src={videoSrc}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            playsInline
            muted={isMuted}
            preload="auto"
            controls={false}
            onLoadedData={() => setIsLoading(false)}
            onEnded={handleVideoEnded}
          />
        </div>
      </main>

      {/* Barra de controle inferior na borda inferior da tela (Apenas visível no Mobile) */}
      <div className={`flex sm:hidden z-30 w-full items-center justify-between border-t border-zinc-800/80 bg-zinc-950/95 px-4 py-3 shadow-2xl backdrop-blur-md transition-opacity duration-700 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        {/* Divisão 1: Ícone de Mudo */}
        <button
          type="button"
          onClick={() => {
            const videoElement = videoRef.current;
            if (videoElement) {
              setIsMuted(true);
              videoElement.muted = true;
              if (videoElement.paused) videoElement.play().catch(() => {});
            }
          }}
          aria-label="Deixar mudo"
          title="Deixar mudo"
          className={`flex flex-1 items-center justify-center py-2 transition cursor-pointer border-r border-zinc-800/80 ${
            isMuted ? 'text-amber-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <VolumeX className="h-5 w-5" />
        </button>

        {/* Divisão 2: Ícone de Som Ativado */}
        <button
          type="button"
          onClick={() => {
            const videoElement = videoRef.current;
            if (videoElement) {
              setIsMuted(false);
              videoElement.muted = false;
              if (videoElement.paused) videoElement.play().catch(() => {});
            }
          }}
          aria-label="Ativar som"
          title="Ativar som"
          className={`flex flex-1 items-center justify-center py-2 transition cursor-pointer border-r border-zinc-800/80 ${
            !isMuted ? 'text-emerald-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Volume2 className="h-5 w-5" />
        </button>

        {/* Divisão 3: Pular vídeo (Apenas o ícone) */}
        <button
          type="button"
          onClick={handleFadeOutAndComplete}
          aria-label="Pular vídeo"
          title="Pular vídeo"
          className="flex flex-1 items-center justify-center py-2 text-zinc-200 transition hover:text-emerald-400 cursor-pointer"
        >
          <SkipForward className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};