/* tslint:disable:max-line-length */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormArrayExtended} from '../../../common/formArrayExtended';
import {RoomsService} from '../../../controllers/Rooms';

@Injectable()
export class GetManyBaseRoomsControllerRoomFormService {
  form: FormGroup;
  constructor(
    private roomsService: RoomsService,
  ) {
    this.form = new FormGroup({
      fields: new FormArrayExtended(() => (
        new FormControl(undefined, [])), [], []),
      s: new FormControl(undefined, []),
      filter: new FormArrayExtended(() => (
        new FormControl(undefined, [])), [], []),
      or: new FormArrayExtended(() => (
        new FormControl(undefined, [])), [], []),
      sort: new FormArrayExtended(() => (
        new FormControl(undefined, [])), [], []),
      join: new FormArrayExtended(() => (
        new FormControl(undefined, [])), [], []),
      limit: new FormControl(undefined, []),
      offset: new FormControl(undefined, []),
      page: new FormControl(undefined, []),
      cache: new FormControl(undefined, [Validators.max(1), Validators.min(0)]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.roomsService.getManyBaseRoomsControllerRoom(data);
  }
}
