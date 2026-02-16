import { Lesson } from "@/types/course/course";

export interface LessonsSlice {
  courseLessons: Lesson[];
  choosedLesson: Lesson | null;
  isLoadingLessons: boolean;
  chooseLesson: (lesson: Lesson) => void;
  fetchLessons: (courseSlug: string) => Promise<void>;
  addLesson: (lesson: Partial<Lesson>) => Promise<void>;
  deleteLesson: (lessonId: number) => Promise<void>;
}
