import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const InfoCard = ({
  cardTitle,
  cardDescription,
}: {
  cardTitle: string;
  cardDescription: string;
}): React.ReactNode => {
  return (
    <Card
      className={`group min-h-[260px] w-[375px] max-w-sm cursor-default rounded-sm border border-white/5 bg-neutral-800/10 transition-all duration-600 hover:-translate-y-2 hover:shadow-xl hover:shadow-fuchsia-500`}
    >
      <CardHeader className="gap-4">
        <CardTitle
          className={`font-heading text-xl text-white transition duration-600 group-hover:text-fuchsia-400`}
        >
          {cardTitle}
        </CardTitle>
        <CardDescription className="max-w-auto font-body text-lg leading-[1.8] text-neutral-400 transition duration-600 group-hover:text-white">
          {cardDescription}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
