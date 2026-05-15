import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardContentItem } from "./AboutSection";

export const InfoCard = ({
  cardTitle,
  cardDescription,
  Icon,
}: CardContentItem): React.ReactNode => {
  return (
    <Card
      className={`group h-125 w-sm cursor-default rounded-sm border border-purple-500/20 bg-neutral-800/10 pb-15 backdrop-blur-xl md:w-md`}
    >
      <CardHeader className="flex h-full flex-col gap-8">
        <div className="flex flex-row items-center gap-6">
          <div className="relative w-min border border-purple-500 bg-purple-500/10 p-4 text-purple-500">
            <Icon className="h-10 w-10" />
            <div className="absolute top-0 left-0 h-full w-full rotate-45 border border-purple-500 bg-purple-500/10"></div>
          </div>
          <CardTitle
            className={`font-heading text-2xl text-white transition duration-600`}
          >
            {cardTitle}
          </CardTitle>
        </div>
        <div className="h-1 w-18 bg-purple-500"></div>
        <CardDescription className="max-w-auto font-body text-lg leading-[1.8] text-neutral-400 transition duration-600">
          {cardDescription}
        </CardDescription>
        <div className="mt-auto flex w-20 flex-row items-end justify-between">
          <div className="h-3 w-3 rounded-full bg-purple-500"></div>
          <div className="h-3 w-3 rounded-full bg-purple-500"></div>
          <div className="h-3 w-3 rounded-full bg-purple-500"></div>
        </div>
      </CardHeader>
    </Card>
  );
};
