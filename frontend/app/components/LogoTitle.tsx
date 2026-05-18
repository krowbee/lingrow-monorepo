import { motion } from "motion/react";

export function LogoTitle() {
  return (
    <h1 className="font-heading flex text-3xl">
      LIN
      <motion.span
        style={{
          backgroundImage: "linear-gradient(90deg, #6b21a8, #d946ef, #6b21a8)",
          backgroundSize: "200% 100%",
          backgroundPosition: "0% 50%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="inline-block bg-clip-text text-transparent"
      >
        GROW
      </motion.span>
    </h1>
  );
}
