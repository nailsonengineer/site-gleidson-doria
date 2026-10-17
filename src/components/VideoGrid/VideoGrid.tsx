import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, X, Play, Sparkles } from 'lucide-react';

interface VideoItem {
  id: number;
  url: string;
  title: string;
  subtitle: string;
}

const demoVideos: VideoItem[] = [
  { id: 1, url: 'https://pub-7baa56ad888f4ca9be47e9a301b4010f.r2.dev/videos/video12.mp4', title: 'A Arte de Atender', subtitle: 'Conexão e empatia profissional' }, 
  { id: 2, url: 'https://pub-7baa56ad888f4ca9be47e9a301b4010f.r2.dev/videos/video13.mp4', title: 'Superando Limites', subtitle: 'Intensidade máxima e foco na execução' },
  { id: 3, url: 'https://pub-7baa56ad888f4ca9be47e9a301b4010f.r2.dev/videos/video14.mp4', title: 'Treinos dinâmicos e eficiente', subtitle: 'Priorizando a sua epecificidade e individualidade biológica' },
  { id: 4, url: 'https://pub-7baa56ad888f4ca9be47e9a301b4010f.r2.dev/videos/video17.mp4', title: 'Essência da Profissão', subtitle: 'Reflexão, propósito e valor humano' },
  { id: 5, url: 'https://pub-7baa56ad888f4ca9be47e9a301b4010f.r2.dev/videos/video18.mp4', title: 'Prática de Atendimento', subtitle: 'Abordagem em tempo real e excelência profissional' },
  { id: 6, url: 'https://pub-7baa56ad888f4ca9be47e9a301b4010f.r2.dev/videos/video19.mp4', title: 'Rotina e Performance', subtitle: 'Treino completo e corrida na orla' },
  { id: 7, url: 'https://pub-7baa56ad888f4ca9be47e9a301b4010f.r2.dev/videos/video20.mp4', title: 'Reabilitação do LCA', subtitle: 'Pós-cirúrgico funcional e ganho de amplitude' },
  { id: 8, url: 'https://pub-7baa56ad888f4ca9be47e9a301b4010f.r2.dev/videos/video21.mp4', title: 'Bastidores de Palestra', subtitle: 'Jornada, imersão e compromisso profissional' },
  { id: 9, url: 'https://pub-7baa56ad888f4ca9be47e9a301b4010f.r2.dev/videos/video15.mp4', title: 'Propósito e Legado', subtitle: 'A arte de atender e transformar vidas' },
  { id: 10, url: 'https://pub-7baa56ad888f4ca9be47e9a301b4010f.r2.dev/videos/video16.mp4', title: 'Mentalidade e Atitude', subtitle: 'Bastidores e imersão profissional' },
];

export const VideoGrid: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveVideo(null);
      }
    };

    if (activeVideo) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeVideo]);

  return (
    <section className="w-full bg-zinc-950 py-20 relative overflow-hidden">

      {/* FUNDO VIVO: Figuras geométricas abstratas e iluminação imersiva */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-600/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-emerald-400/5 rounded-full blur-[150px]" />
        <div className="absolute -top-32 -right-32 w-[450px] h-[450px] border border-emerald-500/10 rounded-full rotate-45" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 border border-emerald-500/10 rounded-3xl rotate-12" />
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-12 text-center relative z-10">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-3 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Imersão Audiovisual
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          O Método na <span className="text-emerald-400">Prática</span>
        </h2>
        <p className="text-zinc-400 mt-2 text-sm sm:text-base font-medium">
          Clique em qualquer cena para assistir com som e tela cheia
        </p>
      </div>

      {/* Mosaico Full Width */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 md:gap-2 bg-zinc-950 p-1 md:p-2 relative z-10">
        {demoVideos.map((video) => (
          <GridVideoCard
            key={video.id}
            video={video}
            onSelect={() => {
              setIsMuted(false); // Inicia com som ativado ao abrir
              setActiveVideo(video);
            }}
          />
        ))}
      </div>

      {/* Modal / Player Expandido limpo (sem barra de tempo ou controles nativos) */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveVideo(null)}
        >
          {/* Botão Fechar */}
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 z-50 w-12 h-12 bg-zinc-900 hover:bg-emerald-500 hover:text-zinc-950 text-white rounded-full flex items-center justify-center border border-zinc-700 transition-all duration-300 shadow-2xl cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Botão de Som Flutuante no Modal */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const nextMuted = !isMuted;
              setIsMuted(nextMuted);
              if (modalVideoRef.current) {
                modalVideoRef.current.muted = nextMuted;
              }
            }}
            className="absolute top-6 right-22 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-200 shadow-2xl transition hover:border-emerald-400 hover:bg-emerald-500 hover:text-zinc-950 cursor-pointer"
            aria-label={isMuted ? 'Ativar som' : 'Silenciar som'}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-amber-400" />
            ) : (
              <Volume2 className="h-5 w-5 text-emerald-400" />
            )}
          </button>

          <div
            className="relative max-w-full max-h-[90vh] bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              src={activeVideo.url}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-2xl shadow-inner cursor-pointer"
              onClick={() => {
                if (modalVideoRef.current) {
                  if (modalVideoRef.current.paused) {
                    modalVideoRef.current.play();
                  } else {
                    modalVideoRef.current.pause();
                  }
                }
              }}
            />
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none rounded-b-3xl">
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">{activeVideo.subtitle}</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">{activeVideo.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Sub-componente para gerenciar o autoplay individual e hover de cada mosaico
const GridVideoCard: React.FC<{ video: VideoItem; onSelect: () => void }> = ({ video, onSelect }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoElement.play().catch(() => { });
        } else {
          videoElement.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(videoElement);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      onClick={onSelect}
      className="relative aspect-[3/4] sm:aspect-[4/5] bg-zinc-900 overflow-hidden cursor-pointer group rounded-lg transition-all duration-500 hover:scale-[1.03] hover:z-20 shadow-xl border border-zinc-800/80 hover:border-emerald-500/50"
    >
      <video
        ref={videoRef}
        src={video.url}
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Gradiente de sobreposição com toque refinado */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

      {/* Indicador de play cinematográfico ao passar o mouse */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-zinc-950/40 backdrop-blur-[3px]">
        <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-zinc-950 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <Play className="w-6 h-6 fill-zinc-950 ml-0.5" />
        </div>
      </div>

      {/* Informações no rodapé do card */}
      <div className="absolute bottom-3 left-3 right-3 z-10">
        <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold mb-0.5">{video.subtitle}</p>
        <h4 className="text-sm font-extrabold text-white truncate drop-shadow-sm">{video.title}</h4>
      </div>

      <div className="absolute top-3 right-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-950/60 p-1.5 rounded-full">
        <Volume2 className="w-3.5 h-3.5" />
      </div>
    </div>
  );
};