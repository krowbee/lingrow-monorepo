"use client";

import { useForm, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
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
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, LoginSchema } from "@/components/schemas/authSchemas";
import { ErrorMessage } from "@/components/ui/error-message";
import { AUTH_URLS } from "@/urls/auth";
import { loginOnServer } from "@/lib/api/requests/auth.requests";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });
  const router = useRouter();

  const login = useAuthStore((state) => state.login);

  const onSubmit = async (data: LoginFormData) => {
    const result = await loginOnServer(data);
    if (!result.ok) {
      setError("root", { message: result.error });
      return;
    }
    login(result.data);
    router.push("/courses");
  };

  return (
    <div
      className={cn("flex h-full flex-col justify-center gap-6", className)}
      {...props}
    >
      <Card className="flex h-full flex-col justify-center rounded-none border-white/5 md:h-min md:rounded-xl">
        <CardHeader>
          <CardTitle className="font-heading text-white">
            Вхід в обліковий запис
          </CardTitle>
          <CardDescription className="font-body">
            Введіть ваш email нижче щоб увійти в ваш обліковий запис
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <div className="flex w-full flex-row justify-between">
                  <FieldLabel
                    htmlFor="email"
                    className="font-heading text-white"
                  >
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
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      className="font-body border-purple-500/15 text-white"
                      {...field}
                    />
                  )}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel
                    htmlFor="password"
                    className="font-heading text-white"
                  >
                    Пароль
                  </FieldLabel>
                  <Link
                    href="#"
                    className="font-accent ml-auto inline-block text-sm text-white! underline-offset-4 hover:underline!"
                  >
                    Забули пароль?
                  </Link>
                </div>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="password"
                      type="password"
                      required
                      className="font-body border-purple-500/15 text-white"
                      {...field}
                    />
                  )}
                />
              </Field>
              {errors.password && (
                <ErrorMessage message={errors.password.message} />
              )}
              {errors.root && <ErrorMessage message={errors.root.message} />}
              <Field>
                <Button type="submit" className="cursor-pointer">
                  Увійти
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="cursor-pointer"
                >
                  Увійти з Google
                </Button>
                <FieldDescription className="text-center">
                  Немає облікового запису?{" "}
                  <Link
                    href={AUTH_URLS.signup}
                    className="font-accent text-white! transition-colors duration-200 hover:text-purple-300!"
                  >
                    Зареєструватись
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
