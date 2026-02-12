import { CoursesTable } from "./components/CoursesTable";

export default async function AdminPage() {
  return (
    <div className="w-full h-screen flex">
      <CoursesTable></CoursesTable>
    </div>
  );
}
