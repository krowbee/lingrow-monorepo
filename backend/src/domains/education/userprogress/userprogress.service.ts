import { Injectable, NotFoundException } from '@nestjs/common';
import PrismaService from 'src/lib/prisma/prisma.service';
import {
  DeleteLessonProgressData,
  GetCourseProgressData,
  GetLessonProgressData,
  TaskProgress,
  UpdateProgressData,
  UserProgressWithAnswer,
} from './userprogress.dto';
import { CreateProgressData, LessonProgress } from './userprogress.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserProgressService {
  constructor(private prisma: PrismaService) {}

  private generateTaskProgress(
    progress: UserProgressWithAnswer | UserProgressWithAnswer[],
  ): TaskProgress[] {
    const items = Array.isArray(progress) ? progress : [progress];
    return items.map((p) => ({
      id: p.id,
      taskId: p.taskId,
      answerId: p.answerId,
      isCorrect: p.answer.isCorrect,
    }));
  }

  async getCourseProgress(
    getCourseProgressData: GetCourseProgressData,
  ): Promise<LessonProgress[]> {
    const progressByLessons = await this.prisma.userProgress.findMany({
      where: {
        userId: getCourseProgressData.userId,
        task: {
          lesson: {
            course: { slug: getCourseProgressData.courseSlug },
          },
        },
      },
      select: {
        task: {
          select: {
            id: true,
            lessonId: true,
          },
        },
      },
    });

    const answeredTaskIdsByLesson: Record<number, Set<number>> = {};

    for (const up of progressByLessons) {
      const { lessonId, id: taskId } = up.task;

      if (!answeredTaskIdsByLesson[lessonId]) {
        answeredTaskIdsByLesson[lessonId] = new Set<number>();
      }

      answeredTaskIdsByLesson[lessonId].add(taskId);
    }

    const lessonIds = Object.keys(answeredTaskIdsByLesson).map(Number);

    const lessons = await this.prisma.lesson.findMany({
      where: {
        id: { in: lessonIds },
      },
      select: {
        id: true,
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    });

    const tasksCountByLesson: Record<number, number> = {};
    for (const lesson of lessons) {
      tasksCountByLesson[lesson.id] = lesson._count.tasks;
    }

    return lessonIds.map((lessonId) => ({
      lessonId,
      isCompleted:
        answeredTaskIdsByLesson[lessonId].size === tasksCountByLesson[lessonId],
    }));
  }

  async getLessonProgress(
    getLessonProgressData: GetLessonProgressData,
  ): Promise<TaskProgress[]> {
    const progress = await this.prisma.userProgress.findMany({
      where: {
        userId: getLessonProgressData.userId,
        task: { lesson: { slug: getLessonProgressData.lessonSlug } },
      },
      include: { answer: true },
    });

    const tasksProgress: TaskProgress[] = this.generateTaskProgress(progress);
    return tasksProgress;
  }

  async createUserProgress(
    createProgressData: CreateProgressData,
  ): Promise<TaskProgress[]> {
    try {
      const progress = await this.prisma.userProgress.create({
        data: createProgressData,
        include: { answer: true },
      });

      return this.generateTaskProgress(progress);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException();
      }
      throw err;
    }
  }

  async updateUserProgress(
    updateProgressData: UpdateProgressData,
  ): Promise<TaskProgress[]> {
    try {
      const progress = await this.prisma.userProgress.update({
        where: {
          taskId_userId: {
            taskId: updateProgressData.taskId,
            userId: updateProgressData.userId,
          },
        },
        data: { answerId: updateProgressData.answerId },
        include: { answer: true },
      });

      return this.generateTaskProgress(progress);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException();
      }
      throw err;
    }
  }

  async deleteLessonProgress(
    deleteLessonProgressData: DeleteLessonProgressData,
  ): Promise<{ count: number }> {
    const { count } = await this.prisma.userProgress.deleteMany({
      where: {
        userId: deleteLessonProgressData.userId,
        task: { lessonId: deleteLessonProgressData.lessonId },
      },
    });
    return { count };
  }
}
