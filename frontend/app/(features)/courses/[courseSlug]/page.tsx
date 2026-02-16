import { getStaticLessonsList } from "@/lib/api/requests/courses.requests";
import { LessonsContainer } from "./components/LessonContainer";

export default async function CourseLessonsPage({
  params,
}: {
  params: { courseSlug: string };
}) {
  const { courseSlug } = await params;
  const result = await getStaticLessonsList(courseSlug);
  const lessons = result.ok ? result.data : [];
  return (
    <>
      <section className="w-full flex-col p-8">
        <h1 className="font-heading text-2xl font-bold text-center">
          Доступні уроки
        </h1>
        <LessonsContainer initialLessons={lessons} courseSlug={courseSlug} />
      </section>
    </>
  );
}
