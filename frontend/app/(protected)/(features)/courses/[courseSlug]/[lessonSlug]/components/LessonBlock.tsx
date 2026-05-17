"use client";
import { useQuery } from "@tanstack/react-query";
import { TheoryBlock, TheoryBlockSkeleton } from "./TheoryBlock";
import { getLessonWithProgress } from "@/lib/api/requests/courses.client.requests";
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
  const step = useLessonStore((state) => state.step);
  const taskIndex = useLessonStore((state) => state.taskIndex);
  const router = useRouter();

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", lessonSlug],
    queryFn: async () => {
      const result = await getLessonWithProgress(lessonSlug);
      if (!result.ok) {
        throw new Error("Failed to fetch lesson");
      }
      return result.data;
    },
  });

  const finishLesson = () => {
    router.push(`${COURSES_URL.courses_page}/${courseSlug}`);
  };
  const backToLessons = () => {
    router.push(`${COURSES_URL.courses_page}/${courseSlug}`);
  };

  return (
    <div className="lesson-container items-between flex h-full w-full flex-col justify-between gap-4 p-4">
      {isLoading ? (
        <TheoryBlockSkeleton />
      ) : (
        lesson &&
        step === "theory" && (
          <TheoryBlock lessonName={lesson.name} theory={lesson.theory} />
        )
      )}
      {lesson && step === "task" && (
        <TaskBlock task={lesson.tasks[taskIndex]}></TaskBlock>
      )}
      {lesson && (
        <div className="footer">
          <LessonNavigation
            tasks={lesson.tasks}
            finishLesson={finishLesson}
            backToLessons={backToLessons}
          />
        </div>
      )}
    </div>
  );
}
