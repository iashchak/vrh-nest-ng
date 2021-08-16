import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { Video } from './entities/video.entity';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
@Module({
  controllers: [VideosController],
  providers: [VideosService],
  imports: [TypeOrmModule.forFeature([Video]), FileUploadModule],
})
export class VideosModule {}
