import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonWithProgress } from "@/types/course/course";
import { COURSES_URL } from "@/urls/courses";
import Link from "next/link";

export function LessonCard({
  courseSlug,
  lesson,
}: {
  courseSlug: string;
  lesson: LessonWithProgress;
}) {
  return (
    <Card
      className={`relative h-min max-w-sm py-2 overflow-hidden ${lesson.isCompleted ? "bg-neutral-700" : "bg-neutral-800"} border-none`}
    >
      <CardHeader>
        <CardTitle className="font-accent text-center truncate">
          {lesson.name}
        </CardTitle>
      </CardHeader>
      <CardFooter className="justify-center">
        <Link
          className=" cursor-pointer"
          href={`${COURSES_URL.courses_page}/${courseSlug}/${lesson.slug}`}
        >
          <Button
            className={`w-full cursor-pointer ${lesson.isCompleted && "bg-green-500"}`}
          >
            {lesson.isCompleted ? "Заново" : "Вчитись"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
