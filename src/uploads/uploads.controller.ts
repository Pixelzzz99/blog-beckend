import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('uploads')
export class UploadsController {
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { url: `http://localhost:3000/uploads/${file.originalname}` };
  }
}
