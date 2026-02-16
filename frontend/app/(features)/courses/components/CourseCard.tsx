import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Course } from "../../../../types/course/course";
import Link from "next/link";
import { COURSES_URL } from "@/urls/courses";

export function CourseCard({ course }: { course: Course }) {
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
        <CardTitle className="font-accent">{course.name}</CardTitle>
        <CardDescription className="font-body">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-center">
        <Link
          className=" cursor-pointer max-w-[50%]"
          href={`${COURSES_URL.courses_page}/${course.slug}`}
        >
          <Button className="w-full cursor-pointer">Вчитись</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
