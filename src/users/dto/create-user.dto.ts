import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user' })
  @IsString()
  @IsNotEmpty()
  @Length(3)
  username: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  @Length(5)
  password: string;

  @ApiProperty({
    example: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  })
  @IsString()
  @IsOptional()
  @IsUrl()
  avatarUrl: string;
}
