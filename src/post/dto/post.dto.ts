import { PartialType } from '@nestjs/mapped-types';
import {
  IsNumber,
  IsString,
  IsOptional,
  Min
} from 'class-validator';
import { InputType, Int, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class PostSearchDto {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  @ApiProperty({
    example: '',
    description: '검색 키워드',
    required: false,
  })
  keyword?: string = '';

  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({
    example: 10,
    description: 'per_page',
    required: false,
  })
  take?: number = 10;

  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({
    example: 0,
    description: 'offset',
    required: false,
  })
  skip?: number = 0;
}

@InputType()
export class PostDto {
  @ApiProperty({
    example: 'This is Title',
    description: '제목',
    required: true,
  })
  @Min(5)
  @IsString()
  @Field()
  title: string;

  @ApiProperty({
    example: 'This is Post Content',
    description: '본문',
    required: true,
  })
  @Min(5)
  @IsString()
  @Field()
  body: string;
}

export class UpdatePostDto extends PartialType(PostDto) {}