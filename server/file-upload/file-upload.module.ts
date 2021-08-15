import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestMinioModule, NestMinioOptions } from 'nestjs-minio';
import { MinioClientService } from './minio-client.service';

@Module({
  imports: [
    NestMinioModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        ({
          endPoint: configService.get<string>('S3_URL'),
          port: parseInt(`${configService.get<string>('S3_PORT')}`, 10),
          useSSL: false,
          accessKey: configService.get<string>('S3_ACCESS'),
          secretKey: configService.get<string>('S3_SECRET'),
        } as NestMinioOptions),
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class FileUploadModule {}
