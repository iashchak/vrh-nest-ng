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
import {GetManyBaseRoomsControllerRoomFormService} from './getManyBaseRoomsControllerRoom.service';

import {GetManyBaseRoomsControllerRoomEffects} from './states/effects';
import {GetManyBaseRoomsControllerRoomReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, GetManyBaseRoomsControllerRoomReducer),
    NgrxEffectsModule.forFeature([GetManyBaseRoomsControllerRoomEffects]),
  ],
  providers: [
    RoomsService,
    GetManyBaseRoomsControllerRoomFormService,
  ],
})
export class GetManyBaseRoomsControllerRoomModule {}
