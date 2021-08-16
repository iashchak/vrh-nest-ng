import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';

@ApiTags('companies')
@Crud({
  model: {
    type: Company,
  },
  params: {
    id: {
      field: '_id',
      type: 'string',
      primary: true,
    },
  },
})
@Controller('companies')
export class CompaniesController implements CrudController<Company> {
  constructor(readonly service: CompaniesService) {}
}
