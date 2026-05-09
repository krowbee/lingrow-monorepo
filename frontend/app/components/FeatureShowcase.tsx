import {
  ArrowUp,
  AudioLinesIcon,
  BookOpenIcon,
  ChevronRight,
  Sparkles,
  TrendingUpIcon,
} from "lucide-react";
import { IconWithText } from "./showcase/IconWithText";
import Link from "next/link";

export function FeatureShowcase() {
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
  return (
    <section className="flex h-screen w-full flex-row bg-linear-to-b from-purple-950/30 via-slate-950 to-slate-900 px-4 py-4 md:px-16 md:py-24">
      <article className="flex flex-col items-start justify-center gap-4 md:items-start w-full">
        <div className="flex flex-row items-center gap-2 rounded-full border border-purple-500/30 px-6 py-2 text-purple-500">
          <Sparkles />
          <p className="fong-accent">Smart learning</p>
        </div>
        <div className="flex w-[90%] flex-col gap-4 md:w-[70%]">
          <h2 className="font-heading text-5xl tracking-tight text-white md:text-6xl">
            Англійська,
            <br />
            <span className="text-purple-500">
              яка стає частиною твого життя
            </span>
          </h2>
          <p className="font-body text-lg text-gray-400">
            Практичні уроки, поступове збільшення складності, відповідно до
            програми
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-x-10 gap-y-6">
          {cards.map((card, index) => (
            <IconWithText
              key={index}
              icon={card.icon}
              title={card.title}
              text={card.text}
            />
          ))}
        </div>
        <div className="flex flex-row flex-wrap justify-center md:justify-start items-center gap-4 max-w-full">
          <button className="font-accent group flex h-15 w-2xs cursor-pointer items-center justify-center gap-2 rounded-xl bg-purple-500 text-lg">
            Почати безкоштовно{" "}
            <ArrowUp className="transition-colors rotate-90 text-transparent duration-300 group-hover:animate-bounce group-hover:text-white" />
          </button>
          <Link href="" className="group flex flex-row items-center gap-2">
            <span className="font-accent text-lg text-gray-500 group-hover:text-white">
              Дізнатися більше
            </span>
            <ChevronRight className="text-gray-500 group-hover:text-white" />
          </Link>
        </div>
      </article>
      <div className="hidden max-w-lg rounded-xl border border-purple-500/25 p-4 lg:flex">
        <video
          className="h-full w-full rounded-lg object-cover"
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          preload="metadata"
          poster="/videos/poster.jpg"
        >
          <source
            src="/videos/loop-video.webm"
            type="video/webm"
            media="(min-width:1024px)"
          />
          <source
            src="/videos/loop-video.mp4"
            type="video/mp4"
            media="(min-width:1024px)"
          />
        </video>
      </div>
    </section>
  );
}
