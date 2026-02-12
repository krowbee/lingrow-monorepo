"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { getLessonsList } from "@/lib/api/requests/courses.client.requests";
import { useAdminStore } from "@/store/AdminStore";
import { Lesson } from "@/types/course/course";
import { ADMIN_URL } from "@/urls/admin";
import Link from "next/link";
import { useEffect, useState } from "react";

export function LessonsTable() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const currentCourse = useAdminStore((state) => state.currentCourse);
  useEffect(() => {
    if (!currentCourse) return;
    const getData = async () => {
      try {
        setLoading(true);
        const result = await getLessonsList(currentCourse.slug);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        setLessons(result.data);
      } catch {
        setError("Виникла невідома помилка");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [currentCourse]);

  return (
    <Card className="w-max  rounded-none h-72 py-2">
      <CardHeader className="font-heading text-center">Уроки</CardHeader>

      <CardContent className="w-full flex flex-1 flex-col items-center px-1 gap-1 overflow-y-auto hide-scrollbar">
        {!currentCourse ? (
          <p className="p-2">Оберіть курс</p>
        ) : loading ? (
          <Spinner />
        ) : error ? (
          <p>error</p>
        ) : (
          lessons.map((lesson) => (
            <Link
              href={`${ADMIN_URL.adminPage}/${currentCourse.slug}/${lesson.slug}`}
              key={lesson.id}
              className="w-full text-center"
            >
              <div className="w-full px-4  flex items-center justify-center cursor-pointer  py-1  bg-muted hover:bg-muted/50">
                <span className="font-accent truncate w-full">
                  {lesson.name}
                </span>
              </div>
            </Link>
          ))
        )}
      </CardContent>
      <CardFooter className="flex w-full justify-center">
        <button className="font-accent flex  cursor-pointer text-secondary hover:text-primary transition-colours duration-300 rounded-full border hover:border-primary px-2">
          +
        </button>
      </CardFooter>
    </Card>
  );
}
