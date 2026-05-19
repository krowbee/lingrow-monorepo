import { ApiResult } from "@/types/api/api-result.type";
import { API_URL } from "../constants";
import { fetchToApi } from "../fetchWithRefresh";
import {
  Course,
  Lesson,
  LessonProgress,
  LessonWithTasks,
  TaskProgress,
} from "@/types/course/course";
import { StatusType } from "@/types/filterType";

export async function getCoursesList(
  courseStatus?: StatusType,
  search?: string,
): Promise<ApiResult<Course[]>> {
  const params = new URLSearchParams();
  if (courseStatus) {
    params.append("status", courseStatus);
  }
  if (search) {
    params.append("search", search);
  }
  const res = await fetchToApi(API_URL + `/course?${params.toString()}`, {
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok) {
    return { ok: false, error: json.message };
  }
  return { ok: true, data: json.courses };
}

export async function getLessonsList(
  courseSlug: string,
): Promise<ApiResult<Lesson[]>> {
  const res = await fetchToApi(API_URL + `/course/${courseSlug}/lessons`, {
    cache: "no-store",
  });

  const json = await res.json();
  if (!res.ok) {
    return { ok: false, error: json.message };
  }
  return { ok: true, data: json.lessons };
}

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

export async function getLessonWithProgress(
  lessonSlug: string,
): Promise<ApiResult<LessonWithTasks>> {
  const [lessonRes, progressRes] = await Promise.all([
    fetchToApi(API_URL + `/lessons/${lessonSlug}`, {
      cache: "no-store",
    }),
    fetchToApi(API_URL + `/progress/lesson/${lessonSlug}`, {
      cache: "no-store",
    }),
  ]);

  const lessonData = await lessonRes.json();
  const progressData = await progressRes.json();

  if (!lessonRes.ok) {
    return { ok: false, error: lessonData.message };
  }

  if (!progressRes.ok) {
    return { ok: false, error: progressData.message };
  }

  const lesson: LessonWithTasks = lessonData.lesson;

  const progressByTaskId = new Map<number, TaskProgress>(
    progressData.map((progress: TaskProgress) => [progress.taskId, progress]),
  );

  const lessonWithProgress: LessonWithTasks = {
    ...lesson,
    tasks: lesson.tasks.map((task) => {
      const progress = progressByTaskId.get(task.id);

      return {
        ...task,
        choosedAnswer: progress?.answerId ?? null,
        progressId: progress?.id ?? null,
        isCorrect: progress?.isCorrect ?? null,
      };
    }),
  };

  return { ok: true, data: lessonWithProgress };
}

export async function getTaskProgress(
  lessonSlug: string,
): Promise<ApiResult<TaskProgress[]>> {
  const res = await fetchToApi(API_URL + `/progress/lesson/${lessonSlug}`, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    return { ok: false, error: data.message };
  }

  return { ok: true, data };
}

export async function updateTaskProgress(
  taskId: number,
  answerId: number,
  hasProgress: boolean,
) {
  console.log("Updating task progress", { taskId, answerId, hasProgress });
  const url = hasProgress
    ? `${API_URL}/progress/${taskId}`
    : `${API_URL}/progress`;
  const res = await fetchToApi(url, {
    method: hasProgress ? "PATCH" : "POST",
    body: JSON.stringify({
      ...(hasProgress ? {} : { taskId }),
      answerId,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    return { ok: false, error: data.message };
  }
  return { ok: true, data };
}
