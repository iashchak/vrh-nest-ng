import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Company } from './entities/company.entity';

@Module({
  imports: [TypegooseModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [],
})
export class CompaniesModule {}
