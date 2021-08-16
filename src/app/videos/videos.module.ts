import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlyrModule } from 'ngx-plyr';
import { FeedComponent } from './feed/feed.component';
import { VideosRoutingModule } from './videos-routing.module';
import { WatchComponent } from './watch/watch.component';

@NgModule({
  declarations: [FeedComponent, WatchComponent],
  imports: [CommonModule, VideosRoutingModule, PlyrModule],
})
export class VideosModule {}
