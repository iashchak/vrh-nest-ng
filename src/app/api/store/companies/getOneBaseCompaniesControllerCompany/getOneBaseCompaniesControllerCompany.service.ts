/* tslint:disable:max-line-length */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormArrayExtended} from '../../../common/formArrayExtended';
import {CompaniesService} from '../../../controllers/Companies';

@Injectable()
export class GetOneBaseCompaniesControllerCompanyFormService {
  form: FormGroup;
  constructor(
    private companiesService: CompaniesService,
  ) {
    this.form = new FormGroup({
      id: new FormControl(undefined, [Validators.required]),
      fields: new FormArrayExtended(() => (
        new FormControl(undefined, [])), [], []),
      join: new FormArrayExtended(() => (
        new FormControl(undefined, [])), [], []),
      cache: new FormControl(undefined, [Validators.max(1), Validators.min(0)]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.companiesService.getOneBaseCompaniesControllerCompany(data);
  }
}
