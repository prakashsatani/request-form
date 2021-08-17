import { Injectable } from '@angular/core';
import { AppHttpService } from '../../helpers/app-http.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpService: AppHttpService) {}
  getStaff(): Observable<any> {
    return this.httpService.get('Features/RequestForm/GetStaffList ');
  }
}
