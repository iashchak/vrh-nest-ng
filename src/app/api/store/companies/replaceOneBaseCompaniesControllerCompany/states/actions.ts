/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {ReplaceOneBaseCompaniesControllerCompanyParams} from '../../../../controllers/Companies';

export enum Actions {
  START = '[Companies replaceOneBaseCompaniesControllerCompany] Start',
  SUCCESS = '[Companies replaceOneBaseCompaniesControllerCompany] Success',
  ERROR = '[Companies replaceOneBaseCompaniesControllerCompany] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: ReplaceOneBaseCompaniesControllerCompanyParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: void) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type ReplaceOneBaseCompaniesControllerCompanyAction = Start | Success | Error;
