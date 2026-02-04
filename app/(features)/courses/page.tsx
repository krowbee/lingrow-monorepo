import { getStaticCoursesList } from "@/lib/api/requests/courses.requests";
import { CourseCard } from "./components/CourseCard";

export default async function CoursesPage() {
  const result = (await getStaticCoursesList()) || [];
  return (
    <>
      {result.ok && result.data ? (
        <>
          <section className="w-full h-screen p-8">
            <h1 className="text-3xl font-heading text-center">
              Доступні курси
            </h1>

            <div className="cards-container flex flex-wrap w-full gap-4 justify-center py-4">
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
