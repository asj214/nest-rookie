import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Query, Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql.auth.guard';
import { PostService } from './post.service';
import { Post, ResponseData } from './entities/post.entity';
import {
  PostSearchDto,
  PostDto,
  UpdatePostDto  
} from './dto/post.dto';

@Resolver('Post')
@UsePipes(new ValidationPipe({ transform: true }))
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => ResponseData)
  async getAllPost(@Args({ name: 'search', nullable: true }) query: PostSearchDto) {
    const { count, data } = await this.postService.findAll(query);
    return {
      count: count,
      data: data
    }
  }

  @Query(() => Post)
  async getPost(@Args('id') id: number) {
    return await this.postService.findOne(id);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async createPost(@Context() context, @Args('dto') dto: PostDto) {
    return await this.postService.create(context.req.user, dto);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async updatePost(@Context() context, @Args('id') id: number, @Args('dto') dto: PostDto) {
    return await this.postService.update(context.req.user, id, dto);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deletePost(@Args('id') id: number) {
    await this.postService.remove(id);
    return true;
  }

}