"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import {
  RegisterFormData,
  RegisterSchema,
} from "@/components/schemas/authSchemas";
import { ErrorMessage } from "@/components/ui/error-message";
import { AUTH_URLS } from "@/urls/auth";
import { useRouter } from "next/navigation";
import { useSignup } from "@/hooks/auth/useSignup";
import { COURSES_URL } from "@/urls/courses";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(RegisterSchema),
  });
  const router = useRouter();
  const { mutateAsync: register, isPending } = useSignup();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);
      router.push(COURSES_URL.courses_page);
    } catch (err) {
      setError("root", {
        message: err instanceof Error ? err.message : "Помилка реєстрації",
      });
      return;
    }
  };

  return (
    <Card
      {...props}
      className="h-full justify-center rounded-none border-white/5 md:h-min md:rounded-xl"
    >
      <CardHeader>
        <CardTitle className="font-heading text-white">
          Створити обліковий запис
        </CardTitle>
        <CardDescription className="font-body">
          Вкажіть інформацію нижче, щоб створити обліковий запис
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <div className="flex w-full flex-row justify-between">
                <FieldLabel htmlFor="name" className="font-heading text-white">
                  Повне ім&#39;я
                </FieldLabel>
                {errors.name && <ErrorMessage message={errors.name.message} />}
              </div>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    id="name"
                    type="text"
                    placeholder="Валентин Дмитренко"
                    required
                    autoComplete="name"
                    disabled={isPending}
                    aria-busy={isPending}
                    className="border-purple-500/15 text-white"
                    {...field}
                  />
                )}
              />
            </Field>
            <Field>
              <div className="flex w-full flex-row justify-between">
                <FieldLabel htmlFor="email" className="font-heading text-white">
                  Email
                </FieldLabel>
                {errors.email && (
                  <ErrorMessage message={errors.email.message} />
                )}
              </div>

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    className="border-purple-500/15 text-white"
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    autoComplete="email"
                    disabled={isPending}
                    aria-busy={isPending}
                    {...field}
                  />
                )}
              />

              <FieldDescription className="font-body">
                Ми не поширюємо цю інформацію третім особам.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel
                htmlFor="password"
                className="font-heading text-white"
              >
                Пароль
              </FieldLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    required
                    autoComplete="new-password"
                    disabled={isPending}
                    aria-busy={isPending}
                    className="border-purple-500/15 text-white"
                    {...field}
                  />
                )}
              />
              <FieldDescription className="font-body">
                Мінімальна довжина паролю - 8 символів
              </FieldDescription>
            </Field>

            <FieldGroup>
              {errors.password ? (
                <ErrorMessage message={errors.password?.message} />
              ) : (
                errors.root && <ErrorMessage message={errors.root.message} />
              )}
              <Field>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="cursor-pointer"
                >
                  {isPending
                    ? "Створюємо обліковий запис..."
                    : "Створити обліковий запис"}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  disabled={isPending}
                  className="cursor-pointer bg-neutral-900 text-white"
                >
                  Зареєструватись з Google
                </Button>
                <FieldDescription className="font-body px-6 text-center">
                  Вже є обліковий запис?{" "}
                  <Link
                    href={AUTH_URLS.login}
                    className="font-accent text-white! transition-colors duration-200 hover:text-purple-300!"
                  >
                    Вхід
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
