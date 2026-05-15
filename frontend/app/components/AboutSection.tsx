import { InfoCard } from "../components/InfoCard";
import { AboutBackground } from "./about-us/AboutBackGround";

import {
  BookOpenIcon,
  ChartNoAxesColumnIncreasingIcon,
  HeartIcon,
  LightbulbIcon,
  RouteIcon,
  SparklesIcon,
  type LucideIcon,
} from "lucide-react";

export type CardContentItem = {
  cardTitle: string;
  cardDescription: string;
  Icon: LucideIcon;
};

const ABOUT_CARD_CONTENT: Record<number, CardContentItem> = {
  0: {
    cardTitle: "Реальна методика",
    cardDescription:
      "У Lingrow реалізовано методику навчання, засновану на реальних принципах, за якими учні досягали рівня B2 упродовж року. Ми не вчимо 'по шаблонах' — ми відтворюємо природний шлях засвоєння мови, крок за кроком.",
    Icon: BookOpenIcon,
  },
  1: {
    cardTitle: "Прості кроки — великий результат",
    cardDescription:
      "Ми ділимо навчання на короткі, чіткі етапи. Кожен урок — це маленька перемога, яка наближає тебе до вільного мовлення. Без стресу, без перевантаження — лише стабільний прогрес.",
    Icon: RouteIcon,
  },
  2: {
    cardTitle: "Практика з перших хвилин",
    cardDescription:
      "Lingrow побудовано навколо активного використання мови. Ти не просто читаєш правила — ти одразу застосовуєш їх у коротких інтерактивних вправах.",
    Icon: SparklesIcon,
  },
  3: {
    cardTitle: "Твій персональний прогрес",
    cardDescription:
      "Ми зберігаємо кожен твій крок — від першого слова до впевнених речень. Lingrow адаптується під тебе, допомагаючи повторювати те, що потребує уваги.",
    Icon: ChartNoAxesColumnIncreasingIcon,
  },
  4: {
    cardTitle: "Від людини — для людей",
    cardDescription:
      "Ідея Lingrow народилась з реального досвіду навчання з викладачем, який допоміг десяткам студентів вільно заговорити англійською. Тепер ця методика доступна кожному — без обмежень і репетиторів.",
    Icon: HeartIcon,
  },
  5: {
    cardTitle: "Мотивація замість тиску",
    cardDescription:
      "Lingrow створений так, щоб навчання було приємним: короткі завдання, м’який дизайн і відчуття успіху після кожного рівня. Ти вчишся без тиску — тільки з мотивацією.",
    Icon: LightbulbIcon,
  },
};

export const AboutSection = () => {
  return (
    <section className="about relative flex w-full flex-col items-center justify-center gap-10 pb-10 shadow-md">
      <AboutBackground />
      <h1 className="font-heading z-10 flex w-full items-center justify-center p-8 text-5xl">
        Про нас
      </h1>
      <div className="z-10 grid w-full justify-items-center gap-y-20 lg:grid-cols-2 xl:grid-cols-3">
        {Object.values(ABOUT_CARD_CONTENT).map((card, index) => (
          <InfoCard
            key={index}
            cardTitle={card.cardTitle}
            cardDescription={card.cardDescription}
            Icon={card.Icon}
          />
        ))}
      </div>
    </section>
  );
};
