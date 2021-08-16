/* tslint:disable:max-line-length */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {CompaniesService} from '../../../controllers/Companies';
import {FormsSharedModule} from '../../forms-shared.module';
import {GetOneBaseCompaniesControllerCompanyFormService} from './getOneBaseCompaniesControllerCompany.service';

import {GetOneBaseCompaniesControllerCompanyEffects} from './states/effects';
import {GetOneBaseCompaniesControllerCompanyReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, GetOneBaseCompaniesControllerCompanyReducer),
    NgrxEffectsModule.forFeature([GetOneBaseCompaniesControllerCompanyEffects]),
  ],
  providers: [
    CompaniesService,
    GetOneBaseCompaniesControllerCompanyFormService,
  ],
})
export class GetOneBaseCompaniesControllerCompanyModule {}
