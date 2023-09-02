import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

export enum TypeDb {
  postgres = 'postgres',
  mysql = 'mysql',
  sqlite = 'sqlite',
  mariadb = 'mariadb',
  oracle = 'oracle',
}

export const ormConfig = () => ({
  type: process.env.DB_CONNECTION as TypeDb,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Post],
  synchronize: true,
});
