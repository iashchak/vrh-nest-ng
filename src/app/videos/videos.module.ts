import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { FeedComponent } from './feed/feed.component';
import { WatchComponent } from './watch/watch.component';
import { PlyrModule } from 'ngx-plyr';
import { isPlatformBrowser } from '@angular/common';

@NgModule({
  declarations: [FeedComponent, WatchComponent],
  imports: [CommonModule, VideosRoutingModule, PlyrModule],
})
export class VideosModule {}
