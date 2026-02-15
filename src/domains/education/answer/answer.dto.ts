import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
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
  @Exclude()
  isCorrect: boolean;

  @ApiProperty()
  @Expose()
  @IsNumber()
  taskId: number;
}
