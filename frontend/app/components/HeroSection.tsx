"use client";
import { JSX, useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "motion/react";
import { HeroBackground } from "./hero/HeroBackground";
import { HeroGlow } from "./hero/HeroGlow";
import { HeroCards } from "./hero/HeroCards";
import { HeroIllustration } from "./hero/HeroIllustration";
import { HeroParticle } from "./hero/HeroParticle";
import { HeroContent } from "./hero/HeroContent";
export const HeroSection = (): JSX.Element => {
  const heroRef = useRef<HTMLElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scrollProgress = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 60,
    damping: 20,
    mass: 0.6,
  });

  const smoothMouseY = useSpring(mouseX, {
    stiffness: 60,
    damping: 20,
    mass: 0.6,
  });

  const smoothScroll = useSpring(scrollProgress, {
    stiffness: 50,
    damping: 20,
    mass: 0.8,
  });

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normalizedX = (event.clientX - centerX) / (rect.width / 2);
      const normalizedY = (event.clientY - centerY) / (rect.height / 2);

      const clampedX = Math.max(-1, Math.min(1, normalizedX));
      const clampedY = Math.max(-1, Math.min(1, normalizedY));

      mouseX.set(clampedX);
      mouseY.set(clampedY);
    };

    const handleScroll = () => {
      const rect = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const progress = 1 - rect.bottom / (rect.height + viewportHeight);
      const clampedProgress = Math.max(-1, Math.min(1, progress));

      scrollProgress.set(clampedProgress);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mouseX, mouseY, scrollProgress]);

  return (
    <section className="relative w-full h-screen overflow-hidden" ref={heroRef}>
      <HeroBackground
        smoothMouseX={smoothMouseX}
        smoothScroll={smoothScroll}
        smoothMouseY={smoothMouseY}
      />
      <HeroGlow
        smoothMouseX={smoothMouseX}
        smoothScroll={smoothScroll}
        smoothMouseY={smoothMouseY}
      />
      <HeroCards
        smoothMouseX={smoothMouseX}
        smoothScroll={smoothScroll}
        smoothMouseY={smoothMouseY}
      />

      <HeroIllustration
        smoothMouseX={smoothMouseX}
        smoothScroll={smoothScroll}
        smoothMouseY={smoothMouseY}
      />
      <HeroParticle
        smoothMouseX={smoothMouseX}
        smoothScroll={smoothScroll}
        smoothMouseY={smoothMouseY}
      />

      <HeroContent
        smoothMouseX={smoothMouseX}
        smoothScroll={smoothScroll}
        smoothMouseY={smoothMouseY}
      />
    </section>
  );
};
