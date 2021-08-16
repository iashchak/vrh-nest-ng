/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {GetOneBaseUsersControllerUserParams} from '../../../../controllers/Users';

export enum Actions {
  START = '[Users getOneBaseUsersControllerUser] Start',
  SUCCESS = '[Users getOneBaseUsersControllerUser] Success',
  ERROR = '[Users getOneBaseUsersControllerUser] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: GetOneBaseUsersControllerUserParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: void) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type GetOneBaseUsersControllerUserAction = Start | Success | Error;
