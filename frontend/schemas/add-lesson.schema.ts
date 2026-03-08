import z from "zod";

export const createLessonSchema = z.object({
  name: z.string().min(1, "Назва обов'язкова").max(80, "Занадто довга назва"),
  slug: z
    .string()
    .min(1, "Slug обов'язковий")
    .max(50, "Slug занадто довгий")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug може містити лише англійські букви, цифри, та дефіси",
    ),
  order: z.number().min(1, "Порядок не може бути меньшим за 1"),
});

export type CreateLessonFormData = z.infer<typeof createLessonSchema>;
