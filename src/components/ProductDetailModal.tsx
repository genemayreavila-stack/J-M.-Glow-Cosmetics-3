import React, { useState, useEffect } from "react";
import { X, Star, Check, ShoppingBag, Layers, ShieldCheck, HelpCircle } from "lucide-react";
import { Product } from "../types";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, shade?: string, quantity?: number) => void;
}

export default function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  const [selectedShade, setSelectedShade] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Reset local inputs when modal opens for a new product
  useEffect(() => {
    if (product) {
      if (product.shades && product.shades.length > 0) {
        setSelectedShade(product.shades[0]);
      } else {
        setSelectedShade("");
      }
      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, selectedShade || undefined, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Dimming Layer with transition blur */}
      <div
        className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#111111] border border-neutral-100 dark:border-gold-500/20 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row z-10 animate-fade-in">
        
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-gold-500 dark:text-neutral-400 dark:hover:text-gold-400 bg-white/90 dark:bg-neutral-900 rounded-full shadow-md z-30 transition-transform hover:rotate-90 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Highlight Image view */}
        <div className="w-full md:w-1/2 relative bg-neutral-100 dark:bg-[#0a0a0a] min-h-[300px] md:min-h-full">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Accent decoration */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 text-white z-10 hidden md:block">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400">J & M Glows Premium</span>
            <h4 className="font-serif text-lg font-bold">{product.name}</h4>
          </div>
        </div>

        {/* Right: Content details scrollable area */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-[90vh]">
          <div>
            {/* Category Tag */}
            <span className="text-xs font-mono uppercase tracking-widest text-[#B89129] mb-1.5 block">
              {product.category}
            </span>

            {/* Product header */}
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white mb-2 leading-tight">
              {product.name}
            </h2>

            {/* Stars & rating text */}
            <div className="flex items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(product.rating)
                      ? "fill-gold-500 text-gold-500"
                      : "text-neutral-200 dark:text-neutral-800"
                  }`}
                />
              ))}
              <span className="text-xs text-neutral-500 pl-1">
                {product.rating.toFixed(1)} de 5 (Opiniones Certificadas)
              </span>
            </div>

            {/* Price section */}
            <div className="mb-6">
              <span className="text-sm font-light text-neutral-400 block uppercase font-mono tracking-wider">Precio de venta</span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-gold-600 dark:text-gold-300">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Broad Description */}
            <div className="mb-6">
              <h4 className="text-xs uppercase font-semibold text-neutral-900 dark:text-neutral-200 tracking-wider mb-2">
                Descripción
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            {/* Shade Selector Section if shades exist */}
            {product.shades && product.shades.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs uppercase font-semibold text-neutral-900 dark:text-neutral-200 tracking-wider mb-2.5">
                  Selecciona tu Tono: <span className="font-serif italic text-gold-500">{selectedShade}</span>
                </h4>
                
                {/* Visual Shade Grid selector */}
                <div className="flex flex-wrap gap-2">
                  {product.shades.map((shade) => {
                    const isSelected = selectedShade === shade;
                    return (
                      <button
                        key={shade}
                        onClick={() => setSelectedShade(shade)}
                        className={`px-3 py-2 rounded-md text-xs font-medium border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-neutral-950 text-white dark:bg-gold-500 dark:text-neutral-950 border-neutral-950 dark:border-gold-400 shadow-md scale-105"
                            : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800"
                        }`}
                      >
                        {shade}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Key Benefits List */}
            <div className="mb-6 bg-gold-50/50 dark:bg-[#0a0a0a] p-4 border border-gold-500/15 rounded-xl">
              <h4 className="text-xs uppercase font-semibold text-gold-700 dark:text-gold-400 tracking-wider mb-3">
                Beneficios Clave
              </h4>
              <ul className="space-y-2">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start text-xs text-neutral-600 dark:text-neutral-300 leading-normal">
                    <Check className="w-4 h-4 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Trigger Block for adding items */}
          <div className="pt-4 border-t border-dashed border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center space-x-4">
              
              {/* Quantity Changer */}
              <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-950 text-neutral-600 dark:text-neutral-400 text-sm font-semibold transition"
                >
                  -
                </button>
                <span className="px-4 py-2 text-neutral-900 dark:text-white font-mono text-sm font-bold min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-950 text-neutral-600 dark:text-neutral-400 text-sm font-semibold transition"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Premium Action button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 rounded cursor-pointer ${
                  addedSuccess
                    ? "bg-green-600 text-white"
                    : "bg-gold-500 text-neutral-950 hover:bg-neutral-900 hover:text-gold-400"
                } flex items-center justify-center space-x-2`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedSuccess ? "✓ Agregado con Éxito" : "Añadir al Carrito"}</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
