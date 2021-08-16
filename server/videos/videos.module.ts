import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { Video } from './entities/video.entity';
import { FileUploadModule } from 'server/file-upload/file-upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [VideosController],
  providers: [VideosService],
  imports: [TypeOrmModule.forFeature([Video]), FileUploadModule],
})
export class VideosModule {}
