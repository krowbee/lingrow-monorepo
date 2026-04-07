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
      className={`w-[375px] min-h-[260px] cursor-default transition-transform max-w-sm bg-neutral-800/10 border rounded-sm border-white/5 transition duration-600 hover:-translate-y-2 hover:shadow-xl hover:shadow-fuchsia-500 group`}
    >
      <CardHeader className="gap-4">
        <CardTitle
          className={`text-white text-xl font-heading group-hover:text-fuchsia-400 transition duration-600`}
        >
          {cardTitle}
        </CardTitle>
        <CardDescription className="text-lg text-neutral-400 max-w-auto font-body leading-[1.8]">
          {cardDescription}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
