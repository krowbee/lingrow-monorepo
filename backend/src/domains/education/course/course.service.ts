import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { toDto } from 'src/lib/transform';
import { LessonService } from '../lesson/lesson.service';
import { CourseDto, CreateCourseDto, UpdateCourseDto } from './course.dto';
import { PublicLessonDto } from '../lesson/lesson.dto';
import PrismaService from 'src/lib/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CourseFilterDto, LessonFilterDto } from './types/FilterType';

@Injectable()
export class CourseService {
  constructor(
    private prisma: PrismaService,
    private lessonService: LessonService,
  ) {}

  async getCoursesList(filter: CourseFilterDto = {}): Promise<CourseDto[]> {
    const { status, search, level } = filter;

    const where: Prisma.CourseWhereInput = {
      ...(status && {
        status,
      }),
      ...(level && {
        level,
      }),
      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            slug: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }),
    };

    const courses = await this.prisma.course.findMany({ where });
    return courses.map((course) => {
      return toDto(CourseDto, course);
    });
  }

  async getLessonsByCourseSlug(
    courseSlug: string,
    filter: LessonFilterDto = {},
  ): Promise<PublicLessonDto[]> {
    const { search, status } = filter;
    const where: Prisma.LessonWhereInput = {
      ...(status && {
        status,
      }),
      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }),
    };
    const course = await this.prisma.course.findUnique({
      where: { slug: courseSlug },
    });
    if (!course) throw new NotFoundException('Incorrect course slug');
    const lessons = await this.lessonService.getLessons({
      ...where,
      course: { slug: courseSlug },
    });
    return lessons.map((lesson) => toDto(PublicLessonDto, lesson));
  }

  async createCourse(data: CreateCourseDto): Promise<CourseDto> {
    try {
      const course = await this.prisma.course.create({ data });
      return toDto(CourseDto, course);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new ConflictException('Курс із таким слагом вже існує');
      }

      throw new InternalServerErrorException(
        'Щось пішло не так при створенні курсу',
      );
    }
  }

  async updateCourse(
    data: UpdateCourseDto,
    courseiId: number,
  ): Promise<CourseDto> {
    try {
      const course = await this.prisma.course.update({
        where: { id: courseiId },
        data,
      });
      return toDto(CourseDto, course);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException(
            'Запис, який потрібно оновити, не знайдено',
          );
        }
        if (err.code === 'P2002') {
          throw new ConflictException('Курс із таким слагом вже існує');
        }
      }
      throw new InternalServerErrorException('Помилка при оновлені курсу');
    }
  }

  async deleteCourse(courseId: number): Promise<CourseDto> {
    try {
      const course = await this.prisma.course.delete({
        where: { id: courseId },
      });
      return toDto(CourseDto, course);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException(
          'Запис, який потрібно видалити, не знайдено',
        );
      }
      throw new InternalServerErrorException('Помилка при видаленні курсу');
    }
  }
}
