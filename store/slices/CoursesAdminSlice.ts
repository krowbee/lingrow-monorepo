import { Course } from "@/types/course/course";

export interface CourseSlice {
  coursesList: Course[];
  currentCourse: Course | null;
  isLoadingCourses: boolean;
  chooseCourse: (course: Course) => void;
  fetchCourses: () => Promise<void>;
  addCourse: (course: Partial<Course>) => Promise<void>;
  deleteCourse: (courseId: number) => Promise<void>;
}
