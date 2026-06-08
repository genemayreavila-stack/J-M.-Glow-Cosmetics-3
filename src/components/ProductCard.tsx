import React from "react";
import { Star, Eye, Plus, ShoppingBag } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, shade?: string) => void;
  onOpenDetail: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onOpenDetail }: ProductCardProps) {
  const roundedRating = Math.round(product.rating);

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/5 hover:-translate-y-1">
      
      {/* Product Image Container with Overlays */}
      <div className="relative overflow-hidden bg-neutral-50 dark:bg-neutral-900 aspect-square">
        {/* State Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.isNew && (
            <span className="px-2.5 py-0.5 text-[9px] font-sans font-semibold tracking-wider uppercase text-neutral-900 bg-gold-400 rounded-sm">
              Nuevo
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-0.5 text-[9px] font-sans font-semibold tracking-wider uppercase text-white bg-neutral-900 dark:bg-neutral-800 border border-neutral-700/50 rounded-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Hover action Overlay */}
        <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center space-x-3">
          <button
            onClick={() => onOpenDetail(product)}
            className="p-3 bg-white/95 text-neutral-900 rounded-full hover:bg-gold-500 hover:text-neutral-950 transition-colors cursor-pointer shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            title="Detalle Rápido"
          >
            <Eye className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onAddToCart(product, product.shades ? product.shades[0] : undefined)}
            className="p-3 bg-gold-500 text-neutral-950 rounded-full hover:bg-neutral-900 hover:text-gold-400 transition-colors cursor-pointer shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-[50ms]"
            title="Añadir al Carrito"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Real Product image */}
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Info Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[10px] uppercase font-mono tracking-widest text-gold-600 block mb-1">
            {product.category}
          </span>

          {/* Heading */}
          <h3 className="font-serif text-base font-semibold text-neutral-900 dark:text-neutral-50 mb-1 hover:text-gold-500 transition-colors cursor-pointer" onClick={() => onOpenDetail(product)}>
            {product.name}
          </h3>

          {/* Rating with Stars */}
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < roundedRating
                    ? "fill-gold-500 text-gold-500"
                    : "text-neutral-200 dark:text-neutral-800"
                }`}
              />
            ))}
            <span className="text-xs text-neutral-400 font-mono pl-1">
              ({product.rating.toFixed(1)})
            </span>
          </div>

          {/* Intro Description */}
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Pricing tag & Direct select-and-buy button */}
        <div className="flex items-center justify-between pt-3 border-t border-dashed border-neutral-100 dark:border-neutral-900">
          <div>
            <span className="text-[10px] text-neutral-400 block uppercase font-mono tracking-wide">Precio</span>
            <span className="text-base sm:text-lg font-serif font-bold text-neutral-950 dark:text-gold-300">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {product.shades && product.shades.length > 0 ? (
            <button
              onClick={() => onOpenDetail(product)}
              className="text-xs font-semibold py-1.5 px-3 border border-gold-500/40 text-gold-600 dark:text-gold-400 hover:bg-gold-500 hover:text-neutral-950 cursor-pointer transition-all duration-300 rounded"
            >
              Ver Tonos
            </button>
          ) : (
            <button
              onClick={() => onAddToCart(product)}
              className="text-xs font-semibold py-1.5 px-3 bg-neutral-900 text-white dark:bg-gold-500 dark:text-neutral-950 hover:bg-gold-500 hover:text-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-gold-400 cursor-pointer transition-all duration-300 rounded flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Elegir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
