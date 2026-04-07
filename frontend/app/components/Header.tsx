"use client";
import Link from "next/link";
import { OpenMenuButton } from "./OpenMenuButton";
import { useMenuStore } from "@/store/MenuStore";
import { motion } from "motion/react";

export function Header() {
  const isMenuOpen = useMenuStore((state) => state.isOpen);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-100 border-b border-white/5 ${isMenuOpen ? "bg-black" : "bg-black/15"} backdrop-blur-sm text-white`}
    >
      <div className="flex h-[73px] items-center justify-between px-8 text-white">
        <Link href="/" className="relative z-[80]">
          <h1 className="font-heading text-3xl">
            LIN
            <motion.span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #6b21a8, #d946ef, #6b21a8)",
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
        </Link>
        <div className="lg:hidden">
          <OpenMenuButton />
        </div>
        <nav className="hidden lg:block">
          <ul className="flex flex-row gap-6 font-heading text-lg">
            <li>
              <Link
                href="#about"
                className="transition duration-200 hover:text-white/80!"
              >
                Про нас
              </Link>
            </li>
            <li>
              <Link
                href="#prices"
                className="transition duration-200 hover:text-white/80!"
              >
                Ціни
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="transition duration-200 hover:text-white/80!"
              >
                Зв&#39;язатись
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
