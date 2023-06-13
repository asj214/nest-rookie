import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class AuthRegisterDto {
  @ApiProperty({
    example: 'asj214@naver.com',
    description: '이메일',
    required: true,
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: 'sjahn',
    description: '이름',
    required: true,
  })
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: 'rewq1234',
    description: '비밀번호',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}

export class AuthLoginDto {
  @ApiProperty({
    example: 'asj214@naver.com',
    description: '이메일',
    required: true,
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: 'rewq1234',
    description: '비밀번호',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}