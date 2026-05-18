import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

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
  @IsBoolean()
  isCorrect: boolean;

  @ApiProperty()
  @Expose()
  @IsNumber()
  taskId: number;
}
