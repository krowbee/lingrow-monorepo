import { ApiResult } from "@/types/api/api-result.type";
import { API_URL } from "../constants";
import { Course, Lesson } from "@/types/course/course";
import { Status } from "@/types/filterType";

export async function getStaticCoursesList(): Promise<ApiResult<Course[]>> {
  const res = await fetch(API_URL + `/course?status=${Status.PUBLISHED}`);
  const json = await res.json();
  if (!res.ok) {
    return { ok: false, error: json.message };
  }
  return { ok: true, data: json.courses };
}

export async function getStaticLessonsList(
  courseSlug: string,
): Promise<ApiResult<Lesson[]>> {
  const res = await fetch(API_URL + `/course/${courseSlug}/lessons`, {
    credentials: "include",
  });
  const json = await res.json();
  if (!res.ok) {
    return { ok: false, error: json.message };
  }
  return { ok: true, data: json.lessons };
}
