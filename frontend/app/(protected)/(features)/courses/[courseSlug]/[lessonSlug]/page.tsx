import { LessonBlock } from "./components/LessonBlock";

export default async function LessonPage({
  params,
}: {
  params: { lessonSlug: string; courseSlug: string };
}) {
  const { lessonSlug, courseSlug } = await params;
  return (
    <section className="flex w-full flex-col items-center">
      <LessonBlock lessonSlug={lessonSlug} courseSlug={courseSlug} />
    </section>
  );
}
