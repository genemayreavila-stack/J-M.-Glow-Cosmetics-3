import React, { useState, useEffect } from "react";
import { PRODUCTS } from "./data";
import { Product, CartItem } from "./types";
import { Star, ChevronUp, Sparkles, MapPin, Mail, Phone, Clock, ArrowRight, UserCheck, Heart } from "lucide-react";

// Modular Component Imports
import Loader from "./components/Loader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import Benefits from "./components/Benefits";
import ExclusiveCollection from "./components/ExclusiveCollection";
import Testimonies from "./components/Testimonies";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";

export default function App() {
  // --- STATE ENGINES ---
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("jmglows_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
      return [];
    } catch (e) {
      console.error("Local storage cart parsing expired or failed:", e);
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("jmglows_theme");
      return saved ? saved === "dark" : true; // Defaults to Elegant Dark theme
    } catch (e) {
      console.warn("Local storage theme detection failed:", e);
      return true;
    }
  });

  const [backToTopVisible, setBackToTopVisible] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);

  // --- LOCAL PERSISTENCE ---
  useEffect(() => {
    try {
      localStorage.setItem("jmglows_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Local storage cart write failed:", e);
    }
  }, [cart]);

  // --- THEME REFLECTION ---
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("jmglows_theme", "dark");
      } catch (e) {
        console.warn("Local storage theme write failed:", e);
      }
    } else {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("jmglows_theme", "light");
      } catch (e) {
        console.warn("Local storage theme write failed:", e);
      }
    }
  }, [darkMode]);

  // --- FLOATING VISIBILITY WATCHERS ---
  useEffect(() => {
    const handleScroll = () => {
      setBackToTopVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- CART HANDLERS ---
  const handleAddToCart = (product: Product, shade?: string, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedShade === shade
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedShade: shade }];
      }
    });

    const notificationString = shade
      ? `Agregado: ${product.name} (${shade}) x${quantity} al cofre.`
      : `Agregado: ${product.name} x${quantity} al cofre.`;
    handleShowToast(notificationString);
  };

  const handleUpdateQty = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
    } else {
      setCart((prevCart) => {
        const updated = [...prevCart];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // --- UTILITY SENSORS ---
  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
    // Dismiss toast after 3.2 seconds
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? "" : prev));
    }, 3200);
  };

  const scrollToSection = (id: string) => {
    const item = document.getElementById(id);
    if (item) {
      item.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      const form = e.target as HTMLFormElement;
      form.reset();
      handleShowToast("✓ Consulta suntuosa enviada. Un conserje experto te contactará en breve.");
    }, 2000);
  };

  // --- PRODUCT DATA COMPUTATION ---
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-neutral-900 dark:text-neutral-100 selection:bg-gold-500 selection:text-neutral-950 font-sans transition-colors duration-300">
      
      {/* 1. Initial Beautiful Loader */}
      <Loader />

      {/* 2. Global Adaptive Header */}
      <Header
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q) {
            scrollToSection("productos");
          }
        }}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        onGoToSection={scrollToSection}
      />

      {/* 3. Hero Visual Parallax banner */}
      <Hero
        onExploreProducts={() => {
          setSelectedCategory("all");
          scrollToSection("productos");
        }}
        onExploreCollection={() => {
          scrollToSection("colecciones");
        }}
      />

      {/* 4. Elegant Category Grid */}
      <Categories
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => {
          // If already selected, reset filter, else set filter
          const newVal = selectedCategory === catId ? "all" : catId;
          setSelectedCategory(newVal);
          scrollToSection("productos");
        }}
      />

      {/* 5. Products Listing and Realtime Filters */}
      <section id="productos" className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main header block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-gold-600 block mb-1">Catálogo Exclusivo</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Nuestros <span className="font-serif italic text-gold-500">Best Sellers</span>
              </h2>
              <div className="mt-2 w-16 h-[2px] bg-gold-400" />
            </div>

            {/* Filter buttons toolbar */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition rounded-sm cursor-pointer border ${
                  selectedCategory === "all"
                    ? "bg-gold-500 text-neutral-950 border-gold-500"
                    : "bg-neutral-50 dark:bg-[#111111] border-neutral-200 dark:border-gold-500/15 hover:bg-neutral-100 dark:hover:border-gold-500/10 text-neutral-700 dark:text-neutral-300"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedCategory("bases")}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition rounded-sm cursor-pointer border ${
                  selectedCategory === "bases"
                    ? "bg-gold-500 text-neutral-950 border-gold-500"
                    : "bg-neutral-50 dark:bg-[#111111] border-neutral-200 dark:border-gold-500/15 hover:bg-neutral-100 dark:hover:border-gold-500/10 text-neutral-700 dark:text-neutral-300"
                }`}
              >
                Bases
              </button>
              <button
                onClick={() => setSelectedCategory("labiales")}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition rounded-sm cursor-pointer border ${
                  selectedCategory === "labiales"
                    ? "bg-gold-500 text-neutral-950 border-gold-500"
                    : "bg-neutral-50 dark:bg-[#111111] border-neutral-200 dark:border-gold-500/15 hover:bg-neutral-100 dark:hover:border-gold-500/10 text-neutral-700 dark:text-neutral-300"
                }`}
              >
                Labiales
              </button>
              <button
                onClick={() => setSelectedCategory("sombras")}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition rounded-sm cursor-pointer border ${
                  selectedCategory === "sombras"
                    ? "bg-gold-500 text-neutral-950 border-gold-500"
                    : "bg-neutral-50 dark:bg-[#111111] border-neutral-200 dark:border-gold-500/15 hover:bg-neutral-100 dark:hover:border-gold-500/10 text-neutral-700 dark:text-neutral-300"
                }`}
              >
                Sombras
              </button>
              <button
                onClick={() => setSelectedCategory("iluminadores")}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition rounded-sm cursor-pointer border ${
                  selectedCategory === "iluminadores"
                    ? "bg-gold-400 text-neutral-950 border-gold-400"
                    : "bg-neutral-50 dark:bg-[#111111] border-neutral-200 dark:border-gold-500/15 hover:bg-neutral-100 dark:hover:border-gold-500/10 text-neutral-700 dark:text-neutral-300"
                }`}
              >
                Iluminadores
              </button>
            </div>
          </div>

          {/* Real-time search counter if searching */}
          {searchQuery && (
            <div className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
              Resultados de búsqueda para "<span className="font-semibold text-gold-600">{searchQuery}</span>": {filteredProducts.length} productos suntuosos encontrados.
            </div>
          )}

          {/* Dynamic Grid Layout */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-neutral-50 dark:bg-neutral-900/10 rounded-2xl border border-dashed border-neutral-100 dark:border-neutral-900">
              <span className="font-serif italic text-lg text-neutral-500 block mb-2">No se encontraron productos suntuosos</span>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">Prueba limpiando tu filtro de búsqueda o seleccionando "Todos" para descubrir nuestra gama completa.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-6 px-5 py-2.5 bg-gold-500 hover:bg-neutral-950 hover:text-gold-400 text-neutral-950 font-semibold uppercase tracking-wider text-xs rounded transition"
              >
                Mostrar Todos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard
                    product={product}
                    onAddToCart={(p: Product, sh?: string) => handleAddToCart(p, sh, 1)}
                    onOpenDetail={(p: Product) => setActiveProductDetail(p)}
                  />
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 6. Section core benefits banner */}
      <Benefits />

      {/* 7. suntuosos Exclusive Collection Banner */}
      <ExclusiveCollection
        onExplore={() => {
          setSelectedCategory("all");
          scrollToSection("productos");
          handleShowToast("Explorando la suntuosa Colección Glamour 2026. ¡Usa el filtro para encontrar tus favoritos!");
        }}
      />

      {/* 8. Pristine block for "Nosotros / Nuestra Misión" (Not specified in standalone elements, but added for a holistic layout) */}
      <section id="nosotros" className="py-24 bg-neutral-50 dark:bg-[#0a0a0a] border-y border-neutral-100 dark:border-gold-500/10 transition-colors duration-300 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Storytelling left column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-1 text-gold-600 block text-xs font-mono uppercase tracking-widest">
                <Heart className="w-4 h-4 fill-gold-500 text-gold-500 animate-pulse" />
                <span>Nuestra Filosofía</span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
                Ciencia limpia, <br />
                <span className="font-serif italic text-gold-500">arte suntuoso</span>
              </h2>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans font-light">
                Fundada en el corazón de la búsqueda del brillo puro, J & M. Glows Cosmetics redefine el concepto de la beauty premium. Creemos que el maquillaje no debe ocultar quién eres, sino actuar como un sutil multiplicador de luminiscencia natural de tu propia piel.
              </p>

              <div className="border-l-2 border-gold-500 pl-4 py-1 italic text-xs text-neutral-500 dark:text-neutral-400">
                “Nuestras perlas tridimensionales reflejan la luz como diamantes microscópicos. No es una fórmula común, es el elixir suntuoso de la confianza absoluta.” <br />
                <span className="block mt-2 font-serif font-bold text-neutral-950 dark:text-white not-italic">— Directora de Belleza, J & M Glows</span>
              </div>

              {/* Dynamic feature highlights */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white dark:bg-[#111111] rounded border border-neutral-100 dark:border-gold-500/10">
                  <span className="block text-2xl font-serif font-bold text-gold-500">100%</span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">Cruelty Free</span>
                </div>
                <div className="p-4 bg-white dark:bg-[#111111] rounded border border-neutral-100 dark:border-gold-500/10">
                  <span className="block text-2xl font-serif font-bold text-gold-500">Organics</span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">Activos Certificados</span>
                </div>
              </div>

            </div>

            {/* Aesthetic right column with double collage layout */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop"
                  alt="Espejo de cortesía de maquillaje J & M"
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlapping luxury miniature floating product card */}
              <div className="absolute -bottom-6 -left-6 bg-white/90 dark:bg-[#111111]/95 backdrop-blur-md rounded-xl p-5 border border-gold-500/20 shadow-xl max-w-[220px] hidden sm:block">
                <div className="flex items-center space-x-1.5 mb-2">
                  <span className="text-[10px] bg-gold-400 text-neutral-950 font-bold px-2 py-0.5 uppercase tracking-wide">Fórmula Pura</span>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-normal font-sans">
                  Todas nuestras paletas y polvos están testados por dermatólogos bajo estrictos estándares de la cosmética limpia europea.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 9. Interactive Opinions Testimonial Carousel */}
      <Testimonies />

      {/* 10. Subscription Newsletter */}
      <Newsletter />

      {/* 11. Pristine Contact Desk Form */}
      <section id="contacto" className="py-24 bg-white dark:bg-[#0a0a0a] border-t border-neutral-100 dark:border-gold-500/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Contact Info Panel Left */}
            <div className="md:col-span-1 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-gold-600 block mb-1">Mesa de Consultas</span>
                <h3 className="font-serif text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  Reserva Tu Asesoría <span className="font-serif italic text-gold-500">Virtual</span>
                </h3>
                <div className="mt-2 w-12 h-[1px] bg-gold-400" />
              </div>

              <p className="text-xs font-light text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
                ¿Tienes dudas sobre tu subtono de piel o la base perfecta? Nuestro panel suntuoso de maquillistas consultará contigo en tiempo real para recomendarte tu set exacto.
              </p>

              {/* Informative Items */}
              <div className="space-y-4 pt-4 text-xs">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-semibold">Flagship Store Oficial</span>
                    <span className="text-neutral-500">Quinta Avenida 452, Manhattan, NY, 10018</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-semibold">Mesa de Asistencia VIP</span>
                    <span className="text-neutral-500 text-gold-600 block">vip-desk@jmglows.com</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-semibold">Horarios de Conserjería</span>
                    <span className="text-neutral-500">Lunes a Sábado: 09:00 - 18:00 (EST)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Main Interactive Contact Desk Form Middle and Right */}
            <div className="md:col-span-2">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-1 font-mono">Nombre Completo</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#111111] border border-neutral-100 dark:border-gold-500/15 rounded text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gold-500"
                      placeholder="Ej: Carolina de Borbón"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-1 font-mono">Correo Electrónico</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#111111] border border-neutral-100 dark:border-gold-500/15 rounded text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gold-500"
                      placeholder="Ej: carolina@gmail.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-1 font-mono">Tipo de Consulta</label>
                    <select
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#111111] border border-neutral-100 dark:border-gold-500/15 rounded text-sm text-neutral-900 dark:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-gold-500"
                      required
                    >
                      <option value="advisor">Elección de Tono (Asesoría VIP Gratis)</option>
                      <option value="order">Pre-ordenes Especiales o Colecciones</option>
                      <option value="press">Relaciones de Prensa / Embajadoras</option>
                      <option value="other">Asistencia General de Compra</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-1 font-mono">Teléfono de Contacto (Opcional)</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#111111] border border-neutral-100 dark:border-gold-500/15 rounded text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gold-500"
                      placeholder="Ej: +34 600 000 000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-1 font-mono">Detalle de tu Mensaje Suntuoso</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#111111] border border-neutral-100 dark:border-gold-500/15 rounded text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gold-500"
                    placeholder="Cuéntanos un poco cuál es tu tipo de piel o la gama que te gustaría explorar..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactSuccess}
                  className="w-full py-3.5 bg-neutral-950 dark:bg-gold-500 hover:bg-gold-500 dark:hover:bg-neutral-900 hover:text-neutral-950 dark:hover:text-gold-400 text-white dark:text-neutral-950 font-bold tracking-wider uppercase text-xs transition duration-300 rounded cursor-pointer shrink-0 shadow-lg"
                >
                  {contactSuccess ? "Solicitando..." : "Agendar Consulta de Lujo"}
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* 12. Corporate Elegant Footer */}
      <Footer onGoToSection={scrollToSection} />

      {/* 13. shopping Drawer Cart Sidebar */}
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onShowToast={handleShowToast}
      />

      {/* 14. Product Quick Details Modal */}
      <ProductDetailModal
        product={activeProductDetail}
        onClose={() => setActiveProductDetail(null)}
        onAddToCart={(p, sh, qty) => {
          handleAddToCart(p, sh, qty);
          setActiveProductDetail(null);
        }}
      />

      {/* 15. Back to Top Button */}
      {backToTopVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 bg-neutral-950 text-gold-400 border border-gold-500/30 hover:border-gold-500 hover:bg-gold-500 hover:text-neutral-950 rounded-full shadow-2xl z-40 transition-all duration-300 cursor-pointer animate-fade-in hover:translate-y-[-2px]"
          title="Volver Arriba"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* 16. Temporary Floating Notification Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-neutral-900/95 dark:bg-white text-white dark:text-neutral-950 border border-gold-500/30 dark:border-gold-500/20 px-5 py-3.5 rounded-lg shadow-2xl backdrop-blur-md max-w-sm flex items-center justify-between space-x-3 animate-fade-in font-sans text-xs">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-gold-400 shrink-0 animate-spin" />
            <span className="font-medium leading-relaxed">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage("")}
            className="text-gold-500 hover:text-white dark:text-gold-600 dark:hover:text-neutral-950 text-[10px] uppercase font-bold font-mono pl-2 border-l border-neutral-700 dark:border-neutral-200 cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      )}

    </div>
  );
}
