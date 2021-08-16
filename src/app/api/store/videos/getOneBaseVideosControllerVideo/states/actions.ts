/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {GetOneBaseVideosControllerVideoParams} from '../../../../controllers/Videos';

export enum Actions {
  START = '[Videos getOneBaseVideosControllerVideo] Start',
  SUCCESS = '[Videos getOneBaseVideosControllerVideo] Success',
  ERROR = '[Videos getOneBaseVideosControllerVideo] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: GetOneBaseVideosControllerVideoParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: void) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type GetOneBaseVideosControllerVideoAction = Start | Success | Error;
