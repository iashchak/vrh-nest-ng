/* tslint:disable:max-line-length */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface GetOneBaseRoomsControllerRoomParams {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
}

export interface UpdateOneBaseRoomsControllerRoomParams {
  id: string;
}

export interface ReplaceOneBaseRoomsControllerRoomParams {
  id: string;
}

export interface DeleteOneBaseRoomsControllerRoomParams {
  id: string;
}

export interface GetManyBaseRoomsControllerRoomParams {
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
export class RoomsService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieve a single Room
   * http://undefined/swagger/swagger-ui.html#!/rooms/getOneBaseRoomsControllerRoom
   */
  getOneBaseRoomsControllerRoom(params: GetOneBaseRoomsControllerRoomParams): Observable<void> {
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

    return this.http.get<void>(`/api/rooms/${pathParams.id}`, {params: queryParams});
  }

  /**
   * Update a single Room
   * http://undefined/swagger/swagger-ui.html#!/rooms/updateOneBaseRoomsControllerRoom
   */
  updateOneBaseRoomsControllerRoom(params: UpdateOneBaseRoomsControllerRoomParams): Observable<void> {
    const pathParams = {
      id: params.id,
    };
    return this.http.patch<void>(`/api/rooms/${pathParams.id}`, {});
  }

  /**
   * Replace a single Room
   * http://undefined/swagger/swagger-ui.html#!/rooms/replaceOneBaseRoomsControllerRoom
   */
  replaceOneBaseRoomsControllerRoom(params: ReplaceOneBaseRoomsControllerRoomParams): Observable<void> {
    const pathParams = {
      id: params.id,
    };
    return this.http.put<void>(`/api/rooms/${pathParams.id}`, {});
  }

  /**
   * Delete a single Room
   * http://undefined/swagger/swagger-ui.html#!/rooms/deleteOneBaseRoomsControllerRoom
   */
  deleteOneBaseRoomsControllerRoom(params: DeleteOneBaseRoomsControllerRoomParams): Observable<void> {
    const pathParams = {
      id: params.id,
    };
    return this.http.delete<void>(`/api/rooms/${pathParams.id}`);
  }

  /**
   * Retrieve multiple Rooms
   * http://undefined/swagger/swagger-ui.html#!/rooms/getManyBaseRoomsControllerRoom
   */
  getManyBaseRoomsControllerRoom(params: GetManyBaseRoomsControllerRoomParams): Observable<void> {
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

    return this.http.get<void>(`/api/rooms`, {params: queryParams});
  }

  /**
   * Create a single Room
   * http://undefined/swagger/swagger-ui.html#!/rooms/createOneBaseRoomsControllerRoom
   */
  createOneBaseRoomsControllerRoom(): Observable<void> {
    return this.http.post<void>(`/api/rooms`, {});
  }

  /**
   * Create multiple Rooms
   * http://undefined/swagger/swagger-ui.html#!/rooms/createManyBaseRoomsControllerRoom
   */
  bulk(): Observable<void> {
    return this.http.post<void>(`/api/rooms/bulk`, {});
  }
}
