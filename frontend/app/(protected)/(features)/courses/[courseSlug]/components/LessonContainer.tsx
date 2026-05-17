"use client";
import { getLessonProgress } from "@/lib/api/requests/courses.client.requests";
import {
  Lesson,
  LessonProgress,
  LessonWithProgress,
} from "@/types/course/course";
import { ApiResult } from "@/types/api/api-result.type";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { LessonCard, LessonCardSkeleton } from "./LessonCard";
import { ProgressBar } from "./ProgressBar";

export function LessonsContainer({
  initialLessons,
  courseSlug,
}: {
  initialLessons: Lesson[];
  courseSlug: string;
}) {
  const { data: progressResult, isPending } = useQuery<
    ApiResult<LessonProgress[]>
  >({
    queryKey: ["lesson-progress", courseSlug],
    queryFn: () => getLessonProgress(courseSlug),
    enabled: Boolean(courseSlug),
    staleTime: 5 * 60 * 1000,
  });

  const updatedLessons = useMemo<LessonWithProgress[]>(
    () =>
      initialLessons.map((lesson) => ({
        ...lesson,
        isCompleted: progressResult?.ok
          ? (progressResult.data.find((p) => p.lessonId === lesson.id)
              ?.isCompleted ?? false)
          : false,
      })),
    [initialLessons, progressResult],
  );

  return (
    <>
      <ProgressBar lessons={updatedLessons} />
      <div className="lessons-container flex w-full flex-row flex-wrap items-center justify-center gap-4 xl:justify-start">
        {isPending
          ? Array(6)
              .fill(0)
              .map((_, i) => <LessonCardSkeleton key={i} />)
          : updatedLessons.map((lesson: LessonWithProgress) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                courseSlug={courseSlug}
              />
            ))}
      </div>
    </>
  );
}
