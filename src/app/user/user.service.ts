import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {serverUrl} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private playerGames = serverUrl + '/api/wkbp/playerGames';
  private allPlayers = serverUrl + '/api/wkbp/get/playerslist';


  constructor(private http: HttpClient) { }

  getGames(): Observable<string> {
    return this.http.get(this.playerGames, { responseType: 'text' });
  }

  getAllPlayers(): Observable<string> {
    return this.http.get(this.allPlayers, { responseType: 'text' });
  }
  
}
