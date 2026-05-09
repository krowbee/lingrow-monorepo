import { JSX } from "react";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { JoinSection } from "./components/JoinSection";
import { Header } from "./components/Header";
import { BurgerMenu } from "./components/BurgerMenu";
import { FeatureShowcase } from "./components/FeatureShowcase";

export const metadata = {
  title: "Lingrow",
  description: "Lingrow english learning platform",
};

export default function Home(): JSX.Element {
  return (
    <main className="relative flex w-full flex-col items-center justify-center">
      <Header />
      <BurgerMenu />
      <HeroSection />
      <FeatureShowcase />
      <AboutSection />
      <JoinSection />
    </main>
  );
}
