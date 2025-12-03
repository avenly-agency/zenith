import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Menu } from "./components/sections/Menu";
import { Reservation } from "./components/sections/Reservation";

function App() {
  return (
    // Ustawiamy min-h-screen i relatywną pozycję dla głównego kontenera
    <div className="min-h-screen text-text-main font-sans selection:bg-brand selection:text-white relative bg-black">
      
      {/* --- WARSTWA 1: GLOBALNE TŁO (FIXED) --- */}
      {/* z-0: Najniższa warstwa */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Ciemny gradient tła */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1014] via-[#050505] to-[#000000]" />
        
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand/10 rounded-full blur-[120px] opacity-30" />
      </div>

      {/* --- WARSTWA 2: NAWIGACJA (FIXED) --- */}
      {/* Navbar ma w sobie z-50, więc będzie na wierzchu */}
      <Navbar />
      
      {/* --- WARSTWA 3: TREŚĆ (RELATIVE) --- */}
      {/* relative z-10: To wynosi treść NAD tło (z-0) */}
      <main className="relative z-10 flex flex-col w-full"> 
        <Hero />
        <About />
        <Menu />
        <Reservation />
      </main>

      {/* --- WARSTWA 4: STOPKA --- */}
      <div className="relative z-10">
        <Footer />
      </div>

    </div>
  )
}

export default App