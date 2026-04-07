import { motion, MotionValue, useTransform } from "motion/react";

export function HeroCards({
  smoothMouseX,
  smoothScroll,
  smoothMouseY,
}: {
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
  smoothScroll: MotionValue<number>;
}) {
  const cardsX = useTransform(smoothMouseX, [-1, 1], [-22, 22]);
  const cardsYMouse = useTransform(smoothMouseY, [-1, 1], [-18, 18]);
  const cardsYScroll = useTransform(smoothScroll, [0, 1], [0, 80]);
  const cardsY = useTransform(() => cardsYMouse.get() + cardsYScroll.get());

  return (
    <motion.div
      style={{ x: cardsX, y: cardsY }}
      className="hero-floating-cards absolute inset-0 pointer-events-none will-change-transform z-20 font-accent"
    >
      <div className="absolute left-[30%] top-[12%] rounded-xl border border-white/10 px-10 py-6 font-semibold backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.25)] text-5xl text-white/90 bg-white/5">
        Hello
      </div>
      <div className="absolute hidden md:block right-[15%] top-[30%] rounded-xl border border-white/10 px-8 py-6 font-semibold backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.25)] text-5xl text-white/90 bg-white/5">
        Grammar
      </div>
      <div className="absolute left-[30%] bottom-[12%] rounded-xl border border-white/10 px-6 py-6 font-semibold backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.25)] text-5xl text-white/90 bg-white/5">
        Practice
      </div>
    </motion.div>
  );
}
