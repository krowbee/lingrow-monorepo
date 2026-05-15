import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react";

import {
  CheckCircle2Icon,
  DiamondIcon,
  RocketIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react";

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
    <section className="flex w-full flex-col items-center gap-6 bg-slate-950/80 py-10">
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
          <Card
            key={index}
            className={cn(
              "relative flex min-h-125 w-sm cursor-default flex-col overflow-visible rounded-sm border border-purple-500/20 bg-neutral-950/35 pb-6 text-white backdrop-blur-xl md:w-md",
              item.isPopular &&
                "-translate-y-6 border-purple-500/70 shadow-[0_0_35px_rgba(168,85,247,0.35)]",
            )}
          >
            {item.isPopular && (
              <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-md bg-purple-500 px-4 py-1 text-xs font-medium text-white shadow-[0_0_18px_rgba(168,85,247,0.65)]">
                Популярний вибір
              </div>
            )}

            <CardHeader className="gap-6">
              <div className="flex flex-row items-start gap-6">
                <div className="relative flex size-16 shrink-0 items-center justify-center border border-purple-500 bg-purple-500/10 text-purple-500">
                  <item.Icon className="size-8" />

                  <div className="pointer-events-none absolute inset-0 rotate-45 border border-purple-500/80 bg-purple-500/5" />
                </div>

                <div className="space-y-2">
                  <CardTitle className="font-heading text-2xl text-white">
                    {item.name}
                  </CardTitle>

                  <div className="font-accent text-xl text-purple-400">
                    {item.price}

                    <span className="ml-1 text-sm text-white/55">/міс</span>
                  </div>
                </div>
              </div>

              <CardDescription className="font-body text-base leading-7 text-neutral-400">
                {item.description}
              </CardDescription>

              <div className="h-px w-full bg-purple-500/20" />
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-4">
                {item.features.map((feature) => (
                  <li
                    key={feature.label}
                    className={cn(
                      "font-body flex items-center gap-3 text-sm",
                      feature.included ? "text-white/80" : "text-white/35",
                    )}
                  >
                    <CheckCircle2Icon
                      className={cn(
                        "size-4 shrink-0",
                        feature.included
                          ? "text-purple-500"
                          : "text-purple-500/30",
                      )}
                    />

                    <span>{feature.label}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button
                className={cn(
                  "font-accent h-12 w-full cursor-pointer rounded-sm border border-purple-500 text-base transition",
                  item.isPopular
                    ? "bg-purple-500 text-white hover:bg-purple-400"
                    : "bg-transparent text-purple-400 hover:bg-purple-500/10 hover:text-purple-300",
                )}
              >
                Обрати план
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
