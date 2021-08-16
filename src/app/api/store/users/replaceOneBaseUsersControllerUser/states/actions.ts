/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {ReplaceOneBaseUsersControllerUserParams} from '../../../../controllers/Users';

export enum Actions {
  START = '[Users replaceOneBaseUsersControllerUser] Start',
  SUCCESS = '[Users replaceOneBaseUsersControllerUser] Success',
  ERROR = '[Users replaceOneBaseUsersControllerUser] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: ReplaceOneBaseUsersControllerUserParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: void) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type ReplaceOneBaseUsersControllerUserAction = Start | Success | Error;
