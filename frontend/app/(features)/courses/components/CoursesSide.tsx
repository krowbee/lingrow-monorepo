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
    <SidebarGroup className="p-0 gap-2 p-2">
      <Link href={COURSES_URL.courses_page} className="flex flex-row w-full">
        <div
          className={`flex flex-row gap-2 p-2 cursor-pointer ${isCoursesPage ? "bg-zinc-800" : "hover:bg-zinc-800 border border-purple-400/20"} rounded-lg w-full`}
        >
          <div
            className={`bg-purple-400 w-1 h-full ${isCoursesPage ? "opacity-100" : "opacity-0"}`}
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
              className={`flex flex-row gap-2 p-2 ${slug === course.slug || pathname.includes(course.slug) ? "bg-zinc-800" : "hover:bg-zinc-800 border border-purple-400/20"} rounded-lg w-full  hover:cursor-pointer`}
            >
              <div
                className={`bg-purple-400 w-1 h-full ${slug === course.slug || pathname.includes(course.slug) ? "opacity-100" : "opacity-0"}`}
              ></div>

              <h3 className="text-md font-accent">{course.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </SidebarGroup>
  );
}
