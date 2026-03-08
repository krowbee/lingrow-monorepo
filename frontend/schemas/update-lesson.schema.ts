import z from "zod";
import { createLessonSchema } from "./add-lesson.schema";

export const updateLessonSchema = createLessonSchema.partial();
export type UpdateLessonFormData = z.infer<typeof updateLessonSchema>;
