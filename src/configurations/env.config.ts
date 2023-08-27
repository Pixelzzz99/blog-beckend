import * as Joi from 'joi';
import { TypeDb } from './typeorm.config';

export const envConfig = () => ({
  isGlobal: true,
  envFilePath: process.env.NODE_ENV || '.dev.env',
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('.dev.env', '.prod.env', 'test')
      .default('.dev.env'),
    PORT: Joi.number().default(3000),
    DB_CONNECTION: Joi.string()
      .valid(TypeDb.postgres, TypeDb.mysql, TypeDb.sqlite, TypeDb.mariadb)
      .default(TypeDb.postgres),
    DB_HOST: Joi.string().default('localhost'),
    DB_PORT: Joi.number().default(5432),
    DB_USERNAME: Joi.string(),
    DB_PASSWORD: Joi.string(),
    DB_DATABASE: Joi.string(),
  }),
});
