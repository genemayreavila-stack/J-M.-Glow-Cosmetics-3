import React from "react";
import { Award, Truck, ShieldCheck, Sparkles, Lock } from "lucide-react";
import { BENEFITS } from "../data";

const getBenefitIcon = (iconName: string) => {
  switch (iconName) {
    case "Award":
      return <Award className="w-8 h-8 text-gold-500" />;
    case "Truck":
      return <Truck className="w-8 h-8 text-gold-500" />;
    case "ShieldCheck":
      return <ShieldCheck className="w-8 h-8 text-gold-500" />;
    case "Sparkles":
      return <Sparkles className="w-8 h-8 text-gold-500" />;
    case "Lock":
      return <Lock className="w-8 h-8 text-gold-500" />;
    default:
      return <Sparkles className="w-8 h-8 text-gold-500" />;
  }
};

export default function Benefits() {
  return (
    <section className="py-20 bg-neutral-950 text-white relative overflow-hidden">
      {/* Structural Accent Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.06),transparent_40%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Component Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-gold-400">Por Qué Elegirnos</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
            La Experiencia de <span className="font-serif italic text-gold-400">Lujo</span> Absoluto
          </h2>
          <div className="mt-3 w-12 h-[1px] bg-gold-400 mx-auto" />
        </div>

        {/* Grid of benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col items-center text-center p-6 bg-neutral-900/40 border border-neutral-800/60 hover:border-gold-500/30 rounded-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Icon Holder */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-neutral-900 border border-neutral-800 group-hover:bg-gold-500/10 group-hover:border-gold-500/50 transition-all duration-300 mb-5 shadow-lg">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {getBenefitIcon(benefit.icon)}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-base font-semibold text-neutral-100 group-hover:text-gold-400 transition-colors mb-2">
                {benefit.title}
              </h3>
              
              <p className="text-xs font-light text-neutral-400 leading-relaxed font-sans">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
