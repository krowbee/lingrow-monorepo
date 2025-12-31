import { ForbiddenException, Injectable } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { toDto } from 'src/lib/transform';
import { LessonDto } from './lesson.dto';

@Injectable()
export class LessonLogicService {
  constructor(private lessonService: LessonService) {}

  async getLessonWithTasksBySlug(lessonSlug: string): Promise<LessonDto> {
    const lesson = await this.lessonService.getLesson({ slug: lessonSlug });
    if (!lesson) new ForbiddenException("Incorrect lesson's slug");
    return toDto(LessonDto, lesson);
  }
}
