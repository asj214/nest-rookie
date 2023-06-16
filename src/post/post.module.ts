import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
import { PostResolver } from './post.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post])
  ],
  controllers: [PostController],
  providers: [PostService, PostResolver]
})
export class PostModule {}
