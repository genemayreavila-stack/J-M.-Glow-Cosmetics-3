import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface ExclusiveCollectionProps {
  onExplore: () => void;
}

export default function ExclusiveCollection({ onExplore }: ExclusiveCollectionProps) {
  return (
    <section id="colecciones" className="py-20 bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner container with deep overlay */}
        <div className="relative overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl">
          
          {/* Cover photo of makeup gold dust / luxury packaging */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-overlay hover:scale-105 transition-transform duration-[4000ms]"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop')`
            }}
          />

          {/* Golden radial gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />

          {/* Banner content */}
          <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-24 max-w-2xl flex flex-col items-start justify-center">
            
            {/* Visual badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-gold-500/15 border border-gold-400/40 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-gold-300">Colección Limitada</span>
            </div>

            {/* Editorial Header */}
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              Colección Glamour 2026
            </h2>

            {/* Sub-label */}
            <p className="text-sm sm:text-base font-light text-neutral-300 leading-relaxed font-sans mb-8">
              Una sinfonía suntuosa de texturas líquidas satinadas y polvos reflectantes con partículas nanométricas de oro. Creada especialmente para mujeres que deciden brillar bajo cualquier reflector sin perder la esencia natural.
            </p>

            {/* Exploratory Call To action */}
            <button
              onClick={onExplore}
              className="py-3 px-8 bg-gold-500 hover:bg-white text-neutral-950 hover:text-neutral-950 font-semibold tracking-wider uppercase text-xs transition-all duration-300 rounded cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-gold-500/10 hover:-translate-y-0.5"
            >
              <span>Explorar Colección</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

          </div>

          {/* Side Design elements */}
          <div className="absolute right-12 bottom-12 hidden lg:flex flex-col items-end space-y-2 text-white/20 font-serif tracking-widest text-sm pointer-events-none italic">
            <span>#JMGlowsGlamour</span>
            <span className="text-xs font-mono font-light not-italic">EDICIÓN EXCLUSIVA DE COFRE</span>
          </div>

        </div>

      </div>
    </section>
  );
}
