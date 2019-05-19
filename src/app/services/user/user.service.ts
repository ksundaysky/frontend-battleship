import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {serverUrl} from '../../app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = serverUrl + '/api/wkbp/get/user_board';


  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

}
