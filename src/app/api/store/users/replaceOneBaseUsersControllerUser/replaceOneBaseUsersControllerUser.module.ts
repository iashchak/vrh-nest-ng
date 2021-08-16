/* tslint:disable:max-line-length */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {UsersService} from '../../../controllers/Users';
import {FormsSharedModule} from '../../forms-shared.module';
import {ReplaceOneBaseUsersControllerUserFormService} from './replaceOneBaseUsersControllerUser.service';

import {ReplaceOneBaseUsersControllerUserEffects} from './states/effects';
import {ReplaceOneBaseUsersControllerUserReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, ReplaceOneBaseUsersControllerUserReducer),
    NgrxEffectsModule.forFeature([ReplaceOneBaseUsersControllerUserEffects]),
  ],
  providers: [
    UsersService,
    ReplaceOneBaseUsersControllerUserFormService,
  ],
})
export class ReplaceOneBaseUsersControllerUserModule {}
