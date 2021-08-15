import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { MongooseCrudService } from 'server/mongoose-crud-service';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService extends MongooseCrudService<Company> {
  constructor(@InjectModel(Company) public model: ReturnModelType<typeof Company>) {
    super(model)
  }
}

