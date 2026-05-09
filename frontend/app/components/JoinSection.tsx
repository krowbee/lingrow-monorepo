import { Button } from "@/components/ui/button";
import { AUTH_URLS } from "@/urls/auth";
import Link from "next/link";

export const JoinSection = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-8 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.10),transparent_40%)] pt-16 pb-2 text-center">
      <h1 className="font-heading flex h-20 w-full items-center justify-center text-5xl text-white">
        Приєднуйся!
      </h1>
      <p className="font-body max-w-2xl text-center text-lg text-gray-300">
        Твій час говорити впевнено. Lingrow допоможе зробити перший крок до
        англійської без страху й перевантаження.<br></br>
        Почни сьогодні — майбутнє говорить англійською
      </p>
      <Link href={AUTH_URLS.signup}>
        <Button
          variant="outline"
          className="cursor-pointer rounded-2xl border-none bg-linear-to-r from-fuchsia-600 to-purple-600 px-20 py-7 text-lg font-semibold text-white transition-transform duration-300 hover:scale-105 hover:text-white"
        >
          Приєднатись
        </Button>
      </Link>
      <p className="font-accent text-neutral-400">
        Безкоштовно на старті. Почни навчатись за реальною методикою
      </p>
    </section>
  );
};
