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
import { IsString, Min } from 'class-validator';
import { Exclude } from 'class-transformer';
import { User } from "src/user/entities/user.entity";

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(type => User, user => user.posts)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  @Min(5)
  @IsString()
  title: string;

  @Column('text')
  @Min(5)
  @IsString()
  body: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  constructor(partial?: Partial<Post>) {
    if (partial) Object.assign(this, partial);
  }
}
