import {
  addCourse,
  deleteCourse,
  updateCourse,
} from "@/lib/api/requests/admin.requests";
import { getCoursesList } from "@/lib/api/requests/courses.client.requests";
import { CreateCourseFormData } from "@/schemas/add-course.schema";
import { UpdateCourseFormData } from "@/schemas/update-course.schema";
import { Course } from "@/types/course/course";
import { StateCreator } from "zustand";

export interface CourseSlice {
  coursesList: Course[];
  currentCourse: Course | null;
  isLoadingCourses: boolean;
  chooseCourse: (course: Course) => void;
  fetchCourses: () => Promise<void>;
  addCourse: (course: CreateCourseFormData) => Promise<void>;
  updateCourse: (
    courseId: number,
    updateFormData: UpdateCourseFormData,
  ) => Promise<void>;
  deleteCourse: (courseId: number) => Promise<void>;
  errorMessage: string | null;
}

export const createCourseSlice: StateCreator<CourseSlice> = (set) => ({
  coursesList: [],
  currentCourse: null,
  isLoadingCourses: false,
  errorMessage: null,
  fetchCourses: async () => {
    set({ isLoadingCourses: true, errorMessage: null });
    try {
      const result = await getCoursesList();
      if (!result.ok) {
        set({ errorMessage: result.error });
        return;
      }
      set({ coursesList: result.data });
    } catch {
      set({ errorMessage: "Невідома помилка" });
    } finally {
      set({ isLoadingCourses: false });
    }
  },
  chooseCourse: (course: Course) => set({ currentCourse: course }),
  addCourse: async (course: CreateCourseFormData) => {
    set({ isLoadingCourses: true, errorMessage: null });
    try {
      const result = await addCourse(course);
      if (!result.ok) {
        set({ errorMessage: result.error });
        return;
      }
      set((state) => ({
        coursesList: [...state.coursesList, result.data],
      }));
    } catch {
      set({ errorMessage: "Невідома помилка" });
    } finally {
      set({ isLoadingCourses: false });
    }
  },
  deleteCourse: async (courseId: number) => {
    set({ isLoadingCourses: true, errorMessage: null });
    try {
      const result = await deleteCourse(courseId);
      if (!result.ok) {
        set({ errorMessage: result.error });
        return;
      }
      set((state) => ({
        coursesList: state.coursesList.filter(
          (course) => course.id !== courseId,
        ),
      }));
    } catch {
      set({ errorMessage: "Невідома помилка" });
    } finally {
      set({ isLoadingCourses: false });
    }
  },
  updateCourse: async (
    courseId: number,
    updateFormData: UpdateCourseFormData,
  ) => {
    set({ isLoadingCourses: true, errorMessage: null });
    try {
      const result = await updateCourse(courseId, updateFormData);
      if (!result.ok) {
        set({ errorMessage: result.error });
        return;
      }
      set((state) => ({
        coursesList: state.coursesList.map((course) =>
          course.id === courseId ? result.data : course,
        ),
      }));
    } catch {
      set({ errorMessage: "Невідома помилка" });
    } finally {
      set({ isLoadingCourses: false });
    }
  },
});
