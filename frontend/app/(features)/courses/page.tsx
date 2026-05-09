import { getStaticCoursesList } from "@/lib/api/requests/courses.requests";
import { CourseCard } from "./components/CourseCard";

export const metadata = {
  title: "Курси",
  description: "Courses page",
};

export default async function CoursesPage() {
  const result = (await getStaticCoursesList()) || [];
  return (
    <>
      {result.ok && result.data ? (
        <>
          <section className="flex min-h-screen w-full flex-col gap-4 p-8">
            <h1 className="font-heading text-3xl font-bold text-white">
              Доступні <span className="text-purple-400/75">курси</span>
            </h1>
            <div className="cards-container flex w-full flex-wrap justify-center gap-6 py-4">
              {result.data.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        </>
      ) : null}
    </>
  );
}
