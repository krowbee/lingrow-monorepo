import { ShuffleIcon } from "lucide-react";

const MARQUEE_ITEMS = [
  "Speaking Practice",
  "Словниковий тренажер",
  "CEFR A1–C2",
  "15 хвилин на день",
  "Listening Tasks",
  "Персональний план",
  "Grammar Drills",
  "Прогрес без хаосу",
  "Live Classes",
  "Placement Test",
];

export function MarqueeSection() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 bg-slate-900 py-6">
      <h2 className="font-heading text-center text-2xl text-white uppercase md:text-5xl">
        Все для системного вивчення{" "}
        <span className="text-purple-500">англійської</span>
      </h2>
      <div className="w-full overflow-x-hidden py-8">
        <div className="marquee-animation scrollbar-none flex w-max flex-row flex-nowrap gap-8">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <div
              key={index}
              className="flex shrink-0 flex-row items-center justify-center gap-8"
            >
              <ShuffleIcon className="text-purple-500" />
              <p className="font-accent text-2xl text-nowrap">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
