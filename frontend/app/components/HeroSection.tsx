import { JSX } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AUTH_URLS } from "@/urls/auth";

export const HeroSection = (): JSX.Element => {
  return (
    <div className="hero relative min-h-screen w-full overflow-x-hidden bg-[url(/lingrow-hero-small.png)] bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:z-0 before:h-full before:w-full before:bg-black/95 lg:bg-[url(/lingrow-logo.png)]">
      <div className="relative z-10 flex h-screen w-full cursor-default flex-col items-center justify-center gap-2 animate-fadeIn px-6 pt-[73px]">
        <h1 className="text-center font-heading text-3xl font-semibold tracking-wide lg:text-6xl">
          Мова відкриває світ
        </h1>

        <p className="text-center font-body text-lg">
          Почни сьогодні — майбутнє говорить англійською.
        </p>

        <Link href={AUTH_URLS.signup} className="flex justify-center">
          <Button
            variant="default"
            className="mt-10 w-[250px] cursor-pointer bg-gradient-to-r from-fuchsia-600 to-purple-600 px-4 py-6 text-center font-heading text-3xl font-extralight text-white shadow-[0_10px_30px_rgba(0,0,0,0.35),0_0_18px_rgba(217,70,239,0.12)] transition duration-300 ease-in hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-purple-500 md:px-20"
          >
            Приєднатись
          </Button>
        </Link>
      </div>
    </div>
  );
};
