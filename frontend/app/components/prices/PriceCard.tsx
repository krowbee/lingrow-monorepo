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
import { CheckCircle2Icon } from "lucide-react";
import { PricingPlan } from "../PricesSection";

export function PriceCard({ plan }: { plan: PricingPlan }) {
  return (
    <Card
      className={cn(
        "relative flex min-h-125 w-sm cursor-default flex-col overflow-visible rounded-sm border border-purple-500/20 bg-neutral-950/35 pb-6 text-white backdrop-blur-xl md:w-md",
        plan.isPopular &&
          "border-purple-500/70 shadow-[0_0_35px_rgba(168,85,247,0.35)] xl:-translate-y-6",
      )}
    >
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-md bg-purple-500 px-4 py-1 text-xs font-medium text-white shadow-[0_0_18px_rgba(168,85,247,0.65)]">
          Популярний вибір
        </div>
      )}

      <CardHeader className="gap-6">
        <div className="flex flex-row items-start gap-6">
          <div className="relative flex size-16 shrink-0 items-center justify-center border border-purple-500 bg-purple-500/10 text-purple-500">
            <plan.Icon className="size-8" />

            <div className="pointer-events-none absolute inset-0 rotate-45 border border-purple-500/80 bg-purple-500/5" />
          </div>

          <div className="space-y-2">
            <CardTitle className="font-heading text-2xl text-white">
              {plan.name}
            </CardTitle>

            <div className="font-accent text-xl text-purple-400">
              {plan.price}

              <span className="ml-1 text-sm text-white/55">/міс</span>
            </div>
          </div>
        </div>

        <CardDescription className="font-body text-base leading-7 text-neutral-400">
          {plan.description}
        </CardDescription>

        <div className="h-px w-full bg-purple-500/20" />
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="space-y-4">
          {plan.features.map((feature) => (
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
                  feature.included ? "text-purple-500" : "text-purple-500/30",
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
            plan.isPopular
              ? "bg-purple-500 text-white hover:bg-purple-400"
              : "bg-transparent text-purple-400 hover:bg-purple-500/10 hover:text-purple-300",
          )}
        >
          Обрати план
        </Button>
      </CardFooter>
    </Card>
  );
}
