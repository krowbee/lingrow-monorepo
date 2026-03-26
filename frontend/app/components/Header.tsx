import Link from "next/link";
import { OpenMenuButton } from "./OpenMenuButton";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/15 text-white backdrop-blur-sm">
      <div className="flex h-[73px] items-center justify-between px-8 text-white">
        <Link href="/" className="relative z-[80]">
          <h1 className="font-heading text-3xl">
            LIN
            <span className="bg-gradient-to-r from-purple-800 to-fuchsia-800 bg-clip-text text-transparent">
              GROW
            </span>
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
                className="transition duration-200 hover:text-white/80"
              >
                Про нас
              </Link>
            </li>
            <li>
              <Link
                href="#prices"
                className="transition duration-200 hover:text-white/80"
              >
                Ціни
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="transition duration-200 hover:text-white/80"
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
