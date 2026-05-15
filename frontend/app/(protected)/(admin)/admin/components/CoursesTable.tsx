"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getCoursesList } from "@/lib/api/requests/courses.client.requests";
import { Course } from "@/types/course/course";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { AddCourseButton } from "./add-buttons/AddCourseButton";
import { FormShell } from "./forms/FormShell";
import { CourseForm } from "./forms/CourseForm";
import { useAdminStore } from "@/store/AdminStore";

export function CoursesTable({
  setChoosedCourse,
}: {
  setChoosedCourse: (choosedCourse: Course | null) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const openMenu = useAdminStore((state) => state.openMenu);
  const choosedCourse = useAdminStore((state) => state.choosedEditCourse);

  const fillCoursesTable = async () => {
    try {
      const result = await getCoursesList();
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setCourses(result.data);
    } catch {
      setError("Виникла невідома помилка");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fillCoursesTable();
  }, []);

  return (
    <>
      <Card className="flex h-72 w-max min-w-40 flex-col rounded-none py-2">
        <CardHeader className="font-heading text-center">Курси</CardHeader>

        <CardContent className="hide-scrollbar flex w-full flex-1 flex-col items-center gap-1 overflow-y-auto px-1">
          {loading ? (
            <Spinner />
          ) : error ? (
            <p>error</p>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                className="bg-muted hover:bg-muted/50 flex w-[160px] cursor-pointer truncate px-2 py-1"
                onClick={() => setChoosedCourse(course)}
              >
                {course.name}
              </div>
            ))
          )}
        </CardContent>
        <CardFooter className="flex w-full justify-center">
          <AddCourseButton />
        </CardFooter>
      </Card>
      {openMenu && openMenu.entity === "course" ? (
        <FormShell>
          <CourseForm
            onClose={fillCoursesTable}
            mode={openMenu.action}
            courseId={choosedCourse?.id}
          />
        </FormShell>
      ) : null}
    </>
  );
}
