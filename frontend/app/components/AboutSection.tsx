import { InfoCard } from "../components/InfoCard";

export const AboutSection = () => {
  const cardContent = {
    0: {
      cardTitle: "Реальна методика",
      cardDescription:
        "У Lingrow реалізовано методику навчання, засновану на реальних принципах, за якими учні досягали рівня B2 упродовж року. Ми не вчимо 'по шаблонах' — ми відтворюємо природний шлях засвоєння мови, крок за кроком.",
    },
    1: {
      cardTitle: "Прості кроки — великий результат",
      cardDescription:
        "Ми ділимо навчання на короткі, чіткі етапи. Кожен урок — це маленька перемога, яка наближає тебе до вільного мовлення. Без стресу, без перевантаження — лише стабільний прогрес.",
    },
    2: {
      cardTitle: "Практика з перших хвилин",
      cardDescription:
        "Lingrow побудовано навколо активного використання мови. Ти не просто читаєш правила — ти одразу застосовуєш їх у коротких інтерактивних вправах.",
    },
    3: {
      cardTitle: "Твій персональний прогрес",
      cardDescription:
        "Ми зберігаємо кожен твій крок — від першого слова до впевнених речень. Lingrow адаптується під тебе, допомагаючи повторювати те, що потребує уваги.",
    },
    4: {
      cardTitle: "Від людини — для людей",
      cardDescription:
        "Ідея Lingrow народилась з реального досвіду навчання з викладачем, який допоміг десяткам студентів вільно заговорити англійською. Тепер ця методика доступна кожному — без обмежень і репетиторів.",
    },
    5: {
      cardTitle: "Мотивація замість тиску",
      cardDescription:
        "Lingrow створений так, щоб навчання було приємним: короткі завдання, м’який дизайн і відчуття успіху після кожного рівня. Ти вчишся без тиску — тільки з мотивацією.",
    },
  };

  return (
    <section className="about relative flex w-full flex-col items-center justify-center gap-10 border border-white/5 bg-black/20 pb-10 shadow-md">
      <h1 className="font-heading flex w-full items-center justify-center bg-black/70 p-8 text-5xl text-white">
        Про нас
      </h1>
      <div className="grid w-full max-w-[1400px] justify-items-center gap-y-20 md:grid-cols-2 lg:grid-cols-3">
        {Object.values(cardContent).map((card, index) => (
          <InfoCard
            key={index}
            cardTitle={card.cardTitle}
            cardDescription={card.cardDescription}
          />
        ))}
      </div>
    </section>
  );
};
