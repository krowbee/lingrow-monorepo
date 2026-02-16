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
      className={`w-[375px] h-[280px] max-w-sm bg-neutral-800 border rounded-sm border-white`}
    >
      <CardHeader>
        <CardTitle className={`text-white text-lg font-heading`}>
          {cardTitle}
        </CardTitle>
        <CardDescription className="text-lg text-neutral-400 font-body">
          {cardDescription}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
