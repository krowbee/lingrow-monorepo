import { TaskWithAnswers } from "@/types/course/course";
import { Button } from "@/components/ui/button";
import { useLessonStore } from "@/store/LessonStore";

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
    <div className="w-full flex px-8 justify-center gap-2">
      {step === "task" ? (
        <Button onClick={() => changeTask("prev")} className="cursor-pointer">
          Назад
        </Button>
      ) : (
        <Button className="cursor-pointer" onClick={() => backToLessons()}>
          До уроків
        </Button>
      )}

      <div className="flex flex-row flex-wrap gap-2 justify-center">
        <Button
          className={`bg-accent ${step === "theory" && "bg-primary"}  cursor-pointer`}
          onClick={() => chooseTheory()}
        >
          Теорія
        </Button>
        {tasks.map((task) => (
          <Button
            key={task.id}
            className={`cursor-pointer bg-accent ${task.order - 1 === taskIndex && step === "task" && "bg-primary"} ${task.choosedAnswer && "bg-green-400"}`}
            onClick={() => chooseTask(task.order)}
          >
            {task.order}
          </Button>
        ))}
      </div>
      {taskIndex + 1 !== tasks.length ? (
        <Button onClick={() => changeTask("next")} className="cursor-pointer">
          Далі
        </Button>
      ) : (
        <Button className="cursor-pointer" onClick={() => finishLesson()}>
          Завершити
        </Button>
      )}
    </div>
  );
}
