import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { ArrowLeft, CreditCard, Lock, Loader2, Banknote, Smartphone, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatedPrice } from "../components/ui/AnimatedPrice";

export const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');

  // --- STANY FORMULARZA ---
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', address: '', zip: '', city: '', phone: '+48 ' // Domyślny prefiks
  });

  const [blikCode, setBlikCode] = useState('');
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- FORMATTERY (AUTO-DOPASOWANIE) ---
  
  const formatZip = (value: string) => {
    // Usuwamy wszystko co nie jest cyfrą
    const digits = value.replace(/\D/g, '');
    // Jeśli mamy więcej niż 2 cyfry, wstawiamy myślnik
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}-${digits.slice(2, 5)}`;
    }
    return digits;
  };

  const formatPhone = (value: string) => {
    // Pozwalamy na wpisywanie tylko cyfr i plusa na początku
    // Ale dla uproszczenia formatowania zróbmy proste grupowanie
    if (!value.startsWith('+48 ')) return value; // Jeśli użytkownik skasuje prefiks, nie formatujemy na siłę
    
    const raw = value.replace('+48 ', '').replace(/\D/g, '');
    let formatted = '+48 ';
    if (raw.length > 0) formatted += raw.slice(0, 3);
    if (raw.length > 3) formatted += ' ' + raw.slice(3, 6);
    if (raw.length > 6) formatted += ' ' + raw.slice(6, 9);
    
    return formatted;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    }
    return value;
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  // --- HANDLERS ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Aplikujemy formatowanie zależnie od pola
    if (name === 'zip') formattedValue = formatZip(value);
    if (name === 'phone') formattedValue = formatPhone(value);

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'number') formattedValue = formatCardNumber(value);
    if (name === 'expiry') formattedValue = formatExpiry(value);
    if (name === 'cvc') formattedValue = value.replace(/\D/g, '').slice(0, 3); // Tylko cyfry, max 3

    setCardData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleBlikChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setBlikCode(val);
  };

  // --- WALIDACJA (REGEX) ---
  const validate = () => {
    const newErrors: Record<string, string> = {};
    const patterns = {
      zip: /^[0-9]{2}-[0-9]{3}$/,
      phone: /^\+48\s\d{3}\s\d{3}\s\d{3}$/, // Oczekujemy formatu: +48 123 456 789
      name: /^.{3,}$/,
      card: /^[\d\s]{19}$/, // 16 cyfr + 3 spacje
      cvc: /^[0-9]{3}$/,
      expiry: /^(0[1-9]|1[0-2])\/[0-9]{2}$/
    };

    if (!patterns.name.test(formData.firstName)) newErrors.firstName = "Za krótkie imię";
    if (!patterns.name.test(formData.lastName)) newErrors.lastName = "Za krótkie nazwisko";
    if (formData.address.length < 5) newErrors.address = "Podaj pełny adres";
    if (!patterns.zip.test(formData.zip)) newErrors.zip = "Wymagany format: 00-000";
    if (formData.city.length < 3) newErrors.city = "Wpisz poprawne miasto";
    // Walidacja telefonu (uproszczona: min 9 cyfr po prefiksie)
    if (formData.phone.replace(/\D/g, '').length < 11) newErrors.phone = "Błędny numer";

    if (paymentMethod === 'blik' && blikCode.length !== 6) newErrors.blik = "Kod musi mieć 6 cyfr";

    if (paymentMethod === 'card') {
        if (!patterns.card.test(cardData.number)) newErrors.cardNumber = "Niepoprawny numer karty";
        if (!patterns.expiry.test(cardData.expiry)) newErrors.expiry = "MM/YY";
        if (!patterns.cvc.test(cardData.cvc)) newErrors.cvc = "3 cyfry";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validate()) return;
    setStatus('processing');
    setTimeout(() => {
        setStatus('success');
        clearCart(); 
        setTimeout(() => navigate('/'), 4000);
    }, 2000);
  };

  const ErrorMsg = ({ field }: { field: string }) => (
    errors[field] ? <span className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10}/> {errors[field]}</span> : null
  );

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 relative">
      <Link to="/" className="inline-flex items-center gap-2 text-text-muted hover:text-brand transition-colors mb-8">
        <ArrowLeft size={20} /> Wróć do menu
      </Link>

      <h1 className="text-4xl font-bold mb-12">Finalizacja Zamówienia</h1>

      <div className="grid lg:grid-cols-2 gap-12">
        
        {/* LEWA STRONA: FORMULARZ */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            
            {/* DANE OSOBOWE */}
            <div className="bg-secondary/30 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm">1</span>
                    Dane Dostawy
                </h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" placeholder="Imię" className={`w-full bg-black/40 border rounded-lg px-4 py-3 focus:border-brand outline-none transition-colors ${errors.firstName ? 'border-red-500' : 'border-white/10'}`} />
                            <ErrorMsg field="firstName" />
                        </div>
                        <div>
                            <input name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" placeholder="Nazwisko" className={`w-full bg-black/40 border rounded-lg px-4 py-3 focus:border-brand outline-none transition-colors ${errors.lastName ? 'border-red-500' : 'border-white/10'}`} />
                            <ErrorMsg field="lastName" />
                        </div>
                    </div>
                    <div>
                        <input name="address" value={formData.address} onChange={handleInputChange} type="text" placeholder="Adres" className={`w-full bg-black/40 border rounded-lg px-4 py-3 focus:border-brand outline-none transition-colors ${errors.address ? 'border-red-500' : 'border-white/10'}`} />
                        <ErrorMsg field="address" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            {/* ZIP CODE Z FORMATOWANIEM */}
                            <input name="zip" value={formData.zip} onChange={handleInputChange} type="text" placeholder="Kod (00-000)" maxLength={6} className={`w-full bg-black/40 border rounded-lg px-4 py-3 focus:border-brand outline-none transition-colors ${errors.zip ? 'border-red-500' : 'border-white/10'}`} />
                            <ErrorMsg field="zip" />
                        </div>
                        <div>
                            <input name="city" value={formData.city} onChange={handleInputChange} type="text" placeholder="Miasto" className={`w-full bg-black/40 border rounded-lg px-4 py-3 focus:border-brand outline-none transition-colors ${errors.city ? 'border-red-500' : 'border-white/10'}`} />
                            <ErrorMsg field="city" />
                        </div>
                    </div>
                    <div>
                        {/* TELEFON Z FORMATOWANIEM */}
                        <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Telefon" maxLength={15} className={`w-full bg-black/40 border rounded-lg px-4 py-3 focus:border-brand outline-none transition-colors ${errors.phone ? 'border-red-500' : 'border-white/10'}`} />
                        <ErrorMsg field="phone" />
                    </div>
                </div>
            </div>

            {/* PŁATNOŚĆ */}
            <div className="bg-secondary/30 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm">2</span>
                    Płatność
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button onClick={() => setPaymentMethod('card')} className={`flex-1 py-4 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all border ${paymentMethod === 'card' ? 'bg-brand/20 border-brand text-brand shadow-[0_0_15px_rgba(255,46,99,0.2)]' : 'bg-black/40 border-white/10 text-text-muted hover:bg-white/5'}`}>
                        <CreditCard size={24} /> Karta
                    </button>
                    <button onClick={() => setPaymentMethod('blik')} className={`flex-1 py-4 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all border ${paymentMethod === 'blik' ? 'bg-brand/20 border-brand text-brand shadow-[0_0_15px_rgba(255,46,99,0.2)]' : 'bg-black/40 border-white/10 text-text-muted hover:bg-white/5'}`}>
                        <Smartphone size={24} /> BLIK
                    </button>
                    <button onClick={() => setPaymentMethod('cash')} className={`flex-1 py-4 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all border ${paymentMethod === 'cash' ? 'bg-brand/20 border-brand text-brand shadow-[0_0_15px_rgba(255,46,99,0.2)]' : 'bg-black/40 border-white/10 text-text-muted hover:bg-white/5'}`}>
                        <Banknote size={24} /> Gotówka
                    </button>
                </div>

                <div className="min-h-[120px]">
                    {paymentMethod === 'card' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                            <div>
                                <input name="number" value={cardData.number} onChange={handleCardChange} maxLength={19} type="text" placeholder="Numer Karty" className={`w-full bg-black/40 border rounded-lg px-4 py-3 focus:border-brand outline-none ${errors.cardNumber ? 'border-red-500' : 'border-white/10'}`} />
                                <ErrorMsg field="cardNumber" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <input name="expiry" value={cardData.expiry} onChange={handleCardChange} maxLength={5} type="text" placeholder="MM/YY" className={`w-full bg-black/40 border rounded-lg px-4 py-3 focus:border-brand outline-none ${errors.expiry ? 'border-red-500' : 'border-white/10'}`} />
                                    <ErrorMsg field="expiry" />
                                </div>
                                <div>
                                    <input name="cvc" value={cardData.cvc} onChange={handleCardChange} maxLength={3} type="text" placeholder="CVC" className={`w-full bg-black/40 border rounded-lg px-4 py-3 focus:border-brand outline-none ${errors.cvc ? 'border-red-500' : 'border-white/10'}`} />
                                    <ErrorMsg field="cvc" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {paymentMethod === 'blik' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
                            <label className="block text-sm text-text-muted mb-2">Wpisz kod BLIK</label>
                            <input type="text" maxLength={6} value={blikCode} onChange={handleBlikChange} placeholder="000 000" className={`w-48 bg-black/40 border rounded-lg px-4 py-3 text-center text-2xl tracking-[0.2em] focus:border-brand outline-none font-mono ${errors.blik ? 'border-red-500' : 'border-white/10'}`} />
                            <ErrorMsg field="blik" />
                        </motion.div>
                    )}

                    {paymentMethod === 'cash' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6 text-text-muted">
                            <p>Zapłacisz kurierowi przy odbiorze.</p>
                        </motion.div>
                    )}
                </div>
            </div>

            <button onClick={handlePayment} disabled={status !== 'idle' || items.length === 0} className="w-full bg-brand text-white py-4 rounded-xl font-bold text-lg hover:bg-red-600 transition-all shadow-[0_0_30px_rgba(255,46,99,0.3)] hover:shadow-[0_0_50px_rgba(255,46,99,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                {status === 'processing' ? <><Loader2 className="animate-spin" /> Przetwarzanie...</> : <div className="flex gap-1">ZAPŁAĆ I ZAMÓW (<AnimatedPrice value={totalPrice} />)</div>}
            </button>
        </motion.div>

        {/* PRAWA STRONA: PODSUMOWANIE */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-fit bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl shadow-2xl sticky top-32">
            <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Podsumowanie</h3>
            
            {/* FIX UTYKAJĄCEGO BADGE'A: Dodano 'pt-4 pl-2', żeby badge miał miejsce */}
            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 pt-4 pl-2 custom-scrollbar">
                {items.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                        <div className="relative shrink-0">
                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                            {/* Badge bez zmian, ale teraz kontener ma padding */}
                            <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#0a0a0a]">
                                {item.quantity}
                            </span>
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm">{item.name}</p>
                            <p className="text-text-muted text-xs">{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-3 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between text-text-muted"><span>Wartość koszyka</span><AnimatedPrice value={totalPrice} /></div>
                <div className="flex justify-between text-text-muted"><span>Dostawa</span><span>0 PLN</span></div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-white/10 mt-2"><span>Do zapłaty</span><span className="text-brand"><AnimatedPrice value={totalPrice} /></span></div>
            </div>
        </motion.div>

      </div>

      <AnimatePresence>
        {status === 'success' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-4">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-green-500 blur-[50px] opacity-20 rounded-full animate-pulse"></div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.5)] relative z-10">
                        <motion.svg viewBox="0 0 24 24" className="w-16 h-16 text-white stroke-[3px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                            <motion.path d="M20 6L9 17l-5-5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
                        </motion.svg>
                    </motion.div>
                </div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-4xl md:text-5xl font-bold mb-4">Płatność Przyjęta!</motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-text-muted text-lg max-w-md">Twoje zamówienie zostało przekazane do kuchni. Szef Kenji właśnie ostrzy noże.</motion.p>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};