/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {GetOneBaseRoomsControllerRoomParams} from '../../../../controllers/Rooms';

export enum Actions {
  START = '[Rooms getOneBaseRoomsControllerRoom] Start',
  SUCCESS = '[Rooms getOneBaseRoomsControllerRoom] Success',
  ERROR = '[Rooms getOneBaseRoomsControllerRoom] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: GetOneBaseRoomsControllerRoomParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: void) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type GetOneBaseRoomsControllerRoomAction = Start | Success | Error;
