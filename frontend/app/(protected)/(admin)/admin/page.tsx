import { CoursesBlock } from "./components/CoursesBlock";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string | null | undefined }>;
}) {
  const { search } = await searchParams;
  return (
    <div className="flex h-full w-full flex-col p-4">
      <CoursesBlock search={search} />
    </div>
  );
}
