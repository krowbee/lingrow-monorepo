import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export function CourseCard() {
  return (
    <Card className="relative w-full h-min max-w-sm pt-0 overflow-hidden bg-neutral-800 border-none">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <Image
        src="https://avatar.vercel.sh/shadcn1"
        alt="course-name"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
        width={500}
        height={400}
      />
      <CardHeader>
        <CardTitle className="font-accent">English A1 Level</CardTitle>
        <CardDescription className="font-body">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime,
          reiciendis ea, voluptas laboriosam minima exercitationem sint id sunt
          autem ducimus necessitatibus ab quos doloremque culpa repudiandae eius
          iure obcaecati dolores.
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-center">
        <Button className="w-full max-w-[50%]">Вчитись</Button>
      </CardFooter>
    </Card>
  );
}
