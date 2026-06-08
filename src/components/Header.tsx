import React, { useState, useEffect } from "react";
import { ShoppingBag, Search, Sun, Moon, Menu, X, Sparkles } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  onGoToSection: (sectionId: string) => void;
}

export default function Header({
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  darkMode,
  onToggleTheme,
  onGoToSection
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Inicio", id: "inicio" },
    { name: "Productos", id: "productos" },
    { name: "Colecciones", id: "colecciones" },
    { name: "Nosotros", id: "nosotros" },
    { name: "Contacto", id: "contacto" }
  ];

  const handleNavClick = (id: string) => {
    onGoToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-[#0a0a0a]/95 py-3 shadow-lg backdrop-blur-md border-b border-gold-500/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("inicio");
              }}
              className="flex items-center text-xl sm:text-2xl font-bold tracking-widest text-gold-500 transition-colors duration-200 font-serif"
            >
              J & M. <span className="text-neutral-900 dark:text-white font-light ml-1.5 uppercase">Glows</span>
            </a>
          </div>

          {/* Nav Links - Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-sm font-medium uppercase tracking-wider text-neutral-600 hover:text-gold-500 dark:text-neutral-300 dark:hover:text-gold-400 transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-gold-500 dark:hover:text-gold-400 transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark/Light mode toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-gold-500 dark:hover:text-gold-400 transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              title={darkMode ? "Modo Claro" : "Modo Oscuro"}
            >
              {darkMode ? <Sun className="w-5 h-5 text-gold-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Shopping Cart Bag */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-neutral-700 dark:text-neutral-300 hover:text-gold-500 dark:hover:text-gold-400 transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              title="Carrito de compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-neutral-900 font-sans text-xs font-bold leading-none w-5 h-5 rounded-full flex items-center justify-center border border-white dark:border-neutral-900 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-neutral-700 dark:text-neutral-300 hover:text-gold-500 dark:hover:text-gold-400 transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Real-time Search expander */}
        {searchOpen && (
          <div className="mt-3 py-3 border-t border-neutral-100 dark:border-neutral-800 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar cosméticos de alta gama (ej: base, labial, iluminador)..."
                className="w-full pl-10 pr-10 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 dark:text-white text-sm"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-2 px-1 text-sm text-neutral-400 hover:text-gold-500"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-950 border-b border-gold-500/10 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-neutral-700 hover:bg-gold-50 hover:text-gold-600 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-gold-400 transition-all border-l-2 border-transparent hover:border-gold-500"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
