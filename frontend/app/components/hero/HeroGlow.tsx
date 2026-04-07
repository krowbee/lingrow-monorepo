import { motion, MotionValue, useTransform } from "motion/react";

export function HeroGlow({
  smoothMouseX,
  smoothScroll,
  smoothMouseY,
}: {
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
  smoothScroll: MotionValue<number>;
}) {
  const glowX = useTransform(smoothMouseX, [-1, 1], [-16, 16]);
  const glowYMouse = useTransform(smoothMouseY, [-1, 1], [-12, 12]);
  const glowYScroll = useTransform(smoothScroll, [0, 1], [0, 48]);
  const glowY = useTransform(() => glowYMouse.get() + glowYScroll.get());

  return (
    <motion.div
      style={{ x: glowX, y: glowY }}
      className="glow absolute inset-0 z-10 pointer-events-none will-change-transform"
    >
      <div className="hero-glow-orb hero-glow-orb-left absolute left-[-80px] top-[80px] h-[420px] w-[420px] rounded-full bg-fuchsia-500/25 blur-3xl" />
      <div className="hero-glow-orb hero-glow-orb-right absolute right-[-40px] top-[180px] h-[360px] w-[360px] rounded-full bg-violet-500/20 blur-3xl" />
      <div className="hero-glow-orb hero-glow-orb-bottom absolute left-[30%] bottom-[-120px] h-[320px] w-[320px] rounded-full bg-pink-500/15 blur-3xl" />
    </motion.div>
  );
}
