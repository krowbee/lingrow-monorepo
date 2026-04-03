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
import { Brain } from "lucide-react";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="relative w-full min-h-max max-w-sm pt-0 overflow-hidden bg-sidebar hover:-translate-1 transition ease-out border-none shadow-2xl shadow-purple-700/20 hover:shadow-xl hover:shadow-fuchsia-500/50">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <Image
        src="/course_card.png"
        alt="course-name"
        className="relative z-20 aspect-video w-full object-cover dark:brightness-40"
        width={500}
        height={380}
      />
      <CardHeader className="px-6 py-3">
        <CardTitle className="font-accent">{course.name}</CardTitle>
        <CardDescription className="font-body">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-end mt-auto">
        <Link
          className="cursor-pointer w-[40%]"
          href={`${COURSES_URL.courses_page}/${course.slug}`}
        >
          <Button className="w-full cursor-pointer bg-gradient-to-b from-purple-500 to-fuchsia-500">
            <Brain />
            Вчитись
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
