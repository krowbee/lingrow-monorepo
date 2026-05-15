import { useAdminStore } from "@/store/AdminStore";

export function AddLessonButton() {
  const openForm = useAdminStore((state) => state.openForm);
  const openAddCourseForm = () => {
    openForm({ entity: "lesson", action: "create" });
  };
  return (
    <button
      className="font-accent text-secondary hover:text-primary transition-colours hover:border-primary flex cursor-pointer rounded-full border px-2 duration-300"
      onClick={() => openAddCourseForm()}
    >
      +
    </button>
  );
}
