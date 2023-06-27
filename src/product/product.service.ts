import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchProductDto, CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(user, dto: CreateProductDto) {
    const product = new Product();
    product.user = user;
    product.name = dto.name;
    product.price = dto.price;

    const categories = await this.categoryRepository.find({
      where: {
        id: In(dto.categoryIds)
      }
    });
    product.categories = categories;

    return await this.productRepository.save(product);
  }

  async findAll(query: SearchProductDto) {
    const { name, categoryId, take, skip } = query;

    const qb = this.productRepository.createQueryBuilder('product');
    qb.leftJoinAndSelect('product.categories', 'category')

    qb.where('1=1')
    if (name) qb.andWhere('product.name LIKE :name', { name: `%${name}%` })
    if (categoryId) qb.andWhere('category.id = :categoryId', { categoryId })

    qb.orderBy('product.id', 'DESC');

    const count = await qb.getCount();

    qb.take(take);
    qb.skip(skip)

    const data = await qb.getMany();
    return {
      count: count,
      data: data
    }
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      relations: ['categories'],
      where: {
        id: id
      }
    });

    if (!product) throw new NotFoundException();

    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    return await this.productRepository.update(id, dto);
  }

  async remove(id: number) {
    return await this.productRepository.softDelete({ id: id });
  }
}
