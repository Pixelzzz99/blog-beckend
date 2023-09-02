import { Post } from 'src/posts/entities/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 20 })
  username: string;

  @Column({ nullable: false, length: 50, unique: true })
  email: string;

  @Column({ nullable: false })
  passwordHash: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @OneToMany(() => Post, (post) => post.authorId)
  posts: Post;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
