import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [TypeOrmModule.forFeature([Company])],
})
export class CompaniesModule {}
