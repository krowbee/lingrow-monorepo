import { ApiResult } from "@/types/api/api-result.type";
import { API_URL } from "../constants";
import { fetchToApi } from "../fetchWithRefresh";
import { LessonProgress } from "@/types/course/course";

export async function getLessonProgress(
  courseSlug: string,
): Promise<ApiResult<LessonProgress[]>> {
  const res = await fetchToApi(API_URL + `/progress/course/${courseSlug}`);
  const data = await res.json();
  if (!res.ok) {
    return { ok: false, error: data.message };
  }
  return { ok: true, data };
}
