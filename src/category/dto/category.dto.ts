import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  // @IsNumber()
  // @IsOptional()
  @Transform(({ value }) => parseInt(value))
  parentId: number;

  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  order: number = 0;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}