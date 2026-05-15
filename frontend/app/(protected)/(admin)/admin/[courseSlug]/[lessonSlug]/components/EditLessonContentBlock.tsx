"use client";

import { LessonWithTasks } from "@/types/course/course";
import { useEffect, useState } from "react";
import { TheoryBlock } from "./EditTheoryBlock";
import { getLessonWithProgress } from "@/lib/api/requests/courses.client.requests";

export function EditLessonContentBlock({ lessonSlug }: { lessonSlug: string }) {
  const [lesson, setLesson] = useState<LessonWithTasks | null>(null);

  useEffect(() => {
    const getData = async () => {
      const result = await getLessonWithProgress(lessonSlug);
      if (!result.ok) {
        return;
      }
      setLesson(result.data);
    };
    getData();
  }, [lessonSlug]);
  if (!lesson) return;
  return <TheoryBlock lessonName={lesson.name} theory={lesson.theory} />;
}
