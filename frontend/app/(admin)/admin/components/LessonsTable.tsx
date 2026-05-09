"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useLoading } from "@/hooks/useLoading";
import { getLessonsList } from "@/lib/api/requests/courses.client.requests";
import { Course, Lesson } from "@/types/course/course";
import { ADMIN_URL } from "@/urls/admin";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useAdminStore } from "@/store/AdminStore";
import { AddLessonButton } from "./add-buttons/AddLessonButton";
import { FormShell } from "./forms/FormShell";
import { LessonForm } from "./forms/LessonForm";

export function LessonsTable({
  choosedCourse,
}: {
  choosedCourse: Course | null;
}) {
  const [error, setError] = useState<null | string>(null);
  const setErrorMessage = useAdminStore((state) => state.setErrorMessage);
  const { isLoading, startLoading, stopLoading } = useLoading(false);
  const [courseLessons, setCourseLessons] = useState<Lesson[]>([]);
  const openMenu = useAdminStore((state) => state.openMenu);
  const fillLessonTable = useCallback(async () => {
    if (!choosedCourse) return;
    try {
      startLoading();
      const result = await getLessonsList(choosedCourse.slug);
      if (!result.ok) {
        setError(result.error);
        return;
      }

      setCourseLessons(result.data);
    } catch {
      setErrorMessage("Виникла невідома помилка");
    } finally {
      stopLoading();
    }
  }, [choosedCourse, setErrorMessage, startLoading, stopLoading]);

  useEffect(() => {
    setError(null);
    if (!choosedCourse) return;
    fillLessonTable();
  }, [choosedCourse, fillLessonTable]);

  return (
    <>
      <Card className="h-72 w-max min-w-30 rounded-none py-2">
        <CardHeader className="font-heading text-center">Уроки</CardHeader>

        <CardContent className="hide-scrollbar flex w-full flex-1 flex-col items-center gap-1 overflow-y-auto px-1">
          {!choosedCourse ? (
            <p className="p-2">Оберіть курс</p>
          ) : isLoading ? (
            <Spinner />
          ) : error ? (
            <p className="p-2">Уроки відсутні</p>
          ) : (
            courseLessons.map((lesson) => (
              <Link
                href={`${ADMIN_URL.adminPage}/${choosedCourse.slug}/${lesson.slug}`}
                key={lesson.id}
                className="w-full text-center"
              >
                <div className="bg-muted hover:bg-muted/50 flex w-full cursor-pointer items-center justify-center px-4 py-1">
                  <span className="font-accent w-[160px] truncate">
                    {lesson.name}
                  </span>
                </div>
              </Link>
            ))
          )}
        </CardContent>
        <CardFooter className="flex w-full justify-center">
          <AddLessonButton />
        </CardFooter>
      </Card>
      {openMenu && openMenu.entity === "lesson" && choosedCourse ? (
        <FormShell>
          <LessonForm
            lessons={courseLessons}
            mode={openMenu.action}
            courseId={choosedCourse?.id}
            onClose={fillLessonTable}
          />
        </FormShell>
      ) : null}
    </>
  );
}
