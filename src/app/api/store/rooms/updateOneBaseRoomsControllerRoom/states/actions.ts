/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {UpdateOneBaseRoomsControllerRoomParams} from '../../../../controllers/Rooms';

export enum Actions {
  START = '[Rooms updateOneBaseRoomsControllerRoom] Start',
  SUCCESS = '[Rooms updateOneBaseRoomsControllerRoom] Success',
  ERROR = '[Rooms updateOneBaseRoomsControllerRoom] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: UpdateOneBaseRoomsControllerRoomParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: void) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type UpdateOneBaseRoomsControllerRoomAction = Start | Success | Error;
