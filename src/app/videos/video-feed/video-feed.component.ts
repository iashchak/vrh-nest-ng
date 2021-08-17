import { Component, OnInit } from '@angular/core';
import { VideosService } from 'src/app/entities/videos.service';

@Component({
  selector: 'app-video-feed',
  templateUrl: './video-feed.component.html',
  styleUrls: ['./video-feed.component.scss'],
})
export class VideoFeedComponent {
  readonly videos$ = this.videosService.getAll();
  constructor(private readonly videosService: VideosService) {}
}
