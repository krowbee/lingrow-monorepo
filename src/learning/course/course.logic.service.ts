import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseService } from './course.service';
import { plainToInstance } from 'class-transformer';
import { CourseDTO, LessonDTO } from '../learning.dto';
import { LessonService } from '../lesson/lesson.service';

@Injectable()
export class CourseLogicService {
  constructor(
    private courseService: CourseService,
    private lessonService: LessonService,
  ) {}

  async getCoursesList(): Promise<CourseDTO[]> {
    const courses = await this.courseService.getCourses();
    return courses.map((course) => {
      return plainToInstance(CourseDTO, course, {
        excludeExtraneousValues: true,
      });
    });
  }

  async getLessonsByCourseSlug(courseSlug: string): Promise<LessonDTO[]> {
    const lessons = await this.lessonService.getLessons({
      course: { slug: courseSlug },
    });
    if (!lessons.length) throw new NotFoundException("Incorrect course's slug");
    return lessons.map((lesson) =>
      plainToInstance(LessonDTO, lesson, { excludeExtraneousValues: true }),
    );
  }
}
