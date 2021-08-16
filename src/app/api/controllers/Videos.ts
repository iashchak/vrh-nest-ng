/* tslint:disable:max-line-length */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface GetOneBaseVideosControllerVideoParams {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
}

export interface UpdateOneBaseVideosControllerVideoParams {
  id: string;
}

export interface ReplaceOneBaseVideosControllerVideoParams {
  id: string;
}

export interface DeleteOneBaseVideosControllerVideoParams {
  id: string;
}

export interface GetManyBaseVideosControllerVideoParams {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
}

@Injectable()
export class VideosService {
  constructor(private http: HttpClient) {}

  /** http://undefined/swagger/swagger-ui.html#!/videos/VideosController_uploadImage */
  upload(): Observable<void> {
    return this.http.post<void>(`/api/videos/upload`, {});
  }

  /**
   * Retrieve a single Video
   * http://undefined/swagger/swagger-ui.html#!/videos/getOneBaseVideosControllerVideo
   */
  getOneBaseVideosControllerVideo(params: GetOneBaseVideosControllerVideoParams): Observable<void> {
    const pathParams = {
      id: params.id,
    };
    const queryParamBase = {
      fields: params.fields,
      join: params.join,
      cache: params.cache,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else if (Array.isArray(value)) value.forEach(v => queryParams = queryParams.append(key, v));
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    return this.http.get<void>(`/api/videos/${pathParams.id}`, {params: queryParams});
  }

  /**
   * Update a single Video
   * http://undefined/swagger/swagger-ui.html#!/videos/updateOneBaseVideosControllerVideo
   */
  updateOneBaseVideosControllerVideo(params: UpdateOneBaseVideosControllerVideoParams): Observable<void> {
    const pathParams = {
      id: params.id,
    };
    return this.http.patch<void>(`/api/videos/${pathParams.id}`, {});
  }

  /**
   * Replace a single Video
   * http://undefined/swagger/swagger-ui.html#!/videos/replaceOneBaseVideosControllerVideo
   */
  replaceOneBaseVideosControllerVideo(params: ReplaceOneBaseVideosControllerVideoParams): Observable<void> {
    const pathParams = {
      id: params.id,
    };
    return this.http.put<void>(`/api/videos/${pathParams.id}`, {});
  }

  /**
   * Delete a single Video
   * http://undefined/swagger/swagger-ui.html#!/videos/deleteOneBaseVideosControllerVideo
   */
  deleteOneBaseVideosControllerVideo(params: DeleteOneBaseVideosControllerVideoParams): Observable<void> {
    const pathParams = {
      id: params.id,
    };
    return this.http.delete<void>(`/api/videos/${pathParams.id}`);
  }

  /**
   * Retrieve multiple Videos
   * http://undefined/swagger/swagger-ui.html#!/videos/getManyBaseVideosControllerVideo
   */
  getManyBaseVideosControllerVideo(params: GetManyBaseVideosControllerVideoParams): Observable<void> {
    const queryParamBase = {
      fields: params.fields,
      s: params.s,
      filter: params.filter,
      or: params.or,
      sort: params.sort,
      join: params.join,
      limit: params.limit,
      offset: params.offset,
      page: params.page,
      cache: params.cache,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else if (Array.isArray(value)) value.forEach(v => queryParams = queryParams.append(key, v));
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    return this.http.get<void>(`/api/videos`, {params: queryParams});
  }

  /**
   * Create a single Video
   * http://undefined/swagger/swagger-ui.html#!/videos/createOneBaseVideosControllerVideo
   */
  createOneBaseVideosControllerVideo(): Observable<void> {
    return this.http.post<void>(`/api/videos`, {});
  }

  /**
   * Create multiple Videos
   * http://undefined/swagger/swagger-ui.html#!/videos/createManyBaseVideosControllerVideo
   */
  bulk(): Observable<void> {
    return this.http.post<void>(`/api/videos/bulk`, {});
  }
}
