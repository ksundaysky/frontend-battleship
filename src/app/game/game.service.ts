import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from './field';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameUrl = 'http://localhost:8080/api/wkbp/get/game_config';
  private shotUrl = 'http://localhost:8080/api/wkbp/post/game/shoot/';
  private shipUrl = 'http://localhost:8080/api/wkbp/get/game/';
  private turnUrl = 'http://localhost:8080/api/wkbp/get/game/is_my_turn/';



  constructor(private http: HttpClient) { }

  getGame(): Observable<string> {
    return this.http.get(this.gameUrl, { responseType: 'text' });
  }

  getTurn(id): Observable<string> {
    return this.http.get(this.turnUrl+id, { responseType: 'text' });
  }

  getShips(id): Observable<string> {
    return this.http.get(this.shipUrl+id, { responseType: 'text' });
  }

  postShot(field:Field,gameId): Observable<string> {
    return this.http.post<string>(this.shotUrl+gameId,field, httpOptions);
  }
}
