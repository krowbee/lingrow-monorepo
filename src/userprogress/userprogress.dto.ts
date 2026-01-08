import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber } from 'class-validator';

export type LessonProgress = {
  lessonId: number;
  isCompleted: boolean;
};

export class TaskProgress {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsNumber()
  taskId: number;

  @Expose()
  @IsNumber()
  answerId: number;

  @Expose()
  @IsBoolean()
  isCorrect: boolean;
}
