import { CourseCard } from "./components/CourseCard";
import { SideBlock } from "./components/SideBlock";

export default function CoursesPage() {
  return (
    <>
      <main className="w-full h-full flex flex-row">
        <SideBlock></SideBlock>
        <section className="w-full h-screen p-8">
          <h1 className="text-3xl font-heading text-center">Доступні курси</h1>
          <div className="cards-container flex flex-wrap w-full gap-4 justify-center py-4">
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </div>
        </section>
      </main>
    </>
  );
}
