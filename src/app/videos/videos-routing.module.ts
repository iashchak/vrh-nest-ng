import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoFeedComponent } from './video-feed/video-feed.component';
import { VideoCreateComponent } from './video-create/video-create.component';
import { VideoWatchComponent } from './video-watch/video-watch.component';

const routes: Routes = [
  {
    path: '',
    component: VideoFeedComponent,
  },
  {
    path: 'watch/:slug',
    component: VideoWatchComponent,
  },
  {
    path: 'new',
    component: VideoCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideosRoutingModule {}
