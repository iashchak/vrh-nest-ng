import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Video } from 'server/videos/entities/video.entity';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import * as slug from 'slug';
import { VideosService } from 'src/app/entities/videos.service';
import { Subject, takeUntil } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ValidationError } from 'class-validator';
type createVideoDTO = Omit<Omit<Omit<Video, '_id'>, 'sources'>, 'preview'>;

export function isSlug(control: AbstractControl): ValidationErrors | null {
  const isValidSlug = /^[a-z](-?[a-z])*$/gi.test(control.value);
  return isValidSlug ? null : { forbiddenName: { value: control.value } };
}

@Component({
  selector: 'app-video-create',
  templateUrl: './video-create.component.html',
  styleUrls: ['./video-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoCreateComponent implements OnDestroy {
  videoForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(100),
    ]),
    slug: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      isSlug,
    ]),
    file: new FormControl(undefined, [Validators.required]),
    releaseDate: new FormControl(new Date(), [Validators.required]),
    releaseTime: new FormControl(new Date(), [Validators.required]),
  });
  editor?: CKEditor5.EditorConstructor;

  destroy$ = new Subject<void>();

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private readonly videosService: VideosService
  ) {
    if (this.isPlatformBrowser) {
      const ClassicEditor = require('@ckeditor/ckeditor5-build-balloon');
      this.editor = Object.assign(ClassicEditor, {
        defaultConfig: {
          toolbar: ['heading', '|', 'bold', 'italic'],
        },
      });
    }
    this.videoForm
      .get('title')
      ?.valueChanges.pipe(
        takeUntil(this.destroy$),
        tap((title) => this.videoForm.get('slug')?.setValue(slug(title))),
        tap(() => this.videoForm.get('slug')?.markAsTouched())
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
  get isPlatformBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.preventDefault();
    const { releaseDate, releaseTime, ...data } = this.videoForm.getRawValue();
    const release = new Date(
      releaseDate.year,
      releaseDate.month,
      releaseDate.day,
      releaseTime.hour,
      releaseTime.minute,
      releaseTime.second
    );
    this.videosService.add({ ...data, release });
  }

  isAnyError(field: string): ValidationErrors | null {
    return (
      (this.videoForm.get(field)?.touched &&
        this.videoForm.get(field)?.errors) ||
      null
    );
  }
}
