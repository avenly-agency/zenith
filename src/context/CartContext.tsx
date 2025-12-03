import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type CartItem = {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  totalPrice: number;
  itemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // 1. LENIWA INICJALIZACJA
  // Zamiast useState([]) robimy funkcję, która sprawdza localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("zenith-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Błąd odczytu localStorage:", error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // 2. SYNCHRONIZACJA Z LOCALSTORAGE
  // Za każdym razem, gdy zmieni się 'items', zapisujemy je w przeglądarce
  useEffect(() => {
    try {
      localStorage.setItem("zenith-cart", JSON.stringify(items));
    } catch (error) {
      console.error("Błąd zapisu localStorage:", error);
    }
  }, [items]);

  const parsePrice = (priceStr: string) => parseFloat(priceStr.replace(' PLN', ''));

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id: number) => {
    setItems((prev) => 
      prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    );
  };

  const decreaseQuantity = (id: number) => {
    setItems((prev) => 
      prev.map((item) => 
        item.id === id && item.quantity > 1 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  // clearCart też automatycznie wyczyści localStorage, bo zmieni 'items' na []
  // a useEffect to wykryje i nadpisze pamięć.
  const clearCart = () => {
    setItems([]);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const totalPrice = items.reduce((sum, item) => sum + (parsePrice(item.price) * item.quantity), 0);
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      increaseQuantity, 
      decreaseQuantity,
      clearCart,
      isCartOpen, 
      toggleCart, 
      totalPrice, 
      itemsCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};