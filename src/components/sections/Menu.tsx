import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const MENU_ITEMS = [
  { id: 1, name: "Dragon Roll Gold", desc: "Krewetka w tempurze, awokado, węgorz, płatki złota, sos unagi.", price: "59 PLN", category: "sushi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Spicy Tuna Tartar", desc: "Siekany tuńczyk, chili, olej sezamowy, chipsy z lotosu.", price: "45 PLN", category: "starters", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Tokyo Ramen", desc: "Bulion tonkotsu, boczek chashu, jajko nitamago, nori, olej z czosnku.", price: "42 PLN", category: "ramen", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Matcha Cheesecake", desc: "Kremowy sernik z japońską herbatą matcha, spód z czarnego sezamu.", price: "28 PLN", category: "desery", image: "https://images.unsplash.com/photo-1551024601-564d6d67e260?q=80&w=800&auto=format&fit=crop" },
  { id: 5, name: "Nigiri Set Premium", desc: "8 sztuk: Łosoś, Tuńczyk Bluefin, Hamachi, Przegrzebek.", price: "85 PLN", category: "sushi", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop" },
  { id: 6, name: "Yuzu Lemonade", desc: "Świeży sok z yuzu, mięta, syrop z trawy cytrynowej, woda gazowana.", price: "22 PLN", category: "napoje", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop" },
];

const CATEGORIES = [
  { id: "all", label: "Wszystko" },
  { id: "sushi", label: "Sushi" },
  { id: "ramen", label: "Ramen" },
  { id: "starters", label: "Przystawki" },
  { id: "desery", label: "Desery" },
  { id: "napoje", label: "Napoje" },
];

export const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { addToCart } = useCart(); 

  const filteredItems = activeCategory === "all" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 md:py-24 bg-transparent relative overflow-hidden" id="menu">
      
      {/* TŁO DEKORACYJNE */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand/5 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* NAGŁÓWEK */}
        <div className="text-center mb-12 md:mb-16">
            <span className="text-accent tracking-widest text-xs md:text-sm uppercase font-bold">
                Odkryj Nasze Smaki
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
                MENU GŁÓWNE
            </h2>
            <div className="w-24 h-1 bg-brand mx-auto rounded-full"></div>
        </div>

        {/* FILTRY (Przewijane poziomo na mobile) */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap justify-start md:justify-center gap-3 md:gap-4 mb-8 md:mb-12 no-scrollbar px-2">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2 rounded-full border whitespace-nowrap transition-all duration-300 text-sm md:text-base ${
                        activeCategory === cat.id 
                        ? "bg-brand border-brand text-white shadow-[0_0_15px_rgba(255,46,99,0.4)]" 
                        : "border-white/10 text-text-muted hover:border-white hover:text-white bg-black/40"
                    }`}
                >
                    {cat.label}
                </button>
            ))}
        </div>

        {/* GRID PRODUKTÓW */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode='popLayout'>
                {filteredItems.map((item) => (
                    <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        // ZMIANA: Na mobile bg jest solidne (#080808), na desktopie półprzezroczyste
                        className="bg-[#080808] border border-white/10 md:bg-[#1a1a1a]/60 md:backdrop-blur-md rounded-2xl overflow-hidden hover:border-accent/30 transition-colors group cursor-pointer flex flex-col h-full shadow-lg"
                    >
                        {/* ZDJĘCIE */}
                        <div className="h-56 md:h-64 overflow-hidden relative flex-shrink-0">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Cena wyraźniejsza */}
                            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg text-accent font-bold text-sm shadow-xl">
                                {item.price}
                            </div>
                        </div>

                        {/* TREŚĆ */}
                        <div className="p-5 md:p-6 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg md:text-xl font-bold text-text-main group-hover:text-brand transition-colors">
                                    {item.name}
                                </h3>
                            </div>
                            
                            <p className="text-text-muted text-sm mb-6 line-clamp-3 leading-relaxed">
                                {item.desc}
                            </p>
                            
                            {/* PRZYCISK */}
                            <div className="mt-auto">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        addToCart(item); 
                                    }}
                                    className="w-full py-3 border border-white/10 bg-white/5 hover:bg-white hover:text-primary rounded-lg flex items-center justify-center gap-2 transition-all font-medium active:scale-95 text-sm md:text-base"
                                >
                                    <Plus size={18} />
                                    Dodaj do zamówienia
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};