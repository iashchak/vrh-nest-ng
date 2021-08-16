/* tslint:disable:max-line-length */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {RoomsService} from '../../../controllers/Rooms';
import {FormsSharedModule} from '../../forms-shared.module';

import {CreateOneBaseRoomsControllerRoomEffects} from './states/effects';
import {CreateOneBaseRoomsControllerRoomReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, CreateOneBaseRoomsControllerRoomReducer),
    NgrxEffectsModule.forFeature([CreateOneBaseRoomsControllerRoomEffects]),
  ],
  providers: [
    RoomsService,
  ],
})
export class CreateOneBaseRoomsControllerRoomModule {}
