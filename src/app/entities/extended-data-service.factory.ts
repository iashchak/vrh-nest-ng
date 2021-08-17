import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import {
  HttpUrlGenerator,
  DefaultDataServiceConfig,
  EntityCollectionDataService,
  DefaultDataServiceFactory,
} from '@ngrx/data';
import { ExtendedDataService } from './extended-data.service';

@Injectable({ providedIn: 'root' })
export class ExtendedDataServiceFactory extends DefaultDataServiceFactory {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Optional() protected config?: DefaultDataServiceConfig
  ) {
    super(http, httpUrlGenerator, config);
  }
  /**
   * Create a default {EntityCollectionDataService} for the given entity type
   * @param entityName {string} Name of the entity type for this data service
   */
  create<T>(entityName: string): EntityCollectionDataService<T> {
    return new ExtendedDataService<T>(
      entityName,
      this.http,
      this.httpUrlGenerator,
      this.config
    );
  }
}
