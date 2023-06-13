import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostSearchDto, PostDto, UpdatePostDto } from './dto/post.dto';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}

  async create(user: User, dto: PostDto) {
    const post = new Post();
    post.title = dto.title;
    post.body = dto.body;
    post.user = user;

    return await this.postRepository.save(post);
  }

  async findAll(query: PostSearchDto) {
    const { keyword, take, skip } = query;
    const qb = this.postRepository.createQueryBuilder('post');

    qb.leftJoinAndSelect('post.user', 'user')

    qb.where('1=1')
    if (keyword) {
      qb.andWhere('post.title LIKE :keyword', { name: `%${keyword}%` })
      qb.andWhere('post.body LIKE :keyword', { name: `%${keyword}%` })
    }

    qb.orderBy('post.id', 'DESC');

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
    const post = await this.postRepository.findOne({
      relations: ['user'],
      where: {
        id: id
      }
    });

    if (!post) throw new NotFoundException();

    return post;
  }

  async update(user: User, id: number, dto: UpdatePostDto) {
    const post = await this.findOne(id);
    if (post.user.id !== user.id) {
      throw new NotAcceptableException();
    }

    return await this.postRepository.update(id, dto);
  }

  async remove(id: number) {
    return await this.postRepository.softDelete({ id: id });
  }
}
