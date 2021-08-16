import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { Client } from 'minio';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { BufferedFile } from './models/buffered-file';

@Injectable()
export class MinioClientService {
  private readonly logger = new Logger(MinioClientService.name);
  constructor(@Inject(MINIO_CONNECTION) private readonly client: Client) {}

  public async upload(file: BufferedFile, bucketName: string) {
    const timestamp = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(timestamp)
      .digest('hex');
    const extension = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length
    );
    const metaData = {
      'Content-Type': file.mimetype,
    };

    // We need to append the extension at the end otherwise Minio will save it as a generic file
    const fileName = hashedFileName + extension;

    try {
      await this.client.putObject(bucketName, fileName, file.buffer, metaData);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }

    return {
      url: `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${fileName}`,
    };
  }

  async delete(objetName: string, bucketName: string) {
    try {
      await this.client.removeObject(bucketName, objetName);
    } catch (err) {
      throw new HttpException(
        'An error occured when deleting!',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
