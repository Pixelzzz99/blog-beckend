import { Post } from 'src/posts/entities/post.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto, userId) {
    try {
      const { title, content, tags, imageUrl } = createPostDto;
      const post = this.postRepository.create({
        title,
        content,
        imageUrl,
        published: false,
        tags: tags.split(',').map((tag) => tag.trim()),
        authorId: userId,
      });
      await this.postRepository.save(post);

      return;
    } catch (error) {
      return new HttpException('Cant create post', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
