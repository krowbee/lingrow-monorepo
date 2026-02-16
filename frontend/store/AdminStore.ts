import { Course, Lesson } from "@/types/course/course";
import { create } from "zustand";

interface AdminStore {
  coursesList: Course[];
  currentCourse: Course | null;
  choosedCourseLessons: Lesson[];
  isLoading: boolean;
  error: string | null;

  // Екшени
  setCoursesList: (courses: Course[]) => void;
  chooseCourse: (course: Course) => void;

  // Асинхронні запити
  fetchCourses: () => Promise<void>;
  fetchLessons: (slug: string) => Promise<void>;
  createNewLesson: (lessonData: Partial<Lesson>) => Promise<void>;
}
