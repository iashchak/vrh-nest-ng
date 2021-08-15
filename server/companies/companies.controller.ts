import { Controller } from '@nestjs/common';
import { Crud, CrudController, CrudService } from '@nestjsx/crud';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';

@Crud({
  model: {
    type: Company,
  },
})
@Controller('companies')
export class CompaniesController implements CrudController<Company> {
  constructor(readonly service: CompaniesService) {}
}
