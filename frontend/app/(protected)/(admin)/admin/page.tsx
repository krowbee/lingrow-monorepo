import { CoursesBlock } from "./components/CoursesBlock";

export default async function AdminPage({
  params,
}: {
  params: { search: string | null | undefined };
}) {
  const { search } = await params;
  return (
    <div className="flex h-full w-full flex-col p-4">
      <CoursesBlock search={search} />
    </div>
  );
}
