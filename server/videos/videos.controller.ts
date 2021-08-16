import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { MinioClientService } from '../file-upload/minio-client.service';
import { BufferedFile } from '../file-upload/models/buffered-file';
import { Video } from './entities/video.entity';
import { VideosService } from './videos.service';

@ApiTags('videos')
@Crud({
  model: {
    type: Video,
  },
  params: {
    id: {
      field: '_id',
      type: 'string',
      primary: true,
    },
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
