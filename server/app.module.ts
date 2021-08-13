import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { TypegooseModule } from 'nestjs-typegoose';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/vrh-ng/browser'),
    }),
    ConfigModule.forRoot(),
    TypegooseModule.forRoot(`${process.env.MONGODB_URL}`, {
      useNewUrlParser: true,
    }),
    CompaniesModule,
    AuthModule,
  ],
})
export class AppModule {}
