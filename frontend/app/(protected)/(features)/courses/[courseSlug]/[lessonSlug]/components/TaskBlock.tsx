"use client";

import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { updateTaskProgress } from "@/lib/api/requests/courses.client.requests";
import { useAdminStore } from "@/store/AdminStore";
import { useLessonStore } from "@/store/LessonStore";
import { TaskProgress, TaskWithAnswers } from "@/types/course/course";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export type AnswerProgress = {
  id?: number;
  answerId: number;
  isCorrect: boolean;
  taskId: number;
};

export function TaskBlock({
  task,
  lessonSlug,
}: {
  task: TaskWithAnswers;
  lessonSlug: string;
}) {
  const setErrorMessage = useAdminStore((state) => state.setErrorMessage);
  const setAnswer = useLessonStore((state) => state.setAnswer);
  const queryClient = useQueryClient();

  const [currentAnswer, setCurrentAnswer] = useState<AnswerProgress | null>(
    () => {
      if (task.choosedAnswer == null) {
        return null;
      }

      const selectedAnswer = task.answers.find(
        (answer) => answer.id === task.choosedAnswer,
      );

      return {
        id: task.progressId ?? undefined,
        taskId: task.id,
        answerId: task.choosedAnswer,
        isCorrect: task.isCorrect ?? selectedAnswer?.isCorrect ?? false,
      };
    },
  );

  const hasProgress = currentAnswer !== null;

  const { isPending, mutate: updateAnswer } = useMutation({
    mutationFn: async (answerId: number): Promise<TaskProgress> => {
      const result = await updateTaskProgress(task.id, answerId, hasProgress);

      if (!result.ok) {
        throw new Error(result.error || "Failed to update task progress");
      }

      return result.data[0] as TaskProgress;
    },

    onSuccess: (progress, answerId) => {
      setCurrentAnswer({
        id: progress.id,
        taskId: progress.taskId,
        answerId: progress.answerId,
        isCorrect: progress.isCorrect,
      });
      /* invalidate lesson query */
      queryClient.invalidateQueries({ queryKey: ["lesson", lessonSlug] });
      setAnswer(task.id, answerId);
    },

    onError: (error: Error) => {
      setErrorMessage(error.message);
    },
  });

  const handleAnswerChange = (answerId: number) => {
    if (isPending) return;
    if (currentAnswer?.answerId === answerId) return;

    updateAnswer(answerId);
  };

  return (
    <Card className="w-full px-8 py-4">
      <CardHeader>
        <h2 className="font-accent text-lg md:text-2xl">
          {task.order}. {task.question}
        </h2>
      </CardHeader>

      <CardDescription>
        <div className="flex flex-col gap-4 px-8">
          {task.answers.map((answer) => {
            const isSelected = currentAnswer?.answerId === answer.id;

            const answerClass = isSelected
              ? currentAnswer.isCorrect
                ? "border-green-600"
                : "border-red-600"
              : "";

            const radioClass = isSelected
              ? currentAnswer.isCorrect
                ? "accent-green-500"
                : "accent-red-500"
              : "accent-primary";

            return (
              <div
                key={answer.id}
                className={`bg-base-300 flex items-center gap-4 rounded-lg border ${answerClass}`}
              >
                <label
                  htmlFor={`task-${task.id}-answer-${answer.id}`}
                  className="flex h-full w-full cursor-pointer flex-row items-center gap-4 p-4"
                >
                  <input
                    id={`task-${task.id}-answer-${answer.id}`}
                    name={`task-${task.id}`}
                    type="radio"
                    disabled={isPending}
                    className={`h-5 w-5 cursor-pointer transition-colors ${radioClass}`}
                    value={answer.id}
                    checked={isSelected}
                    onChange={() => handleAnswerChange(answer.id)}
                  />

                  <span className="text-lg">{answer.text}</span>
                </label>
              </div>
            );
          })}
        </div>
      </CardDescription>
    </Card>
  );
}
