/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {UpdateOneBaseUsersControllerUserParams} from '../../../../controllers/Users';

export enum Actions {
  START = '[Users updateOneBaseUsersControllerUser] Start',
  SUCCESS = '[Users updateOneBaseUsersControllerUser] Success',
  ERROR = '[Users updateOneBaseUsersControllerUser] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: UpdateOneBaseUsersControllerUserParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: void) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type UpdateOneBaseUsersControllerUserAction = Start | Success | Error;
