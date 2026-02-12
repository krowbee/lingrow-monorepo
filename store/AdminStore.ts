import { Course } from "@/types/course/course";
import { create } from "zustand";

interface AdminStore {
  currentCourse: Course | null;
  chooseCourse: (currentCourse: Course) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  currentCourse: null,
  chooseCourse: (currentCourse: Course) => set({ currentCourse }),
}));
