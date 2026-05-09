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
      <section className="flex w-full flex-col gap-2 p-8">
        <h1 className="font-heading cursor-default text-3xl font-bold text-white">
          Доступні{" "}
          <span className="cursor-default text-purple-400/75">уроки</span>
        </h1>
        <LessonsContainer initialLessons={lessons} courseSlug={courseSlug} />
      </section>
    </>
  );
}
