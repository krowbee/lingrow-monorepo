"use client";
import { useEffect } from "react";
import { TheoryBlock } from "./TheoryBlock";
import { getLessonWithProgress } from "@/lib/api/requests/courses.client.requests";
import { Spinner } from "@/components/ui/spinner";
import { TaskBlock } from "./TaskBlock";
import { LessonNavigation } from "./LessonNavigation";
import { useLessonStore } from "@/store/LessonStore";
import { useRouter } from "next/navigation";
import { COURSES_URL } from "@/urls/courses";

export type Step = "theory" | "task";
export function LessonBlock({
  lessonSlug,
  courseSlug,
}: {
  lessonSlug: string;
  courseSlug: string;
}) {
  const setLesson = useLessonStore((state) => state.setLesson);
  const lesson = useLessonStore((state) => state.lesson);
  const step = useLessonStore((state) => state.step);
  const taskIndex = useLessonStore((state) => state.taskIndex);
  const router = useRouter();
  const finishLesson = () => {
    router.push(`${COURSES_URL.courses_page}/${courseSlug}`);
  };
  const backToLessons = () => {
    router.push(`${COURSES_URL.courses_page}/${courseSlug}`);
  };
  useEffect(() => {
    const getLesson = async () => {
      const result = await getLessonWithProgress(lessonSlug);
      if (!result.ok) {
        return;
      }
      console.log(result.data);
      setLesson(result.data);
    };
    getLesson();
  }, [lessonSlug, setLesson]);

  if (!lesson)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner></Spinner>
      </div>
    );

  return (
    <div className="lesson-container w-full flex flex-col justify-center gap-4 p-4">
      {step === "theory" && (
        <TheoryBlock lessonName={lesson.name} theory={lesson.theory} />
      )}
      {step === "task" && (
        <TaskBlock task={lesson.tasks[taskIndex]}></TaskBlock>
      )}
      <LessonNavigation
        tasks={lesson.tasks}
        finishLesson={finishLesson}
        backToLessons={backToLessons}
      />
    </div>
  );
}
