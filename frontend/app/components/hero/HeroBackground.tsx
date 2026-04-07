import { motion, MotionValue, useTransform } from "motion/react";

export function HeroBackground({
  smoothMouseX,
  smoothScroll,
  smoothMouseY,
}: {
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
  smoothScroll: MotionValue<number>;
}) {
  const bgX = useTransform(smoothMouseX, [-1, 1], [-6, 6]);
  const bgYMouse = useTransform(smoothMouseY, [-1, 1], [-4, 4]);
  const bgYScroll = useTransform(smoothScroll, [0, 1], [0, 24]);
  const bgY = useTransform(() => bgYMouse.get() + bgYScroll.get());
  return (
    <motion.div
      style={{ x: bgX, y: bgY }}
      className="background inset-0 will-change-transform absolute z-0"
    >
      <div className="hero-bg-base absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,40,255,0.12),transparent_45%),linear-gradient(to_bottom,#07020d,#030106)]" />
      <div className="hero-bg-vignette absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]" />
    </motion.div>
  );
}
