import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlyrModule } from 'ngx-plyr';
import { VideoWatchComponent } from './video-watch/video-watch.component';
import { VideoCreateComponent } from './video-create/video-create.component';
import { VideoFeedComponent } from './video-feed/video-feed.component';
import { VideosRoutingModule } from './videos-routing.module';
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbNavModule,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TruncateModule } from '../truncate/truncate.module';
@NgModule({
  declarations: [VideoFeedComponent, VideoWatchComponent, VideoCreateComponent],
  imports: [
    CommonModule,
    TruncateModule,
    ReactiveFormsModule,
    VideosRoutingModule,
    NgbNavModule,
    NgbAlertModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    PlyrModule,
    CKEditorModule,
  ],
})
export class VideosModule {}
