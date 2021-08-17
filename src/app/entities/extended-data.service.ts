import { HttpParams } from '@angular/common/http';
import { GetManyDefaultResponse } from '@nestjsx/crud';
import { DefaultDataService, QueryParams } from '@ngrx/data';
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
}
