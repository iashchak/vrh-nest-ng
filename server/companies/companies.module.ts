import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Company } from './entities/company.entity';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [
    TypegooseModule.forFeature([Company])
  ]
})
export class CompaniesModule {}
