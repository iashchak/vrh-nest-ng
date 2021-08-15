import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Video } from './video';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  constructor() {}

  getVideos(): Observable<Video[]> {
    return of([
      {
        title: 'Super video',
        description: 'nice video look at chics',
        slug: 'slug',
        preview: 'https://mdbootstrap.com/img/new/standard/nature/111.jpg',
        sources: [
          {
            size: 720,
            src: '/assets/static/1.mp4',
          },
        ],
      },
    ]);
  }
}
