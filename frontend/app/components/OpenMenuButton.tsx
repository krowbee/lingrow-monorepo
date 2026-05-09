"use client";
import { useMenuStore } from "@/store/MenuStore";

export function OpenMenuButton() {
  const isMenuOpen = useMenuStore((state) => state.isOpen);
  const changeMenuState = useMenuStore((state) => state.changeMenuState);
  return (
    <button
      onClick={() => changeMenuState(!isMenuOpen)}
      aria-label="Toggle menu"
      className="relative z-120 flex h-8 w-8 cursor-pointer flex-col justify-center gap-[5px]"
    >
      <span
        className={`h-0.5 w-8 bg-white transition-all duration-300 ${
          isMenuOpen ? "translate-y-[7px] rotate-45" : ""
        }`}
      />
      <span
        className={`h-0.5 w-8 bg-white transition-all duration-300 ${
          isMenuOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`h-0.5 w-8 bg-white transition-all duration-300 ${
          isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
        }`}
      />
    </button>
  );
}
