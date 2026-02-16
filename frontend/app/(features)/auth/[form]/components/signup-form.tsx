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
} from "../../../../../components/schemas/authSchemas";
import { ErrorMessage } from "../../../../../components/ui/error-message";
import { AUTH_URLS } from "@/urls/auth";
import { registerOnServer } from "@/lib/api/requests/auth.requests";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";

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
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    const result = await registerOnServer(data);
    if (!result.ok) {
      setError("root", { message: result.error });
      return;
    }
    login(result.data);
    router.push("/courses");
  };

  return (
    <Card
      {...props}
      className="rounded-none md:rounded-xl border-none bg-neutral-800 h-full md:h-min justify-center"
    >
      <CardHeader>
        <CardTitle className="text-white font-heading">
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
              <div className="flex flex-row justify-between w-full">
                <FieldLabel htmlFor="name" className="text-white font-heading">
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
                    className="text-white border-purple-500"
                    {...field}
                  />
                )}
              />
            </Field>
            <Field>
              <div className="flex flex-row justify-between w-full">
                <FieldLabel htmlFor="email" className="text-white font-heading">
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
                    className="text-white border-purple-500"
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
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
                className="text-white font-heading"
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
                    className="text-white border-purple-500"
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
                <Button type="submit" className="cursor-pointer">
                  Створити обліковий запис
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="text-white bg-neutral-900 cursor-pointer"
                >
                  Зареєструватись з Google
                </Button>
                <FieldDescription className="px-6 text-center font-body">
                  Вже є обліковий запис?{" "}
                  <Link
                    href={AUTH_URLS.login}
                    className="!text-white hover:!text-purple-300 transition-colors duration-200 font-accent"
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
