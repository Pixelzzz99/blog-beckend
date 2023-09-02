import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './configurations/typeorm.config';
import { envConfig } from './configurations/env.config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig()),
    TypeOrmModule.forRoot(ormConfig()),
    UsersModule,
    AuthModule,
    PostsModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
