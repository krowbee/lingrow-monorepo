"use client";
import { SidebarGroup } from "@/components/ui/sidebar";
import { Course } from "@/types/course/course";
import { COURSES_URL } from "@/urls/courses";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function CoursesSide({ courses }: { courses: Course[] }) {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).pop();
  const isCoursesPage = "/" + slug === COURSES_URL.courses_page;

  return (
    <SidebarGroup className="gap-2 p-0 p-2">
      <Link href={COURSES_URL.courses_page} className="flex w-full flex-row">
        <div
          className={`flex cursor-pointer flex-row gap-2 p-2 ${isCoursesPage ? "bg-zinc-800" : "border border-purple-400/20 hover:bg-zinc-800"} w-full rounded-lg`}
        >
          <div
            className={`h-full w-1 bg-purple-400 ${isCoursesPage ? "opacity-100" : "opacity-0"}`}
          ></div>
          <h3 className="font-body text-md w-full">Курси</h3>
        </div>
      </Link>

      <div className="courses-side-container flex flex-col gap-2">
        {courses.map((course) => (
          <Link
            href={`${COURSES_URL.courses_page}/${course.slug}`}
            key={course.id}
            className="flex flex-row"
          >
            <div
              className={`flex flex-row gap-2 p-2 ${slug === course.slug || pathname.includes(course.slug) ? "bg-zinc-800" : "border border-purple-400/20 hover:bg-zinc-800"} w-full rounded-lg hover:cursor-pointer`}
            >
              <div
                className={`h-full w-1 bg-purple-400 ${slug === course.slug || pathname.includes(course.slug) ? "opacity-100" : "opacity-0"}`}
              ></div>

              <h3 className="text-md font-accent">{course.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </SidebarGroup>
  );
}
