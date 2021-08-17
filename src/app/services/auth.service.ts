import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, RouterModule, CanActivate } from '@angular/router';
import { AppHttpService } from '../helpers/app-http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    public router: Router,
    private httpService: AppHttpService
  ) {}

  handleError(error: Response | any) {
    const body = JSON.parse(JSON.stringify(error)) || '';
    return Observable.throw(body);
  }

  adminLogin(user: any): Observable<any> {
    return this.httpService.post('login/login', user);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('auth-token') || '';
    if (token == '') {
      return false;
    } else {
      return true;
    }
  }
}
