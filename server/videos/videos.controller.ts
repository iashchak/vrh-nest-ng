import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Crud, CrudController, CrudService } from '@nestjsx/crud';
import { MinioClientService } from 'server/file-upload/minio-client.service';
import { BufferedFile } from 'server/file-upload/models/buffered-file';
import { Video } from './entities/video.entity';
import { VideosService } from './videos.service';

@Crud({
  model: {
    type: Video,
  },
})
@Controller('videos')
export class VideosController implements CrudController<Video> {
  constructor(
    readonly service: VideosService,
    private readonly minioClientService: MinioClientService
  ) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        video: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('video'))
  async uploadImage(@UploadedFile() file: BufferedFile) {
    if (!file.mimetype.includes('mp4')) {
      throw new HttpException(
        'File type not supported',
        HttpStatus.BAD_REQUEST
      );
    }
    const { url: image_url } = await this.minioClientService.upload(
      file,
      'video'
    );
    return {
      image_url,
      message: 'Image upload successful',
    };
  }
}
