import { UpdateLessonFormData } from "../../../../schemas/update-lesson.schema";
import { CreateLessonFormData } from "@/schemas/add-lesson.schema";
import { fetchToApi } from "../../fetchWithRefresh";
import { API_URL } from "../../constants";
import { ApiResult } from "@/types/api/api-result.type";
import { Lesson } from "@/types/course/course";

export async function createLesson(
  courseId: number,
  formData: CreateLessonFormData,
): Promise<ApiResult<Lesson>> {
  const res = await fetchToApi(API_URL + "/lessons", {
    method: "POST",
    body: JSON.stringify({ ...formData, courseId }),
  });
  const data = await res.json();
  if (!res.ok) {
    return { ok: false, error: data.message };
  }
  return { ok: true, data };
}
// TODO: Update Lesson function
export async function updateLesson(
  data: UpdateLessonFormData,
  lessonId?: number,
) {}
export async function deleteLessen() {}
