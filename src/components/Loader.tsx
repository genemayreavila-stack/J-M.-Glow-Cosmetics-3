import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Elegant fade out timers snappier response
    const timerFade = setTimeout(() => {
      setVisible(false);
    }, 1000);

    const timerRemove = setTimeout(() => {
      setShouldRender(false);
    }, 1400);

    return () => {
      clearTimeout(timerFade);
      clearTimeout(timerRemove);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neutral-950 transition-opacity duration-[600ms] ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative flex flex-col items-center">
        
        {/* Luxury Gold Ring Rotation */}
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 rounded-full border border-neutral-800" />
          <div className="absolute inset-0 rounded-full border-2 border-t-gold-500 border-r-gold-500 border-b-transparent border-l-transparent animate-spin" />
          <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-gold-400 animate-pulse" />
        </div>

        {/* Brand Caption */}
        <h1 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-widest uppercase">
          J & M. <span className="text-gold-500 italic">GLOWS</span>
        </h1>
        
        <div className="mt-2 w-16 h-[1px] bg-gold-500/40" />
        
        <p className="mt-3 text-[10px] text-neutral-400 uppercase font-mono tracking-widest">
          Cosméticos de Alta Costura
        </p>

      </div>
    </div>
  );
}
