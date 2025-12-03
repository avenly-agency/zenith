import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, Minus, Plus } from 'lucide-react'; // Dodaliśmy Minus i Plus
import { AnimatedPrice } from '../ui/AnimatedPrice'; // <--- Import
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Do nawigacji

export const CartSidebar = () => {
  const { 
    isCartOpen, 
    toggleCart, 
    items, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    totalPrice 
  } = useCart();
  
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart(); // Zamknij koszyk
    navigate('/checkout'); // Przejdź do strony płatności
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* TŁO */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />

          {/* PANEL */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0a0a0a]/95 border-l border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            {/* NAGŁÓWEK */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-primary/50 backdrop-blur-md">
              <h2 className="text-2xl font-bold tracking-wider">TWOJE ZAMÓWIENIE</h2>
              <button onClick={toggleCart} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* LISTA */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-text-muted opacity-50">
                  <p>Twój koszyk jest pusty</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout 
                    key={item.id} 
                    className="flex gap-4 bg-secondary/50 p-4 rounded-xl border border-white/5"
                  >
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-sm">{item.name}</h3>
                        <p className="text-accent font-mono text-sm">{item.price}</p>
                      </div>
                      
                      {/* NOWOŚĆ: KONTROLKI ILOŚCI */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center bg-black/40 rounded-lg border border-white/10">
                            <button 
                                onClick={() => decreaseQuantity(item.id)}
                                className="p-2 hover:text-brand transition-colors disabled:opacity-50"
                                disabled={item.quantity <= 1}
                            >
                                <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                            <button 
                                onClick={() => increaseQuantity(item.id)}
                                className="p-2 hover:text-brand transition-colors"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                        
                        <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-text-muted hover:text-red-500 transition-colors ml-auto p-2"
                        >
                            <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* STOPKA */}
           <div className="p-6 border-t border-white/10 bg-secondary/30 backdrop-blur-md">
              <div className="flex justify-between items-center mb-6 text-xl font-bold">
                <span>Suma:</span>
                {/* ZMIANA: Zamiast zwykłego tekstu, używamy naszego licznika */}
                <span className="text-brand">
                  <AnimatedPrice value={totalPrice} />
                </span>
              </div>
              <button 
                onClick={handleCheckout} 
                disabled={items.length === 0}
                className="w-full bg-brand text-white py-4 rounded-lg font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                PRZEJDŹ DO PŁATNOŚCI
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};