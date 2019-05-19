import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from './config';
import {serverUrl} from '../app.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configUrl = serverUrl + '/api/wkbp/post/game_config';
  private createUrl = serverUrl + '/api/wkbp/get/ships_placement/';

  constructor(private http: HttpClient) { }

  postConfig(config:Config): Observable<string> {
    return this.http.post<string>(this.configUrl, config, httpOptions);
  }

}
