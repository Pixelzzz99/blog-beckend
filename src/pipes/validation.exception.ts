import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(private readonly _validationErrors: string[][]) {
    const message = _validationErrors
      .map((error) => error.join(', '))
      .join(', ');
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Validation Error',
        message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  get validationErrors(): string[][] {
    return this._validationErrors;
  }
}
