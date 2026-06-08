import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function Testimonies() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto advance slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="py-24 bg-neutral-100 dark:bg-[#111111] border-y border-neutral-100 dark:border-gold-500/10 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative Luxury Elements */}
      <div className="absolute top-12 left-12 opacity-5 dark:opacity-10 pointer-events-none select-none">
        <Quote className="w-48 h-48 text-gold-500" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-mono text-gold-600 block mb-1">Voces Reales</span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Lo Que Dicen Nuestras <span className="font-serif italic text-gold-500">Clientas</span>
          </h2>
          <div className="mt-3 w-12 h-[1px] bg-gold-400 mx-auto" />
        </div>

        {/* Carousel Window Cover */}
        <div className="relative min-h-[220px] flex items-center justify-center">
          
          {/* Active Testimonial Card */}
          {(() => {
            const testimonial = TESTIMONIALS[activeIndex] || TESTIMONIALS[0] || { rating: 5, comment: "", name: "", date: "", avatar: "" };
            const rating = typeof testimonial.rating === "number" ? testimonial.rating : 5;
            
            return (
              <div className="w-full text-center transition-all duration-500 px-8 sm:px-16">
                
                {/* Stars */}
                <div className="flex items-center justify-center space-x-1.5 mb-5">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                {/* Quote content */}
                <blockquote className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed text-neutral-800 dark:text-neutral-200 font-medium">
                  "{testimonial.comment}"
                </blockquote>

                {/* Author Detail with profile avatar */}
                <div className="mt-6 flex items-center justify-center space-x-3">
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover border border-gold-500/20"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="text-left">
                    <span className="block font-sans text-xs uppercase tracking-wider font-semibold text-neutral-900 dark:text-neutral-100">
                      {testimonial.name}
                    </span>
                    <span className="block text-[10px] text-neutral-400 font-mono uppercase">
                      Cliente Verificada • {testimonial.date}
                    </span>
                  </div>
                </div>

              </div>
            );
          })()}

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 p-2.5 text-neutral-400 hover:text-gold-500 bg-white dark:bg-neutral-950 rounded-full shadow-md border border-neutral-100 dark:border-neutral-800 transition cursor-pointer"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 p-2.5 text-neutral-400 hover:text-gold-500 bg-white dark:bg-neutral-950 rounded-full shadow-md border border-neutral-100 dark:border-neutral-800 transition cursor-pointer"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Bullet Progress indicators */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 bg-gold-500"
                  : "bg-neutral-300 dark:bg-neutral-800 hover:bg-gold-400"
              }`}
              title={`Ver reseña ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
