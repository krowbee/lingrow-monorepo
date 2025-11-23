import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
