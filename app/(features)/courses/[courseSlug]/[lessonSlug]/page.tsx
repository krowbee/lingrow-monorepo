import { LessonBlock } from "./components/LessonBlock";

export default async function LessonPage({
  params,
}: {
  params: { lessonSlug: string };
}) {
  const { lessonSlug } = await params;
  return (
    <section className="flex flex-col items-center w-full">
      <LessonBlock lessonSlug={lessonSlug} />
    </section>
  );
}
