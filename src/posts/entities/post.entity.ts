import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column('simple-array', { default: [] })
  tags: string[];

  @Column()
  imageUrl: string;

  @Column({ default: 0 })
  viewsCount: number;

  @ManyToOne(() => User, (user) => user.posts)
  authorId: User;

  @Column()
  published: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
