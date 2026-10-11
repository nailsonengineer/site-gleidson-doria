import React, { useRef, useEffect } from 'react';
import { SkipForward } from 'lucide-react';
import { trainer } from '../data/trainer';

interface IntroVideoProps {
  onComplete: () => void;
  videoSrc?: string;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({ 
  onComplete, 
  videoSrc = "/videoGleidson.mp4" 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true; // Obrigatório para o navegador liberar o autoplay
      videoRef.current.play().catch((error) => {
        console.warn("Autoplay impedido pelo navegador:", error);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Elemento de Vídeo com ajuste responsivo para não cortar em mobile/tablet */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-contain sm:object-cover bg-zinc-950"
        onEnded={onComplete}
        controls
        autoPlay
        playsInline
        muted
      />

      {/* Topo: Marca e Botão de Pular */}
      <div className="absolute top-0 inset-x-0 p-4 sm:p-10 flex items-center justify-between z-20 max-w-7xl mx-auto w-full pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md flex items-center justify-center text-emerald-400 font-bold text-xs sm:text-sm">
            GD
          </div>
          <span className="text-white font-black tracking-widest text-xs sm:text-sm uppercase drop-shadow-md">
            {trainer.brand}
          </span>
        </div>

        <button
          onClick={onComplete}
          className="pointer-events-auto group flex items-center gap-2 bg-zinc-900/90 hover:bg-emerald-500 text-zinc-200 hover:text-zinc-950 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-zinc-700 hover:border-emerald-400 backdrop-blur-md transition-all duration-300 font-semibold text-[11px] sm:text-xs tracking-wider uppercase shadow-2xl cursor-pointer"
        >
          <span>Pular Apresentação</span>
          <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
};