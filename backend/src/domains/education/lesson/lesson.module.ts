import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';

@Module({
  imports: [PrismaModule],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {}
