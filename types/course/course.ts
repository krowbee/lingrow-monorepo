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

export type LessonWithTasks = {
  id: number;
  name: string;
  theory: string;
  slug: string;
  tasks: TaskWithAnswers[];
  order: number;
};

export type TaskWithAnswers = {
  id: number;
  question: string;
  soundUrl?: string;
  answers: Answer[];
  lessonId: number;
  order: number;
  isCompleted: boolean;
};

export type Answer = {
  id: number;
  text: string;
  taskId: number;
};
