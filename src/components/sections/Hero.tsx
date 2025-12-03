import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion'; // <--- Importujemy hooki
import { useRef } from 'react';

export const Hero = () => {
  const ref = useRef(null);

  // 1. Pobieramy pozycję scrolla dla tego konkretnego elementu
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"] // Od początku sekcji do jej końca
  });

  // 2. Transformacja: Im bardziej scrollujemy, tym bardziej tło przesuwa się w dół (ale wolniej)
  // ["0%", "50%"] oznacza: gdy sekcja przejdzie 100% wysokości, tło przesunie się tylko o 50%.
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Opcjonalnie: Tekst może znikać (opacity) przy scrollowaniu
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]); 

  return (
    <section 
      ref={ref} 
      className="relative h-screen flex items-center pt-20 overflow-hidden" 
      id="hero" // Dodaj ID dla linków
    >
      
      {/* TŁO PARALLAX */}
      {/* Używamy motion.div i style={{ y: backgroundY }} */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
         {/* Tutaj możesz dać gradient lub zdjęcie */}
         <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/90 to-secondary" />
         {/* Opcjonalnie: Dodajmy tu jakieś subtelne koła/glow, które będą się ruszać */}
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/20 blur-[120px] rounded-full" />
      </motion.div>

      {/* GŁÓWNY KONTENER (ZWIĘKSZONY Z-INDEX, ŻEBY BYŁ NAD TŁEM) */}
      <motion.div 
        style={{ opacity: textOpacity }} // Tekst powoli zanika przy scrollu
        className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10"
      >
        
        {/* LEWA KOLUMNA: TEKST (Bez zmian w treści, tylko logika Parallax wyżej) */}
        <div className="text-left">
            
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-bold tracking-[0.3em] text-sm uppercase mb-4 block">
              Est. 2024 • Tokyo Spirit
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            SZTUKA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-rose-600">
              KULINARNA
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-text-muted text-lg mb-8 max-w-lg"
          >
            Odkryj fuzję smaków, gdzie tradycyjne sushi spotyka nowoczesną technologię. 
            Rezerwuj stolik i przeżyj kulinarną podróż.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#reservation" className="bg-brand text-white px-8 py-3 rounded font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2 group">
              Rezerwuj Stolik
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a href="#menu" className="border border-white/20 text-white px-8 py-3 rounded font-medium hover:bg-white hover:text-black transition-all flex items-center justify-center">
              Zobacz Menu
            </a>
          </motion.div>
        </div>

        {/* PRAWA KOLUMNA: ZDJĘCIE (Też może mieć lekki parallax!) */}
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand/20 blur-[60px] rounded-full" />
            
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                    src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop" 
                    alt="Zenith Sushi Plate" 
                    className="w-full h-auto object-cover"
                />
            </div>
        </motion.div>

      </motion.div>
    </section>
  );
};