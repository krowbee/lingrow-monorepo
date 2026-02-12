"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCoursesList } from "@/lib/api/requests/courses.client.requests";
import { Course } from "@/types/course/course";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export function CoursesTable() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    const getData = async () => {
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
    getData();
  }, []);

  return (
    <Card className="w-max  rounded-none h-64 py-2">
      <CardHeader className="font-heading text-center">Курси</CardHeader>

      <CardContent className="w-full flex flex-col items-center p-0 gap-1 overflow-y-auto hide-scrollbar">
        {loading ? (
          <Spinner />
        ) : error ? (
          <p>error</p>
        ) : (
          courses.map((course) => (
            <>
              <div
                key={course.id}
                className="w-full px-2  cursor-pointer  py-1  bg-muted hover:bg-muted/50"
              >
                {course.name}
              </div>
            </>
          ))
        )}
      </CardContent>
    </Card>
  );
}
