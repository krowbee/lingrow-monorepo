import { fetchToApi } from "../../fetchWithRefresh";
import { API_URL } from "../../constants";
import { ApiResult } from "@/types/api/api-result.type";
import { Course } from "@/types/course/course";
import { CreateCourseFormData } from "@/schemas/add-course.schema";
import { UpdateCourseFormData } from "@/schemas/update-course.schema";

export async function createCourse(
  course: CreateCourseFormData,
): Promise<ApiResult<Course>> {
  const res = await fetchToApi(API_URL + "/course", {
    method: "POST",
    body: JSON.stringify(course),
  });
  const data = await res.json();
  if (!res.ok) {
    return { ok: false, error: data.message };
  }
  return { ok: true, data: data.course };
}

export async function updateCourse(
  courseId: number,
  updateFormData: UpdateCourseFormData,
): Promise<ApiResult<Course>> {
  const body = Object.fromEntries(
    Object.entries(updateFormData).filter(([, v]) => v !== undefined),
  );
  const res = await fetchToApi(API_URL + `/course/${courseId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    return { ok: false, error: data.message };
  }
  return { ok: true, data: data.course };
}

export async function deleteCourse(
  courseId: number,
): Promise<ApiResult<Course>> {
  const res = await fetchToApi(API_URL + `/course/${courseId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) {
    return { ok: false, error: data.message };
  }
  return { ok: true, data: data.course };
}
