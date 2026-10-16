import React, { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Plus, Minus, Aperture } from 'lucide-react';

interface PhotoItem {
    id: number;
    url: string;
}

const galleryPhotos: PhotoItem[] = [
    { id: 1, url: 'https://pub-d76a70826e904e309b25729e5e73488e.r2.dev/assets/img/trabalhos/gueu1.PNG' },
    { id: 2, url: 'https://pub-d76a70826e904e309b25729e5e73488e.r2.dev/assets/img/trabalhos/gueu2.PNG' },
    { id: 3, url: 'https://pub-d76a70826e904e309b25729e5e73488e.r2.dev/assets/img/trabalhos/gueu3.PNG' },
    { id: 4, url: 'https://pub-d76a70826e904e309b25729e5e73488e.r2.dev/assets/img/trabalhos/gueu4.PNG' },
    { id: 5, url: 'https://pub-d76a70826e904e309b25729e5e73488e.r2.dev/assets/img/trabalhos/gueu5.PNG' },
    { id: 6, url: 'https://pub-d76a70826e904e309b25729e5e73488e.r2.dev/assets/img/trabalhos/gueu6.jpeg' },
];

export const PhotoGallery: React.FC = () => {
    const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState<number>(4);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setVisibleCount(4);
            } else {
                setVisibleCount(5);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLoadMore = () => {
        const step = window.innerWidth < 768 ? 4 : 5;
        setVisibleCount((prev) => Math.min(prev + step, galleryPhotos.length));
    };

    const handleShowLess = () => {
        const initialCount = window.innerWidth < 768 ? 4 : 5;
        setVisibleCount(initialCount);
    };

    const currentPhotos = galleryPhotos.slice(0, visibleCount);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (activePhotoIndex !== null) {
            setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % galleryPhotos.length : 0));
        }
    }, [activePhotoIndex]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (activePhotoIndex !== null) {
            setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + galleryPhotos.length) % galleryPhotos.length : 0));
        }
    }, [activePhotoIndex]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActivePhotoIndex(null);
            } else if (event.key === 'ArrowRight') {
                setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % galleryPhotos.length : null));
            } else if (event.key === 'ArrowLeft') {
                setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + galleryPhotos.length) % galleryPhotos.length : null));
            }
        };

        if (activePhotoIndex !== null) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activePhotoIndex]);

    return (
        <section className="w-full bg-zinc-950 py-24 relative overflow-hidden border-0 outline-none m-0">

            {/* FUNDO ESTÚDIO FOTOGRÁFICO: Retícula de precisão e luzes direcionais */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-500/[0.07] rounded-full blur-[180px] animate-pulse" />
                <div className="absolute top-12 left-12 w-96 h-96 bg-emerald-600/[0.04] rounded-full blur-[130px]" />
                <div className="absolute bottom-12 right-12 w-[600px] h-[600px] bg-emerald-400/[0.04] rounded-full blur-[150px]" />

                {/* Malha de retícula estilo visor de câmera */}
                <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
                    backgroundSize: '56px 56px'
                }} />
            </div>

            {/* Cabeçalho de Estúdio com Selo de Lente */}
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-4 shadow-inner">
                    <Aperture className="w-3.5 h-3.5 text-emerald-400" /> Registros & Bastidores
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                    Trajetória e <span className="text-emerald-400 relative">
                        <span className="relative z-10">Bastidores</span>
                        <span className="absolute bottom-1 left-0 w-full h-2.5 bg-emerald-500/20 -rotate-1 rounded-sm" />
                    </span>
                </h2>
                <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base font-medium leading-relaxed">
                    Clique em qualquer foto para ampliar em tela cheia e acompanhar os detalhes de perto.
                </p>
            </div>

            {/* Grid 100% IDÊNTICO À SUA ESTRUTURA ORIGINAL (Proporções intocadas) */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 md:gap-2 bg-zinc-950 p-1 md:p-2 relative z-10">
                {currentPhotos.map((photo) => {
                    const originalIndex = galleryPhotos.findIndex((p) => p.id === photo.id);

                    return (
                        <div
                            key={photo.id}
                            onClick={() => setActivePhotoIndex(originalIndex)}
                            className="relative aspect-[3/4] sm:aspect-[4/5] bg-zinc-900 overflow-hidden cursor-pointer group rounded-lg transition-all duration-500 hover:scale-[1.03] hover:z-20 shadow-xl border border-zinc-800 hover:border-emerald-500/50 animate-fadeIn"
                        >
                            <img
                                src={photo.url}
                                alt="Galeria de Trabalho"
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-zinc-900/40 backdrop-blur-[3px]">
                                <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-zinc-950 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                    <ZoomIn className="w-6 h-6 text-zinc-950" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Botões Dinâmicos: Carregar Mais ou Mostrar Menos */}
            <div className="mt-14 text-center relative z-10">
                {visibleCount < galleryPhotos.length ? (
                    <button
                        onClick={handleLoadMore}
                        className="group relative inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold px-8.5 py-4 rounded-xl text-sm transition-all duration-300 shadow-xl shadow-emerald-500/20 cursor-pointer hover:scale-105"
                    >
                        <span>Carregar Mais Fotos</span>
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                ) : (
                    <button
                        onClick={handleShowLess}
                        className="group relative inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold px-8.5 py-4 rounded-xl text-sm transition-all duration-300 shadow-xl border border-zinc-800 cursor-pointer hover:scale-105"
                    >
                        <span>Mostrar Menos</span>
                        <Minus className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                    </button>
                )}
            </div>

            {/* Modal de Visualização Ampliada */}
            {activePhotoIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
                    onClick={() => setActivePhotoIndex(null)}
                >
                    <button
                        onClick={() => setActivePhotoIndex(null)}
                        className="absolute top-6 right-6 z-50 w-12 h-12 bg-zinc-900 hover:bg-emerald-500 hover:text-zinc-950 text-white rounded-full flex items-center justify-center border border-zinc-700 transition-all duration-300 shadow-2xl cursor-pointer"
                        aria-label="Fechar"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <button
                        onClick={handlePrev}
                        className="absolute left-4 sm:left-8 z-50 w-12 h-12 bg-zinc-900/80 hover:bg-emerald-500 hover:text-zinc-950 text-white rounded-full flex items-center justify-center border border-zinc-700 transition-all duration-300 shadow-2xl cursor-pointer backdrop-blur-md"
                        aria-label="Foto anterior"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-4 sm:right-8 z-50 w-12 h-12 bg-zinc-900/80 hover:bg-emerald-500 hover:text-zinc-950 text-white rounded-full flex items-center justify-center border border-zinc-700 transition-all duration-300 shadow-2xl cursor-pointer backdrop-blur-md"
                        aria-label="Próxima foto"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    <div
                        className="relative max-w-full max-h-[90vh] bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center p-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={galleryPhotos[activePhotoIndex].url}
                            alt="Visualização Ampliada"
                            className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-2xl shadow-inner"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};