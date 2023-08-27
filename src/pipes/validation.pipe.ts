import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from './validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) return value;

    const objectValidate = plainToClass(metatype, value);
    return validate(objectValidate).then((errors) => {
      if (errors.length > 0) {
        const messages = errors.map((error) => {
          const constraints = error.constraints;
          return Object.values(constraints);
        });
        throw new ValidationException(messages);
      }
      return value;
    });
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
