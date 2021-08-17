import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EntityDataModule,
  DefaultDataServiceConfig,
  DefaultDataServiceFactory,
  EntityDataService,
  HttpUrlGenerator,
} from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { EntityMetadataMap } from '@ngrx/data';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Video } from '@backend/videos/entities/video.entity';
import { Company } from '@backend/companies/entities/company.entity';

import { StoreModule } from '@ngrx/store';
import { VideosService } from './videos.service';
import { ExtendedDataServiceFactory } from './extended-data-service.factory';
import { environment } from '../../environments/environment';
import { PluralHttpUrlGenerator } from './plural-http-url-generator.service';

export const entityMetadata: EntityMetadataMap = {
  Company: {
    selectId: (company: Company) => company._id,
  },
  Video: {
    selectId: (video: Video) => video._id,
  },
};

export const pluralNames: Record<string, string> = {
  Company: 'Companies',
};

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:4200/api',
  timeout: 10000,
};

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({ entityMetadata, pluralNames }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    CommonModule,
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    { provide: HttpUrlGenerator, useClass: PluralHttpUrlGenerator },
    {
      provide: DefaultDataServiceFactory,
      useClass: ExtendedDataServiceFactory,
    },
    VideosService,
  ],
})
export class EntitiesModule {
  constructor(entityDataService: EntityDataService) {}
}
