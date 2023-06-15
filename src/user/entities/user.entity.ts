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
import { IsEmail, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as argon2 from 'argon2';
import { Post } from "src/post/entities/post.entity";
import { Category } from "src/category/entities/category.entity";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @Exclude()
  @IsString()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

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
