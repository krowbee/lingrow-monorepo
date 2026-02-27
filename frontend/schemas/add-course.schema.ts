import z from "zod";

export const createCourseSchema = z.object({
  name: z.string().min(1, "Назва обов'язкова").max(80, "Занадто довга назва"),
  slug: z
    .string()
    .min(1, "Slug обов'язковий")
    .max(50, "Slug занадто довгий")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug може містити лише англійські букви, цифри, та дефіси",
    ),
  description: z.string().min(1, "Опис обов'язковий"),
});

export type CreateCourseFormData = z.infer<typeof createCourseSchema>;
