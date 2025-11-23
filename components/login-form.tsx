"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
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
import { LoginFormData, LoginSchema } from "./schemas/authSchemas";
import { ErrorMessage } from "./ui/error-message";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data);
  };

  return (
    <div className={cn("flex flex-col gap-6 h-full", className)} {...props}>
      <Card className="rounded-none md:rounded-xl border-none bg-neutral-800 h-full justify-center">
        <CardHeader>
          <CardTitle className="text-white font-heading">
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
                <div className="flex flex-row justify-between w-full">
                  <FieldLabel
                    htmlFor="email"
                    className="text-white font-heading"
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
                      className="text-white font-body border-purple-500"
                      {...field}
                    />
                  )}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel
                    htmlFor="password"
                    className="text-white font-heading"
                  >
                    Пароль
                  </FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm !text-white font-accent underline-offset-4 hover:!underline"
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
                      className="text-white font-body border-purple-500"
                      {...field}
                    />
                  )}
                />
              </Field>
              {errors.password && (
                <ErrorMessage message={errors.password.message} />
              )}
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
                    href="/signup"
                    className="!text-white hover:!text-purple-300 transition-colors duration-200 font-accent"
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
