import { JSX } from "react";
import Link from "next/link";
import { BurgerMenu } from "./BurgerMenu";
import { Button } from "@/components/ui/button";
import { AUTH_URLS } from "@/urls/auth";
export const HeroSection = (): JSX.Element => {
  return (
    <div className="hero relative w-full h-screen before:absolute before:w-full before:h-full before:inset-0 before:z-0 before:bg-black/70 bg-cover bg-no-repeat bg-center bg-[url(/lingrow-hero-small.png)] lg:bg-[url(/lingrow-logo.png)]">
      <header className="fixed flex flex-row backdrop-blur-sm items-center z-50 shadow-[0_0_10px_rgba(0,0,0,0.2)] justify-between top-0 w-full bg-transparent text-white p-6">
        <Link href="/">
          <h1 className="font-heading text-3xl  transition duration-700 ease-in-out group">
            LIN
            <span className="transition duration-700 ease-in-out group-hover:text-primary">
              GROW
            </span>
          </h1>
        </Link>
        <nav className="w-[250px] hidden lg:flex">
          <ul className="flex flex-row justify-between w-full font-heading text-lg font-medium">
            <Link href="#">
              <li className="hover:text-primary hover:scale-[1.20] transition transition duration-700">
                Про нас
              </li>
            </Link>
            <Link href="#">
              <li className="hover:text-primary hover:scale-[1.20] transition transition duration-700">
                Ціни
              </li>
            </Link>
            <Link href="#">
              <li className="hover:text-primary hover:scale-[1.20] transition transition duration-700">
                Зв&#39;язатись
              </li>
            </Link>
          </ul>
        </nav>
        <div className="lg:hidden">
          <BurgerMenu />
        </div>
      </header>
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center cursor-default animate-fadeIn gap-4">
        <h1 className="font-heading text-5xl lg:text-6xl tracking-wide text-center">
          Мова відкриває світ
        </h1>
        <p className="font-body text-lg text-center">
          Почни сьогодні — майбутнє говорить англійською.
        </p>
        <Link href={AUTH_URLS.signup}>
          <Button className="bg-transparent text-purple-300 text-center mt-10 border border-purple-500 text-3xl py-6 px-10 md:px-20 hover:bg-purple-500 hover:text-white cursor-pointer font-heading font-extralight duration-500">
            Приєднатись
          </Button>
        </Link>
      </div>
    </div>
  );
};
