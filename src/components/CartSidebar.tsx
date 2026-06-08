import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard, Sparkles, AlertCircle } from "lucide-react";
import { CartItem } from "../types";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onShowToast: (msg: string) => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onShowToast
}: CartSidebarProps) {
  const [coupon, setCoupon] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  // Calculators
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountRate = discountApplied ? 0.15 : 0.0;
  const discountAmount = rawSubtotal * discountRate;
  const shippingFee = rawSubtotal > 100 || rawSubtotal === 0 ? 0.00 : 9.90;
  const finalTotal = rawSubtotal - discountAmount + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "GLOWS15") {
      setDiscountApplied(true);
      onShowToast("¡Cupón GLOWS15 aplicado con éxito! -15% de descuento.");
    } else {
      onShowToast("Cupón inválido. Prueba con 'GLOWS15' obtenido en la suscripción.");
    }
    setCoupon("");
  };

  const handleCheckoutSubmit = () => {
    if (cartItems.length === 0) return;
    setCheckoutSuccess(true);
    setTimeout(() => {
      onClearCart();
      setDiscountApplied(false);
      setCheckoutSuccess(false);
      onClose();
      onShowToast("¡Pedido recibido! Tu asesor de belleza J & M te enviará detalles del envío.");
    }, 4500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Dimmed Overlay */}
      <div
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#111111] border-l border-neutral-100 dark:border-gold-500/25 shadow-2xl flex flex-col h-full animate-fade-in">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 bg-neutral-950 dark:bg-[#0a0a0a] text-white flex items-center justify-between border-b border-neutral-100 dark:border-gold-500/20">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h3 className="font-serif text-lg font-semibold tracking-wide">Tu Cofre de Compra</h3>
              <span className="text-xs bg-gold-400 text-neutral-950 font-mono font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-gold-400 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Checkout overlay loader if success is triggered */}
          {checkoutSuccess ? (
            <div className="flex-1 px-6 py-12 flex flex-col items-center justify-center text-center bg-white dark:bg-neutral-950 animate-fade-in">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full border-4 border-gold-500/20 border-t-gold-500 animate-spin" />
                <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-gold-500 animate-pulse" />
              </div>
              <h4 className="font-serif text-xl font-bold text-neutral-900 dark:text-white mb-2">
                Procesando Alta Costura...
              </h4>
              <p className="text-xs font-light text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed">
                Estamos reservando tus productos de lujo en bodega y preparando el suntuoso empaque térmico especial perfumado...
              </p>
            </div>
          ) : (
            <>
              {/* Drawer Content */}
              <div className="flex-1 py-6 overflow-y-auto px-6">
                
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 flex flex-col items-center">
                    <ShoppingBag className="w-12 h-12 text-neutral-300 dark:text-neutral-800 mb-4 stroke-1" />
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                      Tu cofre está vacío.
                    </p>
                    <p className="text-xs font-light text-neutral-400 mt-1 max-w-xs">
                      Explora nuestros best-sellers e incluye productos para recibir envío gratis a partir de $100.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 px-5 py-2.5 bg-gold-500 hover:bg-neutral-900 hover:text-gold-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded transition cursor-pointer"
                    >
                      Seguir Comprando
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item, index) => (
                      <div
                        key={`${item.product.id}-${item.selectedShade || "default"}`}
                        className="flex items-center space-x-4 py-4 border-b border-neutral-100 dark:border-neutral-900 last:border-0"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-20 h-20 bg-neutral-50 dark:bg-neutral-900 rounded-lg overflow-hidden shrink-0 border border-neutral-100 dark:border-neutral-900">
                          <img
                            src={item.product.img}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Title & shade & quantity controls */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-[#B89129] block">
                            {item.product.category}
                          </span>
                          
                          <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate mb-1">
                            {item.product.name}
                          </h4>

                          {item.selectedShade && (
                            <span className="inline-block px-1.5 py-0.5 text-[9px] font-medium font-sans text-gold-700 bg-gold-500/10 border border-gold-500/20 rounded mb-2.5">
                              Tono: {item.selectedShade}
                            </span>
                          )}

                          {/* Control row for qtys and removal */}
                          <div className="flex items-center justify-between">
                            
                            {/* Qty button container */}
                            <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded">
                              <button
                                onClick={() => onUpdateQty(index, item.quantity - 1)}
                                className="px-1.5 py-0.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              
                              <span className="px-2.5 text-xs font-mono font-bold">
                                {item.quantity}
                              </span>
                              
                              <button
                                onClick={() => onUpdateQty(index, item.quantity + 1)}
                                className="px-1.5 py-0.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Trash Icon */}
                            <button
                              onClick={() => {
                                onRemoveItem(index);
                                onShowToast(`${item.product.name} removido del cofre.`);
                              }}
                              className="text-neutral-400 hover:text-red-500 p-1 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                          </div>

                        </div>

                        {/* Total Cost tags */}
                        <div className="text-right shrink-0">
                          <span className="text-xs font-semibold text-neutral-950 dark:text-gray-100 block">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono block">
                            ${item.product.price.toFixed(2)} c/u
                          </span>
                        </div>

                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Drawer Footer and Math calculations */}
              {cartItems.length > 0 && (
                <div className="border-t border-neutral-100 dark:border-gold-500/20 bg-neutral-50 dark:bg-[#0a0a0a] p-6 space-y-4">
                  {/* Coupon section input */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Cupón (ej: GLOWS15)"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      disabled={discountApplied}
                      className="px-3 py-2 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded focus:outline-none focus:ring-1 focus:ring-gold-500 text-xs text-neutral-900 dark:text-white flex-1"
                    />
                    <button
                      type="submit"
                      disabled={discountApplied}
                      className="px-4 py-2 bg-neutral-900 hover:bg-gold-500 hover:text-neutral-950 disabled:bg-neutral-300 disabled:text-neutral-500 dark:bg-neutral-800 text-white font-semibold text-[10px] tracking-wider uppercase rounded transition"
                    >
                      Aplicar
                    </button>
                  </form>

                  {/* Pricing Breakdown items */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                      <span>Subtotal</span>
                      <span className="font-mono">${rawSubtotal.toFixed(2)}</span>
                    </div>

                    {discountApplied && (
                      <div className="flex justify-between text-green-600 font-semibold">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Descuento VIP (15%)
                        </span>
                        <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                      <span>Envío Asegurado Especial</span>
                      {shippingFee === 0 ? (
                        <span className="text-green-600 font-semibold">GRATIS</span>
                      ) : (
                        <span className="font-mono">${shippingFee.toFixed(2)}</span>
                      )}
                    </div>

                    {shippingFee > 0 && (
                      <div className="text-[10px] text-gold-600 dark:text-gold-400 flex items-center gap-1 pt-1 font-mono">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>¡Agrega ${(100 - rawSubtotal).toFixed(2)} más para obtener ENVÍO GRATIS!</span>
                      </div>
                    )}
                  </div>

                  {/* Ultimate Grand Total */}
                  <div className="flex justify-between items-center pt-3 border-t border-dashed border-neutral-200 dark:border-neutral-800">
                    <span className="text-sm font-serif font-bold text-neutral-950 dark:text-white">
                      Gran Total De Compra
                    </span>
                    <span className="text-xl font-serif font-black text-gold-600 dark:text-gold-300">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout buttons */}
                  <div className="grid grid-cols-1 pt-2 gap-2">
                    <button
                      onClick={handleCheckoutSubmit}
                      className="w-full py-3 bg-gold-500 hover:bg-neutral-900 hover:text-gold-400 text-neutral-950 font-semibold tracking-wider uppercase text-xs transition duration-300 rounded flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-gold-500/10"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Finalizar e Iniciar Pago</span>
                    </button>
                    
                    <button
                      onClick={onClearCart}
                      className="w-full text-center py-2 text-[10px] text-neutral-400 hover:text-red-500 uppercase font-mono tracking-wider cursor-pointer"
                    >
                      Vaciar Todo el Cofre
                    </button>
                  </div>

                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
