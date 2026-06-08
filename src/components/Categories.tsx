import React from "react";
import { Sparkles, Heart, Eye, Compass, Sun, Briefcase } from "lucide-react";
import { CATEGORIES } from "../data";
import { Category } from "../types";

// Icon mapping helper to avoid string dynamic issues
const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "Sparkles":
      return <Sparkles className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />;
    case "Heart":
      return <Heart className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />;
    case "Eye":
      return <Eye className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />;
    case "Compass":
      return <Compass className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />;
    case "Sun":
      return <Sun className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />;
    case "Briefcase":
      return <Briefcase className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />;
    default:
      return <Sparkles className="w-6 h-6 text-gold-400" />;
  }
};

interface CategoriesProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
}

export default function Categories({ onSelectCategory, selectedCategory }: CategoriesProps) {
  return (
    <section className="py-20 bg-neutral-50 dark:bg-[#0a0a0a] border-y border-neutral-100 dark:border-gold-500/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Categorías <span className="font-serif italic text-gold-500">Exclusivas</span>
          </h2>
          <div className="mt-3 w-16 h-[2px] bg-gold-400 mx-auto" />
          <p className="mt-4 text-neutral-500 dark:text-neutral-400 font-sans font-light">
            Explora colecciones formuladas artesanalmente con micro-pigmentos y activos tratantes para cada faceta de tu rutina.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((cat: Category) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group flex flex-col items-center p-6 text-center rounded-xl cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "bg-neutral-900 dark:bg-gold-500/10 border-2 border-gold-500 shadow-xl shadow-gold-500/10 scale-105"
                    : "bg-white dark:bg-[#111111] border border-neutral-100 dark:border-gold-500/10 hover:border-gold-300 dark:hover:border-gold-500 shadow-md hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                {/* Image and Icon Layer Composite */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-gold-100 dark:bg-neutral-800 mb-4 transition-transform duration-300 group-hover:scale-105">
                  <div className="absolute inset-0 bg-neutral-950/25 z-0" />
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="relative z-10 flex items-center justify-center">
                    {getCategoryIcon(cat.icon)}
                  </div>
                </div>

                {/* Name Label */}
                <h3
                  className={`text-xs uppercase tracking-wider font-semibold ${
                    isSelected
                      ? "text-gold-400 dark:text-gold-400"
                      : "text-neutral-700 dark:text-neutral-300 group-hover:text-gold-500"
                  }`}
                >
                  {cat.name}
                </h3>

                {/* Micro Subtitle */}
                <span className="text-[10px] text-neutral-400 mt-1 uppercase font-mono">
                  Glows VIP
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
