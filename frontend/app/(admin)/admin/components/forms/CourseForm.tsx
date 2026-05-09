"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components/ui/error-message";
import { createCourseSchema } from "@/schemas/add-course.schema";
import { updateCourseSchema } from "@/schemas/update-course.schema";
import { useAdminStore } from "@/store/AdminStore";
import { CreateCourseFormData } from "../../../../../schemas/add-course.schema";
import { UpdateCourseFormData } from "../../../../../schemas/update-course.schema";
import { createCourse } from "@/lib/api/requests/admin/admin.course.requests";

//TODO: Add course update

export function CourseForm({
  mode,
  courseId,
  onClose,
}: {
  mode: "create" | "edit";
  courseId?: number;
  onClose: () => void;
}) {
  const choosedEditCourse = useAdminStore((state) => state.choosedEditCourse);
  const schema = mode === "create" ? createCourseSchema : updateCourseSchema;
  const closeForm = useAdminStore((state) => state.closeForm);
  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateCourseFormData | UpdateCourseFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: choosedEditCourse?.name ?? "",
      description: choosedEditCourse?.description ?? "",
      slug: choosedEditCourse?.slug ?? "",
    },
  });

  const onSave = async (
    formData: CreateCourseFormData | UpdateCourseFormData,
  ) => {
    const parsed = createCourseSchema.safeParse(formData);
    if (parsed.success) {
      const data = parsed.data;
      const result = await createCourse(data);
      if (!result.ok) {
        setError("root", { message: result.error });
      }
      onClose();
      closeForm();
    }
  };

  return (
    <div className={"flex h-full min-w-[350px] flex-col justify-center gap-6"}>
      <Card className="h-full justify-center rounded-none border-none bg-neutral-800 md:h-min md:rounded-xl">
        <CardHeader>
          <CardTitle className="font-heading text-white"></CardTitle>
          <CardDescription className="font-body">
            Заповніть дані курсу. Slug має бути латиницею, цифрами та дефісами.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form noValidate onSubmit={handleSubmit(onSave)}>
            <FieldGroup>
              <Field>
                <div className="flex w-full flex-row items-center justify-between gap-3">
                  <FieldLabel
                    htmlFor="name"
                    className="font-heading text-white"
                  >
                    Назва
                  </FieldLabel>
                  {errors.name && (
                    <ErrorMessage
                      message={errors.name.message as string | undefined}
                    />
                  )}
                </div>

                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      id="name"
                      placeholder="Напр. Frontend з нуля"
                      className="font-body border-purple-500 text-white placeholder:text-neutral-400 focus-visible:ring-purple-500/30"
                      {...field}
                    />
                  )}
                />

                <FieldDescription className="font-body">
                  До 80 символів.
                </FieldDescription>
              </Field>

              <Field>
                <div className="flex w-full flex-row items-center justify-between gap-3">
                  <FieldLabel
                    htmlFor="slug"
                    className="font-heading text-white"
                  >
                    Slug
                  </FieldLabel>
                  {errors.slug && (
                    <ErrorMessage
                      message={errors.slug.message as string | undefined}
                    />
                  )}
                </div>

                <div className="relative">
                  <Controller
                    control={control}
                    name="slug"
                    render={({ field }) => (
                      <Input
                        id="slug"
                        placeholder="frontend-z-nulya"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        className="font-body border-purple-500 text-white placeholder:text-neutral-400 focus-visible:ring-purple-500/30"
                        {...field}
                      />
                    )}
                  />
                </div>

                <FieldDescription className="font-body">
                  Тільки <span className="text-neutral-200">a-z</span>,{" "}
                  <span className="text-neutral-200">0-9</span> та{" "}
                  <span className="text-neutral-200">-</span>. До 50 символів.
                </FieldDescription>
              </Field>
              <Field>
                <div className="flex w-full flex-row items-center justify-between gap-3">
                  <FieldLabel
                    htmlFor="description"
                    className="font-heading text-white"
                  >
                    Опис
                  </FieldLabel>
                  {errors.description && (
                    <ErrorMessage
                      message={errors.description.message as string | undefined}
                    />
                  )}
                </div>

                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <Textarea
                      id="description"
                      placeholder="Коротко опишіть що буде в курсі, для кого він і який результат…"
                      rows={6}
                      className="font-body resize-none border-purple-500 text-white placeholder:text-neutral-400 focus-visible:ring-purple-500/30"
                      {...field}
                    />
                  )}
                />

                <FieldDescription className="font-body">
                  Мінімум 1 символ (обовʼязково).
                </FieldDescription>
              </Field>

              {errors.root && (
                <ErrorMessage
                  message={errors.root.message as string | undefined}
                />
              )}

              <Field>
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="cursor-pointer">
                    Зберегти
                  </Button>

                  <Button
                    variant="outline"
                    type="button"
                    className="cursor-pointer"
                    onClick={() => closeForm()}
                  >
                    Скасувати
                  </Button>

                  <FieldDescription className="font-body text-center">
                    Після створення ви зможете додати уроки та матеріали.
                  </FieldDescription>
                </div>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
