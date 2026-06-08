import React from "react";
import { Mail, Phone, Clock, MapPin, Instagram, Facebook, Sparkles } from "lucide-react";

interface FooterProps {
  onGoToSection: (sectionId: string) => void;
}

export default function Footer({ onGoToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-900 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Bio about the cosmetics brand */}
          <div className="space-y-4 md:col-span-1">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onGoToSection("inicio");
              }}
              className="font-serif text-xl sm:text-2xl font-bold text-white tracking-widest block uppercase hover:text-gold-400 transition-colors"
            >
              <span className="text-gold-500 italic">J & M.</span> GLOWS
            </a>
            
            <p className="text-xs font-light text-neutral-400 leading-relaxed font-sans">
              Redefiniendo el lujo en el maquillaje desde 2024. Creamos fórmulas holísticas profesionales de alto rendimiento que realzan el brillo inigualable de tu piel.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold-500 hover:border-gold-500 transition-all duration-300 transform hover:scale-110"
                aria-label="Sintoniza en Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold-500 hover:border-gold-500 transition-all duration-300 transform hover:scale-110"
                aria-label="Sintoniza en Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold-500 hover:border-gold-500 transition-all duration-300 transform hover:scale-110"
                aria-label="Glows Club"
              >
                <Sparkles className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links column */}
          <div>
            <h4 className="text-xs uppercase font-serif tracking-widest text-gold-400 font-bold mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-neutral-400">
              <li>
                <button
                  onClick={() => onGoToSection("inicio")}
                  className="hover:text-gold-400 transition-colors cursor-pointer"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onGoToSection("productos")}
                  className="hover:text-gold-400 transition-colors cursor-pointer"
                >
                  Productos Destacados
                </button>
              </li>
              <li>
                <button
                  onClick={() => onGoToSection("colecciones")}
                  className="hover:text-gold-400 transition-colors cursor-pointer"
                >
                  Colección Glamour 2026
                </button>
              </li>
            </ul>
          </div>

          {/* Quick legal / FAQs column */}
          <div>
            <h4 className="text-xs uppercase font-serif tracking-widest text-gold-400 font-bold mb-4">
              Atención al Cliente
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-neutral-400">
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">
                  Políticas de Seguridad & Filtros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">
                  Términos de Envío Exclusivo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">
                  Políticas de Privacidad Certificadas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">
                  Proceso de Devoluciones VIP
                </a>
              </li>
            </ul>
          </div>

          {/* Information, Direct Contacts, and Hours */}
          <div className="space-y-3.5 text-xs text-neutral-400">
            <h4 className="text-xs uppercase font-serif tracking-widest text-gold-400 font-bold mb-4">
              Contacto de Autoridad
            </h4>
            
            <div className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-gold-500 shrink-0" />
              <span>info@jmglows.com</span>
            </div>
            
            <div className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-gold-500 shrink-0" />
              <span>+1 234 567 890 (Línea VIP Directa)</span>
            </div>
            
            <div className="flex items-center space-x-2.5">
              <Clock className="w-4 h-4 text-gold-500 shrink-0" />
              <div>
                <span className="block">Lunes a Viernes: 09:00 - 18:00</span>
                <span className="block text-[10px] text-neutral-500">Sábado: 10:00 - 15:00</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 pt-1">
              <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
              <span className="text-[10px]">Flagship Store: Quinta Avenida, NY</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright banner */}
        <div className="pt-8 border-t border-neutral-900/80 flex flex-col sm:flex-row items-center justify-between text-[11px] font-light text-neutral-500">
          <p>© {currentYear} J & M. Glows Cosmetics. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-gold-500 transition-colors">Normativa Europea</a>
            <span>•</span>
            <a href="#" className="hover:text-gold-500 transition-colors">Cruelty Free Certificado</a>
            <span>•</span>
            <a href="#" className="hover:text-gold-500 transition-colors">Fórmulas Veganas</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
