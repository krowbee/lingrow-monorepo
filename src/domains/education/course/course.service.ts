import { Injectable, NotFoundException } from '@nestjs/common';
import { toDto } from 'src/lib/transform';
import { LessonService } from '../lesson/lesson.service';
import { CourseDto } from './course.dto';
import { LessonDto } from '../lesson/lesson.dto';
import PrismaService from 'src/lib/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(
    private prisma: PrismaService,
    private lessonService: LessonService,
  ) {}

  async getCoursesList(): Promise<CourseDto[]> {
    const courses = await this.prisma.course.findMany();
    return courses.map((course) => {
      return toDto(CourseDto, course);
    });
  }

  async getLessonsByCourseSlug(courseSlug: string): Promise<LessonDto[]> {
    const lessons = await this.lessonService.getLessons({
      course: { slug: courseSlug },
    });
    if (!lessons.length) throw new NotFoundException("Incorrect course's slug");
    return lessons.map((lesson) => toDto(LessonDto, lesson));
  }
}
