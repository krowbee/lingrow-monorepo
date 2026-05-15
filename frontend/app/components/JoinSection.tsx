import { ArrowRightIcon, CheckCircle2Icon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA_BENEFITS = [
  "Безкоштовно на старті",
  "Перший прогрес уже сьогодні",
  "Без перевантаження та хаосу",
];

export function JoinSection() {
  return (
    <section id="join" className="w-full overflow-hidden bg-slate-950">
      <div className="relative z-10 w-full">
        <div className="relative overflow-hidden rounded-sm bg-neutral-950/60 px-6 py-14 text-center shadow-[0_0_60px_rgba(168,85,247,0.12)] backdrop-blur-xl md:px-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-purple-500/10 to-transparent" />

          <div className="relative z-10 mx-auto mb-6 flex w-max items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            <SparklesIcon className="size-4" />
            Почни безкоштовно
          </div>

          <h2 className="font-heading relative z-10 text-4xl leading-tight text-white uppercase md:text-6xl">
            Зроби перший крок до{" "}
            <span className="text-purple-500">впевненої англійської</span>
          </h2>

          <p className="font-body relative z-10 mx-auto mt-6 max-w-2xl text-base leading-8 text-neutral-400 md:text-lg">
            Lingrow допоможе вчитись системно: короткі уроки, практика з перших
            хвилин і зрозумілий прогрес без тиску та перевантаження.
          </p>

          <div className="relative z-10 mx-auto mt-8 flex max-w-3xl flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
            {CTA_BENEFITS.map((benefit) => (
              <div
                key={benefit}
                className="font-body flex items-center gap-2 text-sm text-white/70"
              >
                <CheckCircle2Icon className="size-4 text-purple-500" />
                {benefit}
              </div>
            ))}
          </div>

          <div className="relative z-10 mt-10 flex flex-col items-center gap-4">
            <Button className="group font-accent h-14 w-full max-w-xs rounded-sm bg-purple-500 text-base text-white shadow-[0_0_30px_rgba(168,85,247,0.35)] transition hover:bg-purple-400">
              Приєднатись
              <ArrowRightIcon className="ml-2 size-5 transition group-hover:translate-x-1" />
            </Button>

            <p className="font-body text-sm text-neutral-500">
              Безкоштовно на старті. Почни навчання за реальною методикою.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
