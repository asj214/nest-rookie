import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany
} from "typeorm";
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
import { User } from "src/user/entities/user.entity";
import { Category } from "src/category/entities/category.entity";

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(type => User, user => user.products)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  price: number;

  @Column('text')
  @IsString()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'categories_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  constructor(partial?: Partial<Product>) {
    if (partial) Object.assign(this, partial);
  }
}
