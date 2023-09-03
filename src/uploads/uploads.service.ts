import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { format } from 'date-fns';
import { ensureDir, writeFile } from 'fs-extra';
import { FileResponseDto } from './dto/file-response.dto';

@Injectable()
export class UploadsService {
  async uploadFile(file: Express.Multer.File): Promise<FileResponseDto> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadPath = `${path}/uploads/${dateFolder}`;
    const filename = file.originalname.replace(/ /g, '_');
    await ensureDir(uploadPath);
    await writeFile(`${uploadPath}/${filename}`, file.buffer);
    const response: FileResponseDto = {
      url: `${dateFolder}/${filename}`,
      filename,
    };
    return response;
  }
}
