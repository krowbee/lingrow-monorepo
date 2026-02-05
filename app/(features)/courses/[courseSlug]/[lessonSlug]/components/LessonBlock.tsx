"use client";
import { useEffect, useState } from "react";
import { TheoryBlock } from "./TheoryBlock";
import { getLessonWithProgress } from "@/lib/api/requests/courses.client.requests";
import { LessonWithTasks } from "@/types/course/course";

export function LessonBlock({ lessonSlug }: { lessonSlug: string }) {
  const [lesson, setLesson] = useState<LessonWithTasks>();

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
  }, [lessonSlug]);
  return (
    <div className="lesson-container w-full flex justify-center">
      {lesson && <TheoryBlock theory={lesson?.theory} />}
    </div>
  );
}
