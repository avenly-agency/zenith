import { motion } from "framer-motion";
import type { Variants } from "framer-motion"; // <--- Osobny import dla typu naprawia błąd
import { ArrowLeft, Award, Flame, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

// --- KONFIGURACJA ANIMACJI ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

export const ChefStory = () => {
  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      
      {/* PRZYCISK POWROTU */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link to="/" className="inline-flex items-center gap-2 text-text-muted hover:text-brand transition-colors mb-12 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Wróć do strony głównej
        </Link>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        
        {/* NAGŁÓWEK */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
            <span className="text-accent tracking-[0.3em] font-bold text-sm uppercase block mb-4">
            The Origin Story
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            KENJI <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-purple-600">NAKAMURA</span>
            </h1>
        </motion.div>

        {/* INTRO */}
        <motion.div 
            className="grid md:grid-cols-2 gap-12 mb-16 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
        >
            <motion.p variants={fadeInUp} className="text-xl text-text-main leading-relaxed">
                "Gotowanie to nie chemia. To kodowanie rzeczywistości. Każdy składnik to zmienna, a smak to wynik algorytmu."
            </motion.p>
            <motion.p variants={fadeInUp} className="text-text-muted leading-relaxed">
                Urodzony w Osace, wychowany w Neo-Tokyo. Kenji nie zaczął od krojenia ryb. Zaczął od hakowania systemów bezpieczeństwa. 
                Jego obsesja na punkcie precyzji przeniosła się z klawiatury na nóż Yanagiba.
            </motion.p>
        </motion.div>

        {/* ZDJĘCIE */}
        <motion.div 
            className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
        >
            <img 
                src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2000&auto=format&fit=crop" 
                alt="Chef Kenji in action"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
            <motion.div 
                className="absolute bottom-8 left-8 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <p className="font-bold text-lg">Tokio, 2019</p>
                <p className="text-sm opacity-70">Pierwsza gwiazdka Michelin</p>
            </motion.div>
        </motion.div>

        {/* OŚ CZASU */}
        <div className="space-y-12 relative border-l border-white/10 ml-4 pl-12">
            
            {/* 2015 */}
            <motion.div 
                className="relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
            >
                <span className="absolute -left-[55px] top-1 w-6 h-6 bg-brand rounded-full border-4 border-black"></span>
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                    <Utensils size={24} className="text-brand" /> 2015: Zmiana Kodu
                </h3>
                <p className="text-text-muted">
                    Porzuca karierę w CyberSec na rzecz stażu u legendarnego mistrza Jiro. 
                    Przez 2 lata myje tylko ryż, ucząc się pokory.
                </p>
            </motion.div>

            {/* 2020 */}
            <motion.div 
                className="relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
            >
                <span className="absolute -left-[55px] top-1 w-6 h-6 bg-accent rounded-full border-4 border-black"></span>
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                    <Flame size={24} className="text-accent" /> 2020: Projekt ZENITH
                </h3>
                <p className="text-text-muted">
                    Otwiera pierwszą restaurację, która używa AI do komponowania smaków umami. 
                    Krytycy są podzieleni, klienci zachwyceni.
                </p>
            </motion.div>

            {/* 2024 */}
            <motion.div 
                className="relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
            >
                <span className="absolute -left-[55px] top-1 w-6 h-6 bg-white rounded-full border-4 border-black"></span>
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                    <Award size={24} className="text-white" /> 2024: Przyszłość
                </h3>
                <p className="text-text-muted">
                    Zenith staje się globalną marką. Kenji wciąż sam wybiera ryby na targu o 4:00 rano.
                </p>
            </motion.div>

        </div>

      </div>
    </div>
  );
};