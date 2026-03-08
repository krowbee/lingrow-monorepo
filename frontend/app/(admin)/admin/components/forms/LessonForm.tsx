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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components/ui/error-message";
import { useAdminStore } from "@/store/AdminStore";
import { Lesson } from "@/types/course/course";
import {
  CreateLessonFormData,
  createLessonSchema,
} from "@/schemas/add-lesson.schema";
import {
  UpdateLessonFormData,
  updateLessonSchema,
} from "@/schemas/update-lesson.schema";
import { createLesson } from "@/lib/api/requests/admin/admin.lesson.requests";

//TODO: Add lesson update and drag and drop order changing
export function LessonForm({
  mode,
  courseId,
  lessons,
  onClose,
}: {
  mode: "create" | "edit";
  lessons: Lesson[];
  courseId: number;
  onClose: () => void;
}) {
  const choosedEditLesson = useAdminStore((state) => state.choosedEditLesson);
  const schema = mode === "create" ? createLessonSchema : updateLessonSchema;
  const closeForm = useAdminStore((state) => state.closeForm);
  const nextOrder =
    lessons.reduce(
      (max, lesson) => (lesson.order > max ? lesson.order : max),
      0,
    ) + 1;
  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateLessonFormData | UpdateLessonFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: choosedEditLesson?.name ?? "",
      order: choosedEditLesson?.order ?? nextOrder,
      slug: choosedEditLesson?.slug ?? "",
    },
  });

  const onSave = async (
    formData: CreateLessonFormData | UpdateLessonFormData,
  ) => {
    const parsed = createLessonSchema.safeParse(formData);
    if (parsed.success) {
      const data = parsed.data;
      const result = await createLesson(courseId, data);
      if (!result.ok) {
        setError("root", { message: result.error });
      }
      onClose();
      closeForm();
    }
  };

  return (
    <div className={"flex flex-col gap-6 h-full min-w-[350px] justify-center"}>
      <Card className="rounded-none md:rounded-xl border-none bg-neutral-800 h-full md:h-min justify-center">
        <CardHeader>
          <CardTitle className="text-white font-heading"></CardTitle>
          <CardDescription className="font-body">
            Заповніть дані уроку. Slug має бути латиницею, цифрами та дефісами.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form noValidate onSubmit={handleSubmit(onSave)}>
            <FieldGroup>
              <Field>
                <div className="flex flex-row justify-between w-full items-center gap-3">
                  <FieldLabel
                    htmlFor="name"
                    className="text-white font-heading"
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
                      className="text-white font-body border-purple-500 placeholder:text-neutral-400 focus-visible:ring-purple-500/30"
                      {...field}
                    />
                  )}
                />

                <FieldDescription className="font-body">
                  До 80 символів.
                </FieldDescription>
              </Field>

              <Field>
                <div className="flex flex-row justify-between w-full items-center gap-3">
                  <FieldLabel
                    htmlFor="slug"
                    className="text-white font-heading"
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
                        className="text-white font-body border-purple-500 placeholder:text-neutral-400 focus-visible:ring-purple-500/30"
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
                <div className="flex flex-row justify-between w-full items-center gap-3">
                  <FieldLabel
                    htmlFor="description"
                    className="text-white font-heading"
                  >
                    Порядок уроку
                  </FieldLabel>
                  {errors.order && (
                    <ErrorMessage
                      message={errors.order.message as string | undefined}
                    />
                  )}
                </div>

                <Controller
                  control={control}
                  name="order"
                  render={({ field }) => (
                    <Input
                      id="order"
                      placeholder="Номер уроку по порядку"
                      className="text-white font-body border-purple-500 placeholder:text-neutral-400 focus-visible:ring-purple-500/30 resize-none"
                      {...field}
                    />
                  )}
                />

                <FieldDescription className="font-body">
                  Мінімум 1 цифра більше нуля (обовʼязково).
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
                  >
                    Скасувати
                  </Button>

                  <FieldDescription className="text-center font-body">
                    Після створення ви зможете додати теорію та завдання.
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
