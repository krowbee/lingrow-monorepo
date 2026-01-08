import { Injectable } from '@nestjs/common';
import { Prisma, UserProgress } from '@prisma/client';
import PrismaService from 'src/lib/prisma/prisma.service';
import { LessonProgress, TaskProgress } from './userprogress.dto';

@Injectable()
export class UserProgressService {
  constructor(private prisma: PrismaService) {}

  async getCourseProgress(
    userId: number,
    courseSlug: string,
  ): Promise<LessonProgress[]> {
    const progressByLessons = await this.prisma.userProgress.findMany({
      where: { userId, task: { lesson: { course: { slug: courseSlug } } } },
      include: { task: { select: { id: true, lessonId: true } } },
    });
    const progressCountByLesson: Record<number, number> = {};
    for (const up of progressByLessons) {
      const lessonId = up.task.lessonId;
      progressCountByLesson[lessonId] =
        (progressCountByLesson[lessonId] || 0) + 1;
    }

    const lessonsCompleted: LessonProgress[] = Object.entries(
      progressCountByLesson,
    ).map(([lessonId, count]) => ({
      lessonId: Number(lessonId),
      isCompleted: count === 10,
    }));
    return lessonsCompleted;
  }

  async getLessonProgress(
    lessonId: number,
    userId: number,
  ): Promise<TaskProgress[]> {
    const progress = await this.prisma.userProgress.findMany({
      where: { userId, task: { lessonId } },
      include: { answer: true },
    });

    const tasksProgress: TaskProgress[] = progress.map((p) => ({
      id: p.id,
      taskId: p.taskId,
      answerId: p.answerId,
      isCorrect: p.answer.isCorrect,
    }));
    return tasksProgress;
  }

  async createUserProgress(
    userProgressCreateInput: Prisma.UserProgressCreateInput,
  ): Promise<UserProgress> {
    return this.prisma.userProgress.create({ data: userProgressCreateInput });
  }

  async updateUserProgress(
    userProgressWhereUniqueInput: Prisma.UserProgressWhereUniqueInput,
    userProgressUpdateInput: Prisma.UserProgressUpdateInput,
  ): Promise<UserProgress> {
    return this.prisma.userProgress.update({
      where: userProgressWhereUniqueInput,
      data: userProgressUpdateInput,
    });
  }

  async deleteUserProgress(
    userProgressWhereUniqueInput: Prisma.UserProgressWhereUniqueInput,
  ): Promise<UserProgress> {
    return this.prisma.userProgress.delete({
      where: userProgressWhereUniqueInput,
    });
  }
}
