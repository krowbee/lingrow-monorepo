"use client";
import { getCoursesList } from "@/lib/api/requests/courses.client.requests";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { Course } from "@/types/course/course";
import { useAdminStore } from "@/store/AdminStore";
import { StatusType } from "@/types/filterType";
import { CourseTableBlock, CourseTableBlockSkeleton } from "./CourseTableBlock";

export function CoursesTable({
  search,
  status,
}: {
  search: string | null | undefined;
  status: StatusType | null | undefined;
}) {
  const setErrorMessage = useAdminStore((state) => state.setErrorMessage);
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery<Course[]>({
    queryKey: ["courses", "admin", { status, search: search ?? undefined }],
    queryFn: async () => {
      const result = await getCoursesList(
        status ?? undefined,
        search ?? undefined,
      );
      if (!result.ok) {
        throw new Error(result.error || "Failed to fetch courses");
      }
      return result.data || [];
    },
  });

  useEffect(() => {
    if (error) {
      setErrorMessage((error as Error).message);
    }
  }, [error, setErrorMessage]);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] border-collapse">
        <thead>
          <tr className="border-b border-white/10 text-left text-sm text-white/50">
            <th className="px-4 py-3 font-normal">
              <p>Назва курсу</p>
            </th>

            <th className="px-4 py-3 text-center font-normal">
              <p>Уроків</p>
            </th>

            <th className="px-4 py-3 font-normal">
              <p>Статус</p>
            </th>

            <th className="px-4 py-3 text-right font-normal">
              <p>Дії</p>
            </th>
          </tr>
        </thead>

        {isLoading ? (
          <tbody>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <CourseTableBlockSkeleton key={index} />
              ))}
          </tbody>
        ) : courses && courses.length > 0 ? (
          <tbody>
            {courses.map((course, index) => (
              <CourseTableBlock key={index} course={course} />
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={4} className="h-40 text-center">
                <p className="font-body text-lg text-gray-400">Немає курсів</p>
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}
