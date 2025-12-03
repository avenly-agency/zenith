import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Star, ChefHat, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const STATS = [
  { label: "Lat doświadczenia", value: "15+" },
  { label: "Nagrody Michelin", value: "2" },
  { label: "Unikalne Przepisy", value: "40+" },
];

export const About = () => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax aktywny tylko na dużych ekranach (logika w stylach)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section id="about" ref={ref} className="py-20 md:py-24 relative bg-transparent overflow-hidden">
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEWA KOLUMNA: TEKST */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-brand font-bold tracking-widest text-xs md:text-sm mb-6">
              <span className="w-8 h-[2px] bg-brand"></span>
              NASZA FILOZOFIA
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              TRADYCJA SPOTYKA <br />
              <span className="text-accent">CYFROWĄ PRECYZJĘ</span>
            </h2>

            <p className="text-text-muted text-base md:text-lg mb-6 leading-relaxed">
              W Zenith wierzymy, że jedzenie to nie tylko paliwo. To kod, który programuje Twoje zmysły. 
              Łączymy starożytne techniki japońskich mistrzów z molekularną precyzją nowoczesnej gastronomii.
            </p>

            <div className="grid grid-cols-3 gap-4 md:gap-6 border-t border-white/10 pt-8">
              {STATS.map((stat, index) => (
                <div key={index}>
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</h4>
                  <p className="text-xs md:text-sm text-text-muted uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link 
              to="/story" 
              className="mt-10 flex items-center gap-2 text-accent hover:text-white transition-colors group font-medium"
            >
              Poznaj historię Szefa Kuchni 
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>

          {/* PRAWA KOLUMNA: VISUALS */}
          <div className="relative mt-8 lg:mt-0">
            
            {/* ZDJĘCIE GŁÓWNE */}
            <motion.div 
              style={{ y: window.innerWidth >= 1024 ? yImg : 0 }}
              className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop" 
                alt="Chef preparing sushi" 
                className="w-full h-auto object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </motion.div>

            {/* --- KARTY (RESPONSYWNE) --- */}
            {/* Mobile: Flex pod zdjęciem. Desktop (lg): Absolute w rogach */}
            <div className="flex flex-row gap-3 mt-4 lg:block lg:mt-0">
                
                {/* KARTA 1: CHEF */}
                {/* lg:w-40 lg:p-3 -> Zmniejszamy rozmiar na laptopach */}
                <motion.div 
                  style={{ y: window.innerWidth >= 1024 ? y1 : 0 }}
                  className="relative flex-1 lg:flex-none lg:absolute lg:-top-8 lg:-right-8 xl:-top-12 xl:-right-12 z-20 bg-[#101010] lg:bg-[#151515]/90 border border-white/10 p-3 lg:p-3 xl:p-4 rounded-xl shadow-xl flex items-center gap-2 lg:gap-3 w-auto lg:w-40 xl:w-48 backdrop-blur-md"
                >
                  <div className="bg-brand/20 p-2 rounded-lg text-brand shrink-0">
                    <ChefHat size={18} className="lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] lg:text-[9px] xl:text-xs text-text-muted uppercase tracking-wide">Head Chef</p>
                    <p className="font-bold text-xs lg:text-xs xl:text-sm text-white leading-tight">Kenji Nakamura</p>
                  </div>
                </motion.div>

                {/* KARTA 2: OCENA */}
                <motion.div 
                  style={{ y: window.innerWidth >= 1024 ? y2 : 0 }}
                  className="relative flex-1 lg:flex-none lg:absolute lg:-bottom-8 lg:-left-8 xl:-bottom-12 xl:-left-12 z-20 bg-accent text-primary p-3 lg:p-3 xl:p-6 rounded-xl lg:rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.3)] w-auto lg:w-44 xl:w-56"
                >
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} className="lg:w-3 lg:h-3 xl:w-4 xl:h-4" fill="currentColor" />)}
                  </div>
                  <p className="font-bold text-xs lg:text-xs xl:text-lg leading-tight">"Best Sushi in Cyber City"</p>
                </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};