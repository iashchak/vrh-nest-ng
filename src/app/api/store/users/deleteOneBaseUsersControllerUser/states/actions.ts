/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {DeleteOneBaseUsersControllerUserParams} from '../../../../controllers/Users';

export enum Actions {
  START = '[Users deleteOneBaseUsersControllerUser] Start',
  SUCCESS = '[Users deleteOneBaseUsersControllerUser] Success',
  ERROR = '[Users deleteOneBaseUsersControllerUser] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: DeleteOneBaseUsersControllerUserParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: void) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type DeleteOneBaseUsersControllerUserAction = Start | Success | Error;
