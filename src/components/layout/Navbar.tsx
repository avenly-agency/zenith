import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react'; // Dodajemy ikonę X
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ZDEFINIOWANE LINKI (DRY - Don't Repeat Yourself)
  // Zmieniliśmy href na #id sekcji
 const LINKS = [
     { name: "O NAS", target: "#about" }, // <--- Zmiana z "O NAS" i linku #footer
  { name: "MENU", target: "#menu" },
  { name: "REZERWACJA", target: "#reservation" },
];

  // Efekt blokowania scrolla strony, gdy menu mobilne jest otwarte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Funkcja pomocnicza do klikania w linki mobilne
  const handleLinkClick = () => {
    setIsOpen(false); // Zamknij menu
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-primary/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* LOGO (Kliknięcie przewija na górę) */}
          <a href="#" className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 bg-brand rounded-full blur-[10px] absolute opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative text-2xl font-bold tracking-widest text-text-main">
                  ZENITH
              </span>
          </a>

          {/* MENU DESKTOPOWE */}
          <ul className="hidden md:flex gap-8 text-sm font-medium text-text-muted">
              {LINKS.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.target} 
                    className="hover:text-accent transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
          </ul>

          {/* ACTIONS & HAMBURGER */}
          <div className="flex items-center gap-6">
              <button className="text-text-main hover:text-brand transition-colors">
                  <ShoppingBag size={20} />
              </button>

              <a 
                href="#reservation" 
                className="hidden md:block bg-text-main text-primary px-5 py-2 rounded-sm font-bold hover:bg-brand hover:text-white transition-all duration-300"
              >
                  REZERWACJA
              </a>

              {/* Przycisk Hamburgera (Tylko Mobile) */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-text-main z-50 relative" // z-50 żeby był nad menu
              >
                {/* Podmieniamy ikonę: Menu (paski) lub X (zamknij) */}
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
          </div>

        </div>
      </nav>

      {/* MOBILE MENU OVERLAY (Pełny ekran) */}
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
                  transition={{ delay: 0.1 + index * 0.1 }} // Kaskadowe pojawianie się linków
                >
                  <a 
                    href={link.target} 
                    onClick={handleLinkClick} // Zamyka menu po kliknięciu
                    className="hover:text-brand transition-colors tracking-widest"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Dodatkowy przycisk w menu mobilnym */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
               <a 
                href="#reservation" 
                onClick={handleLinkClick}
                className="bg-brand text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-red-600 transition-all shadow-[0_0_20px_rgba(255,46,99,0.4)]"
              >
                ZAREZERWUJ STOLIK
              </a>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};     