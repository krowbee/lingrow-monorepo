import { DollarSign } from "lucide-react";

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
      <div className="flex flex-row items-center justify-center lg:grid lg:grid-cols-3"></div>
    </section>
  );
}
