/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {ReplaceOneBaseVideosControllerVideoParams} from '../../../../controllers/Videos';

export enum Actions {
  START = '[Videos replaceOneBaseVideosControllerVideo] Start',
  SUCCESS = '[Videos replaceOneBaseVideosControllerVideo] Success',
  ERROR = '[Videos replaceOneBaseVideosControllerVideo] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: ReplaceOneBaseVideosControllerVideoParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: void) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type ReplaceOneBaseVideosControllerVideoAction = Start | Success | Error;
