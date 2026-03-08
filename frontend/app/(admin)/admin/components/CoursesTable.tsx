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
      <Card className="w-max  flex flex-col rounded-none h-72 py-2 min-w-40">
        <CardHeader className="font-heading text-center">Курси</CardHeader>

        <CardContent className="w-full flex-1 flex flex-col items-center px-1 gap-1 overflow-y-auto hide-scrollbar">
          {loading ? (
            <Spinner />
          ) : error ? (
            <p>error</p>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                className="truncate w-[160px] flex px-2  cursor-pointer  py-1  bg-muted hover:bg-muted/50"
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
