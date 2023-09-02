import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Post title' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'Post content' })
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @ApiProperty({ example: ['tag1', 'tag2'] })
  @IsString()
  readonly tags: string;

  @ApiProperty({ example: 'https://example.com/image.png' })
  @IsNotEmpty()
  @IsUrl()
  readonly imageUrl: string;
}
