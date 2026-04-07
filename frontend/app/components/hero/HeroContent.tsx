import { AUTH_URLS } from "@/urls/auth";
import { motion, MotionValue, useTransform } from "motion/react";
import Link from "next/link";

export function HeroContent({
  smoothMouseX,
  smoothScroll,
  smoothMouseY,
}: {
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
  smoothScroll: MotionValue<number>;
}) {
  const contentX = useTransform(smoothMouseX, [-1, 1], [-8, 8]);
  const contentYMouse = useTransform(smoothMouseY, [-1, 1], [-6, 6]);
  const contentYScroll = useTransform(smoothScroll, [0, 1], [0, 28]);
  const contentY = useTransform(
    () => contentYMouse.get() + contentYScroll.get(),
  );

  return (
    <motion.div
      style={{ x: contentX, y: contentY }}
      className="hero-content relative mx-auto flex min-h-screen max-w-7xl items-center will-change-transform z-50"
    >
      <div className="hero-content-inner max-w-3xl">
        <h1 className="hero-title max-w-2xl text-5xl md:text-5xl font-bold text-white">
          Мова відкриває світ
        </h1>
        <p className="hero-subtitle mt-6 max-w-xl text-lg leading-8 text-white/70">
          Почни сьогодні — майбутнє говорить англійською. Живі уроки, практика
          та стабільний прогрес без перевантаження.
        </p>

        <div className="hero-actions mt-10 flex flex-wrap gap-4">
          <Link href={AUTH_URLS.signup} className="cursor-pointer">
            <motion.button
              style={{
                backgroundImage:
                  "linear-gradient(60deg, #6b21a8, #d946ef, #6b21a8)",
                backgroundSize: "200% 100%",
                backgroundPosition: "0% 50%",
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              className="cursor-pointer hero-button hero-button-primary min-w-xs rounded-2xl bg-fuchsia-500 px-8 py-4 text-base font-medium text-white shadow-[0_0_40px_rgba(217,70,239,0.45)] transition-transform duration-300 hover:scale-[1.03]"
            >
              Приєднатись
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
