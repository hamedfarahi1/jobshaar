import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRoleService } from '../service/user-role.service';
import { ICredentials } from './credentials.model';


@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(
    private http: HttpClient,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    private userRoleService: UserRoleService
  ) {
  }

  // tslint:disable-next-line:no-any
  getToken(): any {
    return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
  }

  login(credentials: ICredentials, isEmployer: boolean): Observable<string> {
    const data = {
      username: credentials.username,
      password: credentials.password,
      rememberMe: credentials.rememberMe
    };

    const subUrl: string = isEmployer ? 'employer' : 'employee';

    return this.http.post(`api/${subUrl}/login`, data,
      { observe: 'response' }).pipe(map(((resp: HttpResponse<ObjectWithToken>) => {
        let bearerToken: string | null = '';
        if (resp.body !== null && resp.body.token) {
          bearerToken = resp.body.token;
        } else
          bearerToken = resp.headers.get('Authorization');
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const jwt = bearerToken.slice(7, bearerToken.length);
          this.storeAuthenticationToken(jwt, true);
          this.userRoleService.setUserRole(subUrl);
          return jwt;
        } else if (bearerToken) {
          const jwt = bearerToken;
          this.storeAuthenticationToken(jwt, true);
          this.userRoleService.setUserRole(subUrl);
          return jwt;
        }
        return '';
      }).bind(this)));
  }

  register(obj: any, isEmployer: boolean) {
    const data = {
      username: obj.username,
      password: obj.password,
      email: obj.email
    }

    const subUrl: string = isEmployer ? 'employer' : 'employee';
    return this.http.post(`api/${subUrl}/register`, data,
      { observe: 'response' }).pipe(map(((resp: HttpResponse<ObjectWithToken>) => {
        let bearerToken: string | null = '';
        if (resp.body !== null && resp.body.token) {
          bearerToken = resp.body.token;
        } else
          bearerToken = resp.headers.get('Authorization');
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const jwt = bearerToken.slice(7, bearerToken.length);
          this.storeAuthenticationToken(jwt, true);
          this.userRoleService.setUserRole(subUrl);
          return jwt;
        } else if (bearerToken) {
          const jwt = bearerToken;
          this.storeAuthenticationToken(jwt, true);
          this.userRoleService.setUserRole(subUrl);
          return jwt;
        }
        return '';
      }).bind(this)));
  }

  loginWithToken(jwt: string, rememberMe?: boolean): Promise<string> {
    if (jwt) {
      this.storeAuthenticationToken(jwt, true);
      return Promise.resolve(jwt);
    } else {
      return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
    }
  }

  storeAuthenticationToken(jwt: string, rememberMe?: boolean): void {
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
    }
  }

  logout(): Observable<{}> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      this.$localStorage.clear('role');
      observer.complete();
    });
  }
}

interface ObjectWithToken {
  token?: string;
}
