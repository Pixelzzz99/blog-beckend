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

  async create(
    createPostDto: CreatePostDto,
    userId,
  ): Promise<Post | HttpException> {
    try {
      const allowedCreate = ['title', 'content', 'tags', 'imageUrl'];
      if (!this.checkExtraFields(createPostDto, allowedCreate)) {
        return new HttpException(
          'Invalid create! Only these fields are allowed: title, content, tags, imageUrl',
          HttpStatus.BAD_REQUEST,
        );
      }

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

      return post;
    } catch (error) {
      return new HttpException('Cant create post', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.postRepository.find({
        relations: ['authorId'],
        order: {
          createdAt: 'DESC',
        },
      });
    } catch (error) {
      return new HttpException('No posts found', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      const post = await this.postRepository.findOne({
        where: { id },
        relations: ['authorId'],
      });
      if (!post) {
        return new HttpException('No post found', HttpStatus.NOT_FOUND);
      }
      return await this.postRepository.save({
        ...post,
        viewsCount: post.viewsCount + 1,
      });
    } catch (error) {
      return new HttpException('Error returned post', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const allowedUpdates = ['title', 'content', 'tags', 'imageUrl'];
      if (!this.checkExtraFields(updatePostDto, allowedUpdates)) {
        return new HttpException(
          'Invalid updates! Only these fields are allowed: title, content, tags, imageUrl',
          HttpStatus.BAD_REQUEST,
        );
      }

      const post = await this.postRepository.findOne({ where: { id } });
      if (!post) {
        return new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      let newTags = [];
      if (updatePostDto.tags) {
        newTags = updatePostDto.tags.split(',').map((tag) => tag.trim());
      }
      const updatedPost = {
        ...updatePostDto,
        tags: newTags,
      };
      return await this.postRepository.save({ ...post, ...updatedPost });
    } catch (error) {
      return new HttpException('Cant update post', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const post = await this.postRepository.findOne({ where: { id } });
      if (!post) {
        return new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      await this.postRepository.remove(post);
      return { deleted: true };
    } catch (error) {
      return new HttpException('Cant remove post', HttpStatus.BAD_REQUEST);
    }
  }

  checkExtraFields(body: CreatePostDto, allowedFields: string[]) {
    const updates = Object.keys(body);
    return updates.every((update) => allowedFields.includes(update));
  }
}
