import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud } from 'nestjs-mongoose-crud'
import { InjectModel, } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Company } from './entities/company.entity';

@Controller('companies')
@Crud({
  model: Company
})
export class CompaniesController {
  constructor(@InjectModel(Company) public model: ModelType<Company>) {}
}
