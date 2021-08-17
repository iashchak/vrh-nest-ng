import { Component, OnInit } from '@angular/core';
import { VideosService } from 'src/app/entities/videos.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  readonly videos$ = this.videosService.getAll();
  constructor(private readonly videosService: VideosService) {}
}
