import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';


export class SearchProductDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '',
    description: '상품이름 검색',
    required: false,
  })
  name: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({
    example: 3,
    description: '카테고리별 상품 검색',
    required: false,
  })
  categoryId: number;

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

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    example: '상품명 1123',
    description: '상품명',
    required: true,
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    example: 150000,
    description: '상품 가격',
    required: true,
  })
  price: number;

  @IsString()
  @ApiProperty({
    example: '상품상세',
    description: '상품상세',
    required: true,
  })
  description: string;

  @IsNumber({}, { each: true })
  @ApiProperty({
    example: [3],
    description: '카테고리 아이디',
    required: true,
  })
  categoryIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}