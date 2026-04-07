import { motion, MotionValue, useTransform } from "motion/react";

export function HeroParticle({
  smoothMouseX,
  smoothScroll,
  smoothMouseY,
}: {
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
  smoothScroll: MotionValue<number>;
}) {
  const particlesX = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const particlesYMouse = useTransform(smoothMouseY, [-1, 1], [-8, 8]);
  const particlesYScroll = useTransform(smoothScroll, [0, 1], [0, 36]);
  const particlesY = useTransform(
    () => particlesYMouse.get() + particlesYScroll.get(),
  );

  return (
    <motion.div
      style={{ x: particlesX, y: particlesY }}
      className="hero-particles absolute will-change-transform inset-0 pointer-events-none z-40"
    >
      <span className="hero-particle hero-particle-1 absolute left-[12%] top-[18%] h-2 w-2 rounded-full bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
      <span className="hero-particle hero-particle-2 absolute left-[72%] top-[14%] h-2 w-2 rounded-full bg-fuchsia-400/80 shadow-[0_0_20px_rgba(217,70,239,0.8)]" />
      <span className="hero-particle hero-particle-3 absolute left-[64%] top-[58%] h-1.5 w-1.5 rounded-full bg-violet-300/80 shadow-[0_0_18px_rgba(167,139,250,0.7)]" />
      <span className="hero-particle hero-particle-4 absolute left-[22%] top-[72%] h-1.5 w-1.5 rounded-full bg-pink-300/70 shadow-[0_0_16px_rgba(244,114,182,0.6)]" />
    </motion.div>
  );
}
