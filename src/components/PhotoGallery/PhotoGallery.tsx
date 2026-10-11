import React, { useState, useEffect, useCallback } from 'react';
import { X, Sparkles, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoItem {
    id: number;
    url: string;
}

// Importando as imagens reais da pasta src/assets/img/trabalhos/
import img1 from '../../assets/img/trabalhos/IMG_1451.JPG.jpeg';
import img2 from '../../assets/img/trabalhos/IMG_1600.JPG.jpeg';
import img3 from '../../assets/img/trabalhos/IMG_2855.PNG';
import img4 from '../../assets/img/trabalhos/IMG_2856.PNG';
import img5 from '../../assets/img/trabalhos/IMG_2865.PNG';
import img6 from '../../assets/img/trabalhos/IMG_6006.JPG.jpeg';
import img7 from '../../assets/img/trabalhos/IMG_6140.JPG.jpeg';
import img8 from '../../assets/img/trabalhos/IMG_6288.JPG.jpeg';
import img10 from '../../assets/img/trabalhos/IMG_6307.JPG.jpeg';
import img11 from '../../assets/img/trabalhos/IMG_7066.PNG';
import img12 from '../../assets/img/trabalhos/IMG_7067.PNG';

const galleryPhotos: PhotoItem[] = [
    { id: 1, url: img1 },
    { id: 2, url: img2 },
    { id: 3, url: img3 },
    { id: 4, url: img4 },
    { id: 5, url: img5 },
    { id: 6, url: img6 },
    { id: 7, url: img7 },
    { id: 8, url: img8 },
    { id: 10, url: img10 },
    { id: 11, url: img11 },
    { id: 12, url: img12 },
];

export const PhotoGallery: React.FC = () => {
    const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollAmount = clientWidth * 0.75;
            scrollContainerRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth',
            });
        }
    };

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

    // Efeito para navegar com o teclado (ESC fecha, Setas mudam de foto)
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
        <section className="w-full bg-white text-zinc-900 py-28 relative overflow-hidden border-y border-zinc-200/80">

            {/* Fundo Premium Clean idêntico ao componente Services */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[140px]" />

                <div className="absolute inset-0 opacity-[0.4]" style={{
                    backgroundImage: `linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} />

                <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-emerald-500/20 rounded-tl-lg hidden lg:block" />
                <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-emerald-500/20 rounded-tr-lg hidden lg:block" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 mb-10">

                <div className="text-center max-w-3xl mx-auto mb-8">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-4 shadow-inner">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Galeria de Fotos
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        Trajetória e <span className="text-emerald-600 underline decoration-emerald-500/30 underline-offset-8">Bastidores</span>
                    </h2>
                    <p className="text-zinc-600 text-base sm:text-lg">
                        Deslize para ver todos os registros ou clique para ampliar em tela cheia.
                    </p>
                </div>

                <div className="hidden sm:flex justify-end gap-2 mb-4">
                    <button
                        onClick={() => scroll('left')}
                        className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-emerald-500 hover:text-zinc-950 text-zinc-800 border border-zinc-300 flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
                        aria-label="Rolar para esquerda"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-emerald-500 hover:text-zinc-950 text-zinc-800 border border-zinc-300 flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
                        aria-label="Rolar para direita"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

            </div>

            {/* Carrossel Horizontal Full-Width com cards maiores */}
            <div className="w-full relative z-10">
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto px-4 sm:px-12 py-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {galleryPhotos.map((photo, index) => (
                        <div
                            key={photo.id}
                            onClick={() => setActivePhotoIndex(index)}
                            className="flex-shrink-0 w-[260px] sm:w-[320px] md:w-[380px] aspect-[3/4] sm:aspect-[4/5] bg-zinc-200 overflow-hidden cursor-pointer group rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:z-20 shadow-xl border border-zinc-300 hover:border-emerald-500/50 snap-start relative"
                        >
                            <img
                                src={photo.url}
                                alt="Galeria de Trabalho"
                                className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-500"
                            />

                            <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors" />

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-zinc-950/40 backdrop-blur-[3px]">
                                <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-zinc-950 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                    <ZoomIn className="w-6 h-6 text-zinc-950" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal / Visualizador Ampliado com Navegação */}
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

                    {/* Botão Anterior */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 sm:left-8 z-50 w-12 h-12 bg-zinc-900/80 hover:bg-emerald-500 hover:text-zinc-950 text-white rounded-full flex items-center justify-center border border-zinc-700 transition-all duration-300 shadow-2xl cursor-pointer backdrop-blur-md"
                        aria-label="Foto anterior"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Botão Seguinte */}
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