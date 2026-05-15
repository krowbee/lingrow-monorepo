import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ProfileBlock } from "./ProfileBlock";
import { CoursesSide } from "./CoursesSide";
import { Course } from "@/types/course/course";

export function SideBlock({ courses }: { courses: Course[] }) {
  return (
    <SidebarProvider className="w-min">
      <Sidebar className="text-white">
        <SidebarHeader className="mb-4 p-0">
          <div className="font-heading w-full p-2 text-center text-xl font-bold">
            Швидкий доступ
          </div>
        </SidebarHeader>
        <SidebarContent>
          <CoursesSide courses={courses} />
        </SidebarContent>
        <SidebarFooter>
          <ProfileBlock />
        </SidebarFooter>
      </Sidebar>
      <SidebarTrigger className="fixed top-1/2 h-3 w-6 md:hidden" />
    </SidebarProvider>
  );
}
