import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  OneToMany
} from "typeorm";
import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';
import * as argon2 from 'argon2';
import { Post } from "src/post/entities/post.entity";
import { Category } from "src/category/entities/category.entity";

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field(() => Number)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  @IsEmail()
  @Field(() => String)
  email: string;

  @Column()
  @IsString()
  @Field(() => String)
  name: string;

  @Column()
  @Exclude()
  @IsString()
  @Field(() => String)
  password: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];

  @OneToMany(type => Category, category => category.user)
  categories: Category[];
  
  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  async verifyPassword(password: string) {
    return await argon2.verify(this.password, password)
  }

  constructor(partial?: Partial<User>) {
    if (partial) Object.assign(this, partial);
  }
}
