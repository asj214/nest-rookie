import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from "typeorm";
import { IsNumber, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
import { User } from "src/user/entities/user.entity";

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: "parent_id", nullable: true })
  parentId: number;

  @ManyToOne(() => Category, category => category.subcategories, { nullable: true })
  @JoinColumn({ name: "parent_id" })
  parent: Category;

  @OneToMany(() => Category, category => category.parent)
  subcategories: Category[];

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ default: 0 })
  @IsNumber()
  depth: number;

  @ManyToOne(type => User, user => user.categories)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ default: 0 })
  @IsNumber()
  order: number;

  @Column({ type: 'json', nullable: false })
  path: number[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  constructor(partial?: Partial<Category>) {
    if (partial) Object.assign(this, partial);
  }
}