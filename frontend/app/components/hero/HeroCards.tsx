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
      className="hero-floating-cards font-accent pointer-events-none absolute inset-0 z-20 will-change-transform"
    >
      <div className="absolute top-[12%] left-[30%] rounded-xl border border-white/10 bg-white/5 px-10 py-6 text-5xl font-semibold text-white/90 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-md">
        Hello
      </div>
      <div className="absolute top-[30%] right-[15%] hidden rounded-xl border border-white/10 bg-white/5 px-8 py-6 text-5xl font-semibold text-white/90 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-md md:block">
        Grammar
      </div>
      <div className="absolute bottom-[12%] left-[30%] rounded-xl border border-white/10 bg-white/5 px-6 py-6 text-5xl font-semibold text-white/90 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-md">
        Practice
      </div>
    </motion.div>
  );
}
