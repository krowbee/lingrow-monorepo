import z from "zod";
import { createCourseSchema } from "./add-course.schema";

export const updateCourseSchema = createCourseSchema.partial();
export type UpdateCourseFormData = z.infer<typeof updateCourseSchema>;
