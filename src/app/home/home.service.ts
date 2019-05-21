import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {serverUrl} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private allGames = serverUrl + '/api/wkbp/get/gameslist';
  private allPlayers = serverUrl + '/api/wkbp/get/playerslist';

  constructor(private http: HttpClient) { }

  getAllGames(): Observable<string> {
    return this.http.get(this.allGames, { responseType: 'text' });
  }

  getAllPlayers(): Observable<string> {
    return this.http.get(this.allPlayers, { responseType: 'text' });
  }
}
