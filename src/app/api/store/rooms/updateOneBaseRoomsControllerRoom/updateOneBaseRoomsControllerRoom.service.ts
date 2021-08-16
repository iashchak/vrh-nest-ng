/* tslint:disable:max-line-length */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RoomsService} from '../../../controllers/Rooms';

@Injectable()
export class UpdateOneBaseRoomsControllerRoomFormService {
  form: FormGroup;
  constructor(
    private roomsService: RoomsService,
  ) {
    this.form = new FormGroup({
      id: new FormControl(undefined, [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.roomsService.updateOneBaseRoomsControllerRoom(data);
  }
}
