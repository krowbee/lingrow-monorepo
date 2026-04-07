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
      className="hero-illustration hidden lg:block absolute will-change-transform inset-0 pointer-events-none z-30"
    >
      <div className="hero-illustration-frame absolute right-[8%] top-[16%] h-[580px] w-[430px] rounded-xl border boder-white/10 bg-gradient-to-b from-white/8 to-white-2 backdrop-blur-sm shadow-[0_30px_120px_rgba(150,60,255,0.12)]" />
      <div className="hero-illustration-glow absolute right-[12%] top-[24%] h-[420px] w-[320px] rounded-full bg-fuchsia-500/10 blur-xl" />
      <div className="hero-illustration-inner absolute right-[11%] top-[20%] h-[500px] w-[390px] rounded-[28px] border border-fuchsia-400/10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
    </motion.div>
  );
}
