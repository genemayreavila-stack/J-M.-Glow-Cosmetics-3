import React, { useEffect, useState } from "react";
import { Sparkles, Compass } from "lucide-react";

interface HeroProps {
  onExploreProducts: () => void;
  onExploreCollection: () => void;
}

export default function Hero({ onExploreProducts, onExploreCollection }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="inicio"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Div */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-75 ease-out scale-110"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(17, 17, 17, 0.45), rgba(17, 17, 17, 0.65)), url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1920&auto=format&fit=crop')`,
          transform: `translateY(${scrollY * 0.15}px) scale(1.1)`
        }}
      />

      {/* Decorative Elegant Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(17,17,17,0.4))] pointer-events-none" />

      {/* Premium Lines Accent */}
      <div className="absolute inset-x-0 top-24 bottom-12 border-x border-dashed border-white/5 mx-8 pointer-events-none hidden lg:block" />

      {/* Hero Content Block */}
      <div className="relative max-w-4xl mx-auto px-4 text-center z-10 animate-fade-in flex flex-col items-center">
        
        {/* Glamour Badge Banner */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-gold-300/30 bg-black/40 backdrop-blur-md mb-8">
          <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-sans font-medium text-gold-300">
            Colección de Alta Costura 2026
          </span>
        </div>

        {/* Brand Display Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
          Descubre tu <span className="font-serif italic text-gold-400">brillo</span> perfecto
        </h1>

        {/* Elegant Brand Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl font-sans font-light text-neutral-200 tracking-wide leading-relaxed mb-10">
          Maquillaje de alta gama diseñado meticulosamente para realzar e iluminar la sofisticación de tu belleza natural.
        </p>

        {/* Dual Command Call To Actions */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 w-full sm:w-auto">
          <button
            onClick={onExploreProducts}
            className="px-8 py-4 bg-gold-500 hover:bg-neutral-900 hover:text-gold-400 text-neutral-900 font-medium tracking-wider uppercase text-xs transition-all duration-300 border border-gold-500 cursor-pointer shadow-lg shadow-gold-500/10 hover:shadow-none hover:translate-y-[-2px] active:translate-y-0"
          >
            Comprar Ahora
          </button>
          
          <button
            onClick={onExploreCollection}
            className="px-8 py-4 bg-black/60 hover:bg-white hover:text-neutral-950 text-white font-medium tracking-wider uppercase text-xs transition-all duration-300 border border-white/40 backdrop-blur-sm cursor-pointer hover:translate-y-[-2px] active:translate-y-0"
          >
            Ver Colección Glamour
          </button>
        </div>

      </div>

      {/* Elegant Down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest mb-1 font-mono text-gold-400">Deslizar</span>
        <div className="w-[1px] h-8 bg-gold-400/60" />
      </div>
    </section>
  );
}
