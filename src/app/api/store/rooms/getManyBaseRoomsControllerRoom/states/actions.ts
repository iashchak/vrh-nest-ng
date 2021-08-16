/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {GetManyBaseRoomsControllerRoomParams} from '../../../../controllers/Rooms';

export enum Actions {
  START = '[Rooms getManyBaseRoomsControllerRoom] Start',
  SUCCESS = '[Rooms getManyBaseRoomsControllerRoom] Success',
  ERROR = '[Rooms getManyBaseRoomsControllerRoom] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: GetManyBaseRoomsControllerRoomParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: void) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type GetManyBaseRoomsControllerRoomAction = Start | Success | Error;
