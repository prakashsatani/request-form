import { throwError as observableThrowError, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppHttpService {
  public hostUrl = environment.API_URL;
  // public apiHost = environment.GOOGLE_URL;
  constructor(
    // public http: Http,
    public TokenStorageService: TokenStorageService,
    public httpClient: HttpClient,
    private router: Router
  ) {}
  getHeader(
    headerOptions: any,
    qparams: any = null,
    doNotSendAuthorizationParam: any
  ) {
    let headerParams: any = {};
    if (
      doNotSendAuthorizationParam !== true &&
      this.TokenStorageService.getToken()
    ) {
      headerParams['x-auth-token'] = this.TokenStorageService.getToken();
      headerParams['Authorization'] =
        'Bearer ' + this.TokenStorageService.getToken();
    }
    if (headerOptions) {
      headerParams = { ...headerParams, ...headerOptions };
    }
    let params: HttpParams = new HttpParams();
    for (let key in qparams) {
      params.set(key, qparams[key]);
    }
    let headers = new HttpHeaders(headerParams);
    return headers;
  }

  get(
    url: any,
    apiHost: any = null,
    params: any = null,
    headerOptions: any = null,
    doNotSendAuthorizationParam: boolean = false
  ) {
    let httpOptions = this.getHeader(
      headerOptions,
      params,
      doNotSendAuthorizationParam
    );
    if (apiHost == null && apiHost != '') {
      apiHost = this.hostUrl;
    }
    return this.httpClient
      .get<any>(apiHost + url, { params: params, headers: httpOptions })
      .pipe(
        map((data) => {
          if (data) {
            return data;
          } else {
            return [];
          }
        }),
        tap(),
        catchError(this.handleError)
      );
  }

  post(
    url: any,
    params: any = null,
    apiHost: any = null,
    headerOptions: any = null,
    doNotSendAuthorizationParam: boolean = false
  ) {
    let httpOptions = this.getHeader(
      headerOptions,
      params,
      doNotSendAuthorizationParam
    );
    if (apiHost == null && apiHost != '') {
      apiHost = this.hostUrl;
    }
    return this.httpClient
      .post<any>(apiHost + url, params, { headers: httpOptions })
      .pipe(
        map((data) => {
          if (data) {
            return data;
          } else {
            return [];
          }
        }),
        tap(),
        catchError(this.handleError)
      );
  }

  put(
    url: any,
    params: any = null,
    headerOptions: any = null,
    doNotSendAuthorizationParam: boolean = false
  ) {
    let httpOptions = this.getHeader(
      headerOptions,
      params,
      doNotSendAuthorizationParam
    );
    return this.httpClient
      .put<any>(this.hostUrl + url, params, { headers: httpOptions })
      .pipe(
        map((data) => {
          if (data) {
            return data;
          } else {
            return [];
          }
        }),
        tap(),
        catchError(this.handleError)
      );
  }

  delete(
    url: any,
    apiHost: any = null,
    headerOptions: any = null,
    doNotSendAuthorizationParam: boolean = false
  ) {
    if (apiHost == null && apiHost != '') {
      apiHost = this.hostUrl;
    }
    let httpOptions = this.getHeader(
      headerOptions,
      {},
      doNotSendAuthorizationParam
    );
    return this.httpClient
      .delete<any>(apiHost + url, { headers: httpOptions })
      .pipe(
        map((data) => {
          if (data) {
            return data;
          } else {
            return [];
          }
        }),
        tap(),
        catchError(this.handleError)
      );
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status == 401 || error.status == 402) {
      localStorage.clear();
    }
    return throwError(error.error);
  }
}
