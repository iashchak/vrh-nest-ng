/* tslint:disable:max-line-length */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as actions from './actions';

export interface GetManyBaseRoomsControllerRoomState {
  data: void | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialGetManyBaseRoomsControllerRoomState: GetManyBaseRoomsControllerRoomState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Rooms_GetManyBaseRoomsControllerRoom';
export const getGetManyBaseRoomsControllerRoomStateSelector = createFeatureSelector<GetManyBaseRoomsControllerRoomState>(selectorName);

export function GetManyBaseRoomsControllerRoomReducer(
  state: GetManyBaseRoomsControllerRoomState = initialGetManyBaseRoomsControllerRoomState,
  action: actions.GetManyBaseRoomsControllerRoomAction): GetManyBaseRoomsControllerRoomState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
