"use client";
import Link from "next/link";
import { OpenMenuButton } from "./OpenMenuButton";
import { useMenuStore } from "@/store/MenuStore";
import { motion } from "motion/react";
import { LogoTitle } from "./LogoTitle";

export function Header() {
  const isMenuOpen = useMenuStore((state) => state.isOpen);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-100 border-b border-white/5 ${isMenuOpen ? "bg-black" : "bg-black/15"} text-white backdrop-blur-sm`}
    >
      <div className="flex h-[73px] items-center justify-between px-8 text-white">
        <Link href="/" className="relative z-80">
          <LogoTitle />
        </Link>
        <div className="lg:hidden">
          <OpenMenuButton />
        </div>
        <nav className="hidden lg:block">
          <ul className="font-heading flex flex-row gap-6 text-lg">
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
                href="#join"
                className="transition duration-200 hover:text-white/80!"
              >
                Приєднатись
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
