/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {GetManyBaseVideosControllerVideoParams} from '../../../../controllers/Videos';

export enum Actions {
  START = '[Videos getManyBaseVideosControllerVideo] Start',
  SUCCESS = '[Videos getManyBaseVideosControllerVideo] Success',
  ERROR = '[Videos getManyBaseVideosControllerVideo] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: GetManyBaseVideosControllerVideoParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: void) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type GetManyBaseVideosControllerVideoAction = Start | Success | Error;
