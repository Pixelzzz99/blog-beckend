import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { PostsMiddleware } from './posts.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PostsMiddleware)
      .forRoutes({ path: 'posts', method: RequestMethod.POST });

    consumer.apply(PostsMiddleware).forRoutes({
      path: 'posts/:id',
      method: RequestMethod.PATCH,
    });
  }
}
