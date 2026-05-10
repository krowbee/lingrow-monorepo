import {
  ArrowUp,
  AudioLinesIcon,
  BookOpenIcon,
  ChevronRight,
  Link,
  Sparkles,
  TrendingUpIcon,
} from "lucide-react";
import { IconWithText } from "./IconWithText";

const cards = [
  {
    icon: BookOpenIcon,
    title: "Без зубріння",
    text: "Тільки те що реально використовуєш",
  },
  {
    icon: AudioLinesIcon,
    title: "Жива практика",
    text: "Вправи на спілкування, та розуміння",
  },
  {
    icon: TrendingUpIcon,
    title: "Видимий прогрес",
    text: "Відстежуй свій ріст щодня",
  },
];

export function ShowcaseArticle() {
  return (
    <article className="flex w-full flex-col items-start justify-center gap-4 md:items-start">
      <div className="flex flex-row items-center gap-2 rounded-full border border-purple-500/30 px-6 py-2 text-purple-500">
        <Sparkles />
        <p className="font-accent">Smart learning</p>
      </div>
      <div className="flex w-[90%] flex-col gap-4 md:w-[70%]">
        <h2 className="font-heading text-5xl tracking-tight text-white md:text-6xl">
          Англійська,
          <br />
          <span className="text-purple-500">яка стає частиною твого життя</span>
        </h2>
        <p className="font-body text-lg text-gray-400">
          Практичні уроки, поступове збільшення складності, відповідно до
          програми
        </p>
      </div>
      <div className="flex w-full flex-row flex-wrap gap-x-10 gap-y-6">
        {cards.map((card, index) => (
          <IconWithText
            key={index}
            icon={card.icon}
            title={card.title}
            text={card.text}
          />
        ))}
      </div>
      <div className="flex max-w-full flex-row flex-wrap items-center justify-center gap-4 md:justify-start">
        <button className="font-accent group flex h-15 w-2xs cursor-pointer items-center justify-center gap-2 rounded-xl bg-purple-500 text-lg">
          Почати безкоштовно{" "}
          <ArrowUp className="rotate-90 text-transparent transition-colors duration-300 group-hover:animate-bounce group-hover:text-white" />
        </button>
        <Link
          href={"/details"}
          className="group flex flex-row items-center gap-2"
        >
          <span className="font-accent text-lg text-gray-500 group-hover:text-white">
            Дізнатися більше
          </span>
          <ChevronRight className="text-gray-500 group-hover:text-white" />
        </Link>
      </div>
    </article>
  );
}
