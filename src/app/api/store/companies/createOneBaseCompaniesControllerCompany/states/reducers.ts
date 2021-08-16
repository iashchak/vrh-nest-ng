/* tslint:disable:max-line-length */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as actions from './actions';

export interface CreateOneBaseCompaniesControllerCompanyState {
  data: void | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialCreateOneBaseCompaniesControllerCompanyState: CreateOneBaseCompaniesControllerCompanyState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Companies_CreateOneBaseCompaniesControllerCompany';
export const getCreateOneBaseCompaniesControllerCompanyStateSelector = createFeatureSelector<CreateOneBaseCompaniesControllerCompanyState>(selectorName);

export function CreateOneBaseCompaniesControllerCompanyReducer(
  state: CreateOneBaseCompaniesControllerCompanyState = initialCreateOneBaseCompaniesControllerCompanyState,
  action: actions.CreateOneBaseCompaniesControllerCompanyAction): CreateOneBaseCompaniesControllerCompanyState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
