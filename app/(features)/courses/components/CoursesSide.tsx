import { SidebarGroup } from "@/components/ui/sidebar";
import { Course } from "@/types/course/course";
import { COURSES_URL } from "@/urls/courses";
import Link from "next/link";

export function CoursesSide({ courses }: { courses: Course[] }) {
  return (
    <SidebarGroup className="p-0 gap-2 pt-2 border-t-1 border-b-1">
      <h3 className="font-accent text-lg text-center">
        <Link href={COURSES_URL.courses_page}>Курси</Link>
      </h3>

      <div className="courses-side-container flex flex-col max-h-[110px] overflow-y-auto hide-scrollbar gap-2">
        {courses.map((course) => (
          <div
            key={course.id}
            className="w-full flex flex-col px-4 border-1   hover:cursor-pointer"
          >
            <Link href={`${COURSES_URL.courses_page}/${course.slug}`}>
              <h3 className="text-md font-body">{course.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </SidebarGroup>
  );
}
