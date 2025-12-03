// src/pages/Home.tsx
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Menu } from "../components/sections/Menu";
import { Reservation } from "../components/sections/Reservation";

export const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <Reservation />
    </>
  );
};