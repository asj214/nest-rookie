import { PartialType } from '@nestjs/mapped-types';
import {
  IsNumber,
  IsString,
  IsOptional,
  Min
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PostSearchDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '',
    description: '검색 키워드',
    required: false,
  })
  keyword: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({
    example: 10,
    description: 'per_page',
    required: false,
  })
  take: number = 10;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({
    example: 0,
    description: 'offset',
    required: false,
  })
  skip: number = 0;
}

export class PostDto {
  @ApiProperty({
    example: 'This is Title',
    description: '제목',
    required: true,
  })
  @Min(5)
  @IsString()
  title: string;

  @ApiProperty({
    example: 'This is Post Content',
    description: '본문',
    required: true,
  })
  @Min(5)
  @IsString()
  body: string;
}

export class UpdatePostDto extends PartialType(PostDto) {}