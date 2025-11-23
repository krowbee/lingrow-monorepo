import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { LearningModule } from './learning/learning.module';

@Module({
  imports: [AuthModule, LearningModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
