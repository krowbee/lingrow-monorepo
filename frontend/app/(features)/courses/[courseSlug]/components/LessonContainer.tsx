/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getLessonProgress } from "@/lib/api/requests/courses.client.requests";
import { Lesson, LessonWithProgress } from "@/types/course/course";
import { useEffect, useState } from "react";
import { LessonCard } from "./LessonCard";

export function LessonsContainer({
  initialLessons,
  courseSlug,
}: {
  initialLessons: Lesson[];
  courseSlug: string;
}) {
  const [updatedLessons, setUpdatedLessons] = useState<LessonWithProgress[]>(
    initialLessons.map((l) => ({ ...l, isCompleted: false })),
  );

  useEffect(() => {
    const updateLessons = async () => {
      const result = await getLessonProgress(courseSlug);
      if (!result.ok) {
        return;
      }
      const lessonWithProgress = updatedLessons.map((lesson) => ({
        ...lesson,
        isCompleted:
          result.data.find((p) => p.lessonId === lesson.id)?.isCompleted ||
          false,
      }));
      setUpdatedLessons(lessonWithProgress);
    };

    updateLessons();
  }, []);

  return (
    <div className="lessons-container h-min flex flex-wrap w-full gap-4 justify-start py-4">
      {updatedLessons.map((lesson: LessonWithProgress) => (
        <LessonCard key={lesson.id} lesson={lesson} courseSlug={courseSlug} />
      ))}
    </div>
  );
}
