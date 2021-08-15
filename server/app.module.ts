import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { TypegooseModule } from 'nestjs-typegoose';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { VideosModule } from './videos/videos.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypegooseModule.forRoot(`${process.env.MONGODB_URL}`, {
      useNewUrlParser: true,
    }),
    AuthModule,
    CompaniesModule,
    VideosModule,
    FileUploadModule,
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/vrh-ng/browser'),
    }),
    ChatModule,
  ],
})
export class AppModule {}
