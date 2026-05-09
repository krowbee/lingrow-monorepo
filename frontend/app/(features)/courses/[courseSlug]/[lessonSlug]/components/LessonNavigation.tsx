import { TaskWithAnswers } from "@/types/course/course";
import { Button } from "@/components/ui/button";
import { useLessonStore } from "@/store/LessonStore";
import { BookOpen, MoveLeft, MoveRight } from "lucide-react";

export function LessonNavigation({
  tasks,
  finishLesson,
  backToLessons,
}: {
  tasks: TaskWithAnswers[];
  finishLesson: () => void;
  backToLessons: () => void;
}) {
  const step = useLessonStore((state) => state.step);
  const setStep = useLessonStore((state) => state.setStep);
  const taskIndex = useLessonStore((state) => state.taskIndex);
  const setTaskIndex = useLessonStore((state) => state.setTaskIndex);

  const chooseTask = (taskOrder: number) => {
    if (taskOrder < 1 || taskOrder > tasks.length) return;
    setStep("task");
    setTaskIndex(taskOrder - 1);
  };

  const chooseTheory = () => {
    setStep("theory");
    setTaskIndex(0);
  };

  const changeTask = (direction: "prev" | "next") => {
    if (direction === "next") {
      if (step === "theory") {
        setStep("task");
        return;
      }
      if (taskIndex + 1 < tasks.length) {
        setTaskIndex(taskIndex + 1);
        return;
      }
      return;
    }

    // prev
    if (step === "task" && taskIndex === 0) {
      setStep("theory");
      return;
    }
    if (taskIndex > 0) {
      setTaskIndex(taskIndex - 1);
      return;
    }
  };
  return (
    <div className="flex w-full max-w-max flex-row gap-2 justify-self-center rounded-xl border p-4 px-6 lg:px-8">
      {step === "task" ? (
        <Button onClick={() => changeTask("prev")} className="cursor-pointer">
          <MoveLeft />
        </Button>
      ) : (
        <Button className="cursor-pointer" onClick={() => backToLessons()}>
          До уроків
        </Button>
      )}

      <div className="flex flex-row flex-wrap justify-center gap-x-2 gap-y-4">
        <Button
          className={`w-auto bg-purple-500/50 hover:bg-purple-500 ${step === "theory" && "border-3 border-white/50 bg-purple-500"} cursor-pointer`}
          onClick={() => chooseTheory()}
        >
          <BookOpen />
        </Button>
        {tasks.map((task) => (
          <Button
            key={task.id}
            className={`cursor-pointer bg-purple-500/50 hover:bg-purple-500 ${task.order - 1 === taskIndex && step === "task" && "-translate-y-1 border-3 border-white/50 bg-purple-500"} ${task.choosedAnswer && "bg-fuchsia-600/70"}`}
            onClick={() => chooseTask(task.order)}
          >
            {task.order}
          </Button>
        ))}
      </div>
      {taskIndex + 1 !== tasks.length ? (
        <Button
          onClick={() => changeTask("next")}
          className="cursor-pointer bg-purple-700"
        >
          <MoveRight />
        </Button>
      ) : (
        <Button className="cursor-pointer" onClick={() => finishLesson()}>
          Завершити
        </Button>
      )}
    </div>
  );
}
