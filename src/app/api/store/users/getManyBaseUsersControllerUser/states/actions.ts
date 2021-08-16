/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {GetManyBaseUsersControllerUserParams} from '../../../../controllers/Users';

export enum Actions {
  START = '[Users getManyBaseUsersControllerUser] Start',
  SUCCESS = '[Users getManyBaseUsersControllerUser] Success',
  ERROR = '[Users getManyBaseUsersControllerUser] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: GetManyBaseUsersControllerUserParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: void) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type GetManyBaseUsersControllerUserAction = Start | Success | Error;
