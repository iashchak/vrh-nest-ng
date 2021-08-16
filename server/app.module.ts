import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { VideosModule } from './videos/videos.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'mongodb',
      url: `${process.env.MONGODB_URL}`,
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      logging: true
    }),
    AuthModule,
    CompaniesModule,
    VideosModule,
    FileUploadModule,
    ChatModule,
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/vrh-ng/browser'),
    }),
  ],
})
export class AppModule {}
