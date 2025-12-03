import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-white/10 pt-20 pb-10 text-sm" id="footer">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* KOLUMNA 1: SOCIAL MEDIA (Linki zewnętrzne) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-widest text-text-main">
              ZENITH
            </h2>
            <p className="text-text-muted leading-relaxed">
              Japońska tradycja spotyka futurystyczną wizję. 
              Doświadcz smaku, który wyprzedza swoje czasy.
            </p>
            <div className="flex gap-4">
              {/* target="_blank" otwiera nową kartę */}
              {/* rel="noreferrer" to wymóg bezpieczeństwa przy target blank */}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand hover:text-white transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* KOLUMNA 2: NAWIGACJA (Linki wewnętrzne #id) */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide">NAWIGACJA</h3>
            <ul className="space-y-4 text-text-muted">
              <li>
                <a href="#menu" className="hover:text-brand transition-colors">Menu Główne</a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-brand transition-colors">Rezerwacje</a>
              </li>
              <li>
                <a href="#about" className="hover:text-brand transition-colors">Filozofia (O Nas)</a>
              </li>
              {/* Linki "martwe" (do podstron, których nie mamy) kierujemy na górę lub do kontaktu */}
              <li>
                <a href="#footer" className="hover:text-brand transition-colors">Kariera</a>
              </li>
              <li>
                <a href="#footer" className="hover:text-brand transition-colors">Kontakt</a>
              </li>
            </ul>
          </div>

          {/* KOLUMNA 3: KONTAKT (Linki funkcyjne) */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide">KONTAKT</h3>
            <ul className="space-y-4 text-text-muted">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand shrink-0 mt-1" />
                <span>ul. Nowy Świat 2077<br />00-001 Warszawa</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand shrink-0" />
                {/* tel: pozwala dzwonić po kliknięciu */}
                <a href="tel:+48500600700" className="hover:text-white transition-colors">
                  +48 500 600 700
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand shrink-0" />
                {/* mailto: otwiera program pocztowy */}
                <a href="mailto:rezerwacje@zenith.com" className="hover:text-white transition-colors">
                  rezerwacje@zenith.com
                </a>
              </li>
            </ul>
          </div>

          {/* KOLUMNA 4: NEWSLETTER (Bez zmian) */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide">NEWSLETTER</h3>
            <p className="text-text-muted mb-4">
              Bądź na bieżąco z nowymi smakami i wydarzeniami.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Twój email" 
                className="bg-primary border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors"
              />
              <button className="bg-brand text-white px-6 py-3 rounded font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2">
                Zapisz się <ArrowRight size={16} />
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-text-muted text-xs">
          <p>© 2024 Zenith Restaurant. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Polityka Prywatności</a>
            <a href="#" className="hover:text-white transition-colors">Regulamin</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};