import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { WordService } from './word.service';

@Module({
  imports: [PrismaModule],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule {}
