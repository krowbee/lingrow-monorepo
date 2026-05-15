import { DollarSign } from "lucide-react";

import {
  DiamondIcon,
  RocketIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react";
import { PriceCard } from "./prices/PriceCard";

export type PricingPlan = {
  name: string;
  price: string;
  priceSuffix?: string;
  description: string;
  Icon: LucideIcon;
  ctaLabel: string;
  isPopular?: boolean;
  features: {
    label: string;
    included: boolean;
  }[];
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Start",
    price: "Безкоштовно",
    description: "Ідеально для знайомства з платформою та методикою.",
    Icon: RocketIcon,
    ctaLabel: "Почати безкоштовно",
    features: [
      {
        label: "3 уроки на день",
        included: true,
      },
      {
        label: "Базові граматичні теми",
        included: true,
      },
      {
        label: "Словниковий тренажер",
        included: true,
      },
      {
        label: "Особистий прогрес",
        included: true,
      },
      {
        label: "Жива практика",
        included: false,
      },
    ],
  },
  {
    name: "Core",
    price: "₴249",
    priceSuffix: "/міс",
    description: "Оптимальний доступ для стабільного прогресу щодня.",
    Icon: ZapIcon,
    ctaLabel: "Обрати план",
    isPopular: true,
    features: [
      {
        label: "Необмежені уроки",
        included: true,
      },
      {
        label: "Усі граматичні теми",
        included: true,
      },
      {
        label: "Словниковий тренажер",
        included: true,
      },
      {
        label: "Жива практика",
        included: true,
      },
      {
        label: "Персональний план",
        included: true,
      },
    ],
  },
  {
    name: "Pro",
    price: "₴499",
    priceSuffix: "/міс",
    description: "Максимум можливостей для швидкого результату.",
    Icon: DiamondIcon,
    ctaLabel: "Обрати план",
    features: [
      {
        label: "Усе з плану Core",
        included: true,
      },
      {
        label: "Індивідуальні вправи",
        included: true,
      },
      {
        label: "Просунутий тренажер",
        included: true,
      },
      {
        label: "Пріоритетна підтримка",
        included: true,
      },
      {
        label: "Розмовні класи щотижня",
        included: true,
      },
    ],
  },
];

export function PricesSection() {
  return (
    <section
      id="prices"
      className="flex w-full flex-col items-center gap-6 bg-slate-950/80 py-10"
    >
      <div className="font-accent flex flex-row gap-2 rounded-2xl border border-purple-500/30 px-4 py-2 text-lg text-purple-500">
        <DollarSign />
        <p>Pricing</p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <div className="flex w-full flex-col gap-2 px-7 leading-6">
          <h2 className="font-heading text-center text-4xl">
            Обери свій формат <span className="text-purple-500">навчання</span>
          </h2>
          <p className="text-md text-center text-gray-500 md:text-lg">
            Почни безкоштовно або відкрий повний доступ до системи Lingrow і вчи
            англійську без меж
          </p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-6 py-6 xl:grid xl:grid-cols-3">
        {PRICING_PLANS.map((item, index) => (
          <PriceCard key={index} plan={item} />
        ))}
      </div>
    </section>
  );
}
