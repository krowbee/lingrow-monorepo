import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
}
export class CreateCourseDto extends PickType(CourseDto, [
  'name',
  'slug',
  'description',
]) {}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
