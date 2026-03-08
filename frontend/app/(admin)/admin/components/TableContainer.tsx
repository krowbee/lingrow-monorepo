"use client";
import { Course } from "@/types/course/course";
import { useState } from "react";
import { CoursesTable } from "./CoursesTable";
import { LessonsTable } from "./LessonsTable";

export function TableContainer() {
  const [choosedCourse, setChoosedCourse] = useState<Course | null>(null);
  return (
    <div className="w-full flex">
      <CoursesTable setChoosedCourse={setChoosedCourse} />
      <LessonsTable choosedCourse={choosedCourse} />
    </div>
  );
}
