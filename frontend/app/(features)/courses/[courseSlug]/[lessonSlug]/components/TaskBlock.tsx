import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { updateTaskProgress } from "@/lib/api/requests/courses.client.requests";
import { useLessonStore } from "@/store/LessonStore";
import { TaskWithAnswers } from "@/types/course/course";
import { useEffect, useState } from "react";
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

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [submittedAnswer, setSubmittedAnswer] = useState<answerProgress | null>(
    null,
  );
  const setAnswer = useLessonStore((state) => state.setAnswer);

  useEffect(() => {
    setHasProgress(task.choosedAnswer !== null);
    setSubmittedAnswer(null);
  }, [task]);

  const handleAnswerChange = async (answerId: number) => {
    try {
      if (isSaving) return;

      setIsSaving(true);

      const result = await updateTaskProgress(task.id, answerId, hasProgress);

      if (!result.ok) return;

      setAnswer(task.id, answerId);
      const data = await result.data[0];

      setSubmittedAnswer(data);
      if (!hasProgress) {
        setHasProgress(true);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="w-full px-8 py-4">
      <CardHeader>
        <h2 className="text-lg">
          {task.order}. {task.question}
        </h2>
      </CardHeader>
      <CardDescription>
        <div className="px-8 flex flex-col gap-2">
          {task.answers.length !== 0 &&
            task.answers.map((answer) => (
              <div
                className={`flex items-center gap-3 p-2 bg-base-300 border rounded-lg border-base-400 ${
                  submittedAnswer?.answerId === answer.id
                    ? submittedAnswer.isCorrect
                      ? "border-green-600"
                      : "border-red-600"
                    : ""
                }`}
                key={answer.id}
              >
                <input
                  type="radio"
                  className={`cursor-pointer transition-colors ${submittedAnswer?.answerId === answer.id ? (submittedAnswer.isCorrect ? "accent-green-500" : "accent-red-500") : "accent-primary"}`}
                  value={`${answer.id}`}
                  id={`${answer.id}`}
                  checked={task.choosedAnswer === answer.id}
                  onChange={() => handleAnswerChange(answer.id)}
                />
                <Label htmlFor={`${answer.id}`} className="">
                  {answer.text}
                </Label>
              </div>
            ))}
        </div>
      </CardDescription>
    </Card>
  );
}
