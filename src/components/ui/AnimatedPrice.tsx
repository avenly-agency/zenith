import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

interface AnimatedPriceProps {
  value: number;
  className?: string; // Pozwalamy nadpisywać style (np. kolor, wielkość)
}

export const AnimatedPrice = ({ value, className = "" }: AnimatedPriceProps) => {
  // 1. Definicja sprężyny (Fizyka ruchu)
  // mass: ciężar (im mniejszy, tym szybszy start)
  // stiffness: sztywność (szybkość reakcji)
  // damping: tłumienie (żeby nie "drgało" na końcu)
  const spring = useSpring(value, { mass: 0.5, stiffness: 75, damping: 15 });

  // 2. Transformacja (Formatowanie tekstu w locie)
  // Zamieniamy surową liczbę (np. 59.3442) na ładny tekst "59 PLN"
  const display = useTransform(spring, (current) => `${Math.round(current)} PLN`);

  // 3. Reakcja na zmianę ceny
  // Gdy 'value' (props) się zmieni, sprężyna zacznie animować do nowej wartości
  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span className={className}>{display}</motion.span>;
};