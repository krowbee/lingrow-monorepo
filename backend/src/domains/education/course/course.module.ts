import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { CourseController } from './course.controller';
import { LessonModule } from '../lesson/lesson.module';

@Module({
  imports: [PrismaModule, LessonModule],
  providers: [CourseService],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule {}
