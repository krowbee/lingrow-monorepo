import { Course, Lesson } from "@/types/course/course";
import { create } from "zustand";

interface OpenMenuPayload {
  entity: "course" | "lesson";
  action: "create" | "edit";
  id?: number;
}

interface AdminStore {
  errorMessage: string | null;
  setErrorMessage: (message: string) => void;
  openMenu: null | OpenMenuPayload;
  openForm: (payload: OpenMenuPayload) => void;
  closeForm: () => void;
  choosedEditCourse: Course | null;
  setEditCourse: (course: Course) => void;
  choosedEditLesson: Lesson | null;
  setEditLesson: (lesson: Lesson) => void;
}

export const useAdminStore = create<AdminStore>()((set) => ({
  choosedEditCourse: null,
  choosedEditLesson: null,
  errorMessage: null,
  openMenu: null,
  setErrorMessage: (message: string) => {
    try {
      set({ errorMessage: message });
    } finally {
      setTimeout(() => {
        set({ errorMessage: null });
      }, 3000);
    }
  },
  openForm: (payload: OpenMenuPayload) => set({ openMenu: payload }),
  closeForm: () =>
    set({ openMenu: null, choosedEditCourse: null, choosedEditLesson: null }),
  setEditCourse: (course: Course | null) => set({ choosedEditCourse: course }),
  setEditLesson: (lesson: Lesson | null) => set({ choosedEditLesson: lesson }),
}));
