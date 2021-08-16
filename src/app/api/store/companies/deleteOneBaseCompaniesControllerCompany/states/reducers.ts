/* tslint:disable:max-line-length */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as actions from './actions';

export interface DeleteOneBaseCompaniesControllerCompanyState {
  data: void | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialDeleteOneBaseCompaniesControllerCompanyState: DeleteOneBaseCompaniesControllerCompanyState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Companies_DeleteOneBaseCompaniesControllerCompany';
export const getDeleteOneBaseCompaniesControllerCompanyStateSelector = createFeatureSelector<DeleteOneBaseCompaniesControllerCompanyState>(selectorName);

export function DeleteOneBaseCompaniesControllerCompanyReducer(
  state: DeleteOneBaseCompaniesControllerCompanyState = initialDeleteOneBaseCompaniesControllerCompanyState,
  action: actions.DeleteOneBaseCompaniesControllerCompanyAction): DeleteOneBaseCompaniesControllerCompanyState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
