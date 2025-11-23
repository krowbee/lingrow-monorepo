import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ICardColor } from "../../interfaces/ICardColor";

export const InfoCard = ({
  cardTitle,
  cardDescription,
  cardColor,
}: {
  cardTitle: string;
  cardDescription: string;
  cardColor: ICardColor;
}): React.ReactNode => {
  return (
    <Card
      className={`w-[375px] h-[280px] max-w-sm bg-neutral-800 border rounded-sm ${cardColor.border}`}
    >
      <CardHeader>
        <CardTitle className={`${cardColor.text} text-lg font-heading`}>
          {cardTitle}
        </CardTitle>
        <CardDescription className="text-lg text-neutral-400 font-body">
          {cardDescription}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
