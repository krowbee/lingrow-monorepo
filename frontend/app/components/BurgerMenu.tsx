"use client";

import { JSX, useEffect } from "react";
import Link from "next/link";
import { useMenuStore } from "@/store/MenuStore";
import { useIsMobile } from "@/hooks/use-mobile";

export const BurgerMenu = (): JSX.Element => {
  const isMenuOpen = useMenuStore((state) => state.isOpen);
  const changeMenuState = useMenuStore((state) => state.changeMenuState);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, changeMenuState]);

  useEffect(() => {
    if (!isMobile) {
      document.body.style.overflow = "";
      changeMenuState(false);
    }
  }, [isMobile, changeMenuState]);
  return (
    <div className="lg:hidden">
      <div className="relative">
        {isMenuOpen && (
          <div className="fixed inset-x-0 top-[73px] bottom-0 z-[100] bg-black">
            <nav className="flex flex-col items-center gap-4 pt-10 font-heading text-2xl text-white/85">
              <Link
                href="#about"
                onClick={() => changeMenuState(!isMenuOpen)}
                className="block transition hover:text-white!"
              >
                Про нас
              </Link>
              <Link
                href="#prices"
                onClick={() => changeMenuState(!isMenuOpen)}
                className="block transition hover:text-white!"
              >
                Ціни
              </Link>
              <Link
                href="#contact"
                onClick={() => changeMenuState(!isMenuOpen)}
                className="block transition hover:text-white!"
              >
                Зв&#39;язатись
              </Link>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};
