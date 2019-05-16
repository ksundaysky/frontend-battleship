import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from './config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configUrl = 'https://battleship-wkbp-server.herokuapp.com/api/wkbp/post/game_config';

  constructor(private http: HttpClient) { }

  postConfig(config:Config): Observable<string> {
    return this.http.post<string>(this.configUrl, config, httpOptions);
  }
}
