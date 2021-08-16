/* tslint:disable:max-line-length */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VideosService} from '../../../controllers/Videos';

@Injectable()
export class UpdateOneBaseVideosControllerVideoFormService {
  form: FormGroup;
  constructor(
    private videosService: VideosService,
  ) {
    this.form = new FormGroup({
      id: new FormControl(undefined, [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.videosService.updateOneBaseVideosControllerVideo(data);
  }
}
