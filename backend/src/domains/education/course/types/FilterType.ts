import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EnglishLevels, PublishStatus } from '@prisma/client';

export class FilterDto {
  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  @IsEnum(PublishStatus)
  status?: PublishStatus;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  @IsEnum(EnglishLevels)
  level?: EnglishLevels;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : undefined,
  )
  search?: string;
}
