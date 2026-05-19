import { DeleteIcon, Edit2Icon } from "lucide-react";
import { Course } from "../../../../../types/course/course";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const courseStatus: Record<string, { text: string; color: string }> = {
  PUBLISHED: { text: "Опубліковано", color: "bg-green-500" },
  DRAFT: { text: "Чернетка", color: "bg-yellow-400" },
  ARCHIVED: { text: "Архівований", color: "bg-gray-500" },
};

export function CourseTableBlock({ course }: { course: Course }) {
  return (
    <>
      <tr className="border-b border-white/10">
        <td className="px-4 py-3">
          <div className="flex items-center gap-4">
            <Image
              className="h-11 w-11 shrink-0 rounded-lg bg-white/10"
              src="/course_card.png"
              alt="Course Image"
              width={1536}
              height={1024}
            />

            <div className="min-w-0">
              <h2 className="font-heading text-xl leading-4 tracking-tight">
                {course.name}
              </h2>
              <p className="font-body text-md max-w-sm truncate text-gray-400">
                {course.description}
              </p>
            </div>
          </div>
        </td>

        <td className="px-4 py-3 text-center">
          <span className="font-body text-lg">17</span>
        </td>

        <td className="px-4 py-3">
          <div className="flex w-min flex-row items-center gap-2 rounded-2xl border border-white/10 px-4 py-1">
            <div
              className={`h-4 w-4 rounded-full ${courseStatus[course.status].color}`}
            />
            <span>{courseStatus[course.status].text}</span>
          </div>
        </td>

        <td className="px-4 py-3">
          <div className="flex justify-end gap-2">
            <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-orange-400 p-2">
              <Edit2Icon />
            </button>
            <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-red-500 p-2">
              <DeleteIcon />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export function CourseTableBlockSkeleton() {
  return (
    <>
      <tr className="border-b border-white/10">
        <td className="px-4 py-3">
          <div className="flex items-center gap-4">
            <Skeleton className="h-11 w-11 shrink-0 rounded-lg" />

            <div className="min-w-0">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="mt-2 h-3 w-48 rounded" />
            </div>
          </div>
        </td>

        <td className="px-4 py-3 text-center">
          <Skeleton className="mx-auto h-4 w-8 rounded" />
        </td>

        <td className="px-4 py-3">
          <div className="flex w-min flex-row items-center gap-2 rounded-2xl border border-white/10 px-4 py-1">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-16 rounded" />
          </div>
        </td>

        <td className="px-4 py-3">
          <div className="flex justify-end gap-2">
            <Skeleton className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 p-2" />
            <Skeleton className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 p-2" />
          </div>
        </td>
      </tr>
    </>
  );
}
