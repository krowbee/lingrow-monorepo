import { CoursesBlock } from "./components/CoursesBlock";

export default async function AdminPage() {
  return (
    <div className="flex h-full w-full flex-col p-4">
      <CoursesBlock />
    </div>
  );
}
