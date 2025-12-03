import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleCart, itemsCount } = useCart();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // TWOJE LINKI (Mieszane: ID sekcji i Ścieżki URL)
  const LINKS = [
    { name: "O NAS", target: "about" },
    { name: "MENU", target: "menu" },
    { name: "HISTORIA", target: "/story" }, // <--- To jest podstrona
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // --- NAPRAWIONA LOGIKA NAWIGACJI ---
  const handleNavigation = (target: string) => {
    setIsOpen(false);

    // 1. Jeśli target zaczyna się od "/", to jest to nowa podstrona (np. /story)
    if (target.startsWith('/')) {
        navigate(target);
        return; // Kończymy funkcję, nie szukamy ID
    }

    // 2. Jeśli to nie ścieżka, to traktujemy jako ID sekcji (Scroll)
    if (location.pathname === '/') {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Jeśli jesteśmy na innej podstronie, wracamy na główną z hashem
      navigate(`/#${target}`);
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? "bg-primary/80 backdrop-blur-md border-white/10 py-3 shadow-lg" 
          : "bg-transparent border-transparent py-5"
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          <button onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 bg-brand rounded-full blur-[10px] absolute opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative text-2xl font-bold tracking-widest text-text-main">
                  ZENITH
              </span>
          </button>

          <ul className="hidden md:flex gap-8 text-sm font-medium text-text-muted">
              {LINKS.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleNavigation(link.target)}
                    className="hover:text-accent transition-colors cursor-pointer uppercase"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
          </ul>

          <div className="flex items-center gap-6">
              
              <button 
                onClick={toggleCart} 
                className="text-text-main hover:text-brand transition-colors relative"
              >
                  <ShoppingBag size={20} />
                  {itemsCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-brand text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                    >
                      {itemsCount}
                    </motion.span>
                  )}
              </button>

              <button 
                onClick={() => handleNavigation('reservation')}
                className={`hidden md:block px-5 py-2 rounded-sm font-bold transition-all duration-300 ${
                    isScrolled 
                    ? "bg-text-main text-primary hover:bg-brand hover:text-white" 
                    : "bg-white/10 text-white hover:bg-white hover:text-black backdrop-blur-sm"
                }`}
              >
                  REZERWACJA
              </button>

              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-text-main z-50 relative"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
          </div>

        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-primary/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            <ul className="flex flex-col items-center gap-8 text-2xl font-bold text-text-main">
              {LINKS.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <button 
                    onClick={() => handleNavigation(link.target)}
                    className="hover:text-brand transition-colors tracking-widest uppercase"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
               <button 
                onClick={() => handleNavigation('reservation')}
                className="bg-brand text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-red-600 transition-all shadow-[0_0_20px_rgba(255,46,99,0.4)]"
              >
                ZAREZERWUJ STOLIK
              </button>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};