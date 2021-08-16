import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { MongooseCrudService } from '../mongoose-crud-service';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService extends MongooseCrudService<Company> {
  constructor(
    @InjectRepository(Company) protected readonly repo: MongoRepository<Company>
  ) {
    super(repo);
  }
}
