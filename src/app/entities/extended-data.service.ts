import { HttpParams } from '@angular/common/http';
import { GetManyDefaultResponse } from '@nestjsx/crud';
import { DefaultDataService, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ExtendedDataService<T> extends DefaultDataService<T> {
  getWithQuery(queryParams: string | QueryParams): Observable<T[]> {
    const qParams =
      typeof queryParams === 'string'
        ? { fromString: queryParams }
        : { fromObject: queryParams };
    const params = new HttpParams(qParams);
    return this.execute('GET', this.entitiesUrl, undefined, { params }).pipe(
      map((response: GetManyDefaultResponse<T> | Array<T>) =>
        response instanceof Array ? response : response.data
      )
    );
  }

  getAll(): Observable<T[]> {
    return this.execute('GET', this.entitiesUrl).pipe(
      map((response: GetManyDefaultResponse<T> | Array<T>) =>
        response instanceof Array ? response : response.data
      )
    );
  }
  add(entity: T): Observable<T> {
    const entityOrError =
      entity || new Error(`No "${this.entityName}" entity to add`);
    return this.execute('POST', this.entitiesUrl, entityOrError);
  }

  delete(key: number | string): Observable<number | string> {
    let err!: Error;
    if (key == null) {
      err = new Error(`No "${this.entityName}" key to delete`);
    }
    return this.execute('DELETE', this.entitiesUrl + key, err).pipe(
      // forward the id of deleted entity as the result of the HTTP DELETE
      map((result) => key as number | string)
    );
  }
  getById(key: number | string): Observable<T> {
    let err!: Error;
    if (key == null) {
      err = new Error(`No "${this.entityName}" key to get`);
    }
    return this.execute('GET', this.entitiesUrl + key, err);
  }
  update(update: Update<T>): Observable<T> {
    const id = update && update.id;
    const updateOrError =
      id == null
        ? new Error(`No "${this.entityName}" update data or id`)
        : update.changes;
    return this.execute('PUT', this.entitiesUrl + id, updateOrError);
  }
  // Important! Only call if the backend service supports upserts as a POST to the target URL
  upsert(entity: T): Observable<T> {
    const entityOrError =
      entity || new Error(`No "${this.entityName}" entity to upsert`);
    return this.execute('POST', this.entitiesUrl, entityOrError);
  }
}
