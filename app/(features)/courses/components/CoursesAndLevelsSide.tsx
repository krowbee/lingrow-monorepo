import { SidebarGroup } from "@/components/ui/sidebar";

export function CoursesAndLevelsSide() {
  return (
    <SidebarGroup className="p-0 gap-2">
      <div className="w-full flex flex-col shadow-sm py-2 px-4 hover:cursor-pointer">
        <h3 className="text-md font-body">English learning A1</h3>
        <p>0/127</p>
      </div>
      <div className="w-full flex flex-col shadow-sm py-2 px-4 hover:cursor-pointer">
        <h3 className="text-md font-body">English learning A1</h3>
        <p>0/127</p>
      </div>
    </SidebarGroup>
  );
}
