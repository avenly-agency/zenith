import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Star, ChefHat, ArrowUpRight } from 'lucide-react';

const STATS = [
  { label: "Lat doświadczenia", value: "15+" },
  { label: "Nagrody Michelin", value: "2" },
  { label: "Unikalne Przepisy", value: "40+" },
];

export const About = () => {
  const ref = useRef(null);
  
  // Konfiguracja Parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] // start end = góra sekcji dotyka dołu ekranu
  });

  // ZWIĘKSZONE WARTOŚCI PRZESUNIĘCIA
  // Karta 1 (Chef): Jedzie w dół
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  
  // Karta 2 (Opinia): Jedzie mocno w górę
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Zdjęcie główne: Przesuwa się wolniej (tworzy głębię względem kart)
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section id="about" ref={ref} className="py-24 relative overflow-hidden">
      
      {/* Usunęliśmy lokalne tła/blobs, bo mamy globalne w App.tsx */}
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEWA KOLUMNA (Tekst) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }} // Odpali się trochę wcześniej
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-brand font-bold tracking-widest text-sm mb-6">
              <span className="w-8 h-[2px] bg-brand"></span>
              NASZA FILOZOFIA
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              TRADYCJA SPOTYKA <br />
              <span className="text-accent">CYFROWĄ PRECYZJĘ</span>
            </h2>

            <p className="text-text-muted text-lg mb-6 leading-relaxed">
              W Zenith wierzymy, że jedzenie to nie tylko paliwo. To kod, który programuje Twoje zmysły. 
              Łączymy starożytne techniki japońskich mistrzów z molekularną precyzją nowoczesnej gastronomii.
            </p>

            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {STATS.map((stat, index) => (
                <div key={index}>
                  <h4 className="text-3xl font-bold text-white mb-1">{stat.value}</h4>
                  <p className="text-sm text-text-muted uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            <button className="mt-10 flex items-center gap-2 text-accent hover:text-white transition-colors group font-medium">
              Poznaj historię Szefa Kuchni 
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>

          {/* PRAWA KOLUMNA (Parallax Visuals) */}
          <div className="relative">
            
            {/* ZDJĘCIE GŁÓWNE (z lekkim parallaxem yImg) */}
            <motion.div 
              style={{ y: yImg }} 
              className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop" 
                alt="Chef preparing sushi" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </motion.div>

            {/* KARTA 1 (Góra) */}
            <motion.div 
              style={{ y: y1 }}
              className="absolute -top-12 -right-6 z-20 bg-secondary/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl flex items-center gap-3 max-w-[200px]"
            >
              <div className="bg-brand/20 p-2 rounded-lg text-brand">
                <ChefHat size={24} />
              </div>
              <div>
                <p className="text-xs text-text-muted">Head Chef</p>
                <p className="font-bold text-sm">Kenji Nakamura</p>
              </div>
            </motion.div>

            {/* KARTA 2 (Dół) */}
            <motion.div 
              style={{ y: y2 }}
              className="absolute -bottom-16 -left-10 z-20 bg-accent text-primary p-6 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="font-bold text-lg leading-tight">"Best Sushi <br/> in Cyber City"</p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};