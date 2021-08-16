/* tslint:disable:max-line-length */
/**
 * Все Работы Хороши API
 * 1.0.0
 * undefined
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  /** http://undefined/swagger/swagger-ui.html#!/auth/AuthController_vkontakteLogin */
  vkontakte(): Observable<void> {
    return this.http.get<void>(`/api/auth/vkontakte`);
  }

  /** http://undefined/swagger/swagger-ui.html#!/auth/AuthController_vkontakteLoginCallback */
  callback(): Observable<void> {
    return this.http.get<void>(`/api/auth/vkontakte/callback`);
  }

  /** http://undefined/swagger/swagger-ui.html#!/auth/AuthController_refreshToken */
  refreshToken(): Observable<void> {
    return this.http.post<void>(`/api/auth/refresh-token`, {});
  }

  /** http://undefined/swagger/swagger-ui.html#!/auth/AuthController_protectedResource */
  protected(): Observable<void> {
    return this.http.get<void>(`/api/auth/protected`);
  }
}
