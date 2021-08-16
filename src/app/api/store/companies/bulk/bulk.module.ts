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

import {BulkEffects} from './states/effects';
import {BulkReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, BulkReducer),
    NgrxEffectsModule.forFeature([BulkEffects]),
  ],
  providers: [
    CompaniesService,
  ],
})
export class BulkModule {}
