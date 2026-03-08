import { useAdminStore } from "@/store/AdminStore";

export function AddLessonButton() {
  const openForm = useAdminStore((state) => state.openForm);
  const openAddCourseForm = () => {
    openForm({ entity: "lesson", action: "create" });
  };
  return (
    <button
      className="font-accent flex cursor-pointer text-secondary hover:text-primary transition-colours duration-300 rounded-full border hover:border-primary px-2"
      onClick={() => openAddCourseForm()}
    >
      +
    </button>
  );
}
