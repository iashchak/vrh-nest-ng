import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlyrComponent } from 'ngx-plyr';
import { Observable, pluck } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Video } from 'server/videos/entities/video.entity';
import { VideosService } from 'src/app/entities/videos.service';

const videoSourcePlaceholder: Plyr.Source = {
  src: '/static/1.mp4',
  provider: 'html5',
  size: 1080,
};
@Component({
  selector: 'app-watch',
  templateUrl: './video-watch.component.html',
  styleUrls: ['./video-watch.component.scss'],
})
export class VideoWatchComponent {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private readonly videoService: VideosService,
    private readonly activatedRoute: ActivatedRoute
  ) {}
  get isPlatformBrowser() {
    return isPlatformBrowser(this.platformId);
  }
  @ViewChild(PlyrComponent)
  plyr!: PlyrComponent;

  video$: Observable<Video> = this.activatedRoute.params.pipe(
    pluck('slug'),
    switchMap((slug) => this.videoService.getByKey(slug))
  );
  videoSources$: Observable<Plyr.Source[]> = this.video$.pipe(
    map((video) =>
      video.sources?.length
        ? video.sources.map((source) => ({
            ...videoSourcePlaceholder,
            ...source,
            provider: 'html5',
          }))
        : [videoSourcePlaceholder]
    )
  );
  // or get it from plyrInit event
  player!: Plyr;

  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
  }

  play(): void {
    this.player.play(); // or this.plyr.player.play()
  }
}
