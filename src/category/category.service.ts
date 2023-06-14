import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(user, dto: CreateCategoryDto) {
    const category = new Category();
    category.parentId = dto.parentId;
    category.name = dto.name;
    // category.depth = await this.findDepth(dto.parentId);
    category.order = dto.order;
    category.user = user;
    category.path = [];

    const ret = await this.categoryRepository.save(category);

    // this.setCategoryPath();

    return ret
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, dto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
