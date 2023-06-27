import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  Request,
  UsePipes,
  HttpCode,
  UseGuards,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserInterface, CurrentUser } from 'src/auth/auth.decorator';
import { ProductService } from './product.service';
import { SearchProductDto, CreateProductDto, UpdateProductDto } from './dto/product.dto';

@ApiTags('products')
@Controller('api/products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '상품 신규 등록', description: '상품 등록 API' })
  create(@CurrentUser() user: UserInterface, @Body() dto: CreateProductDto) {
    return this.productService.create(user, dto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: '상품 목록', description: '상품 목록 API' })
  findAll(@Query() query: SearchProductDto) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '상품 상세', description: '상품 상세 API' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '상품 수정', description: '상품 수정 API' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '상품 삭제', description: '상품 삭제 API' })
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
