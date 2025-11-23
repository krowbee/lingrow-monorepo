import { JSX } from "react";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { JoinSection } from "./components/JoinSection";

export default function Home(): JSX.Element {
  return (
    <main className="relative w-full flex flex-col justify-center items-center">
      <HeroSection />
      <AboutSection />
      <JoinSection />
    </main>
  );
}
