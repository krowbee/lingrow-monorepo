import { BadRequestException, Injectable } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Injectable()
export class AnswerLogicService {
  constructor(private answerService: AnswerService) {}

  async checkAnswer(answerId: number): Promise<{ isCorrect: boolean }> {
    const answer = await this.answerService.getAnswer({ id: answerId });
    if (!answer) throw new BadRequestException('Incorrect answer');
    return { isCorrect: answer.isCorrect };
  }
}
