import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const allowedCreate = ['title', 'content', 'tags', 'imageUrl'];
    if (!this.checkExtraFields(req.body, allowedCreate)) {
      return res.status(400).json({
        message:
          'Invalid create! Only these fields are allowed: title, content, tags, imageUrl',
        error: HttpStatus.BAD_REQUEST,
      });
    }

    next();
  }

  checkExtraFields(body: CreatePostDto, allowedFields: string[]) {
    const updates = Object.keys(body);
    return updates.every((update) => allowedFields.includes(update));
  }
}
