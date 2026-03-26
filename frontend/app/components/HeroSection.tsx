import { JSX } from "react";
import Link from "next/link";
import { BurgerMenu } from "./BurgerMenu";
import { Button } from "@/components/ui/button";
import { AUTH_URLS } from "@/urls/auth";
export const HeroSection = (): JSX.Element => {
  return (
    <div className="hero relative w-full h-screen before:absolute before:w-full before:h-full before:inset-0 before:z-0 before:bg-black/95 bg-cover bg-no-repeat bg-center bg-[url(/lingrow-hero-small.png)] lg:bg-[url(/lingrow-logo.png)]">
      <header className="fixed inset-x-0 top-0 bg-black/15 backdrop-blur-sm items-center z-50 text-white border-b border-white/5">
        <div className="flex items-center justify-between px-8 py-4 text-white">
          <Link href="/">
            <h1 className="font-heading text-3xl">
              LIN
              <span className="bg-gradient-to-r from-purple-800 to-fuchsia-800 bg-clip-text text-transparent">
                GROW
              </span>
            </h1>
          </Link>
          <nav className="hidden lg:block">
            <ul className="flex flex-row gap-4 justify-between w-full font-heading text-lg">
              <Link href="#">
                <li className="hover:text-white/80 transition duration-200">
                  Про нас
                </li>
              </Link>
              <Link href="#">
                <li className="hover:text-white/80 transition duration-200">
                  Ціни
                </li>
              </Link>
              <Link href="#">
                <li className="hover:text-white/80 transition duration-200">
                  Зв&#39;язатись
                </li>
              </Link>
            </ul>
          </nav>
          <div className="lg:hidden">
            <BurgerMenu />
          </div>
        </div>
      </header>
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center cursor-default animate-fadeIn gap-2">
        <h1 className="font-heading text-3xl lg:text-6xl font-semibold tracking-wide text-center">
          Мова відкриває світ
        </h1>
        <p className="font-body text-lg text-center">
          Почни сьогодні — майбутнє говорить англійською.
        </p>
        <Link href={AUTH_URLS.signup}>
          <Button
            variant="default"
            className="text-center w-[75%] shadow-[0_10px_30px_rgba(0,0,0,0.35),0_0_18px_rgba(217,70,239,0.12)] hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-purple-500 mt-10 text-3xl py-6 px-4 md:px-20 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white cursor-pointer font-heading font-extralight transition ease-in duration-300"
          >
            Приєднатись
          </Button>
        </Link>
      </div>
    </div>
  );
};
