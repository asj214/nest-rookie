import { Query, Resolver, Args } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // @Query()
  // async getAllPost() {
  //   return this.postService.findOne(1);
  // }

  @Query(() => Post)
  async getPost(@Args('id') id: number) {
    return await this.postService.findOne(id);
  }
}