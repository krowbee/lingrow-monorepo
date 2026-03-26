import { JSX } from "react";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { JoinSection } from "./components/JoinSection";
import { Header } from "./components/Header";
import { BurgerMenu } from "./components/BurgerMenu";

export default function Home(): JSX.Element {
  return (
    <main className="relative w-full flex flex-col justify-center items-center">
      <Header />
      <BurgerMenu />
      <HeroSection />
      <AboutSection />
      <JoinSection />
    </main>
  );
}
