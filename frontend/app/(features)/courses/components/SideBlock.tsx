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
      <Sidebar className="py-4">
        <SidebarHeader className="p-0">
          <div className="w-full text-center text-xl font-heading font-bold">
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
      <SidebarTrigger className="w-6 h-3 md:hidden fixed top-1/2" />
    </SidebarProvider>
  );
}
