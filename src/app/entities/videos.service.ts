import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
  QueryParams,
} from '@ngrx/data';
import { Video } from '@backend/videos/entities/video.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetManyDefaultResponse } from '@nestjsx/crud';

@Injectable({
  providedIn: 'root',
})
export class VideosService extends EntityCollectionServiceBase<Video> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Video', serviceElementsFactory);
  }
}
