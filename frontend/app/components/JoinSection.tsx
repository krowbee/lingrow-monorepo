import { Button } from "@/components/ui/button";
import { AUTH_URLS } from "@/urls/auth";
import Link from "next/link";

export const JoinSection = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center gap-8 pt-16 pb-2 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.10),transparent_40%)]">
      <h1 className="text-5xl flex text-white font-heading w-full h-20 justify-center items-center font-heading ">
        Приєднуйся!
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl font-body text-center">
        Твій час говорити впевнено. Lingrow допоможе зробити перший крок до
        англійської без страху й перевантаження.<br></br>
        Почни сьогодні — майбутнє говорить англійською
      </p>
      <Link href={AUTH_URLS.signup}>
        <Button
          variant="outline"
          className="px-20 py-7 bg-gradient-to-r border-none from-fuchsia-600 to-purple-600 text-white cursor-pointer hover:text-white text-lg rounded-2xl font-semibold hover:scale-105 transition-transform duration-300"
        >
          Приєднатись
        </Button>
      </Link>
      <p className="text-neutral-400 font-accent ">
        Безкоштовно на старті. Почни навчатись за реальною методикою
      </p>
    </section>
  );
};
