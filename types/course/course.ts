export type Course = {
  id: number;
  slug: string;
  name: string;
  description: string;
};

export type Lesson = {
  id: number;
  name: string;
  slug: string;
  order: number;
};

export type LessonWithProgress = Lesson & { isCompleted: boolean };

export type LessonProgress = {
  lessonId: number;
  isCompleted: boolean;
};
