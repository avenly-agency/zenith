import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, CheckCircle, ChevronDown } from 'lucide-react';

// --- KOMPONENT CUSTOM SELECT (Bez zmian) ---
interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  icon: any;
}

const CustomSelect = ({ label, value, options, onChange, icon: Icon }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label className="text-sm font-medium text-text-muted ml-1 flex items-center gap-2">
        <Icon size={14} /> {label}
      </label>
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-primary/50 border rounded-lg px-4 py-3 text-white cursor-pointer flex justify-between items-center transition-all ${
          isOpen ? 'border-brand ring-1 ring-brand' : 'border-white/10 hover:border-white/30'
        }`}
      >
        <span>{value || "Wybierz..."}</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand' : 'text-text-muted'}`} 
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-secondary border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden max-h-48 overflow-y-auto"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer transition-colors text-sm ${
                  value === option 
                    ? 'bg-brand/20 text-brand font-bold' 
                    : 'text-text-main hover:bg-white/5'
                }`}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- GŁÓWNY KOMPONENT ---

export const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    guests: '',
    time: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const timeOptions = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
  const guestOptions = ["1 osoba", "2 osoby", "3 osoby", "4 osoby", "5 osób", "6 osób (VIP Room)"];

  return (
    // Dodano overflow-hidden, żeby elementy tła nie wystawały
    <section className="py-24 relative bg-transparent overflow-hidden" id="reservation">
      
      {/* --- NOWE ELEMENTY TŁA --- */}
      
      {/* 1. Cyber Siatka (Grid Pattern) - Tworzy techniczne tło */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 2. Czerwony Glow pod formularzem - Skupia uwagę */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] -z-10" />

      {/* 3. Pływające, animowane okręgi - Dodają życia */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-[5%] w-64 h-64 border border-brand/10 rounded-full blur-[1px] pointer-events-none" 
      />
      <motion.div 
        animate={{ y: [0, 30, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 left-[5%] w-48 h-48 border border-accent/10 rounded-full blur-[1px] pointer-events-none" 
      />

      {/* --- TREŚĆ SEKCJI --- */}
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Formularz (Modal) - Bez zmian, tylko delikatnie podbity cień */}
        <div className="max-w-4xl mx-auto bg-secondary/30 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {!isSubmitted ? (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Zarezerwuj Stolik</h2>
                <p className="text-text-muted">Doświadcz kulinarnych emocji. Ilość miejsc ograniczona.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted ml-1">Imię i Nazwisko</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jan Kowalski"
                      className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted ml-1">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jan@example.com"
                      className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted ml-1 flex items-center gap-2">
                        <Calendar size={14} /> Data
                    </label>
                    <input 
                      type="date" 
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand transition-all [color-scheme:dark]"
                    />
                  </div>

                  <CustomSelect 
                    label="Godzina"
                    icon={Clock}
                    options={timeOptions}
                    value={formData.time}
                    onChange={(val) => handleSelectChange('time', val)}
                  />

                  <CustomSelect 
                    label="Liczba gości"
                    icon={Users}
                    options={guestOptions}
                    value={formData.guests}
                    onChange={(val) => handleSelectChange('guests', val)}
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-brand hover:bg-red-600 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-red-900/20 transition-all transform hover:-translate-y-1"
                >
                  POTWIERDŹ REZERWACJĘ
                </button>

              </form>
            </motion.div>
          ) : (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
            >
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Rezerwacja Przyjęta!</h3>
                <p className="text-text-muted mb-8">
                    Dziękujemy, {formData.name}. Czekamy na Ciebie <br/>
                    {formData.date} o godzinie {formData.time} ({formData.guests}).
                </p>
                <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-brand hover:text-white underline underline-offset-4 transition-colors"
                >
                    Złóż kolejną rezerwację
                </button>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};