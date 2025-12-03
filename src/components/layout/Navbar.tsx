import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'; // <--- Dodajemy hooki scrolla
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // <--- Nowy stan: czy przewinięto?
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleCart, itemsCount } = useCart();
  const { scrollY } = useScroll(); // <--- Hook śledzący pozycję scrolla

  // LOGIKA SCROLLA
  // useMotionValueEvent nasłuchuje zmian w scrollu bez renderowania co piksel
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const LINKS = [
    { name: "O NAS", target: "about" },
    { name: "MENU", target: "menu" },
    { name: "REZERWACJA", target: "reservation" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleNavigation = (targetId: string) => {
    setIsOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${targetId}`);
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
      {/* NAVBAR Z WARUNKOWYMI KLASAMI 
          - transition-all duration-300: zapewnia płynne przejście kolorów
          - py-4 vs py-3: możemy też lekko zmniejszyć padding po scrollu dla lepszego efektu
      */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? "bg-primary/80 backdrop-blur-md border-white/10 py-5 shadow-lg" // Styl po scrollu (Solid/Glass)
          : "bg-transparent border-transparent py-5" // Styl na górze (Przezroczysty, większy padding)
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* LOGO */}
          <button onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 bg-brand rounded-full blur-[10px] absolute opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative text-2xl font-bold tracking-widest text-text-main">
                  ZENITH
              </span>
          </button>

          {/* MENU DESKTOPOWE */}
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

          {/* ACTIONS & KOSZYK */}
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

      {/* MOBILE MENU */}
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