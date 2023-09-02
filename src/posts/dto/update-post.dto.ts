import { IsString, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiPropertyOptional()
  @IsString()
  readonly title: string;

  @ApiPropertyOptional()
  @IsString()
  readonly content: string;

  @ApiPropertyOptional()
  @IsString()
  readonly tags: string;

  @ApiPropertyOptional()
  @IsUrl()
  readonly imageUrl: string;
}
