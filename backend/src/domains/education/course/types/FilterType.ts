import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EnglishLevels, PublishStatus } from '@prisma/client';

export class FilterDto {
  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsEnum(PublishStatus)
  status?: PublishStatus;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsEnum(EnglishLevels)
  level?: EnglishLevels;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : undefined,
  )
  search?: string;
}
