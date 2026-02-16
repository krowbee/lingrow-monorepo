import { getStaticCoursesList } from "@/lib/api/requests/courses.requests";
import { SideBlock } from "./components/SideBlock";
import { ReactNode } from "react";

export default async function CoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const result = (await getStaticCoursesList()) || [];
  return (
    <main className="w-full h-full flex flex-row">
      <SideBlock courses={result.ok ? result.data : []}></SideBlock>
      {children}
    </main>
  );
}
