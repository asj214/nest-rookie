import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt.auth.guard';
import { AuthService } from './auth.service';
import { AuthRegisterDto, AuthLoginDto } from './dto/auth.dto';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: '회원 가입', description: '회원 가입 API' })
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() dto: AuthRegisterDto) {
    return await this.authService.create(dto)
  }

  @Post('login')
  @ApiOperation({ summary: '사용자 인증', description: '사용자 인증 API' })
  @UseInterceptors(ClassSerializerInterceptor)
  async authenticate(@Body() dto: AuthLoginDto) {
    return await this.authService.authenticate(dto);
  }

  @Get('me')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async me(@Request() req: any) {
    return await this.authService.findOne(req.user.id)
  }
}
