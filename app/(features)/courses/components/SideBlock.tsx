import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ProfileBlock } from "./ProfileBlock";
import { CoursesAndLevelsSide } from "./CoursesAndLevelsSide";

export function SideBlock() {
  return (
    <SidebarProvider>
      <Sidebar className="py-4">
        <SidebarHeader className="p-0">
          <div className="w-full text-center text-xl font-heading font-bold">
            Доступні курси
          </div>
        </SidebarHeader>
        <SidebarContent>
          <CoursesAndLevelsSide />
        </SidebarContent>
        <SidebarFooter>
          <ProfileBlock />
        </SidebarFooter>
      </Sidebar>
      <SidebarTrigger className="w-15 h-10" />
    </SidebarProvider>
  );
}
