import { ForbiddenException, Injectable } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonDTO } from '../learning.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LessonLogicService {
  constructor(private lessonService: LessonService) {}

  async getLessonWithTasksBySlug(lessonSlug: string): Promise<LessonDTO> {
    const lesson = await this.lessonService.getLesson({ slug: lessonSlug });
    if (!lesson) new ForbiddenException("Incorrect lesson's slug");
    return plainToInstance(LessonDTO, lesson, {
      excludeExtraneousValues: true,
    });
  }
}
