import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { ChefStory } from "./pages/ChefStory";
import { CartSidebar } from "./components/layout/CartSidebar"; // <--- Nowy import
import { CartProvider } from "./context/CartContext";         // <--- Nowy import
import { motion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useEffect } from "react";
import { Checkout } from "./pages/Checkout"; // <--- Import
// --- POMOCNIK SCROLLOWANIA (Bez zmian) ---
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) {
        window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return null;
};

function App() {
  const { scrollYProgress } = useScroll();

  // Animacje tła
  const yGlow1 = useTransform(scrollYProgress, [0, 1], [0, 500]); 
  const xGlow1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityGlow1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.3, 0]);
  const yGlow2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const scaleGlow2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);

  return (
    // 1. OWIJAMY CAŁĄ APLIKACJĘ W CART PROVIDER
    <CartProvider>
      <Router>
        <ScrollHandler /> 

        <div className="min-h-screen font-sans text-text-main relative selection:bg-brand selection:text-white">
          
          {/* TŁO */}
          <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#000000]" />
            <motion.div 
              style={{ y: yGlow1, x: xGlow1, opacity: opacityGlow1 }}
              className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-accent/10 rounded-full blur-[120px]"
            />
            <motion.div 
              style={{ y: yGlow2, scale: scaleGlow2 }}
              className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brand/5 rounded-full blur-[100px] opacity-40"
            />
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          </div>

          <Navbar />
          
          {/* 2. DODAJEMY SIDEBAR (Będzie niewidoczny dopóki nie klikniesz ikony) */}
          <CartSidebar />

          <main className="relative z-10 flex flex-col w-full min-h-screen"> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/story" element={<ChefStory />} />
              <Route path="/checkout" element={<Checkout />} /> {/* <--- NOWA TRASA */}
            </Routes>
          </main>

          <div className="relative z-10">
            <Footer />
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;