import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

// 1. DANE - Wyselekcjonowane zdjęcia w wysokiej jakości
const MENU_ITEMS = [
  {
    id: 1,
    name: "Dragon Roll Gold",
    desc: "Krewetka w tempurze, awokado, węgorz, płatki złota, sos unagi.",
    price: "59 PLN",
    category: "sushi",
    // Premium Sushi (Ciemne tło)
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Spicy Tuna Tartar",
    desc: "Siekany tuńczyk, chili, olej sezamowy, chipsy z lotosu.",
    price: "45 PLN",
    category: "starters",
    // Tatar z tuńczyka
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Tokyo Ramen",
    desc: "Bulion tonkotsu, boczek chashu, jajko nitamago, nori, olej z czosnku. Prawdziwy smak ulicy.",
    price: "42 PLN",
    category: "ramen",
    // Ramen z jajkiem
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Matcha Cheesecake",
    desc: "Kremowy sernik z japońską herbatą matcha, spód z czarnego sezamu.",
    price: "28 PLN",
    category: "desery",
    // Zielone ciasto Matcha
    image: "https://images.unsplash.com/photo-1551024601-564d6d67e260?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Nigiri Set Premium",
    desc: "8 sztuk: Łosoś, Tuńczyk Bluefin, Hamachi, Przegrzebek.",
    price: "85 PLN",
    category: "sushi",
    // Zestaw Nigiri
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Yuzu Lemonade",
    desc: "Świeży sok z yuzu, mięta, syrop z trawy cytrynowej, woda gazowana.",
    price: "22 PLN",
    category: "napoje",
    // Orzeźwiający napój
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop"
  },
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

  const filteredItems = activeCategory === "all" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 bg-primary" id="menu">
      <div className="container mx-auto px-6">
        
        {/* NAGŁÓWEK */}
        <div className="text-center mb-16">
            <span className="text-accent tracking-widest text-sm uppercase font-bold">
                Odkryj Nasze Smaki
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                MENU GŁÓWNE
            </h2>
            <div className="w-24 h-1 bg-brand mx-auto rounded-full"></div>
        </div>

        {/* FILTRY */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                        activeCategory === cat.id 
                        ? "bg-brand border-brand text-white" 
                        : "border-white/10 text-text-muted hover:border-white hover:text-white"
                    }`}
                >
                    {cat.label}
                </button>
            ))}
        </div>

        {/* SIATKA DAN */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='popLayout'>
                {filteredItems.map((item) => (
                    <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        // Flexbox fix dla równej wysokości
                        className="bg-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-colors group cursor-pointer flex flex-col h-full"
                    >
                        {/* ZDJĘCIE */}
                        <div className="h-64 overflow-hidden relative flex-shrink-0">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-accent font-bold">
                                {item.price}
                            </div>
                        </div>

                        {/* TREŚĆ */}
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-text-main group-hover:text-brand transition-colors">
                                    {item.name}
                                </h3>
                            </div>
                            
                            <p className="text-text-muted text-sm mb-6 line-clamp-3">
                                {item.desc}
                            </p>
                            
                            {/* PRZYCISK NA DOLE */}
                            <div className="mt-auto">
                                <button className="w-full py-3 border border-white/10 rounded flex items-center justify-center gap-2 hover:bg-white hover:text-primary transition-all font-medium">
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