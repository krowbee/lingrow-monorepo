import { Expose, Type } from 'class-transformer';
import { TaskDto } from '../task/task.dto';

import {
  IsArray,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';

export enum EnglishLevels {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
}

export class PublicLessonDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsNumber()
  name: string;

  @Expose()
  @IsString()
  slug: string;

  @Expose()
  @IsNumber()
  order: number;
}

export class LessonDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsJSON()
  theory: JSON;

  @Expose()
  @IsString()
  slug: string;

  @Expose()
  @IsEnum(EnglishLevels)
  englishLevel: EnglishLevels;

  @Expose()
  @IsNumber()
  courseId: number;

  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskDto)
  tasks?: TaskDto[];

  @Expose()
  @IsNumber()
  order: number;
}

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @IsOptional()
  theory: any;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsEnum(EnglishLevels)
  @IsNotEmpty()
  englishLevel: EnglishLevels;

  @IsNumber()
  @IsNotEmpty()
  courseId: number;

  @IsNumber()
  @IsNotEmpty()
  order: number;
}

export class UpdateLessonDto extends PartialType(
  OmitType(CreateLessonDto, ['courseId']),
) {}
