import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { PublishStatus } from '@prisma/client';
import { Expose } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CourseDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsEnum(PublishStatus)
  status?: PublishStatus;
}
export class CreateCourseDto extends PickType(CourseDto, [
  'name',
  'slug',
  'description',
  'status',
]) {}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
