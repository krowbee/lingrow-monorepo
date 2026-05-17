import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { updateTaskProgress } from "@/lib/api/requests/courses.client.requests";
import { useAdminStore } from "@/store/AdminStore";
import { useLessonStore } from "@/store/LessonStore";
import { TaskWithAnswers } from "@/types/course/course";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
export type answerProgress = {
  id: number;
  answerId: number;
  isCorrect: boolean;
  taskId: number;
};
export function TaskBlock({ task }: { task: TaskWithAnswers }) {
  const [hasProgress, setHasProgress] = useState<boolean>(
    task.choosedAnswer !== null,
  );
  const setErrorMessage = useAdminStore((state) => state.setErrorMessage);
  const setAnswer = useLessonStore((state) => state.setAnswer);

  const {
    data: submittedAnswer,
    isPending,
    mutate: updateAnswer,
  } = useMutation({
    mutationFn: async (answerId: number) => {
      const result = await updateTaskProgress(task.id, answerId, hasProgress);
      if (!result.ok) {
        throw new Error("Failed to update task progress");
      }
      return result.data[0];
    },
    onSuccess: (data, answerId) => {
      setAnswer(task.id, answerId);
      setCurrentAnswer(
        data ?? {
          answerId: data.choosedAnswer,
          isCorrect: data.isCorrect,
        },
      );
      if (!hasProgress) {
        setHasProgress(true);
      }
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
    },
  });

  const [currentAnswer, setCurrentAnswer] = useState<answerProgress | null>(
    submittedAnswer ||
      (task.choosedAnswer !== null
        ? {
            answerId: task.choosedAnswer,
            isCorrect: task.isCorrect,
          }
        : null),
  );

  const handleAnswerChange = async (answerId: number) => {
    if (isPending) return;
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
          {task.answers.length !== 0 &&
            task.answers.map((answer) => (
              <div
                className={`bg-base-300 flex items-center gap-4 rounded-lg border ${
                  currentAnswer?.answerId === answer.id
                    ? currentAnswer.isCorrect
                      ? "border-green-600"
                      : "border-red-600"
                    : ""
                }`}
                key={answer.id}
              >
                <label
                  htmlFor={`${answer.id}`}
                  className="flex h-full w-full cursor-pointer flex-row items-center gap-4 p-4"
                >
                  <input
                    type="radio"
                    disabled={isPending}
                    className={`h-5 w-5 cursor-pointer transition-colors ${currentAnswer?.answerId === answer.id ? (currentAnswer.isCorrect ? "accent-green-500" : "accent-red-500") : "accent-primary"}`}
                    value={`${answer.id}`}
                    id={`${answer.id}`}
                    checked={currentAnswer?.answerId === answer.id}
                    onChange={() => handleAnswerChange(answer.id)}
                  />

                  <span className="text-lg">{answer.text}</span>
                </label>
              </div>
            ))}
        </div>
      </CardDescription>
    </Card>
  );
}
