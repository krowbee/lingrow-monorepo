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
      className={`w-[375px] min-h-[260px] max-w-sm bg-neutral-800/10 border rounded-sm border-white/5`}
    >
      <CardHeader className="gap-4">
        <CardTitle className={`text-white text-xl font-heading`}>
          {cardTitle}
        </CardTitle>
        <CardDescription className="text-lg text-neutral-400 max-w-auto font-body leading-[1.8]">
          {cardDescription}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
