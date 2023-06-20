import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Exclude } from 'class-transformer';
import { IsString, Min } from 'class-validator';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { User } from "src/user/entities/user.entity";

@ObjectType()
@Entity({ name: 'posts' })
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(type => User, user => user.posts)
  @JoinColumn({ name: "user_id" })
  @Field(() => User)
  user: User;

  @Min(5)
  @IsString()
  @Column()
  @Field(() => String)
  title: string;

  @Column('text')
  @Min(5)
  @IsString()
  @Field(() => String)
  body: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  constructor(partial?: Partial<Post>) {
    if (partial) Object.assign(this, partial);
  }
}

@ObjectType()
export class ResponseData {
  @Field(() => Int)
  count: number;
  @Field(() => [Post])
  data: Post[];
}