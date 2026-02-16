import { LessonWithTasks } from "@/types/course/course";
import { create } from "zustand";
export type Step = "theory" | "task";
interface LessonState {
  lesson: LessonWithTasks | null;
  setLesson: (lesson: LessonWithTasks) => void;
  step: Step;
  setStep: (step: Step) => void;
  taskIndex: number;
  setTaskIndex: (index: number) => void;
  setAnswer: (taskId: number, answerId: number) => void;
}

export const useLessonStore = create<LessonState>((set) => ({
  lesson: null,
  step: "theory",
  taskIndex: 0,
  setLesson: (lesson) => set({ lesson }),
  setStep: (step) => set({ step }),
  setTaskIndex: (index) => set({ taskIndex: index }),
  setAnswer: (taskId, answerId) =>
    set((state) => {
      if (!state.lesson) return state;
      const tasks = state.lesson.tasks.map((t) =>
        t.id === taskId ? { ...t, choosedAnswer: answerId } : t,
      );
      return { lesson: { ...state.lesson, tasks } };
    }),
}));
