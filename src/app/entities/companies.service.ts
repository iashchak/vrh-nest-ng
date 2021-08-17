import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Company } from '@backend/companies/entities/company.entity';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService extends EntityCollectionServiceBase<Company> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Company', serviceElementsFactory);
  }
}
