import { Injectable } from '@nestjs/common';
import { MongooseCrudService } from 'server/mongoose-crud-service';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class CompaniesService extends MongooseCrudService<Company> {
  constructor(
    @InjectRepository(Company) protected readonly repo: MongoRepository<Company>
  ) {
    super(repo);
  }
}
