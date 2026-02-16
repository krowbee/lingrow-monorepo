import { z } from "zod";

export type LoginFormData = z.infer<typeof LoginSchema>;

export const LoginSchema = z.object({
  email: z.email("Введіть будь ласка дійсний email"),
  password: z
    .string()
    .min(6, "Пароль повинен містити не менше ніж 6 символів")
    .max(20, "Пароль занадто великий"),
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;

export const RegisterSchema = z.object({
  name: z.string().nonempty("Вкажіть ваше ім'я"),
  email: z.email("Введіть будь ласка дійсний email"),
  password: z
    .string()
    .min(6, "Пароль повинен містити не менше ніж 6 символів")
    .max(20, "Пароль занадто великий"),
});
