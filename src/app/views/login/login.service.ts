import { Injectable } from '@angular/core';
import { AppHttpService } from '../../helpers/app-http.service';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpService: AppHttpService) {}
}
