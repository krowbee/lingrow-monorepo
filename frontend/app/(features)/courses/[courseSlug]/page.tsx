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
      <section className="w-full flex flex-col p-8 gap-2">
        <h1 className="text-3xl font-bold font-heading text-white cursor-default">
          Доступні{" "}
          <span className="text-purple-400/75 cursor-default">уроки</span>
        </h1>
        <LessonsContainer initialLessons={lessons} courseSlug={courseSlug} />
      </section>
    </>
  );
}
