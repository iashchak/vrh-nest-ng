/* tslint:disable:max-line-length */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as actions from './actions';

export interface UpdateOneBaseUsersControllerUserState {
  data: void | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialUpdateOneBaseUsersControllerUserState: UpdateOneBaseUsersControllerUserState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Users_UpdateOneBaseUsersControllerUser';
export const getUpdateOneBaseUsersControllerUserStateSelector = createFeatureSelector<UpdateOneBaseUsersControllerUserState>(selectorName);

export function UpdateOneBaseUsersControllerUserReducer(
  state: UpdateOneBaseUsersControllerUserState = initialUpdateOneBaseUsersControllerUserState,
  action: actions.UpdateOneBaseUsersControllerUserAction): UpdateOneBaseUsersControllerUserState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
