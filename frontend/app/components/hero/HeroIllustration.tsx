import { motion, MotionValue, useTransform } from "motion/react";

export function HeroIllustration({
  smoothMouseX,
  smoothScroll,
  smoothMouseY,
}: {
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
  smoothScroll: MotionValue<number>;
}) {
  const illustrationX = useTransform(smoothMouseX, [-1, 1], [-14, 14]);
  const illustrationYMouse = useTransform(smoothMouseY, [-1, 1], [-12, 12]);
  const illustrationYScroll = useTransform(smoothScroll, [0, 1], [0, 56]);
  const illustrationY = useTransform(
    () => illustrationYMouse.get() + illustrationYScroll.get(),
  );
  return (
    <motion.div
      style={{ x: illustrationX, y: illustrationY }}
      className="hero-illustration pointer-events-none absolute inset-0 z-30 hidden will-change-transform lg:block"
    >
      <div className="hero-illustration-frame boder-white/10 to-white-2 absolute top-[16%] right-[8%] h-[580px] w-[430px] rounded-xl border bg-linear-to-b from-white/8 shadow-[0_30px_120px_rgba(150,60,255,0.12)] backdrop-blur-sm" />
      <div className="hero-illustration-glow absolute top-[24%] right-[12%] h-[420px] w-[320px] rounded-full bg-fuchsia-500/10 blur-xl" />
      <div className="hero-illustration-inner absolute top-[20%] right-[11%] h-[500px] w-[390px] rounded-[28px] border border-fuchsia-400/10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
    </motion.div>
  );
}
