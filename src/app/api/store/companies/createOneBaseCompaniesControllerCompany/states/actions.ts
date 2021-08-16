/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';

export enum Actions {
  START = '[Companies createOneBaseCompaniesControllerCompany] Start',
  SUCCESS = '[Companies createOneBaseCompaniesControllerCompany] Success',
  ERROR = '[Companies createOneBaseCompaniesControllerCompany] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor() {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: void) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type CreateOneBaseCompaniesControllerCompanyAction = Start | Success | Error;