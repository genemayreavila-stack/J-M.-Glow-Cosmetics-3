import React, { useState } from "react";
import { Sparkles, Mail, CheckCircle, Gift } from "lucide-react";

export default function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMess, setErrorMess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMess("");

    // Simple validation triggers
    if (!name.trim()) {
      setErrorMess("Por favor ingresa tu nombre.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMess("Por favor ingresa un correo electrónico válido.");
      return;
    }

    // Success response simulator
    setSuccess(true);
    setName("");
    setEmail("");
  };

  return (
    <section className="py-24 bg-neutral-50 dark:bg-[#0a0a0a] border-t border-neutral-100 dark:border-gold-500/10 transition-colors duration-300 relative overflow-hidden">
      
      {/* Visual background decorations represent luxury sparkles */}
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-gold-500/5 blur-2xl rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gold-400/5 blur-2xl rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Glassmorphism container */}
        <div className="relative overflow-hidden rounded-2xl glassmorphism dark:glassmorphism-dark p-8 sm:p-12 border border-gold-500/25 text-center">
          
          <div className="absolute top-4 right-4 text-gold-400 opacity-20">
            <Sparkles className="w-12 h-12" />
          </div>

          {!success ? (
            <div className="max-w-xl mx-auto">
              
              <div className="inline-flex items-center space-x-1.5 text-xs text-gold-600 dark:text-gold-400 uppercase tracking-widest font-mono mb-4">
                <span>Únete a Nuestro Club</span>
                <Sparkles className="w-3 h-3" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
                Sé un Miembro <span className="font-serif italic text-gold-500">VIP</span>
              </h2>

              <p className="text-sm font-sans font-light text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8">
                Suscríbete para recibir invitaciones a ventas secretas, acceso prioritario a nuevos lanzamientos y deslumbrantes tutoriales VIP.
              </p>

              {/* Validation error line if present */}
              {errorMess && (
                <div className="mb-4 text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-950/20 py-2 px-3 inline-block rounded">
                  {errorMess}
                </div>
              )}

              {/* Multi-input Form */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto">
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-gold-500 rounded text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 flex-1 min-w-0"
                  required
                />
                
                <input
                  type="email"
                  placeholder="Tu correo de contacto"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-gold-500 rounded text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 flex-1 min-w-0"
                  required
                />

                <button
                  type="submit"
                  className="px-6 py-3 bg-gold-500 hover:bg-neutral-900 hover:text-gold-400 text-neutral-900 font-semibold tracking-wider uppercase text-xs transition-colors duration-300 rounded cursor-pointer shrink-0"
                >
                  Suscribirse
                </button>
              </form>

              <span className="text-[10px] text-neutral-400 block mt-4 font-mono">
                Respetamos tu privacidad. Date de baja de nuestro exclusivo club en cualquier momento.
              </span>

            </div>
          ) : (
            <div className="py-6 max-w-md mx-auto animate-fade-in flex flex-col items-center">
              <CheckCircle className="w-16 h-16 text-gold-500 mb-4 animate-bounce" />
              
              <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                ¡Bienvenida al Club J & M Glows!
              </h3>
              
              <p className="text-sm font-light text-neutral-500 dark:text-neutral-400 leading-normal mb-6">
                Te hemos enviado un correo de bienvenida. Tu membresía VIP ha sido activada correctamente. Disfruta un regalo exclusivo:
              </p>

              {/* Reveal gift voucher code */}
              <div className="bg-gold-500/10 border border-gold-500/35 rounded-xl p-5 w-full flex flex-col items-center">
                <Gift className="w-6 h-6 text-gold-500 mb-2" />
                <span className="text-[10px] uppercase font-mono text-neutral-400 tracking-wider">Tu Código De Regalo</span>
                <span className="font-mono text-xl font-bold text-gold-600 dark:text-gold-400 tracking-widest my-1 select-all hover:scale-105 transition-transform duration-200">
                  GLOWS15
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">15% de descuento en tu primer pedido VIP</span>
              </div>

              <button
                onClick={() => setSuccess(false)}
                className="mt-6 text-xs text-neutral-400 hover:text-gold-500 underline cursor-pointer"
              >
                Suscribir otro correo
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
