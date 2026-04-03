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
    <Card className="h-50 pt-8 pb-4 w-70 flex flex-col justify-between hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-md hover:shadow-fuchsia-500 transition duration-300 cursor-default">
      <CardHeader className="w-full">
        <CardTitle className="font-heading font-bold text-2xl flex flex-row gap-2">
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
          <Button className="bg-gradient-to-r cursor-pointer w-40 from-fuchsia-500 to-purple-500 w-">
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
