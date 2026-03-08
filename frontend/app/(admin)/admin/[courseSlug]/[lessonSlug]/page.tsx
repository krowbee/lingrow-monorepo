import { EditLessonContentBlock } from "./components/EditLessonContentBlock";

export default async function EditLessonPage({
  params,
}: {
  params: { courseSlug: string; lessonSlug: string };
}) {
  const { lessonSlug } = await params;
  return <EditLessonContentBlock lessonSlug={lessonSlug} />;
}
