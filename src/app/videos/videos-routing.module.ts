import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { WatchComponent } from './watch/watch.component';

const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
  },
  {
    path: 'watch/:videoId',
    component: WatchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideosRoutingModule {}
