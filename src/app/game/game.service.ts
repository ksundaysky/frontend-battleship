import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from './field';
import {serverUrl} from '../app.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameUrl = serverUrl + '/api/wkbp/get/game_config';
  private shotUrl = serverUrl + '/api/wkbp/post/game/shoot/';
  private permissionUrl = serverUrl + '/api/wkbp/get/game/';
  private shipUrl = serverUrl + '/api/wkbp/get/game/fleet/';
  private turnUrl = serverUrl + '/api/wkbp/get/game/is_my_turn/';
  private readyUrl = serverUrl + '/api/wkbp/get/game/is_game_ready/';
  private endUrl = serverUrl + '/api/wkbp/get/game/end_of_game/';
  private highUrl = serverUrl + '/api/wkbp/get/highscores';




  constructor(private http: HttpClient) { }

  getGame(): Observable<string> {
    return this.http.get(this.gameUrl, { responseType: 'text' });
  }

  getTurn(id): Observable<string> {
    return this.http.get(this.turnUrl+id, { responseType: 'text' });
  }

  getReady(id): Observable<string> {
    return this.http.get(this.readyUrl+id, { responseType: 'text' });
  }

  getPermission(id): Observable<string>{
    return this.http.get(this.permissionUrl+id, { responseType: 'text' });
  }

  getShips(id): Observable<string> {
    return this.http.get(this.shipUrl+id, { responseType: 'text' });
  }

  postShot(field:Field,gameId): Observable<string> {
    return this.http.post<string>(this.shotUrl+gameId,field, httpOptions);
  }
  getEndGame(gameId): Observable<string> {
    return this.http.get(this.endUrl+gameId, { responseType: 'text' });
  }

  getHighscore(): Observable<string> {
    return this.http.get(this.highUrl, { responseType: 'text' });
  }
}
