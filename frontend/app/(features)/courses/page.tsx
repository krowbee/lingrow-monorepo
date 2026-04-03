import { getStaticCoursesList } from "@/lib/api/requests/courses.requests";
import { CourseCard } from "./components/CourseCard";

export default async function CoursesPage() {
  const result = (await getStaticCoursesList()) || [];
  return (
    <>
      {result.ok && result.data ? (
        <>
          <section className="w-full flex flex-col min-h-screen p-8 gap-4">
            <h1 className="text-3xl font-bold font-heading text-white">
              Доступні <span className="text-purple-400/75">курси</span>
            </h1>
            <div className="cards-container flex flex-wrap w-full gap-6 justify-center py-4">
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
