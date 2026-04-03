"use client";
import { ProgressWithLabel } from "@/components/ProgressWithLabel";
import { LessonWithProgress } from "@/types/course/course";
import { useMemo } from "react";

export function ProgressBar({ lessons }: { lessons: LessonWithProgress[] }) {
  const progress = useMemo(() => {
    const finished = lessons.filter((lesson) => lesson.isCompleted);
    return (finished.length / lessons.length) * 100;
  }, [lessons]);

  return <ProgressWithLabel value={progress} label="Прогрес курсу" />;
}
