import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class AnswerDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  text: string;

  @ApiProperty()
  @Expose()
  isCorrect: boolean;

  @ApiProperty()
  @Expose()
  @IsNumber()
  taskId: number;
}
