import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonWithProgress } from "@/types/course/course";
import { COURSES_URL } from "@/urls/courses";
import { BookOpen, Brain, CircleCheckBig, RotateCcw } from "lucide-react";
import Link from "next/link";

export function LessonCard({
  courseSlug,
  lesson,
}: {
  courseSlug: string;
  lesson: LessonWithProgress;
}) {
  return (
    <Card className="flex h-50 w-70 cursor-default flex-col justify-between pt-8 pb-4 transition duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-md hover:shadow-fuchsia-500">
      <CardHeader className="w-full">
        <CardTitle className="font-heading flex flex-row gap-2 text-2xl font-bold">
          {!lesson.isCompleted ? (
            <span className="text-purple-500">
              <BookOpen />
            </span>
          ) : (
            <span className="text-purple-600">
              <CircleCheckBig />
            </span>
          )}
          {lesson.name}
        </CardTitle>
      </CardHeader>
      <CardFooter className="w-full justify-end">
        <Link href={`${COURSES_URL.courses_page}/${courseSlug}/${lesson.slug}`}>
          <Button className="w- w-40 cursor-pointer bg-linear-to-r from-fuchsia-500 to-purple-500">
            {lesson.isCompleted ? (
              <>
                <span>
                  <RotateCcw />
                </span>
                <span>Повторити</span>
              </>
            ) : (
              <>
                <span>
                  <Brain />
                </span>
                <span>Вчитись</span>
              </>
            )}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
