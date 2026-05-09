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
  const bgX = useTransform(smoothMouseX, [-1, 1], [-8, 8]);
  const bgYMouse = useTransform(smoothMouseY, [-1, 1], [-4, 4]);
  const bgYScroll = useTransform(smoothScroll, [0, 1], [0, 24]);
  const bgY = useTransform(() => bgYMouse.get() + bgYScroll.get());
  return (
    <motion.div
      style={{ x: bgX, y: bgY }}
      className="background overflow-hiden absolute inset-0 z-0 scale-x-105 transition-transform will-change-transform"
    >
      <picture className="block h-full w-full">
        <source
          srcSet="/hero_desktop.webp"
          media="(min-width:768px)"
          type="image/webp"
          width={1677}
          height={938}
        />
        <source
          srcSet="/hero_mobile.webp"
          type="image/webp"
          width={1677}
          height={938}
        />
        <img
          src="/hero_mobile.png"
          className="h-full w-full object-cover"
          alt=""
          width={853}
          height={1844}
        />
      </picture>
    </motion.div>
  );
}
