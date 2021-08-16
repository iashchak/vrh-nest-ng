/* tslint:disable:max-line-length */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {AuthService} from '../../../controllers/Auth';
import {FormsSharedModule} from '../../forms-shared.module';

import {VkontakteEffects} from './states/effects';
import {VkontakteReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, VkontakteReducer),
    NgrxEffectsModule.forFeature([VkontakteEffects]),
  ],
  providers: [
    AuthService,
  ],
})
export class VkontakteModule {}
